/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  corePlugins: {

  },
  theme: {
    colors: {
      primary: "#6D7B9B",
      fourth:'#7C5D7A',
      secondary: "#FAF4ED",
      third: "#A3C2C4",
      white: "#FFFFFF",
      transparent: "transparent",
      black: "#000000",
      blue: "#1fb6ff",
      purple: "#7e5bef",
      pink: "#ff49db",
      orange: "#ff7849",
      green: "#13ce66",
      yellow: "#ffc82c",
      "gray-dark": "#273444",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
      'app-background': '#FAF4ED',
      'step-green': '#405F53',
      'step-pink': '#F7A08C',
      'step-red': '#F2644E',
      'step-light-green': '#95B6A8',
      'step-blue': '#6D7B9B',
    },
    backgroundColor: {
      primary: "#6D7B9B",
      secondary: "#FAF4ED",
      third: "#A3C2C4",
      black: "#000000",
      transparent: "transparent",
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
}
