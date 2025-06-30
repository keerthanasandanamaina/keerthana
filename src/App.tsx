// src/App.tsx
import React, { useEffect, useState, useRef } from 'react';
import { Box, Flex, Text as ChakraText, Tooltip, Icon } from '@chakra-ui/react';
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Projects from "./components/Projects/Projects";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import Contact from './components/Contact/Contact';

// Firebase Imports
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { FaEye } from 'react-icons/fa';

function App() {
  const pageBackgroundColor = "#1A202C";
  const pagePrimaryTextColor = "#E2E8F0";
  const secondaryTextColor = "#A0AEC0";
  const accentColor = "#63B3ED";

  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  // REMOVED: const [db, setDb] = useState<any>(null);
  // REMOVED: const [auth, setAuth] = useState<any>(null);
  // REMOVED: const [appId, setAppId] = useState<string>('');

  const [activeSection, setActiveSection] = useState('About');

  // Refs for each section
  // MODIFIED: Explicitly type refs to HTMLDivElement
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to track active section
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    if (aboutRef.current) observer.observe(aboutRef.current);
    if (skillsRef.current) observer.observe(skillsRef.current);
    if (projectsRef.current) observer.observe(projectsRef.current);
    if (profileRef.current) observer.observe(profileRef.current);
    if (contactRef.current) observer.observe(contactRef.current);

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
      if (skillsRef.current) observer.unobserve(skillsRef.current);
      if (projectsRef.current) observer.unobserve(projectsRef.current);
      if (profileRef.current) observer.unobserve(profileRef.current);
      if (contactRef.current) observer.unobserve(contactRef.current);
    };
  }, []);

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

      // Removed: setDb(firestoreDb); setAuth(firebaseAuth); setAppId(...)
      // firestoreDb and firebaseAuth are used directly in setupVisitorTracking

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
      <Navbar activeItem={activeSection} setActiveItem={setActiveSection} />

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
        {/* Pass ref to each section */}
        <About ref={aboutRef} />
        <Skills ref={skillsRef} />
        <Projects ref={projectsRef} />
        <Profile ref={profileRef} />
        <Contact ref={contactRef} />
        <Footer />
      </Flex>
    </Box>
  );
}

export default App;
