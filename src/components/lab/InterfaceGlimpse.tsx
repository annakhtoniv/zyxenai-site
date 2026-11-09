import type { ReactNode } from 'react'
import { site, type Product, type ProductIcon } from '../../content/site'
import { accentStyle } from './accent'

/**
 * An abstract, partly redacted glimpse of each product's interface.
 * These are illustrations drawn in code with fictional data. They are not
 * screenshots, and they are hidden from screen readers as decoration.
 */

const g = site.lab.glimpse
const bar = 'h-1.5 rounded-full bg-white/15'
const panel = 'rounded-lg border border-line bg-white/[0.03] p-2.5'
const tag = 'truncate font-mono text-[0.58rem] uppercase tracking-[0.14em] text-muted'

/**
 * Callers pass `relative` or `absolute` in className to position the frame.
 */

/** A black redaction bar. */
function Redact({ w }: { w: string }) {
  return <span className="block h-2 rounded-sm bg-black ring-1 ring-white/10" style={{ width: w }} />
}

const mocks: Record<ProductIcon, () => ReactNode> = {
  // 40 day journey: a grid of days, a streak, and a cohort list.
  flame: () => (
    <div className="grid h-full grid-cols-[1.4fr_1fr] gap-2.5">
      <div className={panel}>
        <p className={tag}>{g.flame[0]}</p>
        <div className="mt-2.5 grid grid-cols-10 gap-1.5">
          {Array.from({ length: 40 }, (_, i) => (
            <span
              key={i}
              className={`aspect-square rounded-full ${i < 17 ? 'bg-accent' : 'bg-white/10'} ${i === 16 ? 'ring-2 ring-white/60' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <div className={panel}>
          <p className={tag}>{g.flame[1]}</p>
          <div className={`${bar} mt-2 w-4/5`} />
          <div className="bg-accent mt-1.5 h-1.5 w-1/2 rounded-full" />
        </div>
        <div className={`${panel} flex-1 space-y-2`}>
          <p className={tag}>{g.flame[2]}</p>
          {['70%', '55%', '82%'].map((w) => (
            <div key={w} className="flex items-center gap-2">
              <span className="bg-accent-soft h-4 w-4 shrink-0 rounded-full" />
              <Redact w={w} />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
  // Sleep audio: a waveform, a play control, a session list.
  moon: () => (
    <div className="flex h-full flex-col gap-2.5">
      <div className={`${panel} flex flex-1 items-center gap-3`}>
        <span className="bg-accent grid h-10 w-10 shrink-0 place-items-center rounded-full">
          <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-black" />
        </span>
        <div className="flex h-full flex-1 items-center gap-[3px]">
          {Array.from({ length: 44 }, (_, i) => (
            <span
              key={i}
              className={`w-full rounded-full ${i < 15 ? 'bg-accent' : 'bg-white/15'}`}
              style={{ height: `${18 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21)) * 70}%` }}
            />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2.5">
        {g.moon.map((label, i) => (
          <div key={label} className={panel}>
            <p className={tag}>{label}</p>
            <div className={`${bar} mt-2`} style={{ width: `${80 - i * 18}%` }} />
          </div>
        ))}
      </div>
    </div>
  ),
  // Project workspace: a board with a timeline beneath.
  compass: () => (
    <div className="flex h-full flex-col gap-2.5">
      <div className="grid flex-1 grid-cols-3 gap-2.5">
        {g.compass.slice(0, 3).map((label, col) => (
          <div key={label} className={`${panel} space-y-1.5`}>
            <p className={tag}>{label}</p>
            {Array.from({ length: 3 - col }, (_, i) => (
              <div key={i} className="rounded border border-line bg-white/[0.04] p-1.5">
                <div className={`${bar} w-4/5`} />
                <div className={`mt-1 h-1 w-1/3 rounded-full ${col === 1 ? 'bg-accent' : 'bg-white/10'}`} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={panel}>
        <p className={tag}>{g.compass[3]}</p>
        <div className="relative mt-2.5 h-1.5 rounded-full bg-white/10">
          <span className="bg-accent absolute inset-y-0 left-0 w-[58%] rounded-full" />
          {[0, 28, 58, 100].map((x) => (
            <span
              key={x}
              className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50 bg-canvas"
              style={{ left: `${x}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  // Factory: a pipeline of stages with an approval gate.
  gear: () => (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="flex items-center">
        {g.gear.map((label, i) => (
          <div key={label} className="flex min-w-0 flex-1 items-center">
            <div className={`${panel} min-w-0 flex-1 ${i === 3 ? 'border-accent' : ''}`}>
              <p className={tag}>{label}</p>
              <div className={`mt-2 h-1.5 rounded-full ${i < 3 ? 'bg-accent' : 'bg-white/15'}`} style={{ width: i < 2 ? '100%' : '55%' }} />
            </div>
            {i < 3 && <span className="h-px w-3 shrink-0 bg-white/30" />}
          </div>
        ))}
      </div>
      <div className={`${panel} space-y-2`}>
        {['92%', '64%', '78%'].map((w, i) => (
          <div key={w} className="flex items-center gap-2 font-mono text-[0.6rem] text-muted">
            <span className="text-accent">{'>'}</span>
            {i === 1 ? <Redact w={w} /> : <span className={bar} style={{ width: w }} />}
          </div>
        ))}
      </div>
    </div>
  ),
  // Lead pipeline: three stages and a conversation.
  funnel: () => (
    <div className="grid h-full grid-cols-[1.3fr_1fr] gap-2.5">
      <div className="grid grid-cols-3 gap-2">
        {g.funnel.map((label, col) => (
          <div key={label} className={`${panel} space-y-1.5`}>
            <p className={tag}>{label}</p>
            {Array.from({ length: 4 - col }, (_, i) => (
              <div key={i} className="flex items-center gap-1.5 rounded border border-line p-1.5">
                <span className={`h-2 w-2 shrink-0 rounded-full ${col === 2 ? 'bg-accent' : 'bg-white/20'}`} />
                <Redact w="70%" />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className={`${panel} flex flex-col justify-end gap-2`}>
        <span className="h-5 w-3/4 rounded-lg rounded-bl-none bg-white/10" />
        <span className="bg-accent-soft border-accent h-7 w-4/5 self-end rounded-lg rounded-br-none border" />
        <span className="h-5 w-1/2 rounded-lg rounded-bl-none bg-white/10" />
      </div>
    </div>
  ),
  // Mission control: one row per agent role, with a decision log.
  radar: () => (
    <div className="grid h-full grid-cols-[1fr_1fr] gap-2.5">
      <div className={`${panel} flex flex-col justify-between`}>
        {g.radar.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <span className={`h-2 w-2 shrink-0 rounded-full ${i < 3 ? 'bg-accent' : 'bg-white/20'}`} />
            <span className={`${tag} w-14`}>{label}</span>
            <span className="h-1.5 flex-1 rounded-full bg-white/10">
              <span className="bg-accent block h-full rounded-full" style={{ width: `${[100, 100, 60, 0, 0][i]}%` }} />
            </span>
          </div>
        ))}
      </div>
      <div className={`${panel} space-y-2`}>
        {['88%', '60%', '74%', '46%', '82%'].map((w, i) => (
          <div key={w} className="flex items-center gap-2 font-mono text-[0.6rem]">
            <span className="text-accent">{'>'}</span>
            {i % 2 ? <Redact w={w} /> : <span className={bar} style={{ width: w }} />}
          </div>
        ))}
      </div>
    </div>
  ),
  // Academy: a lesson list, a tutor conversation, a progress bar.
  book: () => (
    <div className="grid h-full grid-cols-[1fr_1.3fr] gap-2.5">
      <div className={`${panel} space-y-2`}>
        <p className={tag}>{g.book[0]}</p>
        {[true, true, false, false].map((done, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`h-3 w-3 shrink-0 rounded ${done ? 'bg-accent' : 'border border-white/25'}`} />
            <span className={bar} style={{ width: `${75 - i * 9}%` }} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2.5">
        <div className={`${panel} flex flex-1 flex-col justify-end gap-2`}>
          <p className={tag}>{g.book[1]}</p>
          <span className="h-5 w-2/3 self-end rounded-lg rounded-br-none bg-white/10" />
          <span className="bg-accent-soft border-accent h-9 w-5/6 rounded-lg rounded-bl-none border" />
        </div>
        <div className={panel}>
          <p className={tag}>{g.book[2]}</p>
          <div className="mt-2 h-1.5 rounded-full bg-white/10">
            <span className="bg-accent block h-full w-2/5 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  ),
}

export function InterfaceGlimpse({ product, className = '' }: { product: Product; className?: string }) {
  return (
    <div
      aria-hidden="true"
      style={accentStyle(product)}
      className={`glass border-accent flex flex-col overflow-hidden rounded-card ${className}`}
    >
      {/* Window bar */}
      <div className="flex items-center gap-1.5 border-b border-line px-3.5 py-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-white/15" />
        ))}
        <span className={`${tag} ml-2`}>
          {product.index} // {g.preview}
        </span>
        <span className="bg-accent ml-auto h-1.5 w-1.5 animate-[blink_1.4s_steps(1)_infinite] rounded-full" />
      </div>
      <div className="relative min-h-0 flex-1 p-3">
        {mocks[product.icon]()}
        {/* The lower part stays out of focus, under a classified strip. */}
        <div className="absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-canvas/90 to-transparent backdrop-blur-[5px]" />
        <div className="scanlines absolute inset-0" />
        <span className="label-mono border-accent text-accent absolute bottom-3 right-3 rounded border bg-canvas/80 px-2 py-1 !text-[0.6rem]">
          {g.classified}
        </span>
      </div>
    </div>
  )
}
