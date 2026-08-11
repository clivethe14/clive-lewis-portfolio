# clivelewis.dev

Personal portfolio site for Clive Lewis — a three-page site (Home, Projects, About) built with
Next.js App Router and Tailwind, compiled to static HTML and served as flat files behind Caddy.
It is deliberately small: no client-side data fetching, no CMS, no component library, and no
JavaScript beyond two small interaction components. The site is itself meant to be a work sample,
so the constraints it holds — semantic markup, WCAG AA contrast, `prefers-reduced-motion` support,
and a build that produces a directory you can `rsync` — are the point rather than a side effect.

## Tech stack

| Concern | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router), static export |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS |
| Fonts | Space Grotesk + JetBrains Mono, self-hosted via `next/font` |
| Hosting | Caddy on a Linux VPS, automatic HTTPS |

Runtime dependencies are `next`, `react`, and `react-dom`. Nothing else.

## Local development

```bash
npm install
```

```bash
npm run dev
```

The dev server runs at http://localhost:3000.

```bash
npm run build
```

`build` runs `scripts/generate-images.mjs` first (writing `public/og.png`, the favicon, and the
touch icon), then compiles and exports the site into `out/`. Useful extras:

```bash
npm run typecheck && npm run lint
```

## Project layout

```
app/                 routes, metadata, sitemap.ts, robots.ts
components/          Nav, Footer, Reveal, TypedLine, cards, Timeline
lib/site.ts          identity, links, canonical URL
lib/content.ts       all page copy as structured data
scripts/generate-images.mjs   build-time OpenGraph card, favicon, and touch icon generation
```

Copy lives in `lib/content.ts` rather than inside JSX so wording can be revised without touching
layout code.

## Before deploying

1. Set `SITE_URL` in `lib/site.ts` to the production domain — it drives canonical URLs, the
   sitemap, and absolute OpenGraph image URLs.
2. Fill in the LinkedIn and GitHub URLs in `lib/site.ts`.
3. Replace the per-project `repo` values in `lib/content.ts` (they are `'#'` placeholders).
4. Keep `public/resume.pdf` current. `npm run build` copies it into `out/` like
   any other static asset, and the nav links to it at `/resume.pdf`.

## Deploy

Build, then copy the exported directory to the server:

```bash
npm run build
```

```bash
rsync -avz --delete out/ user@your-server:/var/www/clivelewis.dev/
```

`--delete` keeps the server free of files removed from the build. On the server, make sure the
directory is readable by Caddy:

```bash
sudo chown -R caddy:caddy /var/www/clivelewis.dev
```

### Caddyfile

Caddy provisions and renews TLS certificates automatically; pointing an A record at the box is the
only other requirement.

```caddyfile
clivelewis.dev, www.clivelewis.dev {
    root * /var/www/clivelewis.dev
    encode zstd gzip
    file_server

    # The export uses trailingSlash, so /about resolves to /about/index.html.
    try_files {path} {path}/ {path}.html

    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Hashed build assets are immutable; everything else revalidates.
    @immutable path /_next/static/*
    header @immutable Cache-Control "public, max-age=31536000, immutable"
    header Cache-Control "public, max-age=3600, must-revalidate"

    header {
        Strict-Transport-Security "max-age=31536000; includeSubDomains"
        X-Content-Type-Options "nosniff"
        Referrer-Policy "strict-origin-when-cross-origin"
    }
}
```

Reload after editing:

```bash
sudo caddy reload --config /etc/caddy/Caddyfile
```

## Architecture decisions

**Static export.** The site has no request-time behavior — no auth, no database, no personalization
— so rendering per request would buy nothing and add a Node process to keep alive, patch, and
monitor. `output: 'export'` produces a directory of HTML that any web server can hand out, which
makes hosting cheap, the failure surface small, and rollback a matter of swapping a folder.
`trailingSlash: true` keeps dev and production URL resolution identical.

**Minimal dependencies.** Everything on the page is small enough to write directly: the scroll
reveal is an `IntersectionObserver` and a CSS class, the typing effect is a `setTimeout` loop. An
animation library would have added far more transfer weight than the roughly 70 lines it replaced,
and each dependency is a supply-chain and upgrade obligation on a site that should stay buildable
years from now.

**OpenGraph image generated at build, not by a metadata route.** Next's `opengraph-image`
convention works under static export, but emits an extension-less file referenced with a query
string. Caddy serves that as `application/octet-stream`, and several crawlers drop the preview.
`scripts/generate-images.mjs` writes a real `public/og.png` (and the favicon/touch icon) using
`next/og`, which is already part of Next — so these are generated from code, but ship as ordinary
static assets.

**Accessibility.** Landmarks and heading order are checked rather than assumed: one `h1` per page
and no skipped levels. Text colors were picked against measured contrast — the lowest-emphasis
color on the site sits at 5.1:1 on the page background and 4.8:1 on raised cards, both above the
4.5:1 AA threshold for small text. There is a skip link, visible focus rings, and the typing
effect exposes its finished sentence to screen readers instead of streaming characters into the
accessibility tree.

**Motion.** `prefers-reduced-motion: reduce` is honored at both layers: CSS neutralizes the reveal
transitions and hides the terminal caret, and the components check `matchMedia` so the typing
effect renders its text immediately rather than animating. Reveal animations also resolve for
content already in the viewport at mount, so the page never depends on an observer callback to
become readable — and a `<noscript>` rule cancels the hidden state entirely when JavaScript is off.

## License

Code is available for reference. Site content and copy are not licensed for reuse.
