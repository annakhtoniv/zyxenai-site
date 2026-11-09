import { productMailto, site, type Product } from '../../content/site'
import { ScrambleText } from '../ui/ScrambleText'
import { CodenameTag, StatusChip } from './StatusChip'

/**
 * The text side of a product: name, teaser, bullets, status, and the email link.
 * Shared by the pinned showcase, the mobile deck, and the reduced-motion list.
 */
export function ProductDetails({
  product,
  play,
  size = 'lg',
  onLinkFocus,
}: {
  product: Product
  /** Starts the scramble effect on the name. */
  play: boolean
  size?: 'lg' | 'sm'
  onLinkFocus?: () => void
}) {
  const lg = size === 'lg'
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <StatusChip status={product.status} />
        {product.codename && <CodenameTag label={site.lab.codenameTag} />}
      </div>
      <h3
        className={`mt-5 font-display font-semibold leading-[1.02] tracking-[-0.035em] ${
          lg ? 'text-[clamp(2.2rem,3.9vw,4rem)]' : 'text-3xl'
        } ${product.codename ? 'font-mono tracking-[0.02em]' : ''}`}
      >
        <ScrambleText text={product.name} play={play} />
      </h3>
      <p className={`mt-4 text-ink ${lg ? 'text-xl lg:text-2xl' : 'text-lg'} leading-snug`}>{product.teaser}</p>
      <ul className={`mt-6 space-y-2.5 text-muted ${lg ? 'text-base' : 'text-[0.95rem]'}`}>
        {product.bullets.map((b) => (
          <li key={b} className="flex gap-3">
            <span aria-hidden="true" className="bg-accent mt-[0.6em] h-1 w-3 shrink-0 rounded-full" />
            {b}
          </li>
        ))}
      </ul>
      <a
        href={productMailto(product)}
        onFocus={onLinkFocus}
        className="text-accent mt-7 inline-flex items-center gap-2 border-b border-current pb-1 font-medium transition-opacity hover:opacity-75"
      >
        {site.lab.lookInside}
        <span className="sr-only">: {product.name}</span>
        <span aria-hidden="true">→</span>
      </a>
    </div>
  )
}
