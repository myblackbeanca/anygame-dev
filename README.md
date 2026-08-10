# anygame.dev

**The New Engine: AI in Game Development — Research Report 2026**

An interactive research resource tracking AI adoption in game development. Industry data on AI tools, open-source engines, market analysis, and founder strategy for 2026–2030.

🌐 **Live site:** [https://anygame.dev](https://anygame.dev)

## What's inside

- **AI Tools Explorer** — categorized view of game-dev AI tools with usage data
- **Open Source** — Godot growth chart and ecosystem analysis
- **Case Studies** — Roblox economy and Age of Empires deep dives, with interactive charts
- **Geographic Markets** — five-region breakdown (NA, EU, Asia-Pacific, LATAM, MENA) with side-by-side comparisons
- **Future Outlook** — 2026–2030 timeline of industry shifts
- **Stakeholder list** — email + role + affiliation signup powered by a Cloudflare Worker writing to D1 (`anygame_subscribers`). See `workers/newsletter/README.md` for setup and export commands.

## Stack

- **Frontend:** Vite + React + TypeScript, Tailwind CSS, Radix UI primitives, Recharts
- **Hosting:** Vercel (static SPA at `dist/public/`)
- **Newsletter API:** Cloudflare Workers (`api.anygame.dev/subscribe`)
- **DNS:** Cloudflare (apex + `www` + `api`)

## Local development

```bash
pnpm install
pnpm dev              # Vite dev server on :3000
pnpm fetch-snapshots  # Pull latest JSON from public anygame-data (optional for local)
pnpm build            # fetch-snapshots + vite build → dist/public/
pnpm preview          # Preview the production build locally
pnpm check            # TypeScript type-check
pnpm format           # Prettier
```

### Enable the commit-author guard (once per clone)

```bash
git config core.hooksPath scripts/hooks
```

Vercel refuses to build a commit whose author it cannot resolve to a GitHub
user — the deploy lands as `state=BLOCKED` at 0ms with no build logs while
GitHub Actions stays green, which reads like a billing or abuse problem rather
than an authorship one. Coding agents cause this by overriding the author
per-commit (`--author`, `-c user.email=…`), so the repo's own git config looks
correct the whole time. `scripts/hooks/pre-commit` checks the *effective*
author and blocks the commit before it can reach Vercel. Override for a single
commit with `ALLOW_UNVERIFIED_AUTHOR=1`.

## Data snapshots (build-time)

Published engine-index and minigame-terms JSON live in the **private** repo [`myblackbeanca/anygame-data`](https://github.com/myblackbeanca/anygame-data). Before every production build, `scripts/fetch-snapshots.sh` fetches via the GitHub Contents API (requires `GITHUB_TOKEN` configured in CI/Vercel):

- `…/engine-index/engine-index-latest.json` → `client/public/data/engine-index-latest.json`
- `…/minigame-terms/minigame-terms.json` → `client/public/data/minigame-terms.json`

If the fetch fails, committed fallbacks in `client/public/data/` are kept (build still succeeds). Panel ops/schemas are **not** here — private [`collectivewinca/anygame-panel`](https://github.com/collectivewinca/anygame-panel).

## Project layout

```
client/                   Vite React app (source)
  ├── index.html          App entry
  ├── public/             Static assets copied to build root
  │   └── data/           Snapshot JSON (fallback + build-time fetch target)
  └── src/
      ├── pages/Home.tsx  Main page (sections + NewsletterSection)
      └── components/     UI components

scripts/fetch-snapshots.sh  Pull public anygame-data JSON before vite build
workers/newsletter/         Cloudflare Worker for newsletter signups
shared/                     Types/utilities shared with the worker
vercel.json                 Vercel routing + outputDirectory
vite.config.ts              Vite config (outputs to dist/public/)
```

## Deployment

Pushes to `main` auto-deploy via the Vercel ↔ GitHub integration (`buildCommand` runs fetch-snapshots then `pnpm build`). The Cloudflare Worker is deployed manually with `wrangler deploy` from `workers/newsletter/`.

## License

MIT
