/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5fa',
          100: '#dce7f3',
          200: '#c2d5ea',
          300: '#9bbada',
          400: '#6e99c7',
          500: '#4f7db2',
          600: '#3e6596',
          700: '#34527a',
          800: '#1A365D', // Deep blue (main)
          900: '#182c48',
          950: '#101c2e',
        },
        accent: {
          50: '#eefbf3',
          100: '#d6f5e1',
          200: '#b0eac7',
          300: '#7ed7a6',
          400: '#4dbf80',
          500: '#2D5E40', // Forest green (main)
          600: '#24864c',
          700: '#20683f',
          800: '#1f5336',
          900: '#1b442e',
          950: '#0b261a',
        },
        earth: {
          50: '#faf5f0',
          100: '#f2e7da',
          200: '#e5d0b7',
          300: '#d4b48e',
          400: '#c69a6e',
          500: '#A67C52', // Earthy brown (main)
          600: '#a77444',
          700: '#8a593a',
          800: '#724933',
          900: '#5f3d2e',
          950: '#331f17',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
};