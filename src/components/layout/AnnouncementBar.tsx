import { site } from '../../content/site'

export function AnnouncementBar() {
  return (
    <a
      href={site.announcement.href}
      className="label-mono relative z-30 flex items-center justify-center gap-2 border-b border-line bg-surface px-4 py-2.5 text-center text-muted transition-opacity hover:opacity-80"
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-violet" />
      <span>{site.announcement.text}</span>
      <span aria-hidden="true" className="text-brand">→</span>
    </a>
  )
}
