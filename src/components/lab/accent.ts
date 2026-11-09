import type { CSSProperties } from 'react'
import type { Product } from '../../content/site'
import { tokens } from '../../theme/tokens'

/** The product's accent colour as a hex value. */
export function accentOf(product: Pick<Product, 'accent'>): string {
  return tokens.productAccents[product.accent]
}

/** Sets --accent on an element so everything inside can tint itself. */
export function accentStyle(product: Pick<Product, 'accent'>): CSSProperties {
  return { '--accent': accentOf(product) } as CSSProperties
}
