import { site } from '../../content/site'
import { accentStyle } from './accent'
import { InterfaceGlimpse } from './InterfaceGlimpse'
import { ProductDetails } from './ProductDetails'
import { ProductGlyph } from './ProductGlyph'

/**
 * Reduced-motion version of the showcase for large screens:
 * the same seven products as a plain, still list. No pinning, no 3D.
 */
export function LabList() {
  return (
    <div className="mx-auto max-w-page space-y-6 px-8">
      {site.products.map((p) => (
        <article
          key={p.id}
          style={accentStyle(p)}
          className="glass border-accent grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-12 rounded-card p-10"
        >
          <div>
            <div className="mb-5 flex items-center gap-5">
              <p aria-hidden="true" className="outline-number font-mono text-7xl font-bold leading-none">
                {p.index}
              </p>
              <ProductGlyph icon={p.icon} className="text-accent h-14 w-14" />
            </div>
            <ProductDetails product={p} play={false} />
          </div>
          <InterfaceGlimpse product={p} className="relative h-80" />
        </article>
      ))}
    </div>
  )
}
