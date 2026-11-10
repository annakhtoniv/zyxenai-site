import { useEffect, useRef } from 'react'
import { site } from '../../content/site'
import { gsap } from '../../lib/scroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { SectionLabel } from '../ui/SectionLabel'

/** Three statements that light up word by word as the visitor scrolls. */
export function Manifesto() {
  const root = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !root.current) return
    const words = root.current.querySelectorAll('[data-word]')
    const tween = gsap.fromTo(
      words,
      { opacity: 0.48 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.4 },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <section ref={root} id="vision" aria-label={site.vision.label} className="mx-auto max-w-page scroll-mt-24 px-5 py-28 sm:px-8 lg:py-40">
      <SectionLabel>{site.vision.label}</SectionLabel>
      <div className="space-y-10 lg:space-y-14">
        {site.vision.statements.map((statement, i) => (
          <p
            key={statement}
            className={`max-w-5xl font-display text-[clamp(1.9rem,5.2vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.035em] ${
              i === site.vision.statements.length - 1 ? 'text-brand' : ''
            }`}
          >
            {statement.split(' ').map((word, j) => (
              <span key={j} data-word>
                {word}{' '}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  )
}
