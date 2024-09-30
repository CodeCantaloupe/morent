/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      darkMode: 'class',
      screens: {
        xs: '320px',
      },
      fontFamily: {
        'plus-jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        primaryWhite: {
          100: '#e6e6e6',
          200: '#c0c0c0',
          300: '#a0a0a0',
          400: '#808080',
          500: '#666666',
          600: '#4d4d4d',
          700: '#333333',
          800: '#1a1a1a',
          900: '#000000',
        },

        primaryBlue: {
          100: "#E6F0FF",
          200: "#C0D9FF",
          300: "#9CC2FF",
          400: "#68ABFF",
          500: "#3563E9",
          600: "#1E4DB7",
          700: "#193E8C",
          800: "#122E62",
          900: "#0B1D3A",
        }
      },
    },
  },
  plugins: [],
}

