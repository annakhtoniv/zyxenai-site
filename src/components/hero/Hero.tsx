import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { mailto, site } from '../../content/site'
import { tokens } from '../../theme/tokens'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Button } from '../ui/Button'
import { CopyAddress } from '../ui/CopyAddress'

// The 3D scene is loaded separately so the text appears without waiting for it.
const HeroScene = lazy(() => import('./HeroScene'))

export function Hero() {
  const section = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const [sceneReady, setSceneReady] = useState(false)
  const [inView, setInView] = useState(true)

  // Load the 3D scene late so the text is never held up by it:
  // on large screens once the browser is idle, on phones at the first touch or scroll.
  // It is paused whenever the hero is off screen.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting))
    if (section.current) observer.observe(section.current)

    const start = () => setSceneReady(true)
    const events = ['pointerdown', 'touchstart', 'scroll', 'keydown'] as const
    let timer = 0
    if (window.matchMedia('(min-width: 768px) and (pointer: fine)').matches) {
      timer = window.setTimeout(start, 1600) // after the preloader has cleared
    } else {
      events.forEach((name) => window.addEventListener(name, start, { once: true, passive: true }))
    }
    return () => {
      observer.disconnect()
      window.clearTimeout(timer)
      events.forEach((name) => window.removeEventListener(name, start))
    }
  }, [])

  const words = site.hero.headline.split(' ')
  const { base, stagger, ease } = tokens.motion
  const after = 0.25 + words.length * stagger
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: base, ease, delay },
  })

  return (
    <section
      ref={section}
      id="top"
      className="relative isolate flex min-h-[calc(100svh-2.5rem)] flex-col overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Backdrop: a static glow shows first, then the 3D scene fades in on top. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_72%_42%,rgba(34,227,255,0.13),rgba(123,92,255,0.08)_45%,transparent_72%)]" />
        {sceneReady && (
          <Suspense fallback={null}>
            <HeroScene active={inView} reduced={reduced} />
          </Suspense>
        )}
        <div className="bg-grid absolute inset-0" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-canvas to-transparent" />
      </div>

      <LazyMotion features={domAnimation}>
        <div className="mx-auto flex w-full max-w-page flex-1 flex-col justify-center px-5 pb-24 pt-32 sm:px-8">
          <m.p className="label-mono mb-7 flex items-center gap-3 text-cyan" {...fade(0.1)}>
            <span aria-hidden="true" className="h-px w-8 bg-cyan" />
            {site.hero.label}
          </m.p>

          <h1
            id="hero-title"
            className="max-w-[13ch] font-display text-[clamp(2.9rem,9.2vw,8rem)] font-semibold leading-[0.95] tracking-[-0.045em]"
          >
            {/* Screen readers get the sentence once; the animated words are decorative. */}
            <span className="sr-only">{site.hero.headline}</span>
            <span aria-hidden="true">
              {words.map((word, i) => (
                <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom last:mr-0">
                  <m.span
                    className="inline-block will-change-transform"
                    initial={{ opacity: 0, y: reduced ? 0 : '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: base + 0.2, ease, delay: 0.2 + i * stagger }}
                  >
                    {word}
                  </m.span>
                </span>
              ))}
            </span>
          </h1>

          <m.p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl" {...fade(after)}>
            {site.hero.subline}
          </m.p>

          <m.div className="mt-10 flex flex-wrap items-center gap-3" {...fade(after + 0.1)}>
            <Button href={mailto()}>{site.hero.primaryCta}</Button>
            <Button href={site.hero.secondaryHref} variant="ghost">
              {site.hero.secondaryCta}
              <span aria-hidden="true">↓</span>
            </Button>
          </m.div>

          <m.div {...fade(after + 0.2)}>
            <CopyAddress lead={site.hero.addressLead} className="mt-6" />
          </m.div>
        </div>
      </LazyMotion>

      {/* Bottom rail: small technical labels and the scroll cue. */}
      <div className="label-mono mx-auto flex w-full max-w-page items-end justify-between gap-4 px-5 pb-6 text-muted sm:px-8">
        <ul className="hidden gap-6 sm:flex" aria-hidden="true">
          {site.hero.details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
        <span className="flex items-center gap-3 sm:ml-auto" aria-hidden="true">
          {site.hero.scrollCue}
          <span className="relative block h-9 w-px overflow-hidden bg-line">
            <span className="absolute inset-0 animate-[cue_1.8s_ease-in-out_infinite] bg-cyan" />
          </span>
        </span>
      </div>
    </section>
  )
}
