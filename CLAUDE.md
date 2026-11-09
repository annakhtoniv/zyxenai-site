# ZYXENAI site: rules for every session

This repository is the public website for ZYXENAI (zyxenai.com). The repository may be public, so these rules apply to every file, comment, commit message, and pull request, not just the built pages.

## Hard rules (non-negotiable)

1. **Codenames only.** Three products appear only as RITUAL, NOCTURNE, and MERIDIAN (or replacements the owner approves). Their real names, real domains, and any link to their live apps must not appear anywhere: copy, alt text, meta tags, file names, code comments, commit messages, sitemap.
2. **No invented proof.** No fake testimonials, client logos, user counts, revenue figures, awards, or "trusted by" strips. If the owner did not supply a number, it does not go on the site.
3. **Honest status.** Every product carries the status chip defined in `src/content/site.ts`. Never describe an in-build product as live or available.
4. **No personal identity.** No founder name, photo, biography, employer, or personal phone number. The site speaks as "ZYXENAI" and "we". The only exception is the contact address `vinoth@zyxenai.com`.
5. **No third-party names.** No client, partner, employer, teacher, organisation, or community connected to any product.
6. **No regulated claims.** For the lead automation product: no claims of live outbound calling, guaranteed bookings, or guaranteed returns. Describe capability, not results.
7. **No real screenshots.** Product visuals are abstract UI mockups built in code with fictional data.
8. **Originality.** Reference sites are for patterns only. Do not copy layout, assets, copy, or branding.
9. **Stop gates.** Work in the phases listed in `PROGRESS.md` and stop for owner approval at the end of each. Do not deploy, connect a domain, or send anything to a live service without explicit approval.

## Branch rule

- `main` is the live site. Every push to `main` publishes to zyxenai.com through GitHub Pages.
- **Never commit or push to `main`.** All work happens on the working branch (see `PROGRESS.md`). Only the owner publishes, by merging into `main` after reviewing a preview.
- The "coming soon" page on `main` stays untouched until the owner merges the finished site.

## Project conventions

- Stack: Vite, React, TypeScript, Tailwind CSS, GSAP with ScrollTrigger, Lenis, React Three Fiber, Framer Motion. Static output for GitHub Pages. Vercel is not used.
- All text and product data live in `src/content/site.ts`. All design tokens live in `src/theme/tokens.ts`.
- No backend, no forms, no analytics, no cookies. Every call to action is a `mailto:` link with a copy-to-clipboard fallback.
- Copy voice: confident, short, plain words, British English, no exclamation marks, no em dashes, no hype terms.
- Animate only `transform` and `opacity`. Honour `prefers-reduced-motion`.
- The owner is a non-developer. Explain changes in plain language and never leave a step that needs manual code editing.
