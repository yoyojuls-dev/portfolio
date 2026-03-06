/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        bg: '#0d0d12',
        surface: '#13131a',
        card: '#1a1a24',
        border: '#2a2a3a',
        accent: '#9d5cff',
        'accent-dim': '#6b3dbf',
        cyan: '#00e5ff',
        pink: '#ff3d8a',
        text: '#e8e8f0',
        muted: '#6b6b80',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slideUp 0.6s ease forwards',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          from: { boxShadow: '0 0 10px #9d5cff33' },
          to: { boxShadow: '0 0 30px #9d5cff88, 0 0 60px #9d5cff33' },
        },
      },
    },
  },
  plugins: [],
}
