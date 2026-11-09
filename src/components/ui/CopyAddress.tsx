import { useState } from 'react'
import { mailto, site } from '../../content/site'

/**
 * Shows the contact address with a copy button.
 * This is the fallback for visitors whose device has no mail app set up.
 */
export function CopyAddress({
  lead,
  linked = false,
  className = '',
}: {
  lead?: string
  /** Makes the address itself an email link. */
  linked?: boolean
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(site.email)
    } catch {
      // Older browsers: copy through a temporary text field.
      const field = document.createElement('textarea')
      field.value = site.email
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      field.remove()
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  return (
    <p className={`flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-sm text-muted ${className}`}>
      {lead && <span>{lead}</span>}
      {linked ? (
        <a href={mailto()} className="text-ink hover:opacity-80">
          {site.email}
        </a>
      ) : (
        <span className="select-all text-ink">{site.email}</span>
      )}
      <button
        type="button"
        onClick={copy}
        className="rounded-pill border border-line px-3 py-1 text-xs uppercase tracking-widest text-ink transition-opacity hover:opacity-70"
      >
        <span aria-live="polite">{copied ? site.copyLabels.copied : site.copyLabels.copy}</span>
      </button>
    </p>
  )
}
