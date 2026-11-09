import { useEffect, useState } from 'react'
import { mailto, site } from '../../content/site'
import { Button } from '../ui/Button'
import { Wordmark } from '../ui/Wordmark'
import { MobileMenu } from './MobileMenu'

/** Floating glass pill. Condenses and gains blur once the page has scrolled. */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* h-0 so the bar floats over the hero instead of pushing it down. */}
      <header className="sticky top-3 z-40 h-0 px-3">
        <nav
          aria-label="Primary"
          className={`relative mx-auto flex max-w-4xl items-center justify-between gap-4 rounded-pill py-2 pl-5 pr-2 transition-transform duration-300 ease-out ${
            scrolled ? 'scale-[0.96]' : ''
          }`}
        >
          <span aria-hidden="true" className="glass absolute inset-0 -z-10 rounded-pill" />
          <span
            aria-hidden="true"
            className={`absolute inset-0 -z-10 rounded-pill bg-canvas/75 backdrop-blur-xl transition-opacity duration-300 ${
              scrolled ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <a href="/#top" className="shrink-0 py-1" aria-label={`${site.brand} home`}>
            <Wordmark className="h-4 w-auto text-ink" decorative />
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-pill px-3.5 py-2 text-sm text-muted transition-opacity hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Button href={mailto()} size="sm" className="hidden sm:inline-flex">
              {site.nav.cta}
            </Button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label={site.nav.menuOpen}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden"
            >
              <span aria-hidden="true" className="h-px w-5 bg-ink" />
              <span aria-hidden="true" className="h-px w-5 bg-ink" />
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
