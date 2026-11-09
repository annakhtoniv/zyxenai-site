# ZYXENAI website

The public site for ZYXENAI at zyxenai.com. A single scrolling page, built to static files and hosted on GitHub Pages.

This guide is written for someone who does not write code.

## Change the text

Every word on the site is in one file: `src/content/site.ts`.

1. Open that file.
2. Change the text between the quotation marks.
3. Save, then preview (below).

Product names, teaser lines, bullets and status chips are in the `products` list in the same file. The contact email is the `email` line near the top; changing it there updates every button.

Before changing wording, read the rules in `CLAUDE.md` (codenames only, no invented numbers, honest statuses, no personal details).

## Change the look

Colours, fonts, corner radii and animation timings are in `src/theme/tokens.ts`. The logo is `src/components/ui/Wordmark.tsx`, and the browser tab icon is `public/favicon.svg`.

## Preview on your computer

You need Node.js version 20 or newer. In a terminal, inside this folder:

```bash
npm install
```

```bash
npm run dev
```

Open the address it prints (usually http://localhost:5173). The page updates as you save files.

To see exactly what would be published:

```bash
npm run build
```

```bash
npm run preview
```

## Publish

`main` is the live site. Anything merged into `main` is built and published automatically by GitHub Actions (`.github/workflows/deploy.yml`), usually within two minutes.

One-time setup, before the first publish: in the repository on GitHub, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**. Without this, GitHub would serve the raw source files and the site would appear blank.

To publish: work on a separate branch, open a pull request into `main`, check the preview, then press **Merge**. Never edit `main` directly.

The custom domain is set by `public/CNAME`. Vercel is not used.

## What is where

| Path | What it holds |
|---|---|
| `src/content/site.ts` | All text, products, statuses, links |
| `src/theme/tokens.ts` | All colours, fonts, timings |
| `src/components/hero/` | Top of the page and its 3D scene |
| `src/components/lab/` | The product showcase, card deck and grid |
| `src/components/story/` | Marquee, vision, method, principles, final call to action |
| `src/components/layout/` | Announcement bar, menu, footer, preloader |
| `public/` | Files copied as they are: icons, share image, robots.txt, sitemap.xml, CNAME |
| `privacy/`, `terms/` | The two small legal pages (text is in `site.ts`) |
| `PROGRESS.md` | Build log and open decisions |

## Notes

- No analytics, tracking or cookies. Fonts are bundled with the site.
- Every call to action is an email link with a copy-address button as the fallback. There is no form and no backend.
- The site respects the "reduce motion" setting: no pinning, no 3D movement, simple fades.
