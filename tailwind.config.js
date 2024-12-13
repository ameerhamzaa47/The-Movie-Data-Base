/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ['Roboto', 'sans-serif'],
      },
      boxShadow: {
        'left': '-10px 0px 15px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  darkMode: "selector",
  plugins: [
    daisyui,
    // require('tailwind-scrollbar-hide'),
  ],
}