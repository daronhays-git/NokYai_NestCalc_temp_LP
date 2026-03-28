import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nok: {
          // Backgrounds
          deep: '#0f2920',
          forest: '#1a3a2a',
          medium: '#2d5a42',
          surface: 'rgba(255,255,255,0.08)',
          white: '#FFFFFF',

          // Text
          gold: '#F59E0B',
          heading: '#FFFFFF',
          body: '#FEF3C7',
          caption: '#D4C9A8',

          // Accents
          teal: '#0d9488',
          amber: '#f59e0b',
          red: '#dc2626',

          // Borders
          border: 'rgba(255,255,255,0.1)',
          'border-light': 'rgba(255,255,255,0.05)',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.05', fontWeight: '800' }],
        section: ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.15', fontWeight: '700' }],
        'card-title': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'gradient-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(40px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 6s ease infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        'slide-in-right': 'slide-in-right 0.5s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config
