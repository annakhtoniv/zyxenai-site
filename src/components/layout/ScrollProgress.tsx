import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/scroll'

/** Thin line along the top edge that fills as the visitor scrolls. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const tween = gsap.to(ref.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: 0.3 },
    })
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-cyan to-violet"
    />
  )
}
