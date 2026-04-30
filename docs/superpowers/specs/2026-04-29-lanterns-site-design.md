# Lanterns marketing site — design

**Status:** approved 2026-04-29
**Owner:** elber@dynaum.com
**Scope:** v1 single-page marketing site for Lanterns, separate from the game repo, hosted on Cloudflare Pages at `lanterns.dynaum.com`.

## Purpose

Show the game and collect structured player feedback. Secondary goals: drive Steam wishlists once the store page exists, give press a single landing page with assets.

## Non-goals (v1)

- No CMS or headless content layer; copy lives in `index.html`.
- No JS framework, no build step, no `package.json`.
- No analytics in v1 (revisit when traffic is non-zero).
- No localization in v1 (English only).
- No blog / changelog page.
- No live Steam widget yet — store page does not exist.

## Domain & hosting

- Marketing site: `lanterns.dynaum.com`, served by Cloudflare Pages, auto-deployed from `master` of `dynaum/lanterns-site`.
- Existing playable web build (currently at `lanterns.dynaum.com` via CF Pages → DO Spaces) moves to a new subdomain `play.lanterns.dynaum.com`.
- Switchover plan: ship the new site to a `*.pages.dev` preview, manually flip the production custom-domain binding when verified. Zero-downtime.
- DNS work: one new CNAME `play.lanterns.dynaum.com → <new pages project>.pages.dev`. The existing CNAME on `lanterns.dynaum.com` keeps the same target string; the CF Pages project bound to that hostname is what gets swapped.
- See `~/Documents/obsidian/games/lanterns/hosting.md` for the existing topology.

## Page architecture

Single page, scroll-driven, anchor nav. Sections in render order:

1. **Sticky top nav** — wordmark left, anchor links right (Play · Features · Feedback), small "Wishlist" pill far right. Collapses to hamburger below 720px.
2. **Hero** — moon SVG, eyebrow "A cozy bullet-heaven · 1–2 players · Godot 4", big serif headline mixing roman + italic, tagline, two pill CTAs (Play Demo / Wishlist Steam). Centered, generous whitespace.
3. **Live demo embed** — `<iframe src="https://play.lanterns.dynaum.com">` at 4:3 aspect-ratio with soft border, "Click to focus, then WASD to play" hint, "Open in new tab" escape link.
4. **What is it** — 2–3 paragraphs of cozy positioning copy + one short looping gameplay clip (placeholder MP4/GIF until recorded).
5. **Features grid** — 6 cards: Auto-aim combat · 17 upgrades · 5 keepers · Local co-op · Procedural audio · Painterly biomes. Each card has a small inline-SVG icon + 1-line description.
6. **Biomes showcase** — 4 horizontal panels (Dusk · Autumn · Winter · Storm) using `bg_*.svg` copied from the game repo, each with a name + flavor line.
7. **Keepers showcase** — 5 portraits using `keeper_*.svg` copied from the game repo, with class name + 1-line description.
8. **Status / roadmap** — short paragraph: "In active development for Steam launch. Most recent milestone: Steam prep (v0.10)." + GitHub repo link. No public dates.
9. **Press kit** — dev blurb, downloadable `lanterns-press-kit.zip` (logo SVG, 3–4 screenshots, fact sheet), contact email.
10. **Feedback** — Tally form embed slot (`<iframe>` with placeholder `data-tally-src` URL until account exists; one-line swap when ready). "Or email feedback to elber@dynaum.com" fallback below.
11. **Footer** — © Dynaum, GitHub link, social slots, "made with Godot 4".

## Visual system

Direction: cozy editorial (Option B from brainstorming). Cream parchment, big serif, centered, soft pill CTAs, magazine-like whitespace.

### Palette (mapped from game's `palette.gd`)

| Role | Token | Hex |
|---|---|---|
| Background | parchment | `#f4ead8` |
| Section divider tint | parchment-deep | `#e9dcc4` |
| Ink (headings, body strong) | sky-deep | `#131734` |
| Body text muted | stone | `#4a4f63` |
| Italic / link / eyebrow | lantern-edge | `#c97e3a` |
| Filled CTA, lantern glow | lantern-warm | `#f6c177` |
| Inverse-section bg (demo) | sky-deep | `#131734` |
| Inverse-section text | parchment | `#f4ead8` |

### Typography

- **Display / headings**: Fraunces (variable serif, supports italic personality at large sizes) via Google Fonts `<link>` with `font-display: swap`.
- **Body / UI**: Inter via Google Fonts.
- Fonts self-hostable later if performance matters; v1 uses CDN `<link>`.

### Components

- `.button-primary` — sky-deep fill, lantern-warm text, 999px radius, uppercase tracked.
- `.button-ghost` — transparent + 1.5px ink border, otherwise same shape.
- `.eyebrow` — small uppercase tracked label.
- `.card` — feature/biome/keeper card.
- `.section` — vertical rhythm: 5rem desktop, 3rem ≤720px.

### Motion

- Section-appear fade-in via IntersectionObserver, ~0.4s ease-out, runs once.
- CSS keyframe glow-pulse on the hero lantern (4s loop, prefers-reduced-motion respected).
- No parallax. No autoplay video. No hover effects beyond color/opacity transitions.

### Responsive

- Single breakpoint at 720px. Centered editorial layout collapses cleanly.
- Biomes/keepers horizontal showcases become CSS-snap horizontal carousels on narrow viewports.

## File layout

```
lanterns-site/
├── index.html
├── styles.css
├── app.js                 # ~30 lines: nav highlight, fade-in observer, demo focus hint
├── assets/
│   ├── moon.svg
│   ├── lantern.svg
│   ├── icons/             # 6 feature icons
│   ├── biomes/            # bg_dusk/autumn/winter/storm.svg copied from game repo
│   ├── keepers/           # keeper_default/glass/stone/twin/wanderer.svg copied from game repo
│   └── press/             # logo.svg, screenshots/, lanterns-press-kit.zip
├── CNAME                  # lanterns.dynaum.com (used by CF Pages custom-domain config)
├── _headers               # cache-control + frame-ancestors so the demo iframe loads
├── _redirects             # reserved for future short URLs
├── README.md
├── .gitignore
└── docs/superpowers/specs/2026-04-29-lanterns-site-design.md
```

No build step. Local dev: `python -m http.server 8000`.

## Placeholders to fill in later

| Slot | Where | Replacement |
|---|---|---|
| Steam wishlist URL | hero CTA + nav pill | `https://store.steampowered.com/app/<appid>` once Steamworks app is live |
| Tally form ID | feedback section | swap one `data-tally-src` URL |
| Gameplay clip | "What is it" section | 6–10s looping `.mp4` (h264) + `.gif` fallback |
| Screenshots & press zip | press kit | 3–4 PNGs + zipped bundle |
| Discord link | footer | optional |

## Risks and mitigations

- **DNS flip leaves visitors on a stale page** — solved by the manual swap-after-verify plan; no scripted DNS change.
- **iframe embed of `play.lanterns.dynaum.com` blocked by frame-ancestors** — `_headers` on the play subdomain must allow framing from `lanterns.dynaum.com`. Validated as part of the implementation plan.
- **Fonts CDN outage** — fall back to system serif/sans via the font stack in CSS.
- **Tally never gets set up** — the placeholder iframe is hidden by default; the "or email feedback" fallback is the live capture path until then.
- **The empty Steam wishlist link looks broken** — the button is rendered as disabled with a "Steam page coming soon" tooltip until the URL is swapped in.

## Out-of-scope follow-ups (not in this spec)

- Press kit polish (screenshots, fact sheet PDF).
- Recording the gameplay clip.
- Creating the Tally account and form.
- Future blog/changelog when there's content to share.
- Analytics / Plausible if traffic warrants.
