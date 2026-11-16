import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './providers/**/*.{js,ts,jsx,tsx}',
    './content/**/*.mdx',
  ],
  theme: {
    extend: {
      // ─── Colors via CSS variables ──────────────────────────────
      colors: {
        background:      'rgb(var(--color-background) / <alpha-value>)',
        surface:         'rgb(var(--color-surface) / <alpha-value>)',
        'surface-high':  'rgb(var(--color-surface-high) / <alpha-value>)',
        foreground:      'rgb(var(--color-foreground) / <alpha-value>)',
        'foreground-2':  'rgb(var(--color-foreground-2) / <alpha-value>)',
        'foreground-3':  'rgb(var(--color-foreground-3) / <alpha-value>)',
        border:          'rgb(var(--color-border) / <alpha-value>)',
        'accent-blue':   'rgb(var(--color-accent-blue) / <alpha-value>)',
        'accent-violet': 'rgb(var(--color-accent-violet) / <alpha-value>)',
        'accent-warm':   'rgb(var(--color-accent-warm) / <alpha-value>)',
      },

      // ─── Typography ────────────────────────────────────────────
      fontFamily: {
        sans:    ['var(--font-inter)',           'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)',   'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains-mono)',  'ui-monospace', 'monospace'],
      },

      // ─── Backgrounds ───────────────────────────────────────────
      backgroundImage: {
        'gradient-accent':
          'linear-gradient(135deg, rgb(var(--color-accent-blue)), rgb(var(--color-accent-warm)))',
        'gradient-accent-subtle':
          'linear-gradient(135deg, rgb(var(--color-accent-blue) / 0.12), rgb(var(--color-accent-warm) / 0.08))',
        'gradient-radial-blue':
          'radial-gradient(ellipse at center, rgb(var(--color-accent-blue) / 0.1) 0%, transparent 70%)',
        'gradient-radial-warm':
          'radial-gradient(ellipse at center, rgb(var(--color-accent-warm) / 0.06) 0%, transparent 70%)',
      },

      // ─── Shadows ───────────────────────────────────────────────
      boxShadow: {
        'glow-blue':   '0 0 30px rgb(59 130 246 / 0.1)',
        'glow-violet': '0 0 30px rgb(139 92 246 / 0.08)',
        'glow-warm':   '0 0 30px rgb(163 106 254 / 0.1)',
        'glow-accent': '0 0 60px rgb(59 130 246 / 0.06), 0 0 100px rgb(163 106 254 / 0.04)',
        card:          'var(--shadow-card)',
        'card-hover':  'var(--shadow-card-hover)',
      },

      // ─── Animations ────────────────────────────────────────────
      animation: {
        'marquee':    'marquee 35s linear infinite',
        'fade-in':    'fadeIn 0.4s ease-out both',
        'fade-up':    'fadeUp 0.5s ease-out both',
        'fade-up-sm': 'fadeUpSm 0.4s ease-out both',
        'scale-in':   'scaleIn 0.3s ease-out both',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUpSm: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to:   { opacity: '1', transform: 'scale(1)' },
        },
      },

      // ─── Misc ──────────────────────────────────────────────────
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [typography],
}

export default config
