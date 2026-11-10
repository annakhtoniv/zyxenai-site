import { useEffect, useRef, useState } from 'react'
import { site, type Product } from '../../content/site'
import { useInView } from '../../hooks/useInView'
import { accentStyle } from './accent'
import { InterfaceGlimpse } from './InterfaceGlimpse'
import { ProductDetails } from './ProductDetails'
import { ProductGlyph } from './ProductGlyph'

function Card({ product }: { product: Product }) {
  const [ref, seen] = useInView<HTMLElement>({ margin: '0px -30% 0px -30%' })
  return (
    <article
      ref={ref}
      style={accentStyle(product)}
      data-card
      className="card border-accent relative flex w-[86vw] max-w-[440px] shrink-0 snap-center flex-col overflow-hidden rounded-card p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(90%_50%_at_80%_0%,color-mix(in_srgb,var(--accent)_10%,transparent),transparent_70%)]"
      />
      <div className="relative flex items-start justify-between">
        <p aria-hidden="true" className="outline-number font-mono text-6xl font-bold leading-none">
          {product.index}
        </p>
        <ProductGlyph icon={product.icon} className="text-accent h-12 w-12" />
      </div>
      <div className="relative mt-5">
        <ProductDetails product={product} play={seen} size="sm" />
      </div>
      <InterfaceGlimpse product={product} className="relative mt-6 h-52" />
    </article>
  )
}

/** Phones and tablets: a deck of product cards the visitor swipes through sideways. */
export function LabCardStack() {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = scroller.current
    if (!el) return
    const onScroll = () => {
      const cards = [...el.querySelectorAll<HTMLElement>('[data-card]')]
      const middle = el.scrollLeft + el.clientWidth / 2
      const nearest = cards.reduce(
        (best, card, i) => {
          const d = Math.abs(card.offsetLeft + card.offsetWidth / 2 - middle)
          return d < best.d ? { i, d } : best
        },
        { i: 0, d: Infinity },
      )
      setActive(nearest.i)
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  function goTo(i: number) {
    const card = scroller.current?.querySelectorAll<HTMLElement>('[data-card]')[i]
    card?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }

  return (
    <div>
      <div
        ref={scroller}
        tabIndex={0}
        role="group"
        aria-label={site.lab.label}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-[7vw] pb-2"
      >
        {site.products.map((p) => (
          <Card key={p.id} product={p} />
        ))}
      </div>
      <div className="mt-5 flex items-center justify-center gap-1">
        {site.products.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`${site.lab.railLabel} ${p.name}`}
            aria-current={i === active || undefined}
            className="grid h-8 w-8 place-items-center"
          >
            <span className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ${i === active ? 'w-6 bg-brand' : 'w-1.5 bg-ink/25'}`} />
          </button>
        ))}
      </div>
      <p aria-hidden="true" className="label-mono mt-2 text-center text-muted">
        ← {site.lab.swipeHint} →
      </p>
    </div>
  )
}
