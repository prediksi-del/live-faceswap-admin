/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#020617",
          card: "#0f172a",
          accent: "#3b82f6",
          purple: "#a855f7"
        }
      }
    },
  },
  plugins: [],
}
