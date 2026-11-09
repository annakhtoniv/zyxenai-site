import { useEffect, useRef } from 'react'
import { site } from '../../content/site'
import { gsap } from '../../lib/scroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { CopyAddress } from '../ui/CopyAddress'
import { Wordmark } from '../ui/Wordmark'

const linkClass = 'text-sm text-muted transition-opacity hover:text-ink'

export function Footer() {
  const fill = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // The giant wordmark fills with a gradient as the visitor reaches the bottom.
  useEffect(() => {
    if (reduced || !fill.current) return
    const tween = gsap.fromTo(
      fill.current,
      { opacity: 0 },
      {
        opacity: 1,
        ease: 'none',
        scrollTrigger: { trigger: fill.current, start: 'top 95%', end: 'bottom bottom', scrub: 0.4 },
      },
    )
    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [reduced])

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div className="mx-auto grid max-w-page gap-12 px-5 pb-14 pt-16 sm:grid-cols-3 sm:px-8">
        <nav aria-label={site.footer.columns.products}>
          <h2 className="label-mono mb-5 text-muted">{site.footer.columns.products}</h2>
          <ul className="space-y-2.5">
            {site.products.map((p) => (
              <li key={p.id}>
                <a href={`/#${p.id}`} className={linkClass}>
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={site.footer.columns.company}>
          <h2 className="label-mono mb-5 text-muted">{site.footer.columns.company}</h2>
          <ul className="space-y-2.5">
            {site.footer.companyLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={linkClass}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="label-mono mb-5 text-muted">{site.footer.columns.contact}</h2>
          <CopyAddress linked className="mb-4" />
          <ul className="space-y-2.5">
            <li>
              <a href={site.footer.social.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {site.footer.social.label}
                <span className="sr-only"> {site.footer.newTabNote}</span>
                <span aria-hidden="true"> ↗</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto flex max-w-page flex-wrap justify-between gap-2 px-5 font-mono text-xs text-muted sm:px-8">
        <span>
          © {new Date().getFullYear()} {site.brand}
        </span>
        <span>{site.footer.builtIn}</span>
      </div>

      <div className="relative mx-auto mt-6 max-w-[1800px] px-3 pb-4" aria-hidden="true">
        <Wordmark variant="outline" decorative className="block h-auto w-full" />
        <div ref={fill} className="absolute inset-x-3 top-0">
          <Wordmark variant="gradient" decorative className="block h-auto w-full" />
        </div>
      </div>
    </footer>
  )
}
