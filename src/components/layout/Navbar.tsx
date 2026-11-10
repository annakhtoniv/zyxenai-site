import { useState } from 'react'
import { mailto, site } from '../../content/site'
import { Button } from '../ui/Button'
import { Wordmark } from '../ui/Wordmark'
import { MobileMenu } from './MobileMenu'

/** White bar with a soft blur and a hairline underneath. */
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line">
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-canvas/80 backdrop-blur-md" />
        <nav aria-label="Primary" className="relative mx-auto flex max-w-page items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="/#top" className="shrink-0 py-1" aria-label={`${site.brand} home`}>
            <Wordmark className="h-4 w-auto text-ink" decorative />
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {site.nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-pill px-3.5 py-2 text-sm font-medium text-ink hover:text-brand"
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
