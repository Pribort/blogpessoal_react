/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        feminine: {
          50: "#F9F7F6", // Tom mais claro
          100: "#F4EEED", // Cor principal (rosa claro)
          200: "#EFC9D1", // Rosa suave
          300: "#DDB8AB", // Tom pêssego rosado
          400: "#B3A48D", // Bege amarronzado
          500: "#999B84", // Verde oliva acinzentado
          600: "#7E806A",
          700: "#636550",
          800: "#484A36",
          900: "#2E2F1C", // Tom mais escuro
        },
        feminineDark: {
          50: "#FCEBE9", // Tom mais claro (variação de #F9C8C2)
          100: "#F9C8C2", // Rosa claro
          200: "#E3A39E",
          300: "#C69491", // Tom intermediário rosado
          400: "#A87C7B",
          500: "#96ACA0", // Verde acinzentado suave
          600: "#7D9094", // Azul acinzentado médio
          700: "#60665A", // Verde escuro acinzentado
          800: "#494E45",
          900: "#31342D", // Tom mais escuro
        },
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
    fontFamily: {
      cute: ["Quicksand", "sans-serif"],
    },
  },
  plugins: [],
};
