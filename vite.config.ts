import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const GITHUB_REPO_NAME = '/keerthana/';

export default defineConfig({
  plugins: [react()],
  
  base: GITHUB_REPO_NAME,
  build: {
    outDir: 'docs',
  },
})
