import { useEffect, useRef } from 'react'
import { site } from '../../content/site'
import { gsap } from '../../lib/scroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** A strip of capability words that drifts sideways, faster while the page is scrolling. */
export function Marquee() {
  const track = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = track.current
    if (!el || reduced) return
    let offset = 0
    let lastY = window.scrollY
    const tick = (_: number, deltaMs: number) => {
      const half = el.scrollWidth / 2
      const scrolled = Math.abs(window.scrollY - lastY)
      lastY = window.scrollY
      offset = (offset + (deltaMs / 1000) * 40 + scrolled * 0.6) % half
      el.style.transform = `translate3d(${-offset}px, 0, 0)`
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [reduced])

  const words = site.marquee
  return (
    <div className="overflow-hidden border-y border-line py-5" role="presentation">
      <p className="sr-only">{words.join(', ')}</p>
      <div ref={track} aria-hidden="true" className="flex w-max will-change-transform">
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex shrink-0">
            {words.map((w) => (
              <span key={w} className="flex items-center font-display text-2xl font-medium tracking-tight text-muted sm:text-3xl">
                <span className="px-6">{w}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
