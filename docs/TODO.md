# anygame.dev — TODO

Tracked work for anygame.dev. Checked items are done and deployed. Unchecked items are planned.

## August 2026 Deliverables (in priority order)

### 1. Steam Engine-Share Index v0.1
*Decision: manual snapshot, static JSON in public `anygame-data`. See `docs/brainstorm-engine-index-data-sources.md` + `docs/brainstorm-repo-structure.md`.*

- [x] Create public `anygame-data` repo + private `anygame-panel` sibling (2026-07-21)
- [ ] `anygame-data/engine-index/snapshot-2026-08/` — pull top 500 Steam releases trailing 12mo from steamdb.info/tech/
- [ ] Run Boxleiter revenue estimates in spreadsheet (reviews × multiplier × price, genre-adjusted)
- [ ] Publish `engine-index-2026-08.json` and overwrite `engine-index/engine-index-latest.json`
- [ ] Build `/engine-index` page in the SPA — renders table + engine × genre × revenue-band crosstabs from static JSON
- [x] Build-time fetch (`scripts/fetch-snapshots.sh`) — pull stable raw URLs into `client/public/data/` before Vite build:
  - `https://raw.githubusercontent.com/myblackbeanca/anygame-data/main/engine-index/engine-index-latest.json`
  - `https://raw.githubusercontent.com/myblackbeanca/anygame-data/main/minigame-terms/minigame-terms.json`
- [x] Fallback to last-committed JSON if fetch fails (so network blip doesn't break the build)
- [ ] Build `/methodology` page — documents SteamDB detection rules + known undercounts (Godot, GameMaker, Construct, LibGDX, HTML5), Boxleiter multiplier ranges, confidence bands, manual snapshot date
- [ ] Publish alongside the August trend brief
- [ ] Add `/engine-index` card to Home's Trend Briefs section

### 2. Indie Founder Panel (self-hosted on MINY PocketBase)
*Decision: extend `miny-database.exe.xyz` PocketBase, custom form on `/panel`. Schemas/runbooks in private `collectivewinca/anygame-panel`. See `docs/brainstorm-panel-survey-instrument.md`.*

- [x] Private `anygame-panel` repo scaffolded (schema draft, reminder/recruitment runbooks)
- [ ] Create PocketBase collections on `miny-database.exe.xyz` (apply from `anygame-panel/schema.md`):
  - `founder_panelists` — name, role, studio, engine_primary, joined_at, active, public_bio_url
  - `founder_panel_pulses` — panelist_id (relation), pulse_month, engine_choice, engine_switch_intent, ai_tooling_spend_usd, distribution_mix (JSON), top_friction (text), quote_ok (bool), submitted_at
- [ ] Build `/panel` page — 5-question monthly form, PocketBase auth (emailed monthly link), matches Editorial Intelligence design system
- [ ] Build `/api/panel-pulse` Vercel function — proxy to PB (mirrors existing `/api/newsletter` pattern)
- [ ] Build `/panel/admin` — auth-guarded, lists responses by month, export to JSON
- [ ] Recruit 5 existing contacts from July brief (Żywiczyński, Lockerby, Last, Kaye, Sole Survivor Games)
- [ ] Recruit 15-25 more named indie CEOs (target: 20-30 by September)
- [ ] Send first monthly pulse — August 2026
- [ ] First panel results published in the September brief

### 3. Minigame Distribution Terms Table
*Decision: static table + monthly diff-check cron in public `anygame-data`. See `docs/brainstorm-minigame-terms-table.md`.*

- [x] Placeholder `minigame-terms/minigame-terms.json` + `changelog.md` on public raw URL (200 OK)
- [ ] `anygame-data/minigame-terms/minigame-terms.json` — initial 3-platform table (WeChat, TikTok, Discord Activities)
  - Columns: platform, standard rev share %, incentive programs, payout threshold + cadence, IAA/IAP support, engine/SDK support, content moderation, iOS payments status, last verified, source link
  - Sources: GameTeahouse 25-Year Performance Report (WeChat), TikTok dev docs, Discord dev newsletter + StraySpark GDC 2026
- [ ] Build `/minigame-terms` page — renders from static JSON + changelog at bottom
- [ ] Add `/minigame-terms` card to Home's Trend Briefs section (or a new "Reference" section)
- [ ] Quarterly refresh commitment documented on the page (Aug / Nov / Feb / May)

### 4. Diff-checker cron (data plumbing, in `anygame-data`)
- [ ] Vercel function or GitHub Action runs on the 1st of each month
- [ ] Fetches `developers.tiktok.com/doc/mini-games-overview` + `discord.com/developer-newsletter/`
- [ ] Diffs against last month's snapshot in `anygame-data/minigame-terms/snapshots/`
- [ ] If diff detected: append to `minigame-terms/changelog.md` + send notification for manual review
- [ ] WeChat tracked manually (GameTeahouse + 36kr RSS — not English-scrapeable)

## Shipped — July 2026

See `CHANGELOG.md` for the reverse-chronological record of what's already live.

- [x] July 2026 Gaming Trend Brief at `/julytrends`
- [x] July brief as lead card in Home's Trend Briefs section
- [x] Self-hosted (removed all here.now CTAs from July brief)
- [x] Deep research report on concrete next moves (published separately)
- [x] freeintelligence.ai/miny-play card upgraded with deep links to /julytrends + next-moves report
- [x] Related Briefs footer on /julytrends linking to gaming-relevant FI briefs
- [x] JuneGames, JuneTech, XboxReset made fully self-hosted + Related Briefs footers added
- [x] All four gaming brief pages consistent: self-hosted, FI cross-links, Read → Play → Own footer

## Deferred / v0.2+

- [ ] Apply the Related Briefs footer to `/xboxreset-pulse` (currently internal-link only)
- [ ] Extend `/junegames` and `/junetech` to be fully self-hosted reports (not just showcase cards — they currently render highlights only, no full report)
- [ ] Lazy-load the three new data-heavy routes (`React.lazy` + Suspense) to keep the SPA bundle manageable
- [ ] Evaluate FormDB as a layer on top of PocketBase for the panel form (defer per `docs/brainstorm-panel-survey-instrument.md`)
- [ ] Move the diff-checker cron out of `anygamedev-ai-hub` into `anygame-data` (GitHub Action) once the data repo is stable
- [ ] Review the build-time-fetch sync mechanism after 3 months — switch to periodic-PR if it's flaky
- [ ] Add Facebook Instant Games, CrazyGames, itch.io HTML5 terms to the minigame table (Q4 2026)
- [ ] Consider crowd-sourced term submissions from panelists (option 4 in `docs/brainstorm-minigame-terms-table.md`) once panel is 20+ active
- [ ] First per-title indie minigame revenue benchmarks (original reporting, target October brief)