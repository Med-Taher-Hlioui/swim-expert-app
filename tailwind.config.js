/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // This ensures your animations (animate-in, fade-in, etc.) work correctly
      animation: {
        'in': 'in 0.5s ease-out',
      },
    },
  },
  plugins: [],
}