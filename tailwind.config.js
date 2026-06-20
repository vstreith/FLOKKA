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
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          black: '#160f29',
          white: '#FCFBFF',
          gray: '#f4f2fb',
          'gray-dark': '#e4e0f1',
          'gray-medium': '#c5bedd',
          'gray-text': '#6b6783',
          // Vibrant accent palette
          violet: '#7c3aed',
          'violet-dark': '#5b21b6',
          indigo: '#4f46e5',
          fuchsia: '#d946ef',
          pink: '#ec4899',
          coral: '#fb7185',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          teal: '#14b8a6',
          lime: '#84cc16',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 45%, #ec4899 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, #eef2ff 0%, #f5f0ff 45%, #fdf2f8 100%)',
        'brand-gradient-warm': 'linear-gradient(135deg, #f59e0b 0%, #ec4899 60%, #8b5cf6 100%)',
        'brand-gradient-cool': 'linear-gradient(135deg, #06b6d4 0%, #6366f1 55%, #8b5cf6 100%)',
        'dark-gradient': 'linear-gradient(150deg, #1e1248 0%, #2d1b69 40%, #160f29 100%)',
      },
      letterSpacing: {
        'widest-2': '0.25em',
        'widest-3': '0.35em',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(99, 102, 241, 0.18)',
        card: '0 18px 50px -20px rgba(91, 33, 182, 0.28)',
        glow: '0 0 0 1px rgba(124, 58, 237, 0.12), 0 20px 60px -18px rgba(124, 58, 237, 0.45)',
        'glow-pink': '0 18px 55px -18px rgba(236, 72, 153, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in': 'slideIn 0.3s ease-out',
        blob: 'blob 18s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -40px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        gradientX: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
