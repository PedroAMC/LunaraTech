import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      boxShadow: {
        soft: "0 6px 16px rgba(37, 99, 235, 0.20)", // azul suave
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(.22,.61,.36,1)",
      },
    },
  },
  plugins: [],
};

export default config;
