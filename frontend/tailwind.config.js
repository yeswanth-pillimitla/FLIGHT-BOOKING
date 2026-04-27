/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E3A8A',
          deep: '#1E3A8A',
          medium: '#3B82F6',
        },
        secondary: '#3B82F6',
        accent: '#F97316',
        surface: '#F3F4F6',
        dark: '#111827',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
