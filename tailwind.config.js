/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
         primary: { light: '#a0aec0', DEFAULT: '#4a5568', dark: '#2d3748' },
         secondary: { light: '#f6ad55', DEFAULT: '#ed8936', dark: '#dd6b20' },
         background: { light: '#1a1a1a', DEFAULT: '#0a0a0a' },
      },
      fontFamily: {
         sans: ['Inter', 'sans-serif'],
         mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}