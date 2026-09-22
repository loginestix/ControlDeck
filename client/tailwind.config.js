/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        deck: {
          950: 'rgb(var(--deck-950) / <alpha-value>)',
          900: 'rgb(var(--deck-900) / <alpha-value>)',
          800: 'rgb(var(--deck-800) / <alpha-value>)',
          700: 'rgb(var(--deck-700) / <alpha-value>)',
          accent: 'rgb(var(--deck-accent) / <alpha-value>)',
          accent2: 'rgb(var(--deck-accent-2) / <alpha-value>)',
        },
      },
      boxShadow: {
        panel: '0 24px 80px rgba(0,0,0,.32)',
      },
    },
  },
  plugins: [],
};
