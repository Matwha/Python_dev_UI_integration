/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFFF00',
        secondary: '#000000',
      },
      backgroundImage: {
        'honeycomb': `url("data:image/svg+xml,%3Csvg width='56' height='100' viewBox='0 0 56 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='rgba(255, 191, 36, 0.1)' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 16L28 0' fill='rgba(255, 191, 36, 0.03)' stroke='none'/%3E%3C/svg%3E")`,
      },
    },
  },
  plugins: [],
};