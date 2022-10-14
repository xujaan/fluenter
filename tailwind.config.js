// @type {import('tailwindcss').Config}
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Montserrat", "cursive"],
        text: ["Montserrat", "sans-serif"],
      },
      colors: {
        primary: colors.yellow["500"],
        secondary: colors.pink["400"],
        error: colors.red["500"],
      },
      dropShadow: {
        "3xl": "30px 30px 0 0 rgba(0,0,0,1)",
      },
    },
  },
  plugins: [],
};
