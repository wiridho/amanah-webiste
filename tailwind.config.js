/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#21004b",
        darkBlue: "#002E5D",
        lightBlue: "#5BC0EB",
        secondary: "#113D52",
        violet: "#7F5F7B",
        greenLame: "#1DD8A2",
        blueLame: "#4c99d3",
        red: {
          800: "#C62828",
        },
        grayCustom1: "#303030",
      },
      fontFamily: {
        "nunito-sans": ["Nunito Sans", "sans-serif"],
        lato: ["Lato", "sans-serif"],
        // inter: ["Inter", "sans-serif"],
        // testing: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
