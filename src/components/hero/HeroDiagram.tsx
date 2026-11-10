import { m } from 'framer-motion'
import { site } from '../../content/site'
import { tokens } from '../../theme/tokens'
import { Monogram } from '../ui/Monogram'

const tag = 'label-mono inline-flex rounded-pill bg-violet/[0.08] px-2.5 py-1 !text-[0.62rem] text-violet'
const bar = 'block h-1.5 rounded-full bg-ink/10'
const node = 'absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-canvas bg-brand'

/** Thin indigo connector lines between two rows of cards. */
function Connector({ fan = false }: { fan?: boolean }) {
  return (
    <div className="relative h-12">
      <svg viewBox="0 0 300 48" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none">
        <path
          d={fan ? 'M150 0V48M150 24H50V48M150 24H250V48' : 'M150 0V48'}
          stroke={tokens.colors.brand}
          strokeOpacity={0.45}
          strokeWidth={1.5}
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span className={`${node} left-1/2 top-1/2 animate-[pulse-soft_2.4s_ease-in-out_infinite]`} />
    </div>
  )
}

/**
 * The hero picture: a light architecture diagram.
 * Manual work goes in, agents work under human approval, running systems come out.
 * Decorative only; the same idea is stated in the hero text. Labels live in src/content/site.ts.
 */
export function HeroDiagram({ delay, reduced }: { delay: number; reduced: boolean }) {
  const d = site.hero.diagram
  const { base, ease, stagger } = tokens.motion
  const rise = (i: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: base, ease, delay: delay + i * stagger * 2 },
  })

  return (
    <div aria-hidden="true" className="mx-auto w-full max-w-[460px]">
      {/* Input */}
      <m.div {...rise(0)} className="mx-auto w-[62%] rounded-2xl border border-line bg-surface p-4">
        <span className={tag}>{d.input.tag}</span>
        <p className="mt-3 font-display text-base font-semibold text-ink">{d.input.title}</p>
        <span className={`${bar} mt-3 w-full`} />
        <span className={`${bar} mt-2 w-2/3`} />
      </m.div>

      <m.div {...rise(1)}>
        <Connector />
      </m.div>

      {/* Core */}
      <m.div {...rise(2)} className="card rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <Monogram className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <p className="font-display text-lg font-semibold leading-tight text-ink">{d.core.title}</p>
            <span className={`${tag} mt-1.5`}>{d.core.tag}</span>
          </div>
        </div>
        <ol className="mt-4 grid grid-cols-3 gap-2">
          {d.core.steps.map((step, i) => (
            <li key={step} className="rounded-xl border border-line bg-surface px-3 py-2.5">
              <span className="font-mono text-[0.65rem] text-brand">0{i + 1}</span>
              <p className="mt-0.5 text-sm font-medium text-ink">{step}</p>
            </li>
          ))}
        </ol>
      </m.div>

      <m.div {...rise(3)}>
        <Connector fan />
      </m.div>

      {/* Outputs */}
      <div className="grid grid-cols-3 gap-3">
        {d.outputs.map((label, i) => (
          <m.div key={label} {...rise(4 + i)} className="rounded-2xl border border-line bg-surface p-3.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-tint">
              <span className="h-2.5 w-2.5 rounded-full bg-brand" />
            </span>
            <p className="mt-3 text-sm font-semibold text-ink">{label}</p>
            <span className={`${bar} mt-2.5 w-full`} />
            <span className={`${bar} mt-1.5 w-1/2`} />
          </m.div>
        ))}
      </div>
    </div>
  )
}
