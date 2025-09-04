/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./about.html",
    "./services.html",
    "./contact.html"
  ],
  theme: {
    extend: {
      colors: {
        gold: '#C69E59',
        'gold-dark': '#a8844a',
        dark: '#0A0A0A',
        light: '#F8F8F8',
        primary: {
          50: '#FFF9E6',
          100: '#FFEFBF',
          200: '#FFE59A',
        },
      },
      boxShadow: {
        'gold': '0 4px 20px -5px rgba(198, 158, 89, 0.3)',
        'gold-lg': '0 10px 30px -10px rgba(198, 158, 89, 0.4)',
        'gold-xl': '0 20px 40px -15px rgba(198, 158, 89, 0.5)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'transform': 'transform',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'float 8s ease-in-out infinite reverse',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '50%': { transform: 'translateY(-20px) translateX(10px)' },
        },
      },
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive', 'hover', 'focus'],
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [
    function({ addVariant, e }) {
      addVariant('backdrop-blur', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`backdrop-blur${separator}${className}`)}`;
        });
      });
    },
  ],
}
