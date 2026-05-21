/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // এই লাইনটি সবচেয়ে জরুরি
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}