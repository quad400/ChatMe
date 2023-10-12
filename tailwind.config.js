/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigations/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0a8c77",
        white: "#fff",
        textColor: "#404040",
        gray85: "rgba(40,40,40,0.85)",
        gray55: "rgba(40,40,40,0.55)",
        gray40: "rgba(40,40,40,0.4)",
        gray65: "rgba(40,40,40,0.65)",
        gray50: "rgba(40,40,40,0.5)",
        gray90: "rgba(40,40,40,0.9)",
      },
      fontFamily: {
        interbold: "InterBold",
        intersemibold: "InterSemiBold",
        intermedium: "InterMedium",
        interregular: "InterRegular",
        interlight: "InterLight",
      },
      padding: {
        large: "30px"
      },
      margin: {
        large: "30px"
      },
      borderRadius: {
        normal: "10px"
      }
    },
  },
  plugins: [],
};
