# Marketing site — handoff for tomorrow's cutover

**Date written:** 2026-04-30
**Status of work tonight:** Marketing site fully built, deployed to a CF Pages preview URL, and auto-deploying on every push to master. The production cutover (DNS flip + game URL move) is **paused** to coordinate with the parallel mobile-friendly game work.

## What's already live

- **Marketing site preview**: <https://lanterns-site.pages.dev/>
- **GitHub repo**: <https://github.com/dynaum/lanterns-site> (public, master tracks origin/master)
- **Auto-deploy**: GitHub Actions workflow pushes the repo to CF Pages on every commit to master. Workflow lives at `.github/workflows/deploy.yml`. Secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are already set on the repo.

## What's intentionally deferred

Anything that touches the existing `lanterns` CF Pages project, the live `lanterns.dynaum.com` URL, or the game's `_headers`. Those are shared with the mobile agent's work-in-progress and should only move once that work is in a stable place.

## Cutover steps (run tomorrow, in order)

### 1. Confirm the marketing site looks right

Open <https://lanterns-site.pages.dev/> on desktop and on a phone. Walk through:

- Hero renders, glow pulse on the moon
- Demo iframe section — the iframe currently shows "refused to connect" or empty. That gets fixed in step 4.
- Features grid (6 cards)
- Biomes showcase (4 painterly cards) — they should look like sunset / autumn / winter / storm. If they're blank, see "Known quirk" at the bottom.
- Keepers showcase (5 portraits)
- Status, press kit, feedback, footer all render

If anything's off, push a fix to master and the auto-deploy will redeploy in ~30 seconds.

### 2. Wait for the mobile agent to land their work on `master` of `dynaum/lanterns`

Don't move forward until the mobile-friendly game work is committed and the existing CI has uploaded a fresh build to DO Spaces. Easy way to verify: visit <https://lanterns.dynaum.com/> and confirm the latest mobile work is reachable there.

### 3. Add `play.lanterns.dynaum.com` to the existing `lanterns` CF Pages project

Two paths — pick one.

**A. Cloudflare dashboard (one click):**

Dashboard → Workers & Pages → `lanterns` → Custom domains → **Set up a custom domain** → enter `play.lanterns.dynaum.com` → save. CF will auto-provision a TLS cert.

**B. CF API:**

```sh
source ~/.local_config
curl -sS -X POST \
  "https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/pages/projects/lanterns/domains" \
  -H "Authorization: Bearer ${CLOUDFLARE_API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"name":"play.lanterns.dynaum.com"}' | python3 -m json.tool
```

Either way: do **not** remove `lanterns.dynaum.com` from this project yet — the game is still live at that URL.

### 4. Add the DNS CNAME for the new subdomain

DNS is on DigitalOcean. Update Terraform in `dynaum/digitalocean-infra/lanterns.tf` (preferred), or one-shot via doctl:

```sh
source ~/.local_config
doctl compute domain records create dynaum.com \
  --record-type CNAME \
  --record-name play.lanterns \
  --record-data lanterns.pages.dev. \
  --record-ttl 300
```

If you go the Terraform route, the change should mirror the existing `lanterns` record — same target, just a different host. After applying, run `dig +short play.lanterns.dynaum.com CNAME` and confirm it returns `lanterns.pages.dev.` (may take a couple of minutes).

### 5. Add `frame-ancestors` so the iframe embed works

The marketing site embeds the game in an iframe at `<section id="play">`. Modern browsers block iframes by default unless the embedded site explicitly allows it. Add this to the **game repo's** `_headers` (create it if it doesn't exist) at `dynaum/lanterns`:

```
/*
  Content-Security-Policy: frame-ancestors 'self' https://lanterns.dynaum.com https://lanterns-site.pages.dev https://*.lanterns-site.pages.dev https://play.lanterns.dynaum.com
```

Commit + push. CI will redeploy the game. Once it's live, visit <https://lanterns-site.pages.dev/#play> in a browser and confirm the iframe loads the game (DevTools → Network → look for the iframe document, check that the response has the `frame-ancestors` directive in the CSP header).

If you'd rather not edit the game repo right now, you can also add this header via Cloudflare dashboard → `lanterns` project → Settings → Headers → add a transform rule. Same effect.

### 6. Smoke-test the new game URL

```sh
curl -sI https://play.lanterns.dynaum.com/ | head -5
```

Expect `HTTP/2 200`. Open it in a browser, confirm the game runs.

### 7. Flip `lanterns.dynaum.com` to the marketing site

This is the actual cutover. Order matters here:

1. Cloudflare dashboard → `lanterns-site` project → Custom domains → **Set up a custom domain** → enter `lanterns.dynaum.com`. CF will tell you to update the CNAME (it's already pointing at `lanterns.pages.dev`, which CF Pages handles — it'll route to whichever project has the binding). It should validate immediately.
2. Cloudflare dashboard → `lanterns` project → Custom domains → next to `lanterns.dynaum.com`, click **Remove**. (Keep `play.lanterns.dynaum.com` and `lanterns.pages.dev`.)

Both projects continue to share the `lanterns.pages.dev` proxy hostname during the transition; CF routes by binding so there shouldn't be downtime.

### 8. Final verification

In a clean browser (incognito):

- <https://lanterns.dynaum.com/> → marketing site, with the iframe at `#play` showing the running game
- <https://play.lanterns.dynaum.com/> → playable game directly
- DevTools console: no errors
- Mobile viewport: layout collapses cleanly, iframe is still 4:3

### 9. Tag the launch

```sh
cd /Users/dynaum/dev/games/lanterns-site
git tag v1.0-launch
git push origin v1.0-launch
```

Update `~/Documents/obsidian/games/lanterns/hosting.md` with the new topology so future-you doesn't re-derive it.

---

## Known quirks worth noting

- **Lazy-load + screenshot tools.** The biomes and keeper portraits use `loading="lazy"` and only fetch when scrolled near the viewport. Real users see them fine. Some screenshot tools / static crawlers won't trigger the lazy load and will appear to show empty cards. This is expected behavior; the page is correct.
- **Fade-in failsafe.** Sections start invisible and fade in via IntersectionObserver as you scroll. A 1.5s `setTimeout` failsafe in `app.js` reveals anything still hidden after that window, so search bots and screenshot tools never see a permanently blank page.
- **Steam wishlist button.** Currently `aria-disabled` with a "coming soon" tooltip. When the Steamworks app is live, swap the `href` on `#hero-wishlist` to the real store URL and remove `aria-disabled`.
- **Tally feedback form.** Currently a placeholder with an email-fallback. There's an HTML comment in `index.html` showing the exact 2-line embed change once the Tally form exists.
- **Press kit zip.** Linked from the press section, currently 404 (link is `aria-disabled`). Drop a real `lanterns-press-kit.zip` at `assets/press/` and remove the `aria-disabled`.

---

## What changed and where (today)

| Commits on `lanterns-site` master | What |
|---|---|
| `48a9bf1` | Spec |
| `76a2143` | Plan |
| `7cfa355`–`595d20e` | Tasks 1–10 — site sections built |
| `495dfc0` | Task 11 — progressive enhancement |
| `77a41d6` | Task 12 — a11y + SEO meta polish |
| `e291ee5` | Fade-in failsafe |
| `1618850` | Local-artifact gitignore |
| `15073dc` | Cleaner `_headers` so `/assets/*` actually long-caches |
| `3d0dfe5` | GitHub Actions auto-deploy |

**Current production deploy URL:** `https://lanterns-site.pages.dev/`. Each push to master triggers a new deploy (visible at <https://github.com/dynaum/lanterns-site/actions>).
