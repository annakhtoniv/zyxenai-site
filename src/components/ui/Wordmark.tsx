import { useId } from 'react'
import { site } from '../../content/site'
import { tokens } from '../../theme/tokens'

/**
 * THE LOGO. To swap in a real logo later, replace the SVG in this one file.
 * (The browser tab icon is separate: public/favicon.svg.)
 *
 * variant "default": ink letters with the accent "AI".
 * variant "outline" and "gradient": used layered in the footer.
 */
export function Wordmark({
  variant = 'default',
  className = '',
  decorative = false,
}: {
  variant?: 'default' | 'outline' | 'gradient'
  className?: string
  decorative?: boolean
}) {
  const id = useId()
  const { main, accent } = site.wordmark
  const common = {
    x: 0,
    y: 86,
    textLength: 480,
    lengthAdjust: 'spacingAndGlyphs' as const,
    fontFamily: tokens.fonts.display.join(','),
    fontWeight: 700,
    fontSize: 118,
  }
  return (
    <svg
      viewBox="0 0 480 90"
      className={className}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : site.brand}
      aria-hidden={decorative || undefined}
    >
      {variant === 'gradient' && (
        <defs>
          <linearGradient id={id} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={tokens.colors.ink} />
            <stop offset="0.55" stopColor={tokens.colors.brand} />
            <stop offset="1" stopColor={tokens.colors.violet} />
          </linearGradient>
        </defs>
      )}
      {variant === 'default' && (
        <text {...common} fill="currentColor">
          {main}
          <tspan fill={tokens.colors.brand}>{accent}</tspan>
        </text>
      )}
      {variant === 'outline' && (
        <text {...common} fill="none" stroke={tokens.colors.faint} strokeWidth={0.6}>
          {main + accent}
        </text>
      )}
      {variant === 'gradient' && (
        <text {...common} fill={`url(#${id})`}>
          {main + accent}
        </text>
      )}
    </svg>
  )
}
