import {withTV} from 'tailwind-variants/transformer';

/** @type {import('tailwindcss').Config} */
export default withTV({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0e9cf1',
        bgMain: '#f5f6f8',
        gray: {
          placeholder: '#96a5bb'
        }
      },
      fontFamily: {
        sans: [
          'Lexend Deca',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif'
        ]
      },
    },
  },
  plugins: [],
});