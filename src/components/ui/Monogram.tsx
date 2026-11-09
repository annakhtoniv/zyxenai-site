import { tokens } from '../../theme/tokens'

/** The "Z" mark. Used by the preloader. Keep in step with public/favicon.svg. */
export function Monogram({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={tokens.colors.surface} />
      <path
        d="M9 10h14L9 22h14"
        stroke={tokens.colors.cyan}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
