import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: '/', 
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // This replaces the "rm -rf" command - it cleans the folder automatically
    emptyOutDir: true, 
    sourcemap: false,
  }
})