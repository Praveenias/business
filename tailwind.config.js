/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gilroy: ['Gilroy-Medium', 'sans-serif'],
      },
      colors: {
        'custom-light-purple': '#E4D0F9', // Add your custom color here
      },
    },
  },
  plugins: [],
};
