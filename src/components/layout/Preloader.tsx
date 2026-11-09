import { useEffect, useState } from 'react'
import { site } from '../../content/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Monogram } from '../ui/Monogram'
import { Wordmark } from '../ui/Wordmark'

/**
 * Short boot sequence (under 1.5 seconds) that wipes away to reveal the hero.
 * Purely decorative: it never blocks clicks and is skipped for reduced motion.
 */
export function Preloader() {
  const reduced = useReducedMotion()
  const [done, setDone] = useState(false)
  useEffect(() => {
    const timer = window.setTimeout(() => setDone(true), 1500)
    return () => window.clearTimeout(timer)
  }, [])
  if (reduced || done) return null
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] grid place-items-center bg-canvas animate-[wipe_0.45s_cubic-bezier(0.7,0,0.2,1)_1s_forwards]"
    >
      <div className="absolute animate-[bootout_0.2s_ease-out_0.55s_forwards]">
        <Monogram className="mb-5 h-9 w-9" />
        {site.preloader.map((line, i) => (
          <p
            key={line}
            className="label-mono text-muted opacity-0 animate-[fadein_0.15s_ease-out_forwards]"
            style={{ animationDelay: `${i * 0.16}s` }}
          >
            <span className="text-cyan">{'> '}</span>
            {line}
          </p>
        ))}
      </div>
      <Wordmark decorative className="h-8 w-auto text-ink opacity-0 animate-[fadein_0.25s_ease-out_0.7s_forwards]" />
    </div>
  )
}
