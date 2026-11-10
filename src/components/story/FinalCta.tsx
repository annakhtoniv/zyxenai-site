import { mailto, site } from '../../content/site'
import { Button } from '../ui/Button'
import { CopyAddress } from '../ui/CopyAddress'
import { Reveal } from '../ui/Reveal'

/** The closing call to action: one headline, one large email button, and the copy fallback. */
export function FinalCta() {
  return (
    <section id="access" aria-labelledby="access-title" className="relative isolate mt-16 scroll-mt-0 overflow-hidden border-t border-line bg-surface">
      {/* Slow drifting colour field behind the text. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-[10%] top-[-30%] h-[90%] w-[60%] rounded-full bg-brand/[0.12] blur-[120px] animate-[drift_14s_ease-in-out_infinite_alternate]" />
        <div className="absolute -right-[10%] bottom-[-35%] h-[95%] w-[60%] rounded-full bg-violet/[0.12] blur-[120px] animate-[drift_18s_ease-in-out_infinite_alternate-reverse]" />
        <div className="bg-grid absolute inset-0" />
      </div>
      <Reveal className="mx-auto flex max-w-page flex-col items-center px-5 py-32 text-center sm:px-8 lg:py-44">
        <p className="label-mono mb-8 text-brand">{site.cta.label}</p>
        <h2
          id="access-title"
          className="max-w-[14ch] font-display text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[0.96] tracking-[-0.045em]"
        >
          {site.cta.headline}
        </h2>
        <Button href={mailto()} className="mt-12 !px-9 !py-5 !text-lg sm:!text-xl">
          {site.cta.button}
          <span aria-hidden="true">→</span>
        </Button>
        <CopyAddress className="mt-8 justify-center" />
      </Reveal>
    </section>
  )
}
