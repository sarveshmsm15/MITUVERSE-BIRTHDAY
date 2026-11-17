/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FAF7F2',
          100: '#F3E9DF',
          200: '#EBDCCE',
          300: '#DEC5B1',
        },
        blush: {
          50: '#FAF0F2',
          100: '#F4DCE0',
          200: '#EABCC4',
          400: '#CE8B97',
        },
        peach: {
          50: '#FCF5F0',
          100: '#F8E0D1',
          200: '#EFC5AC',
        },
        powder: {
          50: '#F4F7FB',
          100: '#E8EEF5',
          200: '#CFDCED',
        },
        lavender: {
          50: '#F7F5FB',
          100: '#EEE9F6',
          200: '#D9CDEE',
        },
        ink: {
          DEFAULT: '#413B3B',
          muted: '#938681',
          light: '#BAAEAA',
        },
        rose: {
          accent: '#B87983',
          dark: '#965A64',
          light: '#D9A1AA',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"DM Sans"', 'Manrope', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif'],
        script: ['"Playfair Display"', 'cursive', 'serif']
      },
      animation: {
        'spin-slow': 'spin 30s linear infinite',
        'float-gentle': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}

