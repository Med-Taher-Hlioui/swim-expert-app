import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- This must be here

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- This must be here
  ],
  base: './',
})