import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { site } from '../../content/site'
import { ScrollTrigger, scrollToY } from '../../lib/scroll'
import { useInView } from '../../hooks/useInView'
import { accentStyle } from './accent'
import { InterfaceGlimpse } from './InterfaceGlimpse'
import { ProductDetails } from './ProductDetails'

const LabIconScene = lazy(() => import('./LabIconScene'))

const products = site.products
const count = products.length

/**
 * Desktop centrepiece. The section stays pinned to the screen while the
 * visitor scrolls through the seven products one at a time.
 */
export function LabShowcase() {
  const track = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const [nearRef, near] = useInView<HTMLDivElement>({ once: false, margin: '40% 0px 40% 0px' })
  const [sceneWanted, setSceneWanted] = useState(false)

  useEffect(() => {
    if (near) setSceneWanted(true)
  }, [near])

  // Turn scroll position inside the tall track into "which product is showing".
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: track.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => setActive(Math.min(count - 1, Math.floor(self.progress * count))),
    })
    return () => trigger.kill()
  }, [])

  function goTo(index: number) {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const span = el.offsetHeight - window.innerHeight
    scrollToY(top + (span * (index + 0.5)) / count)
  }

  return (
    <div ref={track} style={{ height: `${count * 90}vh` }} className="relative">
      <div ref={nearRef} className="sticky top-0 flex h-screen flex-col overflow-hidden" style={accentStyle(products[active])}>
        {/* Background hue shifts with the product. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {products.map((p, i) => (
            <div
              key={p.id}
              style={accentStyle(p)}
              className={`absolute inset-0 bg-[radial-gradient(55%_60%_at_74%_45%,color-mix(in_srgb,var(--accent)_17%,transparent),transparent_70%)] transition-opacity duration-700 ${
                i === active ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
        </div>

        <div className="relative mx-auto grid min-h-0 w-full max-w-page flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-10 px-8 pt-20 xl:gap-16">
          {/* Left: index number and details. All seven are stacked; one is visible. */}
          <div className="relative h-[72vh] max-h-[640px]">
            {products.map((p, i) => {
              const state = i === active ? 'on' : i < active ? 'before' : 'after'
              return (
                <article
                  key={p.id}
                  style={accentStyle(p)}
                  aria-hidden={state !== 'on' || undefined}
                  className={`absolute inset-0 flex flex-col justify-center transition-[opacity,transform] duration-500 ease-out ${
                    state === 'on'
                      ? 'opacity-100'
                      : `pointer-events-none opacity-0 ${state === 'before' ? '-translate-y-8' : 'translate-y-8'}`
                  }`}
                >
                  <p aria-hidden="true" className="outline-number font-mono text-[clamp(4.5rem,9vw,9rem)] font-bold leading-none">
                    {p.index}
                  </p>
                  <div className="mt-4">
                    <ProductDetails product={p} play={state === 'on'} onLinkFocus={() => i !== active && goTo(i)} />
                  </div>
                </article>
              )
            })}
          </div>

          {/* Right: floating 3D icon above the interface glimpse. */}
          <div className="flex h-[76vh] max-h-[700px] min-h-0 flex-col">
            <div aria-hidden="true" className="relative h-[42%] shrink-0">
              {sceneWanted && (
                <Suspense fallback={null}>
                  <LabIconScene activeIndex={active} running={near} />
                </Suspense>
              )}
            </div>
            <div className="relative min-h-0 flex-1">
              {products.map((p, i) => (
                <InterfaceGlimpse
                  key={p.id}
                  product={p}
                  className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-out ${
                    i === active ? 'opacity-100' : 'scale-[0.97] opacity-0'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Rail: shows position and lets the visitor jump to any product. */}
        <nav aria-label={site.lab.label} className="relative mx-auto flex w-full max-w-page items-center gap-2 px-8 pb-6 pt-4">
          {products.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`${site.lab.railLabel} ${p.name}`}
              aria-current={i === active || undefined}
              className="group flex flex-1 flex-col gap-2 py-2 text-left"
            >
              <span className="relative block h-px w-full bg-line">
                <span
                  className={`bg-accent absolute inset-0 origin-left transition-transform duration-500 ${
                    i <= active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </span>
              <span className={`label-mono transition-opacity ${i === active ? 'text-accent' : 'text-muted group-hover:text-ink'}`}>
                {p.index}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
