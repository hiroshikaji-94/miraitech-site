import type { Config } from 'tailwindcss'

const rgb = (name: string) => `rgb(var(--color-${name}) / <alpha-value>)`

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
      colors: {
        background:     rgb('background'),
        muted:          rgb('muted'),
        surface:        rgb('surface'),
        'surface-high': rgb('surface-high'),
        foreground:     rgb('foreground'),
        'foreground-2': rgb('foreground-2'),
        'foreground-3': rgb('foreground-3'),
        border:         rgb('border'),
        accent:         rgb('accent'),
        'accent-fg':    rgb('accent-fg'),
        'on-accent':    rgb('on-accent'),
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        site: '80rem',
      },
      borderRadius: {
        btn:  '0.625rem',
        card: '1.25rem',
      },
    },
  },
  plugins: [],
}

export default config
