# Daniel Diaz — personal site

A single-page portfolio / résumé site for **Daniel Diaz**, aimed at potential employers:
work experience, projects, skills, education, interests and an astrophotography gallery.

**Stack:** Angular 22 (standalone components, signals, zoneless change detection), SCSS,
TypeScript. Client-rendered SPA — no backend, no trackers, no CMS. Built with
`@angular/build` and deployed to Netlify as static files.

Same conventions as the sibling `paradise-pines` project: one folder per site, its own
`package.json`, `angular.json` and `netlify.toml`.

---

## Run it

```bash
cd daniel-diaz
npm install
npm start            # ng serve -> http://localhost:4200
```

Production build + a local preview that behaves like Netlify (SPA fallback, same
Cache-Control headers):

```bash
npm run build        # -> dist/daniel-diaz/browser
npm run serve:dist   # -> http://127.0.0.1:8850/
```

Check the rendering without opening a browser (uses the installed Edge):

```bash
node tools/shot.cjs 1440 900 http://127.0.0.1:8850/ shot-desktop.png
node tools/shot.cjs 1440 1000 http://127.0.0.1:8850/ shot-full.png full
SHOT_STATIC=1 node tools/shot.cjs 390 844 http://127.0.0.1:8850/ shot-mobile.png full
```

`SHOT_STATIC=1` asks for reduced motion so the scroll-reveal sections are visible in a
stitched full-page capture. `tools/shot.cjs` also prints console errors and failed requests.

## The résumé PDF

The résumé **is** the web page: one source of truth in `src/app/data`. To produce the
hand-out PDF:

```bash
npm run build
npm run resume -- "C:/Users/iwrot/Downloads/Daniel Diaz Resume 2026.pdf"
```

`tools/make-resume-pdf.cjs` serves `dist/`, prints with the installed Edge, and then checks
the printed text: it fails if a required string (Security Champion, OWASP Dependency-Check,
Black Duck, FIDO2 / WebAuthn, Tomcat, Jetty, the email…) is missing, or if something
screen-only leaked in. It prints **two Letter pages**; the `@media print` block in
`src/styles.scss` decides what is on them.

What the print view leaves out, and why:

| Left out | Reason |
| --- | --- |
| Astrophotography — gallery, interests, the "Off the clock" card row, the hero's Milky Way clause | Not résumé material (the `taglineTail` in `site.config.ts` carries the screen-only half of the sentence) |
| Screenshots, the chat illustration, project summaries / highlights / stack chips | One line per project on paper; the tech is already in the skills list |
| The "short version" card, section intros, the "Looking for" aside | Duplicated by the hero facts, headings and About copy |
| Scroll-reveal opacity | Unrevealed sections are transparent on screen; print forces them visible |

If you change copy, re-run `npm run resume` — the PDF is a build artefact, not a file to edit.

## Deploy to Netlify

**Option A — drag and drop.** <https://app.netlify.com/drop> → drag the `dist/daniel-diaz/browser`
folder onto the page. Fast, but you re-upload by hand, and Netlify does not apply
`netlify.toml` to a manual drop — so you get the SPA fallback (it ships inside `dist/` as
`_redirects`) but **none of the security headers**. Use Option B, or add a `_headers` file to
`public/` if you insist on dropping folders.

**Option B — from Git (recommended).** Push this folder to a repo, then *Add new site →
Import an existing project*. Netlify reads [`netlify.toml`](netlify.toml) and does the rest:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist/daniel-diaz/browser` |
| Node version | 24 (pinned in `netlify.toml` — `@angular/cli` 22.2 engines want `^22.22.3 \|\| ^24.15.0 \|\| >=26`, and the build is verified on Node 24) |

If this site lives inside the shared `websites/` repo, set **Base directory** to `daniel-diaz`.
`public/_redirects` already contains the SPA fallback (`/* → /index.html`), and
`netlify.toml` repeats it plus the security headers.

**Custom domain:** *Domain settings → Add custom domain*, then update the four places that
still say `danieldiaz.dev`: `src/index.html` (canonical + two `og:` tags + the JSON-LD block),
`public/robots.txt` and `public/sitemap.xml`.

## Where the content lives

Everything a client might want reworded is data, not markup:

```
src/app/config/site.config.ts      name, role, tagline, contact links, hero facts,
                                   "Looking for" bullets, nav items, image credits
src/app/data/content.model.ts      the interfaces below
src/app/data/profile.data.ts       about paragraphs, summary card, interests, education
src/app/data/experience.data.ts    the job timeline
src/app/data/projects.data.ts      the three project cards + the Foundations card
src/app/data/skills.data.ts        skill groups
src/app/data/photos.data.ts        astrophotography gallery entries

src/app/app.ts                     shell: header, router outlet, footer, lightbox
src/app/app.routes.ts              '' -> Home, '**' -> NotFound (Netlify's 404)
src/app/layout/                    header (nav, scrollspy, mobile menu), footer,
                                   lightbox, print-button
src/app/core/                      starfield (canvas directive), reveal (on-scroll fade),
                                   lightbox service (signals)
src/app/sections/                  hero, about, experience, projects, project-card,
                                   skills, astro-gallery, interests, education, contact
src/app/pages/                     home, not-found
src/app/styles/_tokens.scss        colours, spacing, type scale
src/styles.scss                    reset, shared utilities, @font-face, print sheet

public/assets/img/                 screenshots, hero sky strip, og-image.jpg
public/assets/img/astro/           astrophotography frames (1400 + 800, webp + jpg, EXIF stripped)
public/assets/fonts/               Inter + Space Grotesk, latin subsets, ~180 KB (SIL OFL)
public/_redirects, robots.txt, sitemap.xml, favicon.svg

tools/import_astro.py              drop new astro frames in: resize + strip EXIF
tools/make_placeholders.py         (optional) plates for a tile whose real photo isn't ready
tools/serve-dist.cjs               Netlify-like preview of the production build
tools/shot.cjs                     headless screenshot + console-error check
tools/make-resume-pdf.cjs          print the site to the two-page résumé PDF (`npm run resume`)
```

## Before you send the link around

1. **Astrophotography.** The gallery runs on your own frames, imported from
   `C:\Users\iwrot\Downloads\astro`. To add a session:

   ```bash
   python tools/import_astro.py "C:/Users/iwrot/Downloads/astro"   # resize + strip EXIF
   npm run build
   ```

   The importer writes `<slug>-1400.webp/.jpg` (lightbox) and `<slug>-800.webp/.jpg`
   (tile) into `public/assets/img/astro/`, and copies a `.gif` through untouched so it
   stays animated. **EXIF is dropped on purpose** - camera metadata on a public site can
   leak GPS coordinates. Then add an entry to `PHOTOS` in `src/app/data/photos.data.ts`
   (`src`, `full`, `label`, `caption`, `alt`). Keep `alt` descriptive - the object, the
   colours, what sits where - rather than "photo of a nebula". Set `placeholder: true` if
   a tile is still a stand-in and the tag reappears; `python tools/make_placeholders.py`
   makes the plates. Tiles crop to 3:2, so any aspect ratio works; the lightbox shows the
   uncropped frame. The `@maybe_im_dan` link is already wired up.
2. **Project source links.** The cards have **no** links because the repos are private. When
   one goes public, set `repoUrl: 'https://github.com/DanDiaz/<repo>'` on that entry in
   `projects.data.ts` — `project-card.html` renders a Source link as soon as it is set.
3. **Sparky Chat tile.** It is a CSS illustration (captioned as such, not a screenshot). To use
   a real one: put `sparky-1400.jpg` / `sparky-800.jpg` in `public/assets/img/` and change that
   project's `media` from `{ kind: 'chat-mock' }` to
   `{ kind: 'image', image: { base: '/assets/img/sparky', alt: '…', caption: '…', width: 1400, height: 875 } }`.
4. **Dates.** OpenText reads *Sep 2016 – Present*, Neovest *May 2014 – Jan 2015*, taken from the
   résumé PDF. Update `src/app/data/experience.data.ts` if anything has moved.
5. **Availability.** The "Looking for" panel and the hero facts come from `site.config.ts`.
6. **Link previews.** `public/assets/img/og-image.jpg` is your Andromeda frame cropped to
   1200×630 (it is also the iOS home-screen icon). The previous card — the Children of the
   Sun city — is kept at `public/assets/img/og-city.jpg`; point both tags at it if you would
   rather the preview be code than sky.

## Deliberate choices

- **No phone number, no street address** anywhere — only email, LinkedIn and "Covington, WA —
  Seattle area". The PDF résumé is not published either (it carries both). The **Save résumé
  (PDF)** buttons call `window.print()`; the print stylesheet in `src/styles.scss` turns the page
  into a clean one-page résumé (nav, starfield, gallery and images dropped, content kept on
  white).
- **Zoneless + signals.** No `zone.js`. Everything that updates the view goes through signals
  (`header` menu/scrollspy state, `lightbox` open state); the canvas starfield and the reveal
  directive touch the DOM directly and never trigger change detection.
- **Progressive enhancement.** The content is in the DOM; without JS you still read the whole
  page and the nav anchors work — the starfield, scroll reveal, mobile menu and lightbox are
  extras. (`html.js-reveal` is added by `App`, and the reveal CSS is gated on it.)
- **Accessibility.** Skip link, landmark sections, `aria-current`-style nav state, `role="dialog"`
  + `aria-modal` lightbox with Escape/arrow keys and focus moved into the dialog, keyboard-operable
  gallery tiles, `:focus-visible` outlines, and everything honours `prefers-reduced-motion`
  (the starfield draws one still frame).
- **Strict CSP, so no critical-CSS inlining.** Angular's build inlines above-the-fold CSS and
  adds a small **inline** script to swap the deferred stylesheet back in — which
  `script-src 'self'` blocks. `optimization.styles.inlineCritical` is therefore `false` in
  `angular.json`, so `index.html` has one plain `<link rel="stylesheet">` and no inline script.
  The build is checked by serving `dist/` with the exact `netlify.toml` CSP header: zero CSP
  violations, styles and self-hosted fonts loaded. Re-check it with the same approach if a
  future Angular version starts emitting an inline script again.
- **Credits.** The Milky Way strip behind the hero is ESO / S. Brunier (CC BY 4.0) — the same
  panorama used in SIGNAL//GHOST — credited in the footer. Fonts are SIL OFL. The Children of the
  Sun and SIGNAL//GHOST images are real in-engine captures from those projects. Every astro frame
  is Daniel's own capture, so the gallery carries no third-party licence obligations.

## Editing notes

- Colours, spacing and the type scale are CSS custom properties in
  [`src/app/styles/_tokens.scss`](src/app/styles/_tokens.scss); shared building blocks
  (`.wrap`, `.section`, `.btn`, `.panel`, `.bullets`, `.chips`, `.taglist`) are in
  `src/styles.scss`, and anything specific to one section lives next to its component.
- Section ids (`#about`, `#experience`, …) are referenced by `NAV_ITEMS` in `site.config.ts` and
  scrolled to through the router (`anchorScrolling: 'enabled'` in `app.config.ts`); add a section
  by adding a component plus one entry in `NAV_ITEMS`.
- The bundle budget is in `angular.json` (`initial` 500 kB warning / 1 MB error). The current
  initial bundle is ~301 kB raw / ~78 kB transferred.
