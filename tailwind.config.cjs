/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '2/3': '66.6666667%',
        '1/3': '33.3333333%'
      },
      minWidth: {
        '2/3': '66.6666667%',
        '1/3': '33.3333333%'
      }
    },
  },
  plugins: [],
}