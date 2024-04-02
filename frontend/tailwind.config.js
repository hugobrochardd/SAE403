/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: {
          400: "rgb(105, 201, 201)",
          700: "rgb(86, 201, 201)",
          900: "rgb(28, 35, 48)",
        },
        neutral: {
          100: "rgb(255, 255, 255)",
          800: "rgb(17, 19, 24)",
          900: "rgb(0, 0, 0)",
        },
    },
    aspectRatio: {
      '0.73': '0.73',
    },
    },
  },
  plugins: [],
};



