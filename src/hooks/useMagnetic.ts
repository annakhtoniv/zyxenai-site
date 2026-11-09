import { useEffect, type RefObject } from 'react'
import { useReducedMotion } from './useReducedMotion'

/** Pulls an element slightly toward the pointer while it hovers. Mouse only. */
export function useMagnetic(ref: RefObject<HTMLElement | null>, strength = 0.25): void {
  const reduced = useReducedMotion()
  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) * strength
      const y = (e.clientY - (r.top + r.height / 2)) * strength
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }
    const reset = () => (el.style.transform = '')
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', reset)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', reset)
      reset()
    }
  }, [ref, strength, reduced])
}
