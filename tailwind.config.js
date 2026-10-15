/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          navy: '#0a192f',
          dark: '#0f172a',
          slate: '#1e293b',
          muted: '#334155',
          orange: '#ea580c',
          orangeHover: '#c2410c',
          orangeLight: '#ffedd5',
          accent: '#f97316',
          border: '#e2e8f0',
          card: '#ffffff',
          surface: '#f8fafc',
          header: '#111827'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
