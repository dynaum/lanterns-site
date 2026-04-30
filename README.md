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
