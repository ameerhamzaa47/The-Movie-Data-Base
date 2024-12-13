/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');
const tailwindScrollbarHide = require('tailwind-scrollbar-hide');

module.exports = {
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
    tailwindScrollbarHide,
  ],
}




// /** @type {import('tailwindcss').Config} */
// import daisyui from 'daisyui';

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         Poppins: ['Roboto', 'sans-serif'],
//       },
//       boxShadow: {
//         'left': '-10px 0px 15px rgba(0, 0, 0, 0.3)',
//       },
//     },
//   },
//   darkMode: "selector",
//   plugins: [
//     daisyui,
//     require('tailwind-scrollbar-hide'),
//   ],
// }