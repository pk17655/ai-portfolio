/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Colors map to CSS variables that are injected at runtime from
      // src/config/theme.json (see src/utils/applyTheme.js). This lets you
      // recolor the entire site by editing theme.json only.
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        bgalt: 'rgb(var(--c-bg-alt) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        surfacealt: 'rgb(var(--c-surface-alt) / <alpha-value>)',
        borderc: 'rgb(var(--c-border) / <alpha-value>)',
        content: 'rgb(var(--c-text) / <alpha-value>)',
        muted: 'rgb(var(--c-text-muted) / <alpha-value>)',
        primary: 'rgb(var(--c-primary) / <alpha-value>)',
        secondary: 'rgb(var(--c-secondary) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 20px -2px rgb(var(--c-glow) / 0.55)',
        'glow-lg': '0 0 45px -5px rgb(var(--c-glow) / 0.5)',
        'glow-sm': '0 0 12px -2px rgb(var(--c-glow) / 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        scan: 'scan 3s linear infinite',
        blink: 'blink 1s step-end infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgb(var(--c-border) / 0.35) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--c-border) / 0.35) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
