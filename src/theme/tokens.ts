/**
 * THEME TOKENS
 * The single place that controls the look of the site.
 * Change a value here and it updates everywhere (Tailwind classes and the 3D scene).
 */
export const tokens = {
  colors: {
    // "Electric Indigo & Glacier" light theme.
    canvas: '#FFFFFF', // page background
    surface: '#F3F4F6', // Glacier Ice: raised panels and quiet bands
    line: '#E5E7EB', // 1px borders and dividers
    ink: '#111827', // Ink Black: headings and body text
    muted: '#4B5563', // secondary text
    faint: '#9CA3AF', // decorative strokes only, too light for body text
    brand: '#4F46E5', // Electric Indigo: buttons, links, focus rings
    brandHover: '#4338CA', // button hover
    tint: '#EEF2FF', // light indigo behind icons
    violet: '#7C3AED', // Deep Violet: tags, step numbers, highlights
  },
  shadows: {
    card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
  },
  /** One accent hue per product. Referenced by name from src/content/site.ts. */
  productAccents: {
    // Deep enough to read as text on white (WCAG AA).
    saffron: '#B45309',
    indigo: '#4F46E5',
    cyan: '#0E7490',
    violet: '#7C3AED',
    emerald: '#047857',
    amber: '#C2410C',
    rose: '#BE185D',
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
