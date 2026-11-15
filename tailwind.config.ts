import type { Config } from 'tailwindcss'

/** Tailwind theme values point at the CSS custom properties in assets/css/main.css. Define tokens there, once. */
export default <Partial<Config>>{
  content: ['./components/**/*.vue', './layouts/**/*.vue', './pages/**/*.vue', './app.vue', './content/**/*.ts'],
  theme: {
    extend: {
      colors: {
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        raised: 'rgb(var(--c-raised) / <alpha-value>)',
        line: 'rgb(var(--c-line) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)',
        lit: 'rgb(var(--c-lit) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        'accent-ink': 'rgb(var(--c-accent-ink) / <alpha-value>)',
        danger: 'rgb(var(--c-danger) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
      maxWidth: { page: 'var(--page-max)' },
      height: { svh: '100svh' },
      minHeight: { svh: '100svh' },
    },
  },
}
