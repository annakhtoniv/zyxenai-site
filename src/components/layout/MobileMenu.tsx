import { useEffect, useRef } from 'react'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion'
import { mailto, site } from '../../content/site'
import { lockScroll } from '../../lib/scroll'
import { tokens } from '../../theme/tokens'
import { Button } from '../ui/Button'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/** Full-screen menu for small screens, with large links that arrive one by one. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    const opener = document.activeElement as HTMLElement | null
    panel.current?.querySelector<HTMLElement>('button')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab' || !panel.current) return
      // Keep keyboard focus inside the open menu.
      const items = [...panel.current.querySelectorAll<HTMLElement>('a, button')]
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      lockScroll(false)
      opener?.focus()
    }
  }, [open, onClose])

  const rise = reduced ? 0 : 28

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            ref={panel}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[60] flex flex-col bg-canvas px-6 pb-10 pt-5 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: tokens.motion.fast }}
          >
            <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0" />
            <div className="relative flex items-center justify-between">
              <span className="label-mono text-muted">{site.hero.label}</span>
              <button
                type="button"
                onClick={onClose}
                aria-label={site.nav.menuClose}
                className="relative h-11 w-11 shrink-0 rounded-full border border-line"
              >
                <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 rotate-45 bg-ink" />
                <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -rotate-45 bg-ink" />
              </button>
            </div>
            <ul className="relative mt-auto flex flex-col gap-2">
              {site.nav.links.map((link, i) => (
                <li key={link.href} className="overflow-hidden pb-1">
                  <m.a
                    href={link.href}
                    onClick={onClose}
                    className="flex items-baseline gap-4 pb-3 pt-2 font-display text-5xl font-semibold tracking-tight"
                    initial={{ opacity: 0, y: rise }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: tokens.motion.base,
                      ease: tokens.motion.ease,
                      delay: 0.08 + i * tokens.motion.stagger,
                    }}
                  >
                    <span className="label-mono text-brand">0{i + 1}</span>
                    {link.label}
                  </m.a>
                </li>
              ))}
            </ul>
            <div className="relative mt-10">
              <Button href={mailto()} onClick={onClose} className="w-full">
                {site.nav.cta}
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
