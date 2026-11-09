/** Entry point for the small Privacy and Terms pages. Text comes from src/content/site.ts. */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './fonts'
import { site } from './content/site'
import { Footer } from './components/layout/Footer'
import { CopyAddress } from './components/ui/CopyAddress'
import { Wordmark } from './components/ui/Wordmark'

const root = document.getElementById('root')!
const page = root.dataset.page === 'terms' ? site.legal.terms : site.legal.privacy

createRoot(root).render(
  <StrictMode>
    <header className="mx-auto flex max-w-page items-center justify-between px-5 py-6 sm:px-8">
      <a href="/" aria-label={`${site.brand} home`}>
        <Wordmark className="h-4 w-auto text-ink" decorative />
      </a>
      <a href="/" className="text-sm text-muted hover:text-ink">
        ← {site.legal.backHome}
      </a>
    </header>
    <main className="mx-auto min-h-[60vh] max-w-2xl px-5 py-20 sm:px-8">
      <h1 className="font-display text-5xl font-semibold tracking-tight">{page.title}</h1>
      {page.paragraphs.map((text) => (
        <p key={text} className="mt-6 text-lg leading-relaxed text-muted">
          {text}
        </p>
      ))}
      <CopyAddress lead={site.legal.contactLead} className="mt-10" />
    </main>
    <Footer />
  </StrictMode>,
)
