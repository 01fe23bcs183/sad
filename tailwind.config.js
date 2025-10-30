/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5236FF',
          dark: '#2B1FC3'
        },
        accent: {
          DEFAULT: '#FF6F61',
          soft: '#FFD6CF'
        },
        surface: {
          DEFAULT: '#0A0A12',
          light: '#101020',
          card: '#16162A'
        }
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 45px rgba(82, 54, 255, 0.45)'
      }
    }
  },
  plugins: []
};
