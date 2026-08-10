# Repo Structure — Three Deliverables

Saved during brainstorm July 19, 2026. Revisit if the content/data split creates friction.

## Decision (July 19, 2026; amended July 21, 2026)
**Chosen: Option 4 — SPA for reader-facing pages, separate repos for data pipelines.**

Keep the index/panel/terms render pages in the existing `anygamedev-ai-hub` Vite SPA.

**Two data repos (split 2026-07-21):**

| Repo | Visibility | Holds |
|---|---|---|
| [`myblackbeanca/anygame-data`](https://github.com/myblackbeanca/anygame-data) | **Private** | Engine-index snapshots, minigame-terms JSON + HTML snapshots, public methodology, kaggle/ summaries + insights, optional anonymized `panel-results/` |
| [`collectivewinca/anygame-panel`](https://github.com/collectivewinca/anygame-panel) | **Private** | PB schemas/migrations, recruitment/reminder runbooks, named contacts |

Why split: `anygame-data` is fetched at build time via GitHub Contents API with `GITHUB_TOKEN` (private), which keeps methodology and intermediate snapshots off the public web. Panelist PII and recruitment ops must stay private.

The SPA consumes static JSON from **private** `anygame-data` via build-time fetch (GitHub Contents API, `GITHUB_TOKEN` required). Clean separation between the editorial surface (anygame.dev) and the data plumbing (how the numbers get made).

## The four options

### 1. All three as new routes in the existing SPA (was the recommended default)
- `/engine-index`, `/panel`, `/panel/admin`, `/minigame-terms`
- Backend is PB on the existing MINY VM
- **Cost:** $0
- **Effort:** lowest — one repo, one deploy
- **Tradeoff accepted:** SPA bundle already ~1MB; three more data-heavy pages will push it higher. Mitigate with `React.lazy` + Suspense.
- **When to revisit:** if bundle size becomes a real perf problem

### 2. Index + Terms in the SPA, Panel as a separate repo
- Panel has the most backend surface (auth, form, admin, reminder emails) → own repo + deploy
- **Cost:** $0
- **Effort:** medium — two repos, two deploys
- **Tradeoff accepted:** two repos to maintain; panel loses the editorial-flow adjacency
- **When to revisit:** if panel backend outgrows the simple PB-collection pattern

### 3. All three as separate repos under anygame.dev umbrella
- `anygame-engine-index`, `anygame-panel`, `anygame-terms`
- Each on a subdomain (`index.anygame.dev`, `panel.anygame.dev`, `terms.anygame.dev`)
- **Cost:** $0 (Vercel free tier covers all three)
- **Effort:** highest — 3x infra overhead
- **Tradeoff accepted:** maximum separation of concerns, but you lose the single-page editorial flow that makes anygame.dev read as one product
- **When to revisit:** if any one deliverable outgrows anygame.dev and deserves its own brand

### 4. SPA for reader-facing pages, separate repo for data pipelines ✅ CHOSEN
- Keep index/panel/terms render pages in the existing `anygamedev-ai-hub` SPA
- Public `anygame-data` holds: SteamDB manual snapshot runbooks, Boxleiter calc workbooks, canonical snapshot JSON, minigame-terms table + diff snapshots, public methodology
- Private `anygame-panel` holds: PB collection schemas/migrations, recruitment/reminder runbooks, named contacts
- The SPA consumes static JSON from public `anygame-data` via:
  - **(a) git submodule** — SPA pins a path into `anygame-data/` as a submodule, copies JSON at build time
  - **(b) periodic PR** — data repo opens a PR against the SPA repo when snapshots update; SPA merge deploys
  - **(c) npm package** — data repo publishes `@anygame/data` as a package; SPA imports it
  - **(d) build-time fetch** — SPA's Vercel build fetches the latest JSON from a raw GitHub URL in the **public** data repo
- **Cost:** $0
- **Effort:** medium — two extra repos, SPA side stays simple
- **ToS risk:** none
- **Defensibility:** high — methodology is visible and versioned in the public data repo; panel ops stay private
- **Tradeoff accepted:** SPA-rendered content depends on a sync mechanism; panel ops is a second repo to remember
- **Chosen sync mechanism (v0.1):** (d) build-time fetch of **stable** public paths:
  - `https://raw.githubusercontent.com/myblackbeanca/anygame-data/main/engine-index/engine-index-latest.json`
  - `https://raw.githubusercontent.com/myblackbeanca/anygame-data/main/minigame-terms/minigame-terms.json`

## What v0.1 (option 4) actually looks like

### `anygamedev-ai-hub` (existing repo, reader-facing)
New routes:
- `/engine-index` — renders engine-share table + crosstabs from static JSON
- `/panel` — founder panel form (writes to PB via `/api/panel-pulse` Vercel function)
- `/panel/admin` — auth-guarded admin view (reads from PB)
- `/minigame-terms` — renders terms table + changelog from static JSON
- `/methodology` — documents the index + panel + terms data sources, sync mechanism, and known limitations

Build-time fetch (`scripts/fetch-snapshots.sh` before `vite build`):
- Pulls the two stable public URLs into `client/public/data/`
- Falls back to the last-committed snapshot if the fetch fails (so a network blip doesn't break the build)

### `anygame-data` (public — created 2026-07-21)
```
anygame-data/
  engine-index/
    snapshot-YYYY-MM/raw/
    engine-index-latest.json     — stable SPA URL target
    fetch-snapshot.md
  minigame-terms/
    minigame-terms.json           — stable SPA URL target
    snapshots/YYYY-MM/
    changelog.md
  panel-results/                 — optional anonymized aggregates later
  methodology/
    engine-index-methodology.md
    minigame-terms-methodology.md
```

### `anygame-panel` (private — created 2026-07-21)
```
anygame-panel/
  schema.md
  migrations/
  reminder-email.md
  recruitment-email-template.md
  panel-methodology.md
  contacts/                      — named prospects; avoid committing CSVs with emails
```

### Deployment
- `anygamedev-ai-hub` → Vercel (existing) → anygame.dev
- `anygame-data` → public GitHub only (no deploy). Diff-checker: GitHub Action here or Vercel cron in SPA — pick at v0.2
- `anygame-panel` → private GitHub only (no deploy)
- PocketBase → `miny-database.exe.xyz` (existing VM, extended with new collections)

### Sync mechanism (v0.1: option d — build-time fetch)
- `anygamedev-ai-hub` Vercel build runs `scripts/fetch-snapshots.sh` before `vite build`
- Fetches stable public raw URLs (verified 200 without auth)
- If fetch fails: warn in build log, fall back to last-committed `client/public/data/*.json`
- Placeholder JSON already on `main` (`status: "placeholder"`); SPA should render an empty/not-yet-published state until real snapshots land

## Versioning
- v0.1 (August 2026): **repos created** (public `anygame-data` + private `anygame-panel`); first real `engine-index` + `minigame-terms` payloads; SPA build-time fetch wired
- v0.2 (September 2026): PB collections for the panel go live from `anygame-panel/schema.md`; reminder-email runbook tested
- v0.3 (Q4 2026): diff-checker cron deployed (GitHub Action in `anygame-data`); sync mechanism reviewed — if build-time fetch is flaky, switch to option (b) periodic PR
- v1.0 (when all three pipelines are stable): public `anygame-data` README is the definitive methodology reference; SPA is purely a render layer