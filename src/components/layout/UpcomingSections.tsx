/**
 * TEMPORARY. Stand-ins for the sections built in Phase 3, so the menu
 * links have somewhere to land and the page has length to scroll.
 * This file is deleted as the real sections arrive.
 */
const upcoming = [
  { id: 'vision', name: 'Marquee and vision', phase: 3 },
  { id: 'method', name: 'How we build', phase: 3 },
  { id: 'principles', name: 'Principles', phase: 3 },
  { id: 'access', name: 'Final call to action', phase: 3 },
]

export function UpcomingSections() {
  return (
    <div className="mx-auto max-w-page space-y-5 px-5 py-20 sm:px-8">
      {upcoming.map((s) => (
        <section
          key={s.id}
          id={s.id}
          className="flex min-h-[45vh] scroll-mt-24 flex-col justify-between rounded-card border border-dashed border-line p-8"
        >
          <p className="label-mono text-amber">Placeholder // arrives in phase {s.phase}</p>
          <h2 className="font-display text-3xl text-muted">{s.name}</h2>
        </section>
      ))}
    </div>
  )
}
