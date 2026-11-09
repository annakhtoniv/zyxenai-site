import type { Config } from 'tailwindcss'
import { tokens } from './src/theme/tokens'

// Tailwind reads every colour, font and radius from src/theme/tokens.ts.
// Re-skin the site there, not here.
export default {
  content: ['./index.html', './privacy/index.html', './terms/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: {
        display: [...tokens.fonts.display],
        sans: [...tokens.fonts.sans],
        mono: [...tokens.fonts.mono],
      },
      borderRadius: tokens.radii,
      maxWidth: { page: tokens.layout.pageWidth },
    },
  },
  plugins: [],
} satisfies Config
