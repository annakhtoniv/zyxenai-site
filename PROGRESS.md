# Build progress

A fresh session should read `CLAUDE.md` first, then this file.

**Working branch:** `claude/upbeat-clarke-yujj9f` (plays the role of `dev` in the brief). Never push to `main`.

## Phases

| Phase | Scope | Status |
|---|---|---|
| 0 | Plan, file structure, codename collision check | Done, awaiting owner approval |
| 1 | Foundation: setup, theme tokens, content file, navbar, hero with 3D scene, footer | Not started |
| 2 | The Lab: pinned product showcase, bento grid, mobile card stack | Not started |
| 3 | Story and CTA: manifesto, method, principles, final CTA | Not started |
| 4 | Polish: preloader, micro-interactions, reduced motion, performance and accessibility audit | Not started |
| 5 | Deploy prep: Pages workflow, CNAME, SEO files, README, acceptance checklist | Not started |

## Phase 0 outcome

### Codename collision check

All three codenames share a name with existing products in the same category. None is a household name, but RITUAL is the closest clash.

| Codename | Finding | Alternatives |
|---|---|---|
| RITUAL | Clash: an established guided wellbeing practices app uses this exact name, plus several habit trackers | HEARTH, VIGIL, COVENANT |
| NOCTURNE | Mild: a few small sleep apps use this exact name | UMBRA, VESPER, HALCYON |
| MERIDIAN | Mild: a construction project management vendor and a few small tools use this name | THROUGHLINE, PLUMBLINE, KEEL |

**Decision needed from the owner** before Phase 1.

### Decisions taken (no owner input needed)

- Fonts (Space Grotesk, Inter, JetBrains Mono) are self-hosted, so the site makes no requests to third parties.
- Product icons are built as Three.js primitives in code rather than downloaded renders: lighter, tintable per product, no licence files to track.
- Privacy and Terms are separate small static pages (`/privacy/`, `/terms/`), so they work on GitHub Pages without routing tricks.
- The existing `index.html` (coming soon page) will be replaced on the working branch only. `main` keeps it until the owner merges.

### Planned file structure

```
.github/workflows/deploy.yml   build and publish, on push to main only (Phase 5)
public/                        CNAME, favicon set, share image, robots.txt, sitemap.xml, 404.html
index.html                     main page shell and meta tags
privacy/index.html, terms/index.html
src/
  content/site.ts              ALL text, products, statuses, links, email address
  theme/tokens.ts              ALL colours, fonts, radii, spacing, motion timings
  components/
    layout/                    AnnouncementBar, Navbar, MobileMenu, Footer, ScrollProgress, Preloader
    hero/                      Hero, HeroScene (3D, lazy-loaded), ShaderBackdrop
    lab/                       LabShowcase (pinned), LabCardStack (mobile), BentoGrid, ProductIcon3D, InterfaceGlimpse, StatusChip
    story/                     Marquee, Manifesto, Method, Principles, FinalCta
    ui/                        Wordmark, Monogram, MagneticButton, EmailButton, CopyAddress, ScrambleText, SplitReveal, GlassCard
  hooks/                       useLenis, useReducedMotion, useMailto, useInView
  styles/index.css             Tailwind entry, grain, grid
  App.tsx, main.tsx
README.md                      plain-language guide: edit content, run locally, publish
```

## Open questions for the owner

1. Codenames: keep or replace (see table above).
2. Confirm the seven status chips are still accurate.
3. Is there a DESIGN.md to attach? If not, the Section 6 tokens are used.
