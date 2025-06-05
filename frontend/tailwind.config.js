/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#6366f1',
        background: '#fff',
        dark: '#111827',
        slate: '#374151',
        error: '#ef4444',
        hovergray: '#e5e7eb',
      },
      fontSize: {
        heading: '52px',
        subheading: '44px',
        normal: '28px',
      },
      spacing: {
        large: '24px',
        medium: '18px',
        small: '12px',
      },
      fontFamily: {
        poppins: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
}
