import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // This is the ONLY thing needed for Netlify. It won't break your local dev.
  base: './', 
})