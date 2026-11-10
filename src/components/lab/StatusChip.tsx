/** Small mono label showing a product's honest build status. */
export function StatusChip({ status, className = '' }: { status: string; className?: string }) {
  return (
    <span
      className={`label-mono inline-flex items-center gap-2 rounded-pill border border-violet/25 bg-violet/[0.08] px-3 py-1.5 text-violet ${className}`}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-violet" />
      <span className="sr-only">Status: </span>
      {status}
    </span>
  )
}

export function CodenameTag({ label }: { label: string }) {
  return (
    <span className="label-mono inline-flex items-center rounded-pill border border-line px-3 py-1.5 text-muted">
      {label}
    </span>
  )
}
