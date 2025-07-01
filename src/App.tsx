// src/App.tsx
import { useEffect, useState } from 'react'; // Import useRef
import { Box, Flex, Text as ChakraText, Tooltip, Icon } from '@chakra-ui/react';
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About"; // Correct import path for About component
import Skills from "./components/Skills/Skills"; // Correct import path for Skills component
import Projects from "./components/Projects/Projects"; // Correct import path for Projects component
import Profile from "./components/Profile/Profile"; // Correct import path for Profile component
import Footer from "./components/Footer/Footer"; // Correct import path for Footer component
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

  

  // REMOVED: Refs for each section (aboutRef, skillsRef, projectsRef, profileRef, contactRef)
  // REMOVED: Intersection Observer useEffect hook

  // Firebase Initialization
  useEffect(() => {
    try {
      const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID,
      };

      if (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.authDomain) {
        console.error("Firebase config environment variables not fully set (missing API Key, Project ID, or Auth Domain). Visitor tracking will not work.");
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
      {/* MODIFIED: Removed activeItem and setActiveItem props */}
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
        {/* REMOVED: ref={aboutRef} etc. from section components */}
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
