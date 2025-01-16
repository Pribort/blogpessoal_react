/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          50: "#f8f9f3",
          100: "#e4edd1",
          200: "#d3d6c2",
          300: "#adc575",
          400: "#92b34e",
          500: "#77983b",
          600: "#5e7b2c",
          700: "#4c6125",
          800: "#556B2F",
          900: "#283014",
        },
        warmNeutral: {
          50: "#F9F7F5",
          100: "#F2EDE8",
          200: "#E6DED3",
          300: "#D8D0C4",
          400: "#C9C1B4",
          500: "#B1A89C",
          600: "#8F877D",
          700: "#6C655D",
          800: "#49433E",
          900: "#26221F",
        },
      },
    },
  },
  plugins: [],
};
