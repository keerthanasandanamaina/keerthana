import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // IMPORTANT: This makes sure all assets are referenced relative to the HTML file
  build: {
    outDir: 'docs', // IMPORTANT: Output build files to a 'docs' directory
  },
})
