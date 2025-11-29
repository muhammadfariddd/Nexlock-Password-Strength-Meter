/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bw: {
          900: '#171b2f', // Main bg
          800: '#222b45', // Card bg
          700: '#2c3b5e', // Input bg
          600: '#4a5b85', // Border
          500: '#175ddc', // Primary Blue
          400: '#3b82f6', // Blue accent
          success: '#17c964',
          warning: '#f5a623',
          danger: '#e02424',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
