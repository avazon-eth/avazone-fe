/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        custom: "24px",
      },
      colors: {
        black: "#1b1b1b",
        shinyOutstroke: "rgba(255, 255, 255, 0.40)",
        darkgrey2: "#1E1E1E",
      },
      spacing: {
        0.2: "0.025rem",
      },
      borderWidth: {
        1: "1px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
