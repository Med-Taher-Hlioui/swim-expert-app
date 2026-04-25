import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // This handles your Tailwind v4 design
  ],
  // 'base' must be '/' for a standard Netlify deployment
  base: '/', 
  build: {
    // These settings ensure your "Elite" UI is bundled into the 'dist' folder
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  }
})