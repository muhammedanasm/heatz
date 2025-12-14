/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Syne", "sans-serif"], // The "Awwwards" font
      },
      colors: {
        "heatz-black": "#0a0a0a",
        "heatz-accent": "#ff3e3e", // A bright sporty red like Heatz
        "heatz-gray": "#1f1f1f",
      },
    },
  },
  plugins: [],
};
