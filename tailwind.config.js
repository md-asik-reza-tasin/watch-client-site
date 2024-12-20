/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titleFont: "Yellowtail, cursive",
        secondFont : "Protest Revolution, sans-serif"
      },
    },
  },
  plugins: [require("daisyui")],
};
