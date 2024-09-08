/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#333333",
        white: "#F5F5F5",
        primary: "#00BFFF",
        secondary: "#32CD32",
        tertiary: "#C0C0C0",
        red: "#FF4500",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
