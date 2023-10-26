/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        "form-black": "#161616",
        "my-grey": "#535353",
        "my-orange": "#C8500D",
      },
    },
  },
  plugins: [],
};
