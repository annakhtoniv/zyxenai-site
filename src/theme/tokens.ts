/**
 * THEME TOKENS
 * The single place that controls the look of the site.
 * Change a value here and it updates everywhere (Tailwind classes and the 3D scene).
 */
export const tokens = {
  colors: {
    canvas: '#05060A', // page background
    surface: '#0C0F17', // cards and panels
    line: 'rgba(255, 255, 255, 0.09)', // 1px hairline borders
    ink: '#EEF1F8', // main text
    muted: '#969DB3', // secondary text
    cyan: '#22E3FF', // primary accent
    violet: '#7B5CFF', // secondary accent
    amber: '#FFB547', // signal colour for status and highlights
  },
  /** One accent hue per product. Referenced by name from src/content/site.ts. */
  productAccents: {
    saffron: '#F2C230',
    indigo: '#5470FF',
    cyan: '#22E3FF',
    violet: '#7B5CFF',
    emerald: '#2EE6A0',
    amber: '#FF9F3D',
    rose: '#FF6B9A',
  },
  fonts: {
    display: ['"Space Grotesk Variable"', 'system-ui', 'sans-serif'],
    sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
    mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'monospace'],
  },
  radii: {
    card: '20px',
    pill: '999px',
  },
  layout: {
    pageWidth: '1240px',
  },
  /** Durations in seconds. */
  motion: {
    fast: 0.25,
    base: 0.7,
    slow: 1.2,
    stagger: 0.07,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
} as const

export type ProductAccent = keyof typeof tokens.productAccents
