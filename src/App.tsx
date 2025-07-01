// src/App.tsx
import { useEffect, useState } from 'react'; // Removed useRef
import { Box, Flex, Text as ChakraText, Tooltip, Icon } from '@chakra-ui/react';
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Contact from './components/Contact/Contact'; // Ensure Contact is imported

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FaEye } from 'react-icons/fa';

function App() {
  const pageBackgroundColor = "#1A202C";
  const pagePrimaryTextColor = "#E2E8F0";
  const secondaryTextColor = "#A0AEC0";

  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  // Removed: activeSection state and related refs/Intersection Observer
  // For GitHub Pages, we'll simplify active state management in Navbar itself,
  // or rely on URL hash for basic highlighting.

  // Firebase Configuration (HARDCODED FOR GITHUB PAGES)
  // WARNING: These keys will be publicly visible in your deployed code.
  // Ensure your Firebase Security Rules are strict.
  const firebaseConfig = {
    apiKey: "AIzaSyD0VHP09h1FHIRg1Pi1Cf1K3lZS--L9cj4", // REPLACE with your actual API Key
    authDomain: "keerthana-1d8ca.firebaseapp.com",
    projectId: "keerthana-1d8ca",
    storageBucket: "keerthana-1d8ca.firebasestorage.app",
    messagingSenderId: "37842937096",
    appId: "1:37842937096:web:2be18e48a41fd5518538bd",
    measurementId: "G-ZE8H33PCCW"
  };

  // Firebase Initialization
  useEffect(() => {
    try {
      if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.authDomain) {
        console.error("Firebase config is incomplete. Visitor tracking will not work.");
        return;
      }

      const app = initializeApp(firebaseConfig);
      const firestoreDb = getFirestore(app);
      const firebaseAuth = getAuth(app);

      const setupVisitorTracking = async () => {
        try {
          await signInAnonymously(firebaseAuth);
          const firestoreAppId = firebaseConfig.projectId || firebaseConfig.appId;
          const visitorCountDocRef = doc(firestoreDb, `artifacts/${firestoreAppId}/public/data/visitorCounts/mainPage`);

          const docSnap = await getDoc(visitorCountDocRef);
          if (docSnap.exists()) {
            await updateDoc(visitorCountDocRef, { count: (docSnap.data().count || 0) + 1 });
          } else {
            await setDoc(visitorCountDocRef, { count: 1 });
          }

          const unsubscribe = onSnapshot(visitorCountDocRef, (snapshot) => {
            if (snapshot.exists()) {
              setVisitorCount(snapshot.data().count);
            } else {
              setVisitorCount(0);
            }
          });
          return () => unsubscribe();
        } catch (error) {
          console.error("Error setting up visitor tracking:", error);
        }
      };
      setupVisitorTracking();
    } catch (error) {
      console.error("Failed to initialize Firebase:", error);
    }
  }, []);

  return (
    <Box minH="100vh" bg={pageBackgroundColor} position="relative">
      {/* Navbar no longer receives activeItem/setActiveItem from App */}
      <Navbar />

      <Tooltip label={`Visitors: ${visitorCount !== null ? visitorCount : 'Loading...'}`} hasArrow placement="bottom-end">
        <Box
          position="fixed"
          top={{ base: "20px", md: "25px" }}
          right={{ base: "20px", md: "30px" }}
          zIndex="sticky"
          bg="transparent"
          borderRadius="md"
          px={2}
          py={1}
          cursor="pointer"
          _hover={{
            bg: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
          }}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Icon as={FaEye} fontSize="xl" color={secondaryTextColor} mb={1} />
          <ChakraText fontSize="xs" color={secondaryTextColor} textAlign="center" lineHeight="normal">
            {visitorCount !== null ? visitorCount : '...'}
          </ChakraText>
        </Box>
      </Tooltip>

      <Flex
        direction="column"
        align="center"
        justify="flex-start"
        pt={{ base: "100px", md: "80px", lg: "70px" }}
        color={pagePrimaryTextColor}
      >
        {/* Section components no longer receive ref */}
        <About />
        <Skills />
        <Projects />
        <Profile />
        <Contact />
        <Footer />
      </Flex>
    </Box>
  );
}

export default App;
