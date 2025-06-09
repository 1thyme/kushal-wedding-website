/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f3f8',
          100: '#d9e1ed',
          200: '#b3c3db',
          300: '#8da5c9',
          400: '#6687b7',
          500: '#4a6997',
          600: '#3b547a',
          700: '#2c3f5c',
          800: '#1e2a3f',
          900: '#0f1521',
        },
        pink: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#f9d0d9',
          300: '#f5a8b9',
          400: '#f07594',
          500: '#e54a73',
          600: '#d22957',
          700: '#b01d45',
          800: '#931b3c',
          900: '#7c1a37',
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'scale': 'scale 0.3s ease-in-out',
        'fade': 'fade 0.3s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        scale: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.05)' },
        },
        fade: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
      },
      gridTemplateRows: {
        'masonry': 'masonry',
      },
      gridAutoRows: {
        'masonry': 'masonry',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
} 