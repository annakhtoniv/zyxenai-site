import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../../hooks/useInView'
import { tokens } from '../../theme/tokens'

/** Fades and slides its children up the first time they scroll into view. */
export function Reveal({
  children,
  order = 0,
  className = '',
  style,
}: {
  children: ReactNode
  /** Position in a group, used to stagger the arrival. */
  order?: number
  className?: string
  style?: CSSProperties
}) {
  const [ref, inView] = useInView<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
        inView ? 'opacity-100' : 'translate-y-6 opacity-0 motion-reduce:translate-y-0'
      } ${className}`}
      style={{ transitionDelay: `${order * tokens.motion.stagger}s`, ...style }}
    >
      {children}
    </div>
  )
}
