import { useEffect, useRef, useState } from 'react'

/** Reports when an element is on screen. With once=true it stays true after the first sighting. */
export function useInView<T extends Element>({ once = true, margin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting && once) observer.disconnect()
      },
      { rootMargin: margin },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [once, margin])
  return [ref, inView] as const
}
