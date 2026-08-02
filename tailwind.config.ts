import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Deep near-black, not #000 — keeps text edges soft on OLED panels.
        ink: {
          DEFAULT: '#0b0e13',
          raised: '#11151c',
          border: '#1e2530',
        },
        accent: {
          DEFAULT: '#5eead4',
          strong: '#2dd4bf',
          dim: '#0f2f2c',
        },
        fg: {
          DEFAULT: '#e6e9ef',
          muted: '#9aa4b2',
          // Deliberately low-emphasis, but still >=4.5:1 against both `ink` and
          // `ink.raised` so small text (dates, citations, tags) passes WCAG AA.
          faint: '#7a8494',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        prose: '68ch',
      },
    },
  },
  plugins: [],
};

export default config;
