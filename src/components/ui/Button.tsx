import { useRef, type AnchorHTMLAttributes } from 'react'
import { useMagnetic } from '../../hooks/useMagnetic'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost'
  size?: 'sm' | 'md'
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-pill font-medium whitespace-nowrap transition-[transform,opacity] duration-200 ease-out will-change-transform'
const variants = {
  primary: 'bg-brand text-canvas hover:bg-brandHover',
  ghost: 'border border-line bg-canvas text-ink hover:bg-surface',
}
const sizes = { sm: 'px-4 py-2 text-sm', md: 'px-6 py-3.5 text-base' }

/** A link styled as a button, with a gentle magnetic pull on hover. */
export function Button({ variant = 'primary', size = 'md', className = '', ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  useMagnetic(ref)
  return <a ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest} />
}
