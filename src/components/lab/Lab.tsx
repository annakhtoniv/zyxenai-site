import { site } from '../../content/site'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from '../ui/Reveal'
import { BentoGrid } from './BentoGrid'
import { LabCardStack } from './LabCardStack'
import { LabList } from './LabList'
import { LabShowcase } from './LabShowcase'

/**
 * "The Lab": the product section.
 * Large screens get the pinned showcase, small screens a swipeable deck,
 * and visitors who ask for reduced motion get a still list.
 */
export function Lab() {
  const large = useMediaQuery('(min-width: 1024px) and (min-height: 620px)')
  const reduced = useReducedMotion()

  return (
    <section id="lab" aria-labelledby="lab-title" className="relative scroll-mt-24 pt-28">
      <Reveal className="mx-auto max-w-page px-5 pb-14 sm:px-8 lg:pb-4">
        <p className="label-mono mb-6 flex items-center gap-3 text-cyan">
          <span aria-hidden="true" className="h-px w-8 bg-cyan" />
          {site.lab.label}
        </p>
        <h2 id="lab-title" className="max-w-4xl font-display text-[clamp(2rem,5vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
          {site.lab.intro}
        </h2>
      </Reveal>

      {!large ? <LabCardStack /> : reduced ? <LabList /> : <LabShowcase />}

      <div className="pb-10 pt-24">
        <BentoGrid />
      </div>
    </section>
  )
}
