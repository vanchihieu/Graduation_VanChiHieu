/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['"Montserrat"', 'system-ui', 'sans-serif'],
        serif: ['"Montserrat"', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        navy: {
          950: '#0A1222',
          900: '#0F1B33',
          800: '#162847',
          700: '#1F365D',
        },
        oxford: {
          950: '#0A1222',
          900: '#101D35',
          800: '#182B4D',
          700: '#223B66',
          600: '#2E4D7D',
        },
        parchment: {
          50: '#FAF8F3',
          100: '#F3EFE6',
          200: '#E8E0D0',
          300: '#D6C9AE',
        },
        gold: {
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#EAB308',
          500: '#CA8A04',
          600: '#A16207',
        },
        crimson: {
          600: '#BE123C',
          700: '#9F1239',
        },
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
