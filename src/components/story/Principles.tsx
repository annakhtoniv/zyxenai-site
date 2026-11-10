import { site } from '../../content/site'
import { Reveal } from '../ui/Reveal'
import { SectionLabel } from '../ui/SectionLabel'

export function Principles() {
  return (
    <section id="principles" aria-labelledby="principles-title" className="mx-auto max-w-page scroll-mt-24 px-5 py-24 sm:px-8">
      <SectionLabel>{site.principles.label}</SectionLabel>
      <h2 id="principles-title" className="sr-only">
        {site.principles.label}
      </h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {site.principles.items.map((item, i) => (
          <li key={item.title}>
            <Reveal order={i} className="card flex h-full flex-col rounded-card p-6">
              <p aria-hidden="true" className="label-mono text-violet">
                P/0{i + 1}
              </p>
              <h3 className="mt-10 font-display text-xl font-semibold leading-snug tracking-tight">{item.title}</h3>
              <p className="mt-3 text-muted">{item.text}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
