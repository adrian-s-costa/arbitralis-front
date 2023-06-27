/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tall': { 'raw': '(max-height: 660px)' },
        'taller': { 'raw': '(min-height: 661px)' },
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),],
}