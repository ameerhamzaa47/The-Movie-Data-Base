/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui'); // Using require for CommonJS

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
    require('tailwind-scrollbar-hide'), // Use require here as well
  ],
}




// /** @type {import('tailwindcss').Config} */
// const daisyui = require('daisyui');

// module.exports = {
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
