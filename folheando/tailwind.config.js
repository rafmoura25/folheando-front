/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0F172A",
        "blue-gray": "#64748B",
        "almost-white": "#F1F5F9",
        beige: "#FBE0E5",
        primary: "#38BDF8",
      },
    },
  },
  plugins: [],
}