# Build progress

A fresh session should read `CLAUDE.md` first, then this file.

**Working branch:** `claude/light-theme-indigo-glacier` (the earlier branch `claude/upbeat-clarke-yujj9f` is merged and live). Never push to `main`.

## Phases

| Phase | Scope | Status |
|---|---|---|
| 0 | Plan, file structure, codename collision check | Done, approved |
| 1 | Foundation: setup, theme tokens, content file, navbar, hero with 3D scene, footer | Done, approved |
| 2 | The Lab: pinned product showcase, bento grid, mobile card stack | Done, approved |
| 3 | Story and CTA: manifesto, method, principles, final CTA | Done |
| 4 | Polish: preloader, micro-interactions, reduced motion, performance and accessibility audit | Done |
| 5 | Deploy prep: Pages workflow, CNAME, SEO files, README, acceptance checklist | Done, awaiting owner publish |

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

## Phase 2 outcome

Built in `src/components/lab/`:

- `Lab.tsx` picks the version: pinned showcase (screens 1024 px and wider), swipeable card deck (smaller screens), or a still list (large screen with reduced motion).
- `LabShowcase.tsx`: tall scroll track with a sticky full-screen stage. Scroll position selects the product. Rail at the bottom jumps to any product. Focusing a hidden product's link scrolls to it.
- `LabIconScene.tsx`: seven glossy 3D icons built from primitives, one canvas, lazy-loaded, paused off screen.
- `InterfaceGlimpse.tsx`: seven abstract mock-ups with redaction bars and a blurred lower half. Labels come from `site.lab.glimpse`.
- `BentoGrid.tsx`: all seven as cards with cursor glow and tilt. Each card's id is the product id, so `#academy` lands on the Academy card.
- Shared: `ScrambleText`, `Reveal`, `StatusChip`, `ProductGlyph` (flat icons used on phones and in the grid).

Checked at 1920, 1440, 1024 and 390 px wide and in reduced-motion mode: no sideways scroll, no console errors.

Decision: the 3D icons run only in the desktop showcase. Phones and the grid use flat line icons to save battery and load time.

Open item: GSAP licence. An automated scanner on the pull request flags GSAP's custom licence as unclassified. The owner has not yet said whether to keep GSAP. It is used in `src/lib/scroll.ts`, `ScrollProgress`, `Footer` and `LabShowcase`.

## Phases 3 to 5 outcome

The owner asked to finish quickly, so Phases 3, 4 and 5 were completed in one pass. The owner chose to keep GSAP.

- Phase 3: `src/components/story/` (Marquee, Manifesto, Method, Principles, FinalCta). Temporary placeholders removed.
- Phase 4: `Preloader` (1.5 s, skipped for reduced motion). On phones the hero 3D scene loads at first touch or scroll, not at page load. Lighthouse mobile on the built site: Performance 96, Accessibility 96, Best Practices 100, SEO 100.
- Phase 5: `.github/workflows/deploy.yml` (push to main only), `404.html` (copy of the home page, made at build time), `robots.txt`, `sitemap.xml`, share image `public/og.png`, touch icon, Organization structured data, `README.md`.

Publishing needs two owner actions: set Settings > Pages > Source to "GitHub Actions", then merge the pull request into `main`.

Not done or not tested: real touch swiping on a phone, scroll smoothness on a mid-range laptop, screen reader pass. The "Sourcery review" check stays red because it cannot classify GSAP's licence.

## Light theme: "Electric Indigo & Glacier" (10 Nov 2026)

The owner asked to move the site from the dark theme to a high-contrast light theme. Status: done on the working branch, awaiting owner review and merge.

- `src/theme/tokens.ts`: white canvas, Glacier Ice surface `#F3F4F6`, Ink Black text `#111827`, muted `#4B5563`, Electric Indigo `#4F46E5` (hover `#4338CA`), Deep Violet `#7C3AED`, borders `#E5E7EB`, one soft card shadow. The old cyan and amber tokens are gone (`brand` and `violet` replace them). Product accent hues were deepened so they pass contrast on white.
- `.glass` became `.card` (white, hairline border, soft shadow). Film grain removed.
- Navbar is now a full-width white bar with blur and a bottom hairline, not a floating pill.
- Hero: the dark 3D particle scene (`HeroScene.tsx`) was removed and replaced by `HeroDiagram.tsx`, a light architecture diagram. Its labels are in `site.hero.diagram`. The 3D product icons in the Lab remain.
- Buttons: solid indigo primary; white secondary with a border. Step numbers and status chips are violet pills. Bento icons sit in light indigo squares.
- Favicon, touch icon, share image and browser theme colour redrawn for the light theme.
- Checked: build passes; no console errors or sideways scroll at 1440 and 390 px; every text and background pair measured at 4.5:1 or better.
- Not done: the request mentioned a contact form. The site has none by rule (email buttons only), so nothing was added.
- Not re-run: Lighthouse, real phone, screen reader.

## Open questions for the owner

None blocking.
