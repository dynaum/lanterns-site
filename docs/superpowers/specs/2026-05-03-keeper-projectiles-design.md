# Keeper Projectiles on Marketing Site — Design

## Problem

The keepers section on `lanterns.dynaum.com` advertises five distinct keeper classes, each with a "signature projectile" (Ember Orb, Moonbeam, Cinder Shard, Twin Chord). Today these are surfaced only as small text badges (e.g., "火 Ember Orb"). Visitors can't *see* what differentiates the keepers — the page makes the claim ("Five ways to hold a lantern") without delivering the visual proof.

The game already ships fully-designed animated SVG projectiles (developed for the v1.0 mokuhanga art direction). These exist in the design package at `~/Downloads/lanterns-design/redesign-lanterns.jsx` but are not yet on the marketing site.

## Goals

- Add an animated visual representation of each keeper's signature projectile to the keeper card.
- Reinforce the mokuhanga art direction (woodblock print, EB Garamond, the existing INK palette).
- No new dependencies, no JS framework, no canvas — keep the site as the static HTML/CSS/SVG it is today.
- Respect `prefers-reduced-motion`.
- Keep page weight low (the projectiles ship as small standalone SVGs, lazy-loaded).

## Non-Goals

- Not a redesign of the keeper card layout. Existing card structure (portrait → name → copy → badge) is preserved.
- Not a new "Signature Projectiles" section. Projectiles live inline within the keeper card they belong to.
- Not animating the keeper portraits or anything else.

## Design

### Asset format

Four standalone SVG files in `assets/projectiles/`:

- `ember.svg` — Ember Orb (used by The Keeper *and* Wandering Light)
- `moonbeam.svg` — Moonbeam (Glass Lantern)
- `cinder.svg` — Cinder Shard (Stone Keeper)
- `twin.svg` — Twin Chord (Twin Lantern)

Each SVG is ported from the JSX source in `redesign-lanterns.jsx` (functions `FireballEmber`, `FireballMoon`, `FireballShard`, `FireballTwin`). Animations stay as embedded SMIL (`<animate>`, `<animateTransform>`) — these play natively in modern browsers when referenced via `<img>`. No JS runtime needed.

Differences from the JSX source:

- **No dark `<radialGradient>` backdrop.** SVG renders on transparent canvas so the keeper card tint shows through.
- **No label/kanji text inside the SVG.** The existing card badge already carries the projectile name and kanji.
- **viewBox cropped** from 460×320 to 460×120 (vertically tight around the projectile motion at y=160) so the strip renders compact.
- **INK colors inlined** (no `window.INK` reference). Use the same hex values: flame `#f4b042`, ember `#e06b2a`, cinder `#9a3220`, rose `#c8607a`, moonbeam blues from the source, etc.

### Card layout

Inside each `<li class="keeper">`, insert a new node between the existing `<p class="keeper__copy">` and the `<span class="keeper__badge">`:

```html
<div class="keeper__projectile">
  <img src="/assets/projectiles/ember.svg" alt="Ember Orb projectile" loading="lazy">
</div>
```

Result:

```
[portrait img]
[h3 name]
[p copy]
[projectile strip]   ← new
[badge]
```

### Styling

In `styles.css`, after the `.keeper__badge` block:

```css
.keeper__projectile {
  width: 100%;
  max-width: 160px;
  margin: 0.6rem 0 0.2rem;
  aspect-ratio: 460 / 120;
  display: block;
}
.keeper__projectile img {
  width: 100%;
  height: 100%;
  display: block;
}

@media (prefers-reduced-motion: reduce) {
  .keeper__projectile { display: none; }
}
```

For reduced motion, hide the strip entirely. The text badge below still communicates the projectile name + kanji, so no information is lost. (Simpler than a static-fallback SVG variant; revisit later if needed.)

### Accessibility

- Each `<img>` has descriptive `alt` text.
- `prefers-reduced-motion: reduce` removes the animated strip entirely (text badge remains).
- `loading="lazy"` so the projectiles don't block initial paint.

## Implementation Notes

- All four SVG files are ported by hand from the JSX, preserving every animation (translate, halo pulse, core flicker, trail particles, sparks). No animation timing changes.
- The Wanderer keeper card reuses `/assets/projectiles/ember.svg` — same file, same motion. Consistent with game data.
- Page weight: each SVG is ~3-6 KB uncompressed. Total added weight: ~20 KB across 4 files (lazy-loaded).

## Verification

After implementation, confirm in a browser at `lanterns.dynaum.com` (or local preview) that:

- All 5 keeper cards show an animated projectile strip between the copy and the badge.
- Animations loop smoothly (~2-2.6s cycle).
- Card layout still snap-scrolls cleanly on mobile (60% width per card on ≤600px).
- `prefers-reduced-motion: reduce` (set via OS or DevTools emulation) hides the strip.
- No console errors, no layout shift.

## Out of Scope / Follow-ups

- Static-frame fallback SVGs for reduced-motion users (currently we just hide).
- Showing projectiles anywhere else on the site (status section, hero, etc.).
- Adding the missing yokai/biome assets from the design package.
