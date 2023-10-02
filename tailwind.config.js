/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        principal: '#3662E3',
        secundary: '#111729',
        alternative: '#364153',
        light: '#F2F5F9',
      },
    },
  },
  plugins: [],
}
