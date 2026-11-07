import type { Config } from "tailwindcss";

/**
 * Couleurs de marque DAMEL CAR CARE.
 * Valeurs indicatives du cahier des charges — à harmoniser avec le logo officiel.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        violet: {
          DEFAULT: "#4B1F7A",
          50: "#F4EEFA",
          200: "#C9B1E3",
          300: "#A27FCC",
          400: "#7C4FB3",
          500: "#4B1F7A",
          600: "#3D1964",
          700: "#2E134C",
          800: "#1F0D33",
          900: "#150923",
        },
        lime: {
          DEFAULT: "#B6F000",
          300: "#D4FF5C",
          400: "#C6FA2E",
          500: "#B6F000",
          600: "#93C200",
        },
        ink: {
          DEFAULT: "#111318",
          900: "#0A0B0F",
          800: "#111318",
          700: "#181B22",
          600: "#20242D",
          500: "#2C313C",
          400: "#4A5160",
          300: "#8A91A0",
          200: "#B9BEC9",
        },
        cepsa: "#E2231A",
      },
      fontFamily: {
        sans: ["'Manrope Variable'", "Manrope", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1200px" },
      opacity: { 12: "0.12", 92: "0.92" },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        sheen: {
          "0%": { transform: "translateX(-120%) skewX(-20deg)" },
          "100%": { transform: "translateX(220%) skewX(-20deg)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up .7s cubic-bezier(.2,.7,.2,1) both",
        sheen: "sheen 3.2s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
