/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#0A0A0A',
          white: '#FFFFFF',
          gray: '#F5F5F5',
          'gray-dark': '#E8E8E8',
          'gray-medium': '#9CA3AF',
          'gray-text': '#6B7280',
        },
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.35em',
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-pause': 'marquee 30s linear infinite paused',
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}
