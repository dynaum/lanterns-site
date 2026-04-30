# Lanterns Marketing Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single-page cozy-editorial marketing site for Lanterns at `lanterns.dynaum.com`, hosted on Cloudflare Pages, with the existing playable build relocated to `play.lanterns.dynaum.com`.

**Architecture:** Plain static site (HTML + CSS + ~30 lines of vanilla JS), no build step, no dependencies. Single `index.html` with anchor-nav sections. Auto-deploy from `master` of `dynaum/lanterns-site` via Cloudflare Pages. Existing CF-Pages-→-Spaces playable build keeps its hosting; only its custom-domain binding moves.

**Tech Stack:** HTML5, CSS3 with custom properties, vanilla ES6, Google Fonts (Fraunces + Inter), Cloudflare Pages, GitHub.

**Reference:** spec at `docs/superpowers/specs/2026-04-29-lanterns-site-design.md`.

**Testing approach for a static site:** TDD-style automated tests don't fit here. Each task ends with a **manual verification** step: serve the site locally, open in a browser, and confirm specific observable outcomes (rendered correctly, no console errors, anchor scrolls work, viewport widths render gracefully). Treat the verification step like a green test — don't move on until it passes.

**Local dev command (used in every verification step):**
```bash
cd /Users/dynaum/dev/games/lanterns-site && python3 -m http.server 8000
```
Then visit `http://localhost:8000`.

---

## File Structure

| File | Responsibility |
|---|---|
| `index.html` | The whole single-page site. One section per content block. |
| `styles.css` | All styles. Sections by component (tokens → primitives → nav → sections → footer → responsive). |
| `app.js` | ~30 lines: smooth-scroll, IntersectionObserver fade-in, demo iframe focus hint. |
| `assets/moon.svg`, `assets/lantern.svg` | Inline-renderable hero illustrations. |
| `assets/icons/*.svg` | Six feature-grid icons. |
| `assets/biomes/*.svg` | Four biome backgrounds copied from the game repo. |
| `assets/keepers/*.svg` | Five keeper portraits copied from the game repo. |
| `assets/press/logo.svg` | Logo for press kit (placeholder for v1). |
| `CNAME` | Single line: `lanterns.dynaum.com`. CF Pages reads this for custom-domain binding. |
| `_headers` | Cloudflare Pages directive file: cache headers + frame-ancestors. |
| `_redirects` | Cloudflare Pages directive file: reserved for future short URLs. |
| `README.md` | What the project is; how to dev locally; how it deploys. |

---

## Task 1: Repo scaffolding

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `app.js`
- Create: `README.md`
- Create: `CNAME`
- Create: `_headers`
- Create: `_redirects`
- Modify: `.gitignore` (already exists from spec commit)
- Create: `assets/.gitkeep`

- [ ] **Step 1.1: Create `index.html` shell with anchor IDs and font links**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Lanterns — a cozy bullet-heaven</title>
  <meta name="description" content="A cozy bullet-heaven about a Keeper, a swarm of moths, and the soft light that holds the night together. Built in Godot 4. 1–2 players local co-op.">
  <meta property="og:title" content="Lanterns — a cozy bullet-heaven">
  <meta property="og:description" content="A cozy bullet-heaven about a Keeper, a swarm of moths, and the soft light that holds the night together.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://lanterns.dynaum.com/">
  <meta name="theme-color" content="#f4ead8">
  <link rel="icon" type="image/svg+xml" href="/assets/lantern.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/styles.css">
</head>
<body>
  <header id="top"></header>
  <main>
    <section id="hero"></section>
    <section id="play"></section>
    <section id="about"></section>
    <section id="features"></section>
    <section id="biomes"></section>
    <section id="keepers"></section>
    <section id="status"></section>
    <section id="press"></section>
    <section id="feedback"></section>
  </main>
  <footer id="site-footer"></footer>
  <script src="/app.js" defer></script>
</body>
</html>
```

- [ ] **Step 1.2: Create empty `styles.css` and `app.js` placeholders**

`styles.css`:
```css
/* Lanterns marketing site styles. Sections: tokens → base → primitives → nav → hero → demo → about → features → biomes → keepers → aux → footer → responsive. */
```

`app.js`:
```js
// Lanterns marketing site — progressive enhancement.
```

- [ ] **Step 1.3: Create `CNAME`**

```
lanterns.dynaum.com
```

- [ ] **Step 1.4: Create `_headers` (Cloudflare Pages format)**

```
/*
  Cache-Control: public, max-age=300, must-revalidate
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin

/assets/*
  Cache-Control: public, max-age=2592000, immutable
```

- [ ] **Step 1.5: Create `_redirects` (empty for v1, keep file for future use)**

```
# Reserved for short-URL redirects. Cloudflare Pages format: <from> <to> <status>
```

- [ ] **Step 1.6: Create `README.md`**

```markdown
# Lanterns marketing site

The marketing site for [Lanterns](https://github.com/dynaum/lanterns) — a cozy bullet-heaven built in Godot 4.

Lives at https://lanterns.dynaum.com.

## Develop locally

```sh
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Deploy

Auto-deploys to Cloudflare Pages on push to `master`.

## Files

- `index.html` — the page
- `styles.css` — all styles
- `app.js` — ~30 lines of progressive enhancement
- `assets/` — SVG art (some copied from the game repo)
- `CNAME`, `_headers`, `_redirects` — Cloudflare Pages config
- `docs/superpowers/specs/` — design spec
- `docs/superpowers/plans/` — implementation plan
```

- [ ] **Step 1.7: Create `assets/.gitkeep`**

```bash
mkdir -p assets && touch assets/.gitkeep
```

- [ ] **Step 1.8: Verify shell loads**

```bash
cd /Users/dynaum/dev/games/lanterns-site && python3 -m http.server 8000 &
SERVER_PID=$!
sleep 1
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:8000/
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:8000/styles.css
curl -sS -o /dev/null -w "%{http_code}\n" http://localhost:8000/app.js
kill $SERVER_PID
```

Expected: `200`, `200`, `200`. Then open `http://localhost:8000/` in a browser, confirm the title bar reads "Lanterns — a cozy bullet-heaven" and the page is otherwise blank.

- [ ] **Step 1.9: Commit**

```bash
git add index.html styles.css app.js README.md CNAME _headers _redirects assets/.gitkeep
git commit -m "Scaffold marketing site shell"
```

---

## Task 2: Design tokens, base styles, and component primitives

**Files:**
- Modify: `styles.css`

- [ ] **Step 2.1: Add design tokens at the top of `styles.css`**

Replace the placeholder comment with:

```css
/* === DESIGN TOKENS === */
:root {
  /* Palette (mapped from game's palette.gd) */
  --c-parchment: #f4ead8;
  --c-parchment-deep: #e9dcc4;
  --c-ink: #131734;
  --c-stone: #4a4f63;
  --c-lantern-edge: #c97e3a;
  --c-lantern-warm: #f6c177;
  --c-firefly-glow: #f2f7b0;

  /* Type */
  --font-display: "Fraunces", ui-serif, "Cormorant Garamond", Georgia, serif;
  --font-body: "Inter", ui-sans-serif, system-ui, -apple-system, sans-serif;

  /* Rhythm */
  --section-pad-y: 5rem;
  --section-pad-x: 2rem;
  --content-max: 64rem;
  --measure: 36rem;

  /* Motion */
  --ease: cubic-bezier(0.22, 0.61, 0.36, 1);
}

@media (max-width: 720px) {
  :root {
    --section-pad-y: 3rem;
    --section-pad-x: 1.25rem;
  }
}
```

- [ ] **Step 2.2: Add base reset and body styles**

Append:

```css
/* === BASE === */
*, *::before, *::after { box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
body {
  margin: 0;
  background: var(--c-parchment);
  color: var(--c-ink);
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}
img, svg { display: block; max-width: 100%; }
a { color: var(--c-lantern-edge); text-decoration: none; }
a:hover { text-decoration: underline; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2.3: Add typography utilities**

Append:

```css
/* === TYPOGRAPHY === */
.display {
  font-family: var(--font-display);
  font-weight: 500;
  line-height: 1.0;
  letter-spacing: -0.015em;
  color: var(--c-ink);
}
.display em { font-style: italic; font-weight: 400; color: var(--c-lantern-edge); }

.eyebrow {
  font-size: 0.72rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--c-lantern-edge);
  font-weight: 600;
}

.subtitle {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.15rem;
  color: var(--c-stone);
}

.body { font-family: var(--font-display); font-size: 1.05rem; line-height: 1.7; color: var(--c-stone); }
```

- [ ] **Step 2.4: Add `.section` rhythm and `.container`**

Append:

```css
/* === LAYOUT === */
.section {
  padding: var(--section-pad-y) var(--section-pad-x);
}
.section--inverse { background: var(--c-ink); color: var(--c-parchment); }
.section--inverse .display { color: var(--c-parchment); }
.section--inverse .body { color: rgba(244, 234, 216, 0.78); }
.section--tinted { background: var(--c-parchment-deep); }

.container {
  max-width: var(--content-max);
  margin: 0 auto;
}
.container--narrow { max-width: var(--measure); }
.text-center { text-align: center; }
```

- [ ] **Step 2.5: Add button primitives**

Append:

```css
/* === BUTTONS === */
.button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  border-radius: 999px;
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  border: 1.5px solid transparent;
  transition: transform 0.15s var(--ease), background 0.2s var(--ease), color 0.2s var(--ease);
  text-decoration: none;
}
.button:hover { transform: translateY(-1px); text-decoration: none; }
.button:focus-visible { outline: 2px solid var(--c-lantern-warm); outline-offset: 3px; }

.button-primary {
  background: var(--c-ink);
  color: var(--c-lantern-warm);
}
.button-primary:hover { background: #1f2549; }

.button-ghost {
  background: transparent;
  color: var(--c-ink);
  border-color: var(--c-ink);
}
.button-ghost:hover { background: rgba(19, 23, 52, 0.06); }

.button[aria-disabled="true"] { opacity: 0.55; cursor: not-allowed; pointer-events: none; }
```

- [ ] **Step 2.6: Add card primitive**

Append:

```css
/* === CARDS === */
.card {
  background: rgba(255, 255, 255, 0.4);
  border: 1px solid rgba(19, 23, 52, 0.08);
  border-radius: 12px;
  padding: 1.5rem;
}
```

- [ ] **Step 2.7: Verify in browser**

Add a temporary block to `index.html` `<main>` (will be removed in next task):

```html
<section class="section">
  <div class="container text-center">
    <p class="eyebrow">Tokens preview</p>
    <h1 class="display" style="font-size:3rem">A garden for <em>quiet</em> moths</h1>
    <p class="body">Body copy in Fraunces.</p>
    <p>
      <a href="#" class="button button-primary">Play demo</a>
      <a href="#" class="button button-ghost">Wishlist</a>
    </p>
  </div>
</section>
```

Run server, open `http://localhost:8000`. Expected: cream background, dark serif headline with italic "quiet" in lantern-edge orange, two pill buttons (one dark fill, one outline). Verify Fraunces and Inter actually load (Network tab). Remove the temporary block before committing.

- [ ] **Step 2.8: Commit**

```bash
git add styles.css index.html
git commit -m "Add design tokens, base styles, and component primitives"
```

---

## Task 3: Sticky top nav

**Files:**
- Modify: `index.html` (replace `<header id="top">`)
- Modify: `styles.css` (append nav styles)
- Create: `assets/lantern.svg`

- [ ] **Step 3.1: Create `assets/lantern.svg`** (used as wordmark mark + favicon)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <defs>
    <radialGradient id="g" cx="50%" cy="55%" r="50%">
      <stop offset="0%" stop-color="#f2f7b0"/>
      <stop offset="55%" stop-color="#f6c177"/>
      <stop offset="100%" stop-color="#c97e3a"/>
    </radialGradient>
  </defs>
  <path d="M16 4 v3" stroke="#131734" stroke-width="1.2" fill="none" stroke-linecap="round"/>
  <path d="M11 7 h10 v2 h-10z" fill="#131734"/>
  <ellipse cx="16" cy="18" rx="7.5" ry="9" fill="url(#g)"/>
  <path d="M9 26 h14 v2 h-14z" fill="#131734"/>
</svg>
```

- [ ] **Step 3.2: Replace the `<header id="top">` block in `index.html`**

```html
<header id="top" class="site-nav">
  <div class="site-nav__inner">
    <a class="brand" href="#top" aria-label="Lanterns home">
      <img src="/assets/lantern.svg" width="22" height="22" alt="">
      <span>Lanterns</span>
    </a>
    <nav class="site-nav__links" aria-label="Primary">
      <a href="#play">Play</a>
      <a href="#features">Features</a>
      <a href="#feedback">Feedback</a>
    </nav>
    <a href="#hero-wishlist" class="button button-primary site-nav__wishlist" aria-disabled="true" title="Steam page coming soon">Wishlist</a>
    <button class="site-nav__menu" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div id="mobile-menu" class="site-nav__mobile" hidden>
    <a href="#play">Play</a>
    <a href="#features">Features</a>
    <a href="#feedback">Feedback</a>
  </div>
</header>
```

- [ ] **Step 3.3: Append nav styles to `styles.css`**

```css
/* === NAV === */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(244, 234, 216, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(19, 23, 52, 0.08);
}
.site-nav__inner {
  max-width: var(--content-max);
  margin: 0 auto;
  padding: 0.85rem var(--section-pad-x);
  display: flex;
  align-items: center;
  gap: 2rem;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-family: var(--font-display);
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--c-ink);
  text-decoration: none;
}
.brand:hover { text-decoration: none; }
.site-nav__links {
  display: flex;
  gap: 1.75rem;
  margin-left: auto;
  font-size: 0.9rem;
}
.site-nav__links a {
  color: var(--c-ink);
  font-weight: 500;
  text-decoration: none;
  position: relative;
}
.site-nav__links a:hover { color: var(--c-lantern-edge); }
.site-nav__wishlist { padding: 0.55rem 1.1rem; font-size: 0.7rem; }

.site-nav__menu {
  display: none;
  background: transparent;
  border: 0;
  cursor: pointer;
  width: 32px;
  height: 32px;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-left: auto;
}
.site-nav__menu span { display: block; height: 2px; background: var(--c-ink); border-radius: 2px; }

.site-nav__mobile {
  display: none;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 var(--section-pad-x) 1rem;
  border-top: 1px solid rgba(19, 23, 52, 0.08);
}
.site-nav__mobile a {
  padding: 0.6rem 0;
  color: var(--c-ink);
  font-weight: 500;
}

@media (max-width: 720px) {
  .site-nav__links, .site-nav__wishlist { display: none; }
  .site-nav__menu { display: flex; }
  .site-nav__mobile[aria-expanded="true"], .site-nav__mobile:not([hidden]) { display: flex; }
}
```

- [ ] **Step 3.4: Verify**

Reload at `http://localhost:8000`. Expected:
- Sticky header at top, cream-translucent background.
- "Lanterns" wordmark with small lantern mark on the left.
- Three anchor links + dimmed Wishlist pill on the right.
- Resize to <720px: links hide, hamburger appears (clicking does nothing yet — JS comes in Task 11).
- Hovering "Play"/"Features"/"Feedback" turns the link orange.

- [ ] **Step 3.5: Commit**

```bash
git add index.html styles.css assets/lantern.svg
git commit -m "Add sticky top nav with brand and mobile menu shell"
```

---

## Task 4: Hero section

**Files:**
- Modify: `index.html` (replace `<section id="hero">`)
- Modify: `styles.css`
- Create: `assets/moon.svg`

- [ ] **Step 4.1: Create `assets/moon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
  <circle cx="40" cy="40" r="34" fill="#131734"/>
  <circle cx="52" cy="34" r="26" fill="#f4ead8"/>
</svg>
```

- [ ] **Step 4.2: Replace `<section id="hero">` in `index.html`**

```html
<section id="hero" class="section hero">
  <div class="container container--narrow text-center">
    <img class="hero__moon" src="/assets/moon.svg" width="60" height="60" alt="">
    <p class="eyebrow">A cozy bullet-heaven · 1–2 players · Godot 4</p>
    <h1 class="display hero__title">A garden for <em>quiet</em> moths</h1>
    <p class="body hero__tagline">Lanterns is a cozy bullet-heaven about a Keeper, a swarm of moths, and the soft light that holds the night together.</p>
    <div class="hero__ctas">
      <a class="button button-primary" href="#play">Play the demo</a>
      <a class="button button-ghost" id="hero-wishlist" href="#feedback" aria-disabled="true" title="Steam page coming soon">Wishlist on Steam</a>
    </div>
    <p class="hero__hint">Steam page coming soon — meanwhile, <a href="#feedback">leave feedback</a> on the demo.</p>
  </div>
</section>
```

- [ ] **Step 4.3: Append hero styles to `styles.css`**

```css
/* === HERO === */
.hero { padding-top: calc(var(--section-pad-y) + 1rem); padding-bottom: calc(var(--section-pad-y) + 1rem); }
.hero__moon {
  width: 56px;
  height: 56px;
  margin: 0 auto 1.5rem;
  filter: drop-shadow(0 0 24px rgba(246, 193, 119, 0.35));
  animation: glow-pulse 6s ease-in-out infinite;
}
.hero__title {
  font-size: clamp(2.4rem, 6.5vw, 4.2rem);
  margin: 0.75rem 0 1.25rem;
}
.hero__tagline {
  margin: 0 auto 2.25rem;
  max-width: 32rem;
}
.hero__ctas {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}
.hero__hint {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--c-stone);
}

@keyframes glow-pulse {
  0%, 100% { filter: drop-shadow(0 0 18px rgba(246, 193, 119, 0.25)); }
  50% { filter: drop-shadow(0 0 32px rgba(246, 193, 119, 0.5)); }
}
```

- [ ] **Step 4.4: Verify**

Reload. Expected:
- Centered moon SVG with a subtle pulsing glow.
- Eyebrow text in small uppercase orange.
- Big serif headline with italic "quiet" in orange.
- Body tagline in muted serif.
- Two pill buttons centered, dark "Play the demo" and outlined "Wishlist on Steam" (dimmed because `aria-disabled`).
- Small "Steam page coming soon" hint below.
- Glow pulse stops if you toggle prefers-reduced-motion in DevTools.

- [ ] **Step 4.5: Commit**

```bash
git add index.html styles.css assets/moon.svg
git commit -m "Add hero section with moon, headline, and CTAs"
```

---

## Task 5: Live demo embed section

**Files:**
- Modify: `index.html` (replace `<section id="play">`)
- Modify: `styles.css`

- [ ] **Step 5.1: Replace `<section id="play">`**

```html
<section id="play" class="section section--inverse demo">
  <div class="container">
    <div class="demo__head">
      <p class="eyebrow" style="color: var(--c-lantern-warm)">Play in your browser</p>
      <h2 class="display demo__title">No download required.</h2>
      <p class="body demo__hint">Click inside the frame, then <kbd>WASD</kbd> to move and <kbd>Space</kbd> to dash. The lantern auto-aims — you only move.</p>
    </div>
    <div class="demo__frame">
      <iframe
        src="https://play.lanterns.dynaum.com/"
        title="Lanterns — playable demo"
        loading="lazy"
        allow="autoplay; gamepad; fullscreen"
        referrerpolicy="no-referrer-when-downgrade"></iframe>
      <a class="demo__pop" href="https://play.lanterns.dynaum.com/" target="_blank" rel="noopener">Open demo in a new tab ↗</a>
    </div>
  </div>
</section>
```

- [ ] **Step 5.2: Append demo styles to `styles.css`**

```css
/* === DEMO === */
.demo__head { text-align: center; margin-bottom: 2.5rem; }
.demo__title { font-size: clamp(2rem, 4.5vw, 3rem); margin: 0.6rem auto 1rem; }
.demo__hint {
  max-width: 36rem;
  margin: 0 auto;
  color: rgba(244, 234, 216, 0.78);
}
.demo__hint kbd {
  display: inline-block;
  background: rgba(246, 193, 119, 0.15);
  color: var(--c-lantern-warm);
  border: 1px solid rgba(246, 193, 119, 0.4);
  border-radius: 4px;
  padding: 0.05rem 0.4rem;
  font-family: var(--font-body);
  font-size: 0.78rem;
}
.demo__frame {
  position: relative;
  max-width: 56rem;
  margin: 0 auto;
  border: 2px solid var(--c-lantern-warm);
  border-radius: 10px;
  overflow: hidden;
  background: #0a0d22;
  box-shadow: 0 30px 60px -30px rgba(246, 193, 119, 0.4);
}
.demo__frame iframe {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border: 0;
}
.demo__pop {
  display: block;
  text-align: right;
  padding: 0.55rem 0.85rem;
  font-size: 0.75rem;
  color: var(--c-lantern-warm);
  text-decoration: none;
  background: rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(246, 193, 119, 0.3);
}
.demo__pop:hover { color: var(--c-firefly-glow); text-decoration: none; }
```

- [ ] **Step 5.3: Verify**

Reload. Expected:
- Full-width dark navy section.
- Centered eyebrow in lantern-warm, bold serif headline ("No download required."), keyboard-hint paragraph with `WASD` and `Space` styled as kbd chips.
- A 4:3 iframe boxed in a soft warm border, with "Open demo in a new tab" link below.
- The iframe will fail to load `play.lanterns.dynaum.com` until Task 16 — this is expected. Confirm the layout reserves the right amount of space (the box should still be visible, possibly with a "refused to connect" message).

- [ ] **Step 5.4: Commit**

```bash
git add index.html styles.css
git commit -m "Add inverse demo section with iframe placeholder"
```

---

## Task 6: "What is it" section

**Files:**
- Modify: `index.html` (replace `<section id="about">`)
- Modify: `styles.css`

- [ ] **Step 6.1: Replace `<section id="about">`**

```html
<section id="about" class="section about">
  <div class="container container--narrow">
    <p class="eyebrow text-center">What is Lanterns?</p>
    <h2 class="display about__title text-center">A small, soft kind of chaos.</h2>
    <div class="about__body">
      <p class="body">You are the Keeper, alone in a twilight garden. Moths swarm from the dusk and your lantern catches them, one by one. Every level brings a new goal, a new modifier, a new shape to the swarm — and three upgrade cards to choose from.</p>
      <p class="body">Sometimes there's a friend with you, lantern and all. Sometimes it's just the wind, the cricket bed, and an eight-chord ambient progression that loops while you light up the night.</p>
      <p class="body">Lanterns is built in Godot 4. Vector silhouettes, painterly biomes, procedural audio. No assets bought; everything you see and hear was made for this game.</p>
    </div>
    <figure class="about__clip">
      <div class="about__clip-placeholder" aria-hidden="true">
        <span>↺ short looping gameplay clip</span>
      </div>
      <figcaption class="about__caption">Replace with `assets/clips/loop.mp4` once recorded.</figcaption>
    </figure>
  </div>
</section>
```

- [ ] **Step 6.2: Append about styles to `styles.css`**

```css
/* === ABOUT === */
.about__title { font-size: clamp(2rem, 4.5vw, 3rem); margin: 0.5rem 0 2rem; }
.about__body { display: flex; flex-direction: column; gap: 1.1rem; max-width: 36rem; margin: 0 auto; }
.about__clip {
  margin: 3rem 0 0;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(19, 23, 52, 0.1);
  background: var(--c-parchment-deep);
}
.about__clip-placeholder {
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  color: var(--c-stone);
  font-family: var(--font-display);
  font-style: italic;
  font-size: 0.95rem;
}
.about__caption {
  padding: 0.6rem 0.9rem;
  font-size: 0.75rem;
  color: var(--c-stone);
  background: rgba(19, 23, 52, 0.04);
  text-align: right;
}
```

- [ ] **Step 6.3: Verify**

Reload. Expected:
- Centered eyebrow + serif headline.
- Three paragraphs of cozy positioning copy.
- Below the copy, a 16:9 placeholder block with "↺ short looping gameplay clip" italic and a small caption.

- [ ] **Step 6.4: Commit**

```bash
git add index.html styles.css
git commit -m "Add 'What is Lanterns?' positioning section with clip placeholder"
```

---

## Task 7: Features grid

**Files:**
- Modify: `index.html` (replace `<section id="features">`)
- Modify: `styles.css`
- Create: `assets/icons/{combat,upgrades,keepers,coop,audio,biomes}.svg`

- [ ] **Step 7.1: Create six feature icons (24×24, single-color, currentColor stroke)**

Each as a separate file under `assets/icons/`. Use these exact SVG bodies (one block per file):

`assets/icons/combat.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>
```

`assets/icons/upgrades.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 14 9h7l-5.5 4.5L17.5 21 12 16.5 6.5 21 8.5 13.5 3 9h7z"/></svg>
```

`assets/icons/keepers.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8"/></svg>
```

`assets/icons/coop.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="8" r="3"/><circle cx="16" cy="8" r="3"/><path d="M2 21c0-3.3 2.7-6 6-6M22 21c0-3.3-2.7-6-6-6"/></svg>
```

`assets/icons/audio.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12h3l4-7v14l-4-7H3zM14 8a5 5 0 0 1 0 8M17 5a9 9 0 0 1 0 14"/></svg>
```

`assets/icons/biomes.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 20h18M5 20l3-7 3 4 3-9 5 12"/><circle cx="18" cy="5" r="2"/></svg>
```

- [ ] **Step 7.2: Replace `<section id="features">`**

```html
<section id="features" class="section section--tinted features">
  <div class="container">
    <header class="features__head">
      <p class="eyebrow">What's in the lantern</p>
      <h2 class="display features__title">A run worth replaying.</h2>
    </header>
    <ul class="features__grid" role="list">
      <li class="card feature">
        <img class="feature__icon" src="/assets/icons/combat.svg" width="32" height="32" alt="">
        <h3 class="feature__title">Auto-aim combat</h3>
        <p class="feature__copy">Move; the lantern handles the rest. Range grows with your level and your upgrades.</p>
      </li>
      <li class="card feature">
        <img class="feature__icon" src="/assets/icons/upgrades.svg" width="32" height="32" alt="">
        <h3 class="feature__title">17 upgrade cards</h3>
        <p class="feature__copy">Pick three between every level. Stack effects, build your lantern.</p>
      </li>
      <li class="card feature">
        <img class="feature__icon" src="/assets/icons/keepers.svg" width="32" height="32" alt="">
        <h3 class="feature__title">5 keeper classes</h3>
        <p class="feature__copy">Each starts with different stats and a signature upgrade. Unlock as you play.</p>
      </li>
      <li class="card feature">
        <img class="feature__icon" src="/assets/icons/coop.svg" width="32" height="32" alt="">
        <h3 class="feature__title">Local co-op</h3>
        <p class="feature__copy">Press an arrow key to spawn P2 mid-run. Independent HP, shared score.</p>
      </li>
      <li class="card feature">
        <img class="feature__icon" src="/assets/icons/audio.svg" width="32" height="32" alt="">
        <h3 class="feature__title">Procedural audio</h3>
        <p class="feature__copy">An eight-chord ambient progression, wind, crickets — all generated, no asset files.</p>
      </li>
      <li class="card feature">
        <img class="feature__icon" src="/assets/icons/biomes.svg" width="32" height="32" alt="">
        <h3 class="feature__title">Painterly biomes</h3>
        <p class="feature__copy">Dusk, Autumn, Winter, Storm. The garden rotates every five levels.</p>
      </li>
    </ul>
  </div>
</section>
```

- [ ] **Step 7.3: Append features styles to `styles.css`**

```css
/* === FEATURES === */
.features__head { text-align: center; margin-bottom: 3rem; }
.features__title { font-size: clamp(2rem, 4.5vw, 3rem); margin: 0.5rem 0 0; }
.features__grid {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.feature {
  background: var(--c-parchment);
  border-color: rgba(19, 23, 52, 0.1);
}
.feature__icon { color: var(--c-lantern-edge); margin-bottom: 0.85rem; }
.feature__title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.2rem;
  margin: 0 0 0.4rem;
  color: var(--c-ink);
}
.feature__copy { margin: 0; font-size: 0.95rem; color: var(--c-stone); line-height: 1.55; }

@media (max-width: 960px) {
  .features__grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .features__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 7.4: Verify**

Reload. Expected:
- Tinted parchment-deep background section.
- Centered eyebrow + headline.
- 3-column grid of 6 feature cards on desktop. Each card: small orange icon, serif title, muted copy.
- Resizes to 2 columns ≤960px, 1 column ≤600px.

- [ ] **Step 7.5: Commit**

```bash
git add index.html styles.css assets/icons/
git commit -m "Add 6-card features grid with inline SVG icons"
```

---

## Task 8: Biomes showcase

**Files:**
- Modify: `index.html` (replace `<section id="biomes">`)
- Modify: `styles.css`
- Create: `assets/biomes/{bg_dusk,bg_autumn,bg_winter,bg_storm}.svg` (copied from game repo)

- [ ] **Step 8.1: Copy biome backgrounds from the game repo**

```bash
mkdir -p assets/biomes
cp /Users/dynaum/dev/games/lanterns/assets/backgrounds/bg_dusk.svg assets/biomes/
cp /Users/dynaum/dev/games/lanterns/assets/backgrounds/bg_autumn.svg assets/biomes/
cp /Users/dynaum/dev/games/lanterns/assets/backgrounds/bg_winter.svg assets/biomes/
cp /Users/dynaum/dev/games/lanterns/assets/backgrounds/bg_storm.svg assets/biomes/
ls assets/biomes/
```

Expected: four `.svg` files (no `.import` files — those are Godot-only metadata).

- [ ] **Step 8.2: Replace `<section id="biomes">`**

```html
<section id="biomes" class="section biomes">
  <div class="container">
    <header class="biomes__head">
      <p class="eyebrow">Four moods of the garden</p>
      <h2 class="display biomes__title">The biomes rotate every five levels.</h2>
    </header>
    <ol class="biomes__row" role="list">
      <li class="biome">
        <img class="biome__art" src="/assets/biomes/bg_dusk.svg" alt="Dusk biome — soft purples and a warm horizon" loading="lazy">
        <div class="biome__body"><h3 class="biome__name">Dusk</h3><p class="biome__copy">The first moths of the night. Soft, generous, slow.</p></div>
      </li>
      <li class="biome">
        <img class="biome__art" src="/assets/biomes/bg_autumn.svg" alt="Autumn biome — warm reds and orange leaves" loading="lazy">
        <div class="biome__body"><h3 class="biome__name">Autumn</h3><p class="biome__copy">Wind picks up. The swarm splits and reforms.</p></div>
      </li>
      <li class="biome">
        <img class="biome__art" src="/assets/biomes/bg_winter.svg" alt="Winter biome — cool blues and white snow" loading="lazy">
        <div class="biome__body"><h3 class="biome__name">Winter</h3><p class="biome__copy">Tougher shells, longer nights. Pace yourself.</p></div>
      </li>
      <li class="biome">
        <img class="biome__art" src="/assets/biomes/bg_storm.svg" alt="Storm biome — dark slate and lightning" loading="lazy">
        <div class="biome__body"><h3 class="biome__name">Storm</h3><p class="biome__copy">Thin beam, dense swarm, scattering aim. Bring a friend.</p></div>
      </li>
    </ol>
  </div>
</section>
```

- [ ] **Step 8.3: Append biome styles to `styles.css`**

```css
/* === BIOMES === */
.biomes__head { text-align: center; margin-bottom: 3rem; }
.biomes__title { font-size: clamp(2rem, 4.5vw, 3rem); margin: 0.5rem 0 0; }
.biomes__row {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}
.biome {
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(19, 23, 52, 0.08);
  background: var(--c-ink);
}
.biome__art {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  display: block;
}
.biome__body {
  padding: 0.85rem 1rem 1rem;
  background: var(--c-ink);
  color: var(--c-parchment);
}
.biome__name {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.05rem;
  margin: 0 0 0.25rem;
  color: var(--c-lantern-warm);
}
.biome__copy { margin: 0; font-size: 0.85rem; color: rgba(244, 234, 216, 0.75); line-height: 1.5; }

@media (max-width: 960px) {
  .biomes__row {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 70%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.5rem;
  }
  .biome { scroll-snap-align: start; }
}
```

- [ ] **Step 8.4: Verify**

Reload. Expected:
- 4-card row showing each biome's painterly background scaled to 4:3, captioned in the inverse style.
- ≤960px: cards become a horizontal snap-scroll carousel showing ~70% width per card.

- [ ] **Step 8.5: Commit**

```bash
git add assets/biomes/ index.html styles.css
git commit -m "Add biomes showcase using game's painterly backgrounds"
```

---

## Task 9: Keepers showcase

**Files:**
- Modify: `index.html` (replace `<section id="keepers">`)
- Modify: `styles.css`
- Create: `assets/keepers/{keeper_default,keeper_glass,keeper_stone,keeper_twin,keeper_wanderer}.svg` (copied from game repo)

- [ ] **Step 9.1: Copy keeper portraits from the game repo**

```bash
mkdir -p assets/keepers
cp /Users/dynaum/dev/games/lanterns/assets/keepers/keeper_default.svg assets/keepers/
cp /Users/dynaum/dev/games/lanterns/assets/keepers/keeper_glass.svg assets/keepers/
cp /Users/dynaum/dev/games/lanterns/assets/keepers/keeper_stone.svg assets/keepers/
cp /Users/dynaum/dev/games/lanterns/assets/keepers/keeper_twin.svg assets/keepers/
cp /Users/dynaum/dev/games/lanterns/assets/keepers/keeper_wanderer.svg assets/keepers/
ls assets/keepers/
```

Expected: five `.svg` files.

- [ ] **Step 9.2: Replace `<section id="keepers">`**

```html
<section id="keepers" class="section section--tinted keepers">
  <div class="container">
    <header class="keepers__head">
      <p class="eyebrow">Five ways to hold a lantern</p>
      <h2 class="display keepers__title">Pick your keeper.</h2>
      <p class="body keepers__lede">Each starts with different stats and a signature upgrade. New classes unlock as you play.</p>
    </header>
    <ol class="keepers__row" role="list">
      <li class="keeper"><img src="/assets/keepers/keeper_default.svg" alt="Default keeper portrait" loading="lazy"><h3 class="keeper__name">Keeper</h3><p class="keeper__copy">Balanced. The starting class.</p></li>
      <li class="keeper"><img src="/assets/keepers/keeper_glass.svg" alt="Glass keeper portrait" loading="lazy"><h3 class="keeper__name">Glass</h3><p class="keeper__copy">Fragile, but the beam reaches farther.</p></li>
      <li class="keeper"><img src="/assets/keepers/keeper_stone.svg" alt="Stone keeper portrait" loading="lazy"><h3 class="keeper__name">Stone</h3><p class="keeper__copy">Slow and steady. Soaks hits.</p></li>
      <li class="keeper"><img src="/assets/keepers/keeper_twin.svg" alt="Twin keeper portrait" loading="lazy"><h3 class="keeper__name">Twin</h3><p class="keeper__copy">A second lantern, slightly off-axis.</p></li>
      <li class="keeper"><img src="/assets/keepers/keeper_wanderer.svg" alt="Wanderer keeper portrait" loading="lazy"><h3 class="keeper__name">Wanderer</h3><p class="keeper__copy">Fast feet, sharper dash.</p></li>
    </ol>
  </div>
</section>
```

- [ ] **Step 9.3: Append keeper styles to `styles.css`**

```css
/* === KEEPERS === */
.keepers__head { text-align: center; margin-bottom: 3rem; }
.keepers__title { font-size: clamp(2rem, 4.5vw, 3rem); margin: 0.5rem 0 1rem; }
.keepers__lede { max-width: 30rem; margin: 0 auto; }
.keepers__row {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}
.keeper {
  text-align: center;
  background: var(--c-parchment);
  border: 1px solid rgba(19, 23, 52, 0.08);
  border-radius: 12px;
  padding: 1.25rem 1rem 1rem;
}
.keeper img {
  width: 100%;
  max-width: 120px;
  margin: 0 auto 0.85rem;
  aspect-ratio: 1;
  object-fit: contain;
}
.keeper__name {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.1rem;
  margin: 0 0 0.25rem;
  color: var(--c-ink);
}
.keeper__copy { margin: 0; font-size: 0.85rem; color: var(--c-stone); line-height: 1.5; }

@media (max-width: 960px) {
  .keepers__row {
    grid-template-columns: none;
    grid-auto-flow: column;
    grid-auto-columns: 50%;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 0.5rem;
  }
  .keeper { scroll-snap-align: start; }
}
@media (max-width: 600px) {
  .keepers__row { grid-auto-columns: 70%; }
}
```

- [ ] **Step 9.4: Verify**

Reload. Expected:
- Tinted background, centered headline + lede.
- 5-column row of keeper portraits with name + one-liner.
- ≤960px: snap-scroll carousel.
- All five SVGs render at the same visual scale (constraint by `max-width: 120px` and `aspect-ratio`).

- [ ] **Step 9.5: Commit**

```bash
git add assets/keepers/ index.html styles.css
git commit -m "Add 5-keeper showcase using game's portrait SVGs"
```

---

## Task 10: Status, press kit, feedback, footer

**Files:**
- Modify: `index.html` (replace `<section id="status">`, `<section id="press">`, `<section id="feedback">`, `<footer id="site-footer">`)
- Modify: `styles.css`

- [ ] **Step 10.1: Replace four sections in `index.html`**

```html
<section id="status" class="section status">
  <div class="container container--narrow text-center">
    <p class="eyebrow">Status</p>
    <h2 class="display status__title">In active development for Steam.</h2>
    <p class="body status__copy">Lanterns is being built in Godot 4. The most recent milestone is <strong>v0.10 — Steam prep</strong>: pause + settings, gamepad support, achievements scaffolding, and a Steam wrapper. The web demo plays the same content.</p>
    <p class="status__links">
      <a href="https://github.com/dynaum/lanterns" target="_blank" rel="noopener">View source on GitHub ↗</a>
    </p>
  </div>
</section>

<section id="press" class="section section--tinted press">
  <div class="container">
    <header class="press__head text-center">
      <p class="eyebrow">For the press</p>
      <h2 class="display press__title">Press kit</h2>
    </header>
    <div class="press__grid">
      <div class="card">
        <h3 class="press__h3">About Dynaum</h3>
        <p class="press__copy">Dynaum is a small studio of one. Lanterns is its first game — a slow, soft bullet-heaven made for late nights.</p>
      </div>
      <div class="card">
        <h3 class="press__h3">Assets</h3>
        <p class="press__copy"><a href="/assets/press/lanterns-press-kit.zip" aria-disabled="true" title="Coming soon">Press kit (zip)</a> — logo, screenshots, fact sheet. <em>Coming soon.</em></p>
      </div>
      <div class="card">
        <h3 class="press__h3">Contact</h3>
        <p class="press__copy"><a href="mailto:elber@dynaum.com">elber@dynaum.com</a></p>
      </div>
    </div>
  </div>
</section>

<section id="feedback" class="section feedback">
  <div class="container container--narrow">
    <header class="feedback__head text-center">
      <p class="eyebrow">Help shape the game</p>
      <h2 class="display feedback__title">Tell me what you thought.</h2>
      <p class="body feedback__lede">If you played the demo — even for a minute — I'd love to hear what kept you playing, what made you bounce, and what you wished was different.</p>
    </header>

    <!--
      Tally form embed slot.
      Once the Tally form exists, replace the placeholder block below with:

      <iframe
        data-tally-src="https://tally.so/embed/<form-id>?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
        loading="lazy"
        width="100%"
        height="500"
        frameborder="0"
        marginheight="0"
        marginwidth="0"
        title="Lanterns feedback"></iframe>
      <script async src="https://tally.so/widgets/embed.js"></script>
    -->
    <div class="feedback__placeholder">
      <p>The feedback form is being set up. Until then, please email <a href="mailto:elber@dynaum.com?subject=Lanterns%20feedback">elber@dynaum.com</a> — short notes are welcome.</p>
    </div>

    <p class="feedback__fallback text-center">Or reach out directly: <a href="mailto:elber@dynaum.com?subject=Lanterns%20feedback">elber@dynaum.com</a></p>
  </div>
</section>

<footer id="site-footer" class="site-footer">
  <div class="container site-footer__inner">
    <p class="site-footer__brand">
      <img src="/assets/lantern.svg" width="18" height="18" alt="">
      Lanterns © Dynaum
    </p>
    <p class="site-footer__links">
      <a href="https://github.com/dynaum/lanterns" target="_blank" rel="noopener">GitHub</a>
      <span aria-hidden="true">·</span>
      <a href="mailto:elber@dynaum.com">Email</a>
      <span aria-hidden="true">·</span>
      <span class="site-footer__made">Made with Godot 4</span>
    </p>
  </div>
</footer>
```

- [ ] **Step 10.2: Append styles for these sections to `styles.css`**

```css
/* === STATUS === */
.status__title { font-size: clamp(1.8rem, 3.6vw, 2.4rem); margin: 0.5rem 0 1.25rem; }
.status__copy { margin: 0 auto 1.5rem; max-width: 36rem; }
.status__copy strong { color: var(--c-ink); font-weight: 600; }
.status__links a {
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.04em;
}

/* === PRESS === */
.press__head { margin-bottom: 2.5rem; }
.press__title { font-size: clamp(1.8rem, 3.6vw, 2.4rem); margin: 0.5rem 0 0; }
.press__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.press__h3 {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.05rem;
  margin: 0 0 0.5rem;
}
.press__copy { margin: 0; font-size: 0.92rem; color: var(--c-stone); line-height: 1.6; }
.press__copy em { color: var(--c-stone); font-style: italic; }
@media (max-width: 720px) { .press__grid { grid-template-columns: 1fr; } }

/* === FEEDBACK === */
.feedback__head { margin-bottom: 2rem; }
.feedback__title { font-size: clamp(1.8rem, 3.6vw, 2.4rem); margin: 0.5rem 0 1rem; }
.feedback__lede { max-width: 32rem; margin: 0 auto; }
.feedback__placeholder {
  margin: 2rem auto;
  max-width: 36rem;
  padding: 1.25rem 1.5rem;
  background: var(--c-parchment-deep);
  border-left: 3px solid var(--c-lantern-edge);
  border-radius: 4px;
  text-align: center;
  color: var(--c-stone);
  font-size: 0.95rem;
}
.feedback__fallback { font-size: 0.9rem; color: var(--c-stone); }

/* === FOOTER === */
.site-footer {
  background: var(--c-ink);
  color: rgba(244, 234, 216, 0.7);
  padding: 2rem var(--section-pad-x);
  font-size: 0.85rem;
}
.site-footer__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}
.site-footer__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: var(--c-parchment);
}
.site-footer__links { margin: 0; display: inline-flex; gap: 0.6rem; align-items: center; flex-wrap: wrap; }
.site-footer__links a { color: var(--c-lantern-warm); }
.site-footer__made { color: rgba(244, 234, 216, 0.55); font-style: italic; }
```

- [ ] **Step 10.3: Verify**

Reload. Expected:
- **Status** — centered eyebrow, headline, paragraph mentioning v0.10, GitHub link.
- **Press** — tinted bg, three cards (About / Assets / Contact); the press-kit-zip link is dimmed/non-clickable and shows "Coming soon".
- **Feedback** — eyebrow, headline, lede, then a tinted placeholder card with the email fallback, and a centered email line below.
- **Footer** — dark navy bar with brand on the left, GitHub · Email · "Made with Godot 4" on the right. On narrow viewports they wrap.
- No console errors.

- [ ] **Step 10.4: Commit**

```bash
git add index.html styles.css
git commit -m "Add status, press kit, feedback, and footer sections"
```

---

## Task 11: Progressive enhancement (`app.js`)

**Files:**
- Modify: `app.js`

- [ ] **Step 11.1: Replace `app.js` contents**

```js
// Lanterns marketing site — progressive enhancement.
// Assumes the page is fully usable without this script.

(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Mobile menu toggle.
  const menuBtn = document.querySelector(".site-nav__menu");
  const mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const open = mobileMenu.hasAttribute("hidden") === false;
      if (open) {
        mobileMenu.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      } else {
        mobileMenu.removeAttribute("hidden");
        menuBtn.setAttribute("aria-expanded", "true");
      }
    });
    mobileMenu.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        mobileMenu.setAttribute("hidden", "");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Section fade-in on scroll. Skip when reduced motion is requested.
  if (!reduced && "IntersectionObserver" in window) {
    document.querySelectorAll("main > .section").forEach((el) => {
      el.classList.add("section--will-fade");
    });
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("section--faded-in");
          io.unobserve(entry.target);
        }
      }
    }, { threshold: 0.12, rootMargin: "0px 0px -10% 0px" });
    document.querySelectorAll("main > .section").forEach((el) => io.observe(el));
  }

  // 3. Demo iframe focus hint — when the user clicks the iframe, hide the hint after a beat.
  const demoFrame = document.querySelector(".demo__frame iframe");
  const demoHint = document.querySelector(".demo__hint");
  if (demoFrame && demoHint) {
    demoFrame.addEventListener("focus", () => {
      demoHint.style.opacity = "0.5";
    });
  }
})();
```

- [ ] **Step 11.2: Add fade-in CSS to `styles.css`**

Append:

```css
/* === MOTION === */
.section--will-fade { opacity: 0; transform: translateY(12px); transition: opacity 0.6s var(--ease), transform 0.6s var(--ease); }
.section--faded-in { opacity: 1; transform: none; }
```

- [ ] **Step 11.3: Verify**

Reload at `http://localhost:8000`. Expected:
- Sections fade in as you scroll (each rises ~12px and fades to opaque).
- Toggle "Reduce motion" in DevTools → Rendering → Emulate CSS prefers-reduced-motion: sections should be instantly visible.
- Resize to <720px, click hamburger → mobile menu drops down. Click any link → menu collapses and page scrolls.
- Open browser DevTools console: no errors.
- Tab through the page (keyboard only). Confirm focus rings are visible on buttons and links.

- [ ] **Step 11.4: Commit**

```bash
git add app.js styles.css
git commit -m "Add progressive enhancement: mobile menu, fade-in observer, focus hint"
```

---

## Task 12: Accessibility & responsive sweep

**Files:**
- Modify: `index.html`
- Modify: `styles.css`

- [ ] **Step 12.1: Add `lang` and skip-link**

In `index.html`, immediately after `<body>`:

```html
<a class="skip-link" href="#hero">Skip to content</a>
```

- [ ] **Step 12.2: Append skip-link + a11y CSS**

```css
/* === A11Y === */
.skip-link {
  position: absolute;
  top: -100px;
  left: 1rem;
  background: var(--c-ink);
  color: var(--c-lantern-warm);
  padding: 0.6rem 1rem;
  border-radius: 4px;
  z-index: 100;
  font-size: 0.85rem;
  font-weight: 600;
}
.skip-link:focus { top: 0.75rem; }

:focus-visible { outline-offset: 3px; }
:focus:not(:focus-visible) { outline: none; }

@media (prefers-contrast: more) {
  body { color: #000; }
  .button-ghost { border-width: 2px; }
}
```

- [ ] **Step 12.3: Run Lighthouse-style checks manually**

Open `http://localhost:8000` in Chrome:

1. **Keyboard nav:** Tab from the top. Order should be: skip link → brand → nav links → wishlist → hamburger (visible only on small viewports) → hero CTAs → demo "open in tab" → status link → press email → feedback email → footer links. No focus traps.
2. **Skip link:** First Tab press shows the orange "Skip to content" pill at top-left. Activating it jumps to `#hero`.
3. **Color contrast:** body text (`#4a4f63` on `#f4ead8`) ≥ 4.5:1 (it is — ~7:1). Lantern-warm on ink is 8:1+. Use DevTools Inspect → Accessibility tab to spot-check.
4. **Mobile:** Resize down to 360px. Confirm:
   - Hero headline doesn't overflow.
   - Demo iframe still has 4:3 aspect ratio.
   - Features grid is single-column.
   - Biomes/keepers carousel scrolls smoothly horizontally.
   - Footer wraps gracefully.
5. **Disable JavaScript** (DevTools → Settings → Disable JavaScript), reload. Confirm:
   - All content is still visible (no fade-in needed).
   - Mobile menu falls back to no-op (hamburger appears but does nothing — acceptable; the anchor links above are still usable on desktop).

- [ ] **Step 12.4: Commit**

```bash
git add index.html styles.css
git commit -m "Add skip-link and accessibility polish"
```

---

## Task 13: Local end-to-end smoke test

**Files:** none

- [ ] **Step 13.1: Run a final pass before pushing**

```bash
cd /Users/dynaum/dev/games/lanterns-site && python3 -m http.server 8000
```

Visit `http://localhost:8000` and walk through:

1. Page title in browser tab reads "Lanterns — a cozy bullet-heaven".
2. Sticky nav stays at top while scrolling.
3. Click each nav link (Play, Features, Feedback) → page smooth-scrolls to that section.
4. Hero CTAs render dimmed for Wishlist (correct, no Steam page yet) and active for Play.
5. Click "Play the demo" → scrolls to demo section (the iframe will fail to load `play.lanterns.dynaum.com` until Task 16).
6. All 6 feature cards render with icons.
7. All 4 biome backgrounds render in the showcase row.
8. All 5 keeper portraits render in the keepers row.
9. Status section's GitHub link opens `https://github.com/dynaum/lanterns` in a new tab.
10. Feedback section shows the email-fallback placeholder.
11. Footer links are clickable.
12. DevTools console: zero errors, zero warnings.
13. DevTools Network: only Google Fonts + same-origin assets (no surprise third-party requests).
14. Disable network → reload from cache → page still mostly works (font fallback to system serif/sans).

- [ ] **Step 13.2: No code changes if all green; otherwise circle back to the relevant task.**

---

## Task 14: GitHub repo creation and initial push

**Files:** none

This task involves account-level actions. The commands assume `gh` (GitHub CLI) is authenticated as the dynaum user.

- [ ] **Step 14.1: Confirm `gh` is authenticated**

```bash
gh auth status
```

Expected: prints `✓ Logged in to github.com as dynaum`. If not, run `gh auth login` first (interactive — `! gh auth login` from a Claude prompt).

- [ ] **Step 14.2: Create the GitHub repo**

```bash
cd /Users/dynaum/dev/games/lanterns-site
gh repo create dynaum/lanterns-site \
  --public \
  --description "Marketing site for Lanterns — a cozy bullet-heaven built in Godot 4." \
  --source=. \
  --remote=origin
```

Expected: prints `✓ Created repository dynaum/lanterns-site on GitHub`.

- [ ] **Step 14.3: Push `master`**

```bash
git push -u origin master
```

Expected: pushes all commits (root commit through the latest task), sets upstream to `origin/master`.

- [ ] **Step 14.4: Verify on GitHub**

```bash
gh repo view dynaum/lanterns-site --web
```

Confirm in the browser:
- Repo is public.
- README renders with the "Develop locally" section.
- All commits are visible.

---

## Task 15: Cloudflare Pages — deploy marketing site to a preview

**Files:** none (account-level configuration via the Cloudflare dashboard or `wrangler` CLI).

This task requires Cloudflare account access. Two paths are documented; pick one.

- [ ] **Step 15.1 (path A — dashboard):**

Open `https://dash.cloudflare.com → Workers & Pages → Create → Pages → Connect to Git`. Then:

1. Authorize the Cloudflare GitHub app for the `dynaum` org if not already done.
2. Pick `dynaum/lanterns-site`. Project name suggested: `lanterns-site`.
3. Production branch: `master`.
4. Build command: leave blank.
5. Build output directory: leave blank (root).
6. Click **Save and deploy**. Cloudflare will build and publish to `https://lanterns-site.pages.dev`.

- [ ] **Step 15.1 (path B — wrangler CLI):**

```bash
npx wrangler pages project create lanterns-site \
  --production-branch master
npx wrangler pages deploy . \
  --project-name lanterns-site
```

Expected: deploys current directory; returns a `*.pages.dev` URL.

- [ ] **Step 15.2: Smoke-test the preview URL**

Visit `https://lanterns-site.pages.dev` (or whatever URL Cloudflare returned). Walk the same E2E checklist from Task 13.1 — everything should look identical to local. The demo iframe will still fail (Task 16 fixes that).

- [ ] **Step 15.3: Confirm `_headers` was applied**

```bash
curl -sI https://lanterns-site.pages.dev/ | grep -i 'cache-control\|x-content-type-options\|referrer-policy'
```

Expected: `Cache-Control: public, max-age=300`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

```bash
curl -sI https://lanterns-site.pages.dev/styles.css | grep -i 'cache-control'
```

Expected: `Cache-Control: public, max-age=2592000, immutable` (assets long-cache rule).

---

## Task 16: Move the existing playable build to `play.lanterns.dynaum.com`

**Background:** the existing playable build is served by an existing Cloudflare Pages project bound to `lanterns.dynaum.com`. Per `~/Documents/obsidian/games/lanterns/hosting.md`, that project proxies to a DigitalOcean Spaces CDN (bucket `dynaum-lanterns`). We are NOT changing the storage — only adding a second custom-domain binding and removing the old one.

**Files:** none (account-level configuration).

- [ ] **Step 16.1: Identify the existing CF Pages project**

Open the Cloudflare dashboard → Workers & Pages. Find the project currently bound to `lanterns.dynaum.com` (likely named `lanterns` or similar — see `hosting.md` for the exact name). Note its name as `<game-build-project>`.

- [ ] **Step 16.2: Add `play.lanterns.dynaum.com` as a new custom domain on that project**

Project → Custom domains → **Set up a custom domain** → enter `play.lanterns.dynaum.com`. Cloudflare will provide a CNAME target like `<game-build-project>.pages.dev`.

- [ ] **Step 16.3: Add the DNS CNAME at DigitalOcean**

DNS for `dynaum.com` is on DigitalOcean. Open the DigitalOcean DNS panel for `dynaum.com` and add:

```
Type:  CNAME
Host:  play.lanterns
Value: <game-build-project>.pages.dev
TTL:   300
```

- [ ] **Step 16.4: Wait for DNS to propagate, then smoke-test**

```bash
dig +short play.lanterns.dynaum.com CNAME
curl -sI https://play.lanterns.dynaum.com/ | head -5
```

Expected: CNAME resolves to the pages.dev hostname; `https://play.lanterns.dynaum.com/` returns 200 and serves `index.html`.

Open `https://play.lanterns.dynaum.com/` — confirm the playable game loads and is interactive.

- [ ] **Step 16.5: Add `frame-ancestors` so the iframe in the marketing site is allowed to embed it**

Two options depending on whether the existing project's content includes `_headers`:

**Option A (preferred — edit the playable build's repo):** open the source repo for the playable build, edit (or create) `_headers`, add:

```
/*
  Content-Security-Policy: frame-ancestors 'self' https://lanterns.dynaum.com https://lanterns-site.pages.dev https://*.lanterns-site.pages.dev
  X-Frame-Options: ALLOW-FROM https://lanterns.dynaum.com
```

Commit, push, and let CF Pages redeploy.

**Option B (if the playable build is uploaded directly without `_headers`):** in the Cloudflare dashboard for the playable build's project → Settings → Headers → add a Transform rule that sets `Content-Security-Policy: frame-ancestors 'self' https://lanterns.dynaum.com https://*.lanterns-site.pages.dev` for all responses.

- [ ] **Step 16.6: Verify framing works**

In a browser, visit `https://lanterns-site.pages.dev/#play`. The iframe should now show the running game. Inspect Network → Response Headers on the iframe document; confirm `Content-Security-Policy` lists `frame-ancestors` including `https://*.lanterns-site.pages.dev`.

If the iframe is blank with a console error like "Refused to display in a frame", the header isn't being applied — re-check 16.5.

---

## Task 17: Production cutover — flip `lanterns.dynaum.com` to the new project

**Files:** none.

This is the visible switchover. Visitors hitting `lanterns.dynaum.com` will see the marketing site after this step, with the demo iframe pulling from `play.lanterns.dynaum.com`.

- [ ] **Step 17.1: Pre-flight checklist**

Confirm before flipping:
- `https://lanterns-site.pages.dev` shows the marketing site as expected (Task 15).
- `https://play.lanterns.dynaum.com` shows the playable build (Task 16).
- The iframe at `https://lanterns-site.pages.dev/#play` successfully embeds the game (Task 16.6).

If any are red, do not flip yet.

- [ ] **Step 17.2: Remove `lanterns.dynaum.com` from the old project**

Cloudflare dashboard → `<game-build-project>` → Custom domains → next to `lanterns.dynaum.com`, **Remove**. (Keep `play.lanterns.dynaum.com`.)

- [ ] **Step 17.3: Add `lanterns.dynaum.com` to the new project**

Cloudflare dashboard → `lanterns-site` project → Custom domains → **Set up a custom domain** → enter `lanterns.dynaum.com`. Cloudflare may auto-update DNS at DigitalOcean if it manages the zone; if not, it will print the required CNAME target.

- [ ] **Step 17.4: Update the DigitalOcean CNAME if needed**

```bash
dig +short lanterns.dynaum.com CNAME
```

If the CNAME still points at the old project's `*.pages.dev`, edit the DNS record on DigitalOcean to point at `lanterns-site.pages.dev`.

- [ ] **Step 17.5: Verify the cutover**

```bash
curl -sI https://lanterns.dynaum.com/ | head -5
curl -sS https://lanterns.dynaum.com/ | grep -o '<title>[^<]*</title>'
```

Expected: 200 response; title contains "Lanterns — a cozy bullet-heaven".

In a clean browser (or incognito), open `https://lanterns.dynaum.com/`. Walk the E2E checklist (Task 13.1) one more time. Pay special attention to:
- Demo iframe loads the game in-place.
- No mixed-content warnings.
- All anchor links work.

- [ ] **Step 17.6: Tag and announce**

```bash
git tag v1.0-launch
git push origin v1.0-launch
```

Optionally update `~/Documents/obsidian/games/lanterns/hosting.md` to reflect the new topology (marketing site at `lanterns.dynaum.com`, playable build at `play.lanterns.dynaum.com`).

---

## Self-review notes

- **Spec coverage:** every spec section maps to at least one task — domain plan (15, 16, 17), all 11 page sections (3–10), visual system (2), file layout (1), placeholders (kept as labelled placeholders inside Tasks 4, 5, 6, 10).
- **Type/name consistency:** CSS class names, file paths, and section IDs are consistent across tasks. The same section IDs declared in Task 1 (`hero`, `play`, `about`, `features`, `biomes`, `keepers`, `status`, `press`, `feedback`) are referenced by anchor links in the nav (Task 3) and used as scroll targets in `app.js` smooth-scroll (Task 11 — handled by browser native via `<html scroll-behavior:smooth>`).
- **No placeholders in the plan itself:** the only "placeholders" are the explicitly-labelled visitor-facing ones called out in the spec (Tally form, Steam wishlist URL, gameplay clip, press kit zip), each with a clearly-bounded swap step described inline.
- **Risk validation:** the `frame-ancestors` risk from the spec is addressed in Task 16.5 with two concrete options.
