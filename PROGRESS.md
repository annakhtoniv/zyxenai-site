# Build progress

A fresh session should read `CLAUDE.md` first, then this file.

**Working branch:** `claude/upbeat-clarke-yujj9f` (plays the role of `dev` in the brief). Never push to `main`.

## Phases

| Phase | Scope | Status |
|---|---|---|
| 0 | Plan, file structure, codename collision check | Done, approved |
| 1 | Foundation: setup, theme tokens, content file, navbar, hero with 3D scene, footer | Done, awaiting owner approval |
| 2 | The Lab: pinned product showcase, bento grid, mobile card stack | Not started |
| 3 | Story and CTA: manifesto, method, principles, final CTA | Not started |
| 4 | Polish: preloader, micro-interactions, reduced motion, performance and accessibility audit | Not started |
| 5 | Deploy prep: Pages workflow, CNAME, SEO files, README, acceptance checklist | Not started |

## How to preview

```
npm install
npm run dev        # live preview while editing
npm run build && npm run preview   # the exact files that would be published
```

## Phase 0 outcome

### Codenames

The owner chose to replace all three original codenames. In use now (each is one line in `src/content/site.ts`):

| # | Codename | Check result |
|---|---|---|
| 01 | VIGIL | No same-category product found |
| 02 | UMBRA | No sleep app found under this name (a screen-dimming utility has a similar name) |
| 03 | PLUMBLINE | No project management product found |

Rejected after checking: HEARTH (a small meditation app), THROUGHLINE (a Jira add-on), VESPER and HALCYON (small sleep and sound apps). The owner confirmed the seven status chips and that there is no DESIGN.md.

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

## Phase 1 outcome

Built: project setup, `src/theme/tokens.ts`, `src/content/site.ts` (all copy for every phase), announcement bar, floating navbar with full-screen mobile menu, hero with lazy-loaded 3D core and shader backdrop, scroll progress line, smooth scroll, footer with giant wordmark that fills on scroll, Privacy and Terms placeholder pages, favicon.

Notes for later phases:

- `src/components/layout/UpcomingSections.tsx` is a temporary stand-in for Phase 2 and 3 sections. Delete each entry as the real section lands. Section ids to keep: `vision`, `lab`, `academy`, `method`, `principles`, `access`.
- Checked at 1440, 390 and 360 px wide: no sideways scroll, no console errors.
- Phase 4: the shared JavaScript file is about 123 kB compressed; split GSAP and Framer Motion further if Lighthouse needs it. Trim unused font subsets.
- Phase 5: `CNAME` now lives in `public/`. GitHub Pages must be switched from "deploy from branch" to "GitHub Actions" when the owner publishes, or the raw source would be served. Add `404.html`.

## Open questions for the owner

1. Confirm the codenames VIGIL, UMBRA and PLUMBLINE, or name others.
