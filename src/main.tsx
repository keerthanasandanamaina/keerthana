// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// Keep importing your global CSS file for fonts, but background will be handled by Chakra
import './index.css';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';

// 1. Configure Chakra UI's theme to start in dark mode
const customTheme = extendTheme({
  // Configure initial color mode here
  config: {
    initialColorMode: 'dark', // Set to 'dark' to start in dark mode
    useSystemColorMode: false, // Prevents Chakra from overriding with system preferences
  },
  // 2. Your custom colors (optional, but keep if you use them)
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
  // You can extend other theme properties here (fonts, spacing etc.)
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Pass your custom theme with dark mode config to ChakraProvider */}
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);
