import { useRef, type PointerEvent } from 'react'
import { productMailto, site, type Product } from '../../content/site'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from '../ui/Reveal'
import { accentStyle } from './accent'
import { ProductGlyph } from './ProductGlyph'
import { CodenameTag, StatusChip } from './StatusChip'

/** How many of the four columns each card spans on wide screens. */
const spans = ['lg:col-span-2', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-1', 'lg:col-span-2', 'lg:col-span-4']

function BentoCard({ product, wide }: { product: Product; wide: boolean }) {
  const card = useRef<HTMLElement>(null)
  const glow = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Cursor glow follows the pointer, and the card tilts slightly toward it.
  function onMove(e: PointerEvent) {
    if (reduced || e.pointerType !== 'mouse' || !card.current || !glow.current) return
    const r = card.current.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    glow.current.style.transform = `translate3d(${x - 160}px, ${y - 160}px, 0)`
    const rx = ((y / r.height - 0.5) * -5).toFixed(2)
    const ry = ((x / r.width - 0.5) * (wide ? 2 : 5)).toFixed(2)
    card.current.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`
  }
  function onLeave() {
    if (card.current) card.current.style.transform = ''
  }

  return (
    <article
      ref={card}
      id={product.id}
      style={accentStyle(product)}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="glass group relative flex h-full scroll-mt-28 flex-col overflow-hidden rounded-card p-6 transition-transform duration-300 ease-out will-change-transform"
    >
      <div
        ref={glow}
        aria-hidden="true"
        className="bg-accent pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20"
      />
      <div className="relative flex items-start justify-between gap-4">
        <span className="label-mono text-accent">{product.index}</span>
        <ProductGlyph icon={product.icon} className="text-accent h-9 w-9" />
      </div>
      <h3 className={`relative mt-8 font-display text-2xl font-semibold tracking-tight ${product.codename ? 'font-mono tracking-normal' : ''}`}>
        {product.name}
      </h3>
      <p className={`relative mt-2 text-muted ${wide ? 'max-w-xl' : ''}`}>{product.teaser}</p>
      <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-8">
        <StatusChip status={product.status} />
        {product.codename && <CodenameTag label={site.lab.codenameTag} />}
        <a
          href={productMailto(product)}
          className="text-accent ml-auto inline-flex items-center gap-1.5 text-sm font-medium hover:opacity-75"
        >
          {site.lab.lookInside}
          <span className="sr-only">: {product.name}</span>
          <span aria-hidden="true">→</span>
        </a>
      </div>
    </article>
  )
}

/** All seven products at a glance, after the showcase. */
export function BentoGrid() {
  return (
    <div className="mx-auto max-w-page px-5 sm:px-8">
      <p className="label-mono mb-6 flex items-center gap-3 text-muted">
        <span aria-hidden="true" className="h-px w-8 bg-line" />
        {site.lab.gridLabel}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.products.map((p, i) => (
          <Reveal key={p.id} order={i % 4} className={spans[i]}>
            <BentoCard product={p} wide={i === 6} />
          </Reveal>
        ))}
      </div>
    </div>
  )
}
