/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f8fafc',
        'surface-light': '#ffffff',
        primary: {
          DEFAULT: '#0ea5e9',
          hover: '#0284c7',
        },
        accent: {
          DEFAULT: '#e11d48',
          hover: '#be123c',
        },
        secondary: {
          DEFAULT: '#8b5cf6',
        },
        text: {
          main: '#0f172a',
          muted: '#64748b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px 0 rgba(0, 240, 255, 0.4)',
        'glow-accent': '0 0 20px 0 rgba(255, 0, 85, 0.4)',
        'glow-secondary': '0 0 20px 0 rgba(157, 0, 255, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'linear-gradient(to right, #00f0ff, #9d00ff)',
      }
    },
  },
  plugins: [],
}
