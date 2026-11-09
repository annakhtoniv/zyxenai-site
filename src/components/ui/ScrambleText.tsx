import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/#<>'

/** Shuffles characters, then locks them into place from left to right when `play` turns true. */
export function ScrambleText({ text, play, duration = 800 }: { text: string; play: boolean; duration?: number }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (!play || reduced) {
      setShown(text)
      return
    }
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const locked = Math.floor(((now - start) / duration) * text.length)
      if (locked >= text.length) {
        setShown(text)
        return
      }
      setShown(
        [...text]
          .map((ch, i) => (i < locked || ch === ' ' ? ch : glyphs[Math.floor(Math.random() * glyphs.length)]))
          .join(''),
      )
      frame = window.setTimeout(() => requestAnimationFrame(tick), 40)
    }
    requestAnimationFrame(tick)
    return () => window.clearTimeout(frame)
  }, [text, play, reduced, duration])

  // Screen readers get the real name once; the shuffling letters are decorative.
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown}</span>
    </>
  )
}
