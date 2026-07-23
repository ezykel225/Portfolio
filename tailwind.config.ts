import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:        '#09090B',
        surface:   '#111113',
        surface2:  '#18181B',
        border:    '#27272A',
        purple:    '#7C3AED',
        'purple-l': '#A78BFA',
        green:     '#22C55E',
        amber:     '#FBBF24',
        blue:      '#60A5FA',
        text:      '#FAFAFA',
        muted:     '#71717A',
        muted2:    '#52525B',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm:   ['var(--font-dm)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        blink:      'blink 1.2s step-end infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        marquee:    'marquee 30s linear infinite',
      },
      keyframes: {
        blink:      { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
        'pulse-dot': { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.3' } },
        marquee:    { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
}

export default config
