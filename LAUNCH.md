# Launch — what's live and where it lives

**Tagged:** `v1.0-launch` on 2026-04-30.

## Live URLs

- <https://lanterns.dynaum.com> — marketing site (this repo)
- <https://play.lanterns.dynaum.com> — playable demo (Godot 4 web build, same proxy as before, just on a new subdomain)
- <https://lanterns-site.pages.dev> — preview / staging clone of the marketing site (auto-deployed alongside production)

## How a deploy reaches production

Marketing site:
- Push to `master` of `dynaum/lanterns-site` → GitHub Actions runs `.github/workflows/deploy.yml` → wrangler uploads to Cloudflare Pages → `lanterns.dynaum.com` and `lanterns-site.pages.dev` both serve the new build within ~30 seconds.
- Repo secrets used by the workflow: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

Playable build:
- Unchanged from before. Push to `master` of `dynaum/lanterns` → existing CI builds Godot HTML5 → uploads to DO Spaces bucket `dynaum-lanterns` → CF Pages proxy (project `lanterns`, source in `dynaum/digitalocean-infra/_worker.js`) serves it at `play.lanterns.dynaum.com`.
- The proxy worker now injects `Content-Security-Policy: frame-ancestors` allowing the marketing site to embed the demo via iframe.

## Subdomain bindings

| Hostname | DNS CNAME → | CF Pages project |
|---|---|---|
| `lanterns.dynaum.com` | `lanterns-site.pages.dev.` | `lanterns-site` (this repo) |
| `play.lanterns.dynaum.com` | `lanterns.pages.dev.` | `lanterns` (proxy → DO Spaces) |
| `lanterns-site.pages.dev` | (CF-managed) | `lanterns-site` |
| `lanterns.pages.dev` | (CF-managed) | `lanterns` |

## Placeholders that ship as TBD

| Slot | What to do |
|---|---|
| Steam wishlist URL | When the Steamworks app exists, swap the `href` on `#hero-wishlist` in `index.html` to the real store URL and remove `aria-disabled="true"` from both buttons (hero + sticky nav). |
| Tally form embed | Replace the commented placeholder in the feedback section of `index.html` with the actual `<iframe data-tally-src=...>` block (the comment shows the exact swap). |
| Gameplay clip | Drop a 6–10s `loop.mp4` (h264) at `assets/clips/loop.mp4`, then update the `.about__clip` block in `index.html` to render a `<video autoplay muted loop playsinline>` instead of the placeholder div. |
| Press kit zip | Drop `assets/press/lanterns-press-kit.zip` and remove `aria-disabled` from the Assets card link. |
| og:image | Drop `assets/press/og.png` (1200×630). The meta tag is already wired. |
| Screenshots | Once the screenshot pipeline (Slice S of `2026-05-03-tier3-steam-launch.md`) commits curated PNGs to `dynaum/lanterns/marketing/screenshots/`, copy them here: `cp ../lanterns/marketing/screenshots/ss-*.png assets/press/screenshots/` — or rename the curated picks to match: `ss-solo.png`, `ss-pick.png`, `ss-boss.png`, `ss-coop.png`, `ss-biome.png`. The `#screenshots` section on the site shows placeholder slots until the files exist. |

## Instagram launch assets

In `~/Documents/lanterns-launch/`:

- `lanterns-instagram-1080x1080.png` — the square post.
- `lanterns-instagram-source.html` — the source for the image (regenerate at any size by serving + screenshotting).
- `lanterns-instagram-caption.md` — three caption options (short, medium, story-form) plus posting tips and Story-format alternates.
