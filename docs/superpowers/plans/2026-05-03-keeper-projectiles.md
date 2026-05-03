# Keeper Projectiles Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an animated SVG projectile (Ember Orb / Moonbeam / Cinder Shard / Twin Chord) inline within each of the five keeper cards on the marketing site.

**Architecture:** Four standalone SVG files live under `assets/projectiles/`. Each is a port of the JSX components in `~/Downloads/lanterns-design/redesign-lanterns.jsx` (`FireballEmber`, `FireballMoon`, `FireballShard`, `FireballTwin`) — same SMIL `<animate>`/`<animateTransform>` motion, but with the dark backdrop and label text removed and the viewBox cropped tight around the motion. Each keeper `<li>` in `index.html` gets a new `<div class="keeper__projectile"><img src="..."></div>` between its copy and badge. CSS in `styles.css` sizes the strip and hides it under `prefers-reduced-motion`.

**Tech Stack:** Static HTML, CSS, SVG. No JS framework, no build step. Site is served by Cloudflare Pages from this repo's master branch.

**Spec:** `docs/superpowers/specs/2026-05-03-keeper-projectiles-design.md`

**Note on testing:** This is a static HTML/CSS/SVG site with no automated test runner. Verification is performed in a browser (local server + Chrome DevTools MCP). The plan uses browser-based verification steps in place of unit tests.

---

### Task 1: Create the Ember Orb SVG

**Files:**
- Create: `assets/projectiles/ember.svg`

- [ ] **Step 1: Write `assets/projectiles/ember.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 80 460 160" role="img" aria-label="Ember Orb projectile">
  <defs>
    <radialGradient id="e-flame" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fff3c8" stop-opacity="1"/>
      <stop offset="35%" stop-color="#f4b042" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#e06b2a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#9a3220" stop-opacity="0"/>
    </radialGradient>
    <filter id="e-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
    <radialGradient id="e-trail" cx="0.85" cy="0.5" r="0.6">
      <stop offset="0%" stop-color="#f4b042" stop-opacity="0.85"/>
      <stop offset="60%" stop-color="#e06b2a" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#9a3220" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g>
    <animateTransform attributeName="transform" type="translate"
      from="-380 0" to="120 0" dur="2.2s" repeatCount="indefinite"/>
    <ellipse cx="280" cy="160" rx="220" ry="18" fill="url(#e-trail)" filter="url(#e-halo)">
      <animate attributeName="rx" values="200;230;200" dur="0.4s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="350" cy="160" r="60" fill="url(#e-flame)" filter="url(#e-halo)">
      <animate attributeName="r" values="56;66;56" dur="0.5s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0.85;1;0.85" dur="0.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="350" cy="160" r="22" fill="#e06b2a">
      <animate attributeName="r" values="20;24;21;23;20" dur="0.35s" repeatCount="indefinite"/>
    </circle>
    <circle cx="350" cy="160" r="14" fill="#f4b042">
      <animate attributeName="r" values="13;15;13" dur="0.28s" repeatCount="indefinite"/>
    </circle>
    <circle cx="346" cy="156" r="6" fill="#fff8d8">
      <animate attributeName="cx" values="346;348;345;347;346" dur="0.3s" repeatCount="indefinite"/>
      <animate attributeName="cy" values="156;155;157;156" dur="0.3s" repeatCount="indefinite"/>
    </circle>
    <path d="M 372 160 Q 388 154 396 160 Q 388 166 372 160" fill="#fff8d8">
      <animate attributeName="d"
        values="M 372 160 Q 388 154 396 160 Q 388 166 372 160;M 372 160 Q 390 156 400 160 Q 390 164 372 160;M 372 160 Q 388 154 396 160 Q 388 166 372 160"
        dur="0.25s" repeatCount="indefinite"/>
    </path>
  </g>
  <g fill="#f4b042">
    <circle cx="230" cy="150" r="1.4">
      <animate attributeName="cx" values="230;140" dur="0.9s" begin="0.045s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.9;0" dur="0.9s" begin="0.045s" repeatCount="indefinite"/>
    </circle>
    <circle cx="270" cy="172" r="1.4">
      <animate attributeName="cx" values="270;180" dur="0.9s" begin="0.18s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.9;0" dur="0.9s" begin="0.18s" repeatCount="indefinite"/>
    </circle>
    <circle cx="190" cy="156" r="1.4">
      <animate attributeName="cx" values="190;100" dur="0.9s" begin="0.315s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.9;0" dur="0.9s" begin="0.315s" repeatCount="indefinite"/>
    </circle>
    <circle cx="250" cy="178" r="1.4">
      <animate attributeName="cx" values="250;160" dur="0.9s" begin="0.45s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.9;0" dur="0.9s" begin="0.45s" repeatCount="indefinite"/>
    </circle>
    <circle cx="210" cy="144" r="1.4">
      <animate attributeName="cx" values="210;120" dur="0.9s" begin="0.585s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.9;0" dur="0.9s" begin="0.585s" repeatCount="indefinite"/>
    </circle>
    <circle cx="260" cy="166" r="1.4">
      <animate attributeName="cx" values="260;170" dur="0.9s" begin="0.72s" repeatCount="indefinite"/>
      <animate attributeName="opacity" values="0;0.9;0" dur="0.9s" begin="0.72s" repeatCount="indefinite"/>
    </circle>
  </g>
</svg>
```

- [ ] **Step 2: Verify the file opens and animates in a browser**

Run: `open assets/projectiles/ember.svg`
Expected: An orange/amber glowing orb sweeps left to right across the canvas, pulsing every ~0.5s, with small spark particles trailing behind it. Loops every 2.2s.

If no animation: check that no `<animate>` or `<animateTransform>` elements were dropped during file write.

- [ ] **Step 3: Commit**

```bash
git add assets/projectiles/ember.svg
git commit -m "Add Ember Orb projectile SVG (Keeper/Wanderer signature)"
```

---

### Task 2: Create the Moonbeam SVG

**Files:**
- Create: `assets/projectiles/moonbeam.svg`

- [ ] **Step 1: Write `assets/projectiles/moonbeam.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 80 460 160" role="img" aria-label="Moonbeam projectile">
  <defs>
    <radialGradient id="m-flame" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fff3c8" stop-opacity="1"/>
      <stop offset="35%" stop-color="#bce8ff" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#7ab8d8" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#3a5a7a" stop-opacity="0"/>
    </radialGradient>
    <filter id="m-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <g>
    <animateTransform attributeName="transform" type="translate"
      from="-380 0" to="120 0" dur="2.6s" repeatCount="indefinite"/>
    <ellipse cx="280" cy="160" rx="220" ry="14" fill="#bce8ff" opacity="0.3" filter="url(#m-halo)">
      <animate attributeName="opacity" values="0.22;0.4;0.22" dur="0.9s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="350" cy="160" r="58" fill="url(#m-flame)" filter="url(#m-halo)">
      <animate attributeName="r" values="54;62;54" dur="1.1s" repeatCount="indefinite"/>
    </circle>
    <circle cx="350" cy="160" r="20" fill="#bce8ff">
      <animate attributeName="r" values="18;22;18" dur="0.7s" repeatCount="indefinite"/>
    </circle>
    <circle cx="350" cy="160" r="13" fill="#e6f6ff"/>
    <circle cx="346" cy="156" r="5" fill="#ffffff">
      <animate attributeName="opacity" values="0.7;1;0.7" dur="0.6s" repeatCount="indefinite"/>
    </circle>
    <g fill="none" stroke="#e6f6ff" stroke-width="0.8" opacity="0.7">
      <animateTransform attributeName="transform" type="rotate"
        from="0 350 160" to="360 350 160" dur="6s" repeatCount="indefinite"/>
      <path d="M 350 138 L 360 158 L 350 178 L 340 158 Z"/>
      <line x1="332" y1="160" x2="368" y2="160"/>
    </g>
    <g fill="#bce8ff">
      <circle cx="240" cy="148" r="1.3">
        <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" begin="0s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="240;180" dur="1.2s" begin="0s" repeatCount="indefinite"/>
      </circle>
      <circle cx="200" cy="170" r="1.3">
        <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="200;140" dur="1.2s" begin="0.3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="280" cy="174" r="1.3">
        <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="280;220" dur="1.2s" begin="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="160" cy="156" r="1.3">
        <animate attributeName="opacity" values="0;0.9;0" dur="1.2s" begin="0.9s" repeatCount="indefinite"/>
        <animate attributeName="cx" values="160;100" dur="1.2s" begin="0.9s" repeatCount="indefinite"/>
      </circle>
    </g>
  </g>
</svg>
```

- [ ] **Step 2: Verify in browser**

Run: `open assets/projectiles/moonbeam.svg`
Expected: A pale blue/white glowing orb sweeps left to right (~2.6s loop), with a slowly rotating diamond-shape facet shimmer overlay and trailing motes. Pulses gentler than the ember version.

- [ ] **Step 3: Commit**

```bash
git add assets/projectiles/moonbeam.svg
git commit -m "Add Moonbeam projectile SVG (Glass Lantern signature)"
```

---

### Task 3: Create the Cinder Shard SVG

**Files:**
- Create: `assets/projectiles/cinder.svg`

- [ ] **Step 1: Write `assets/projectiles/cinder.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 80 460 160" role="img" aria-label="Cinder Shard projectile">
  <defs>
    <radialGradient id="s-flame" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fff3c8" stop-opacity="1"/>
      <stop offset="35%" stop-color="#ffb87a" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#c0512a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#5a1d10" stop-opacity="0"/>
    </radialGradient>
    <filter id="s-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <g>
    <animateTransform attributeName="transform" type="translate"
      from="-380 0" to="120 0" dur="2.0s" repeatCount="indefinite"/>
    <ellipse cx="280" cy="160" rx="200" ry="12" fill="#e06b2a" opacity="0.4" filter="url(#s-halo)">
      <animate attributeName="opacity" values="0.3;0.5;0.3" dur="0.4s" repeatCount="indefinite"/>
    </ellipse>
    <circle cx="350" cy="160" r="48" fill="url(#s-flame)" filter="url(#s-halo)">
      <animate attributeName="r" values="44;52;44" dur="0.45s" repeatCount="indefinite"/>
    </circle>
    <g>
      <animateTransform attributeName="transform" type="rotate"
        from="0 352 160" to="360 352 160" dur="1.4s" repeatCount="indefinite"/>
      <path d="M 332 144 L 364 138 L 376 156 L 372 176 L 348 182 L 328 168 Z"
            fill="#7d7468" stroke="#1a1626" stroke-width="1.4"/>
      <path d="M 338 152 L 354 162 L 362 174" stroke="#f4b042" stroke-width="1.6" fill="none">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="0.3s" repeatCount="indefinite"/>
      </path>
      <path d="M 352 144 L 358 158" stroke="#fff3c8" stroke-width="1.2" fill="none"/>
      <path d="M 344 170 L 360 168" stroke="#f4b042" stroke-width="1.2" fill="none"/>
    </g>
    <g fill="#7d7468" stroke="#1a1626" stroke-width="0.8">
      <path d="M 250 150 L 260 144 L 266 152 L 258 158 Z">
        <animate attributeName="opacity" values="0;0.85;0" dur="1s" begin="0s" repeatCount="indefinite"/>
      </path>
      <path d="M 210 164 L 220 158 L 226 166 L 218 172 Z">
        <animate attributeName="opacity" values="0;0.85;0" dur="1s" begin="0.25s" repeatCount="indefinite"/>
      </path>
      <path d="M 170 150 L 180 144 L 186 152 L 178 158 Z">
        <animate attributeName="opacity" values="0;0.85;0" dur="1s" begin="0.5s" repeatCount="indefinite"/>
      </path>
    </g>
  </g>
</svg>
```

- [ ] **Step 2: Verify in browser**

Run: `open assets/projectiles/cinder.svg`
Expected: A burnt-orange/red glowing orb sweeps left to right (~2.0s loop, the fastest), with a tumbling rocky shard rotating at the center and small ash chunks trailing behind. The fire glow flickers rapidly.

- [ ] **Step 3: Commit**

```bash
git add assets/projectiles/cinder.svg
git commit -m "Add Cinder Shard projectile SVG (Stone Keeper signature)"
```

---

### Task 4: Create the Twin Chord SVG

**Files:**
- Create: `assets/projectiles/twin.svg`

- [ ] **Step 1: Write `assets/projectiles/twin.svg`**

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 80 460 160" role="img" aria-label="Twin Chord projectile">
  <defs>
    <radialGradient id="t-flameA" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fff3c8" stop-opacity="1"/>
      <stop offset="35%" stop-color="#f4b042" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#e06b2a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#9a3220" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="t-flameB" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0%" stop-color="#fff3c8" stop-opacity="1"/>
      <stop offset="35%" stop-color="#c8607a" stop-opacity="0.85"/>
      <stop offset="70%" stop-color="#9a3a5a" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#5a1f3a" stop-opacity="0"/>
    </radialGradient>
    <filter id="t-halo" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="14"/>
    </filter>
  </defs>
  <g>
    <animateTransform attributeName="transform" type="translate"
      from="-380 0" to="120 0" dur="2.4s" repeatCount="indefinite"/>
    <ellipse cx="270" cy="130" rx="200" ry="10" fill="#f4b042" opacity="0.32" filter="url(#t-halo)"/>
    <ellipse cx="270" cy="190" rx="200" ry="10" fill="#c8607a" opacity="0.32" filter="url(#t-halo)"/>
    <g>
      <animateTransform attributeName="transform" type="translate"
        values="0 0; 0 8; 0 0; 0 -8; 0 0" dur="1.2s" repeatCount="indefinite"/>
      <circle cx="350" cy="130" r="40" fill="url(#t-flameA)" filter="url(#t-halo)">
        <animate attributeName="r" values="36;44;36" dur="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="350" cy="130" r="14" fill="#f4b042"/>
      <circle cx="350" cy="130" r="8" fill="#fff8d8"/>
    </g>
    <g>
      <animateTransform attributeName="transform" type="translate"
        values="0 0; 0 -8; 0 0; 0 8; 0 0" dur="1.2s" repeatCount="indefinite"/>
      <circle cx="350" cy="190" r="40" fill="url(#t-flameB)" filter="url(#t-halo)">
        <animate attributeName="r" values="36;44;36" dur="0.6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="350" cy="190" r="14" fill="#c8607a"/>
      <circle cx="350" cy="190" r="8" fill="#ffe0e8"/>
    </g>
    <path stroke="#e8dcb8" stroke-width="1.2" fill="none" opacity="0.7">
      <animate attributeName="d"
        values="M 350 142 Q 360 160 350 178;M 350 142 Q 340 160 350 178;M 350 142 Q 360 160 350 178"
        dur="1.2s" repeatCount="indefinite"/>
    </path>
  </g>
</svg>
```

- [ ] **Step 2: Verify in browser**

Run: `open assets/projectiles/twin.svg`
Expected: Two orbs sweep left to right (~2.4s loop) — gold on top, rose on bottom — drifting vertically toward and away from each other, connected by a wavering filament. Each orb pulses individually.

- [ ] **Step 3: Commit**

```bash
git add assets/projectiles/twin.svg
git commit -m "Add Twin Chord projectile SVG (Twin Lantern signature)"
```

---

### Task 5: Add CSS for the projectile strip

**Files:**
- Modify: `styles.css` (append after the `.keeper__badge` block at line 442-455)

- [ ] **Step 1: Read current CSS to confirm insertion point**

Read `styles.css` around line 455 to confirm `.keeper__badge` block ends there and the next section (`/* === YOKAI === */`) begins at line 457.

- [ ] **Step 2: Insert the new CSS block**

Insert these rules immediately after the line `.keeper__badge .kanji { font-size: 0.9rem; line-height: 1; }` (line 455) and before the comment `/* === YOKAI === */`:

```css

/* === KEEPER PROJECTILE === */
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

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "Style keeper projectile strip; hide for prefers-reduced-motion"
```

---

### Task 6: Wire up the projectile `<img>` in each keeper card

**Files:**
- Modify: `index.html:198-204` (the five `<li class="keeper">` elements)

- [ ] **Step 1: Read the current keeper list to confirm structure**

Read `index.html` lines 198-205. Each `<li>` should match the pattern:
`<li class="keeper"><img src=".../keeper_X.svg" ...><h3>...</h3><p>...</p><span class="keeper__badge">...</span></li>`

- [ ] **Step 2: Replace each of the 5 keeper `<li>` lines**

Replace **line 199** (The Keeper):

```html
      <li class="keeper"><img src="/assets/keepers/keeper_default.svg" alt="The Keeper portrait" loading="lazy"><h3 class="keeper__name">The Keeper</h3><p class="keeper__copy">Balanced. 3 petals, steady stride. Always unlocked.</p><div class="keeper__projectile"><img src="/assets/projectiles/ember.svg" alt="Ember Orb projectile" loading="lazy"></div><span class="keeper__badge"><span class="kanji">火</span> Ember Orb</span></li>
```

Replace **line 200** (Glass Lantern):

```html
      <li class="keeper"><img src="/assets/keepers/keeper_glass.svg" alt="Glass Lantern portrait" loading="lazy"><h3 class="keeper__name">Glass Lantern</h3><p class="keeper__copy">1 petal, faster lantern, longer reach. Unlocks at Level 5.</p><div class="keeper__projectile"><img src="/assets/projectiles/moonbeam.svg" alt="Moonbeam projectile" loading="lazy"></div><span class="keeper__badge"><span class="kanji">月</span> Moonbeam</span></li>
```

Replace **line 201** (Stone Keeper):

```html
      <li class="keeper"><img src="/assets/keepers/keeper_stone.svg" alt="Stone Keeper portrait" loading="lazy"><h3 class="keeper__name">Stone Keeper</h3><p class="keeper__copy">5 petals, slower stride and lantern. Unlocks at Level 10.</p><div class="keeper__projectile"><img src="/assets/projectiles/cinder.svg" alt="Cinder Shard projectile" loading="lazy"></div><span class="keeper__badge"><span class="kanji">炭</span> Cinder Shard</span></li>
```

Replace **line 202** (Twin Lantern):

```html
      <li class="keeper"><img src="/assets/keepers/keeper_twin.svg" alt="Twin Lantern portrait" loading="lazy"><h3 class="keeper__name">Twin Lantern</h3><p class="keeper__copy">2 petals. Begins with Twin Flame already lit.</p><div class="keeper__projectile"><img src="/assets/projectiles/twin.svg" alt="Twin Chord projectile" loading="lazy"></div><span class="keeper__badge"><span class="kanji">双</span> Twin Chord</span></li>
```

Replace **line 203** (Wandering Light — reuses ember.svg):

```html
      <li class="keeper"><img src="/assets/keepers/keeper_wanderer.svg" alt="Wandering Light portrait" loading="lazy"><h3 class="keeper__name">Wandering Light</h3><p class="keeper__copy">Fast as the wind. Fewer petals, slower lantern. Unlocks at Level 15.</p><div class="keeper__projectile"><img src="/assets/projectiles/ember.svg" alt="Ember Orb projectile" loading="lazy"></div><span class="keeper__badge"><span class="kanji">火</span> Ember Orb</span></li>
```

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Wire up animated projectiles inside each keeper card"
```

---

### Task 7: End-to-end browser verification

**Files:** none modified — this is verification only.

- [ ] **Step 1: Start a local static server**

Run (in background):

```bash
cd /Users/dynaum/dev/games/lanterns-site && python3 -m http.server 8765
```

Confirm `http://localhost:8765/` serves `index.html`.

- [ ] **Step 2: Open the keepers section in Chrome via Chrome DevTools MCP**

Use `mcp__plugin_chrome-devtools-mcp_chrome-devtools__new_page` (or `navigate_page`) with URL `http://localhost:8765/#keepers`.

- [ ] **Step 3: Take a screenshot to confirm all 5 cards show projectile strips**

Use `mcp__plugin_chrome-devtools-mcp_chrome-devtools__take_screenshot`.
Expected: Each of the 5 keeper cards has an animated projectile strip visible between the descriptive paragraph and the pill-shaped badge. Strip is roughly the same width as the badge (~140-160px), with no clipping or overflow.

- [ ] **Step 4: Check browser console for errors**

Use `mcp__plugin_chrome-devtools-mcp_chrome-devtools__list_console_messages`.
Expected: No errors related to SVG files (no 404s, no SMIL warnings).

- [ ] **Step 5: Test mobile breakpoint**

Use `mcp__plugin_chrome-devtools-mcp_chrome-devtools__resize_page` with 375×812 (iPhone-ish).
Take another screenshot.
Expected: Keeper cards still snap-scroll horizontally, projectile strip scales proportionally inside each card, no overflow or layout shift.

- [ ] **Step 6: Test prefers-reduced-motion**

Use `mcp__plugin_chrome-devtools-mcp_chrome-devtools__emulate` (CSS feature `prefers-reduced-motion: reduce`).
Take screenshot.
Expected: Projectile strips are completely hidden in all 5 cards. The text badge remains visible. Card spacing collapses gracefully (no awkward empty gap).

- [ ] **Step 7: Stop the local server**

Kill the background `python3 -m http.server` process.

- [ ] **Step 8: No commit needed (verification only)**

If any of the above checks fail, return to the relevant earlier task to fix and re-verify.

---

## Self-Review Notes

- **Spec coverage:** All four projectiles created (Tasks 1-4). Card layout change (Task 6). CSS sizing + reduced-motion (Task 5). Accessibility via alt text (Task 6) and reduced-motion hide (Task 5). Verification covers all spec verification points (Task 7).
- **Type/path consistency:** SVG file names (`ember.svg`, `moonbeam.svg`, `cinder.svg`, `twin.svg`) match between Tasks 1-4 (creation) and Task 6 (referenced in `<img src>`). CSS class `.keeper__projectile` matches between Task 5 (definition) and Task 6 (usage).
- **No placeholders:** Every SVG body is shown in full. Every HTML replacement line is given verbatim. CSS block is complete.
