/** @type {import('tailwindcss').Config} */
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
    },
  },
  darkMode: "selector",
  plugins: [
    require('daisyui'),
  ],
}