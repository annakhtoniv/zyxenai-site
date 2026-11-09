import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

/** Starts smooth scrolling and keeps GSAP's scroll animations in step with it. */
export function startSmoothScroll(): () => void {
  lenis = new Lenis({ anchors: true, lerp: 0.11 })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time: number) => lenis?.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return () => {
    gsap.ticker.remove(tick)
    lenis?.destroy()
    lenis = null
  }
}

/** Freezes page scrolling, for example while the mobile menu is open. */
export function lockScroll(locked: boolean): void {
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (locked) lenis?.stop()
  else lenis?.start()
}

/** Scrolls the page to a vertical position, smoothly when smooth scrolling is on. */
export function scrollToY(y: number): void {
  if (lenis) lenis.scrollTo(y)
  else window.scrollTo({ top: y })
}

export { gsap, ScrollTrigger }
