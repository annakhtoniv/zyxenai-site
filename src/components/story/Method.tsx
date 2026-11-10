import { useEffect, useRef } from 'react'
import { site } from '../../content/site'
import { gsap } from '../../lib/scroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

/** "How we build": four steps joined by a line that draws itself on scroll. */
export function Method() {
  const line = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !line.current) return
    const tween = gsap.fromTo(
      line.current,
      { scaleX: 0 },
      { scaleX: 1, ease: 'none', scrollTrigger: { trigger: line.current, start: 'top 85%', end: 'top 35%', scrub: 0.4 } },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <section id="method" aria-labelledby="method-title" className="mx-auto max-w-page scroll-mt-24 px-5 py-24 sm:px-8 lg:py-32">
      <SectionLabel>{site.method.label}</SectionLabel>
      <h2 id="method-title" className="sr-only">
        {site.method.label}
      </h2>
      <div className="relative mt-12">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px bg-line lg:block" />
        <span
          ref={line}
          aria-hidden="true"
          className="absolute inset-x-0 top-0 hidden h-px origin-left bg-gradient-to-r from-brand to-violet lg:block"
        />
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {site.method.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal order={i} className="relative lg:pt-10">
                <span aria-hidden="true" className="absolute -top-1 left-0 hidden h-2 w-2 rounded-full bg-brand lg:block" />
                <p aria-hidden="true" className="label-mono mb-4 inline-flex rounded-pill bg-violet/[0.08] px-3 py-1 text-violet">
                  0{i + 1}
                </p>
                <h3 className="font-display text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
