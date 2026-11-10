/** Small mono label with a leading line, used above section headings. */
export function SectionLabel({ children }: { children: string }) {
  return (
    <p className="label-mono mb-6 flex items-center gap-3 text-brand">
      <span aria-hidden="true" className="h-px w-8 bg-brand" />
      {children}
    </p>
  )
}
