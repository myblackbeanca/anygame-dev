# Minigame Distribution Terms Table — Maintenance Model Options

Saved during brainstorm July 19, 2026. Revisit when the table proves its worth and the maintenance pattern needs to evolve.

## Decision (July 19, 2026)
**Chosen: Option 2 — Static table + monthly platform-doc diff check.**

Static table on anygame.dev `/minigame-terms`, hand-maintained from official dev docs + conference transcripts, with a monthly cron that fetches the public dev docs pages (TikTok, Discord) and flags any changed terms for manual review. WeChat terms are tracked via manual monitoring of GameTeahouse + 36kr conference coverage (their docs aren't publicly scrape-able in English). Quarterly full refresh, monthly diff-check, "last verified" date per row, source link per cell.

## The four options

### 1. Static hand-maintained table, quarterly updates (was the recommended default)
- One page, one table, one human maintaining it
- Sourced from official docs + conference coverage
- **Cost:** $0
- **Effort:** ~2 hours/quarter for full refresh
- **Tradeoff accepted:** can drift stale between quarterly updates, but the "last verified" date makes staleness honest
- **When to revisit:** if staleness becomes a reader complaint, or if a platform changes terms and anygame.dev misses it for a quarter

### 2. Static table + monthly platform-doc diff check ✅ CHOSEN
- Same static page as option 1
- Monthly cron fetches the official dev docs pages (TikTok's `developers.tiktok.com/doc/mini-games-overview`, Discord's `discord.com/developer-newsletter`) and diffs against last month's snapshot, flagging changes for manual review
- WeChat tracked manually via GameTeahouse + 36kr conference coverage (docs aren't English-scrapeable)
- **Cost:** $0 (Vercel cron free tier)
- **Effort:** ~1 week to build the diff-checker cron + ~30 min/month for the flagged-review pass
- **ToS risk:** none (fetching public docs pages, not authenticated endpoints)
- **Defensibility:** high — catches changes faster than quarterly, still human-verified before publish
- **Tradeoff accepted:** 1 week build investment upfront; WeChat coverage stays manual; diff-check only catches changes on the specific docs URLs we monitor, not the broader policy
- **Cron spec:** Vercel function `/api/minigame-terms-diff` runs on the 1st of each month, fetches the docs pages, stores a snapshot in the repo (`docs/minigame-terms-snapshots/`), diffs against last month's, emails/Slacks a changelog for manual review

### 3. Dynamic table backed by PocketBase
- Terms live in a PB collection on `miny-database.exe.xyz`
- `/minigame-terms` page renders from the PB API, admin-edited
- **Cost:** $0 (VM already paid for)
- **Effort:** ~1-2 weeks (PB collection + admin view + render pipeline)
- **Tradeoff accepted:** real infrastructure, but the table becomes editable without redeploying the site; could share the collection with the founder panel
- **When to revisit:** if the static table needs to be updated more than once a month and redeploying the site each time becomes friction

### 4. Crowd-sourced table with panelist submissions
- Founder panelists submit term changes they encounter (their payout % changed, a new incentive program) → review queue → publish
- **Cost:** $0 (extends the panel PB collection)
- **Effort:** ~2 weeks (submission flow + review queue + admin view)
- **Tradeoff accepted:** highest maintenance signal, but turns the panel into a terms-update sensor network; most defensible long-term
- **When to revisit:** once the panel is 20+ active and the diff-checker (option 2) is consistently behind what panelists are noticing in real time

## What v0.1 (option 2) actually looks like

### The table (August brief deliverable)
Page: anygame.dev `/minigame-terms`

Columns per platform:
- Platform name
- Standard revenue share (% to dev)
- Incentive programs (new-game bonuses, rev-share holidays)
- Payout threshold + cadence
- IAA vs IAP split support
- Engine/SDK support (Unity, Cocos, Godot, Phaser, etc.)
- Content moderation / qualification review
- iOS payments status
- Last verified date
- Source link (per cell where possible)

Platforms covered in v0.1:
1. **WeChat Mini Games** — from GameTeahouse 25-Year Performance Report (July 2026) + 36kr Developers Conference coverage
2. **TikTok Mini Games** — from TikTok dev docs + BigSpy guide (Feb 2026)
3. **Discord Activities + Game Shop** — from Discord dev newsletter (Dec 2025) + StraySpark GDC 2026 analysis

Quarterly refresh windows: August 2026 (launch), November 2026, February 2027, May 2027.

### The diff-checker cron
- Vercel function `/api/minigame-terms-diff`
- Runs on the 1st of each month via Vercel cron
- Fetches:
  - `https://developers.tiktok.com/doc/mini-games-overview` (TikTok)
  - `https://discord.com/developer-newsletter/` (Discord — list page, then latest issue)
  - WeChat: skip (not English-scrapeable); manual monitor GameTeahouse + 36kr RSS
- Diffs against last month's snapshot stored in `docs/minigame-terms-snapshots/YYYY-MM/`
- If diff detected: posts a changelog to `docs/minigame-terms-changelog.md` and emails/Sends a Slack notification for manual review
- If no diff: silently updates the snapshot, no notification
- Manual review pass (~30 min/month): read the changelog, update the static table if needed, bump the "last verified" date, redeploy

### The static data
- `client/public/data/minigame-terms.json` — the table data, committed to the repo
- `/minigame-terms` page renders from this JSON via the existing Vite build
- Methodology + changelog at the bottom of the page

## Versioning
- v0.1 (August 2026): static table with 3 platforms, manual WeChat + diff-checked TikTok/Discord, quarterly refresh commitment
- v0.2 (Q4 2026): add Facebook Instant Games, CrazyGames, itch.io HTML5 terms; consider option 3 (PB-backed) if updates become frequent
- v0.3 (Q1 2027): consider option 4 (crowd-sourced from panel) once panel is 20+ active
- v1.0 (when panel + diff-checker + per-title revenue are all live): the definitive English-language minigame distribution reference