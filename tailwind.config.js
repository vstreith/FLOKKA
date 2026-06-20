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
          // Sober palette: dark navy + warm off-white (blanc cassé)
          black: '#15243B', // deep navy — primary text & buttons
          navy: '#1f3a5f',
          'navy-light': '#2d4a73',
          white: '#F6F4EC', // blanc cassé (warm off-white)
          gray: '#ECEAE0', // off-white surface
          'gray-dark': '#d9d5c8', // subtle borders
          'gray-medium': '#b7b2a3',
          'gray-text': '#5a6373', // muted slate body text
          // Legacy accent tokens remapped to the sober palette so any
          // remaining references stay on-brand (navy / light steel).
          violet: '#1f3a5f',
          'violet-dark': '#15243B',
          indigo: '#1f3a5f',
          fuchsia: '#1f3a5f',
          pink: '#9aa6bd',
          coral: '#9aa6bd',
          amber: '#9aa6bd',
          cyan: '#9aa6bd',
          teal: '#9aa6bd',
          lime: '#9aa6bd',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1f3a5f 0%, #15243B 100%)',
        'brand-gradient-soft': 'linear-gradient(135deg, #F1EFE6 0%, #E7E4D8 100%)',
        'brand-gradient-warm': 'linear-gradient(135deg, #1f3a5f 0%, #15243B 100%)',
        'brand-gradient-cool': 'linear-gradient(135deg, #1f3a5f 0%, #15243B 100%)',
        'dark-gradient': 'linear-gradient(150deg, #1f3a5f 0%, #15243B 60%, #101d31 100%)',
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
        soft: '0 10px 40px -16px rgba(21, 36, 59, 0.20)',
        card: '0 18px 50px -24px rgba(21, 36, 59, 0.30)',
        glow: '0 1px 2px rgba(21, 36, 59, 0.10), 0 18px 50px -22px rgba(21, 36, 59, 0.45)',
        'glow-pink': '0 18px 55px -22px rgba(21, 36, 59, 0.45)',
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
