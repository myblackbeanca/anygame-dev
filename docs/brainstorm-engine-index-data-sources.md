# Steam Engine-Share Index — Data Source Options

Saved during brainstorm July 19, 2026. Revisit when v0.1 proves reader demand and v0.2 automation becomes worth the effort.

## Decision (July 19, 2026)
**Chosen: Option 1 — Manual snapshot, static JSON in repo.**

## The four options

### 1. Manual snapshot, static JSON in repo ✅ CHOSEN
- Pull data once a month by hand from SteamDB's tech page (top 500 Steam releases, trailing 12-month window)
- Run Boxleiter revenue estimates in a spreadsheet (reviews × multiplier × price)
- Commit a static JSON file to the repo; the page renders from it
- **Cost:** $0
- **Effort:** ~2 hours/month manual work
- **ToS risk:** none (manual review of a public page)
- **Defensibility:** high — methodology page documents exactly how the number was made
- **Tradeoff accepted:** slow, manual, doesn't scale past ~500 games without pain
- **Ship timeline:** week 1
- **Revisit trigger:** when monthly manual work exceeds 4 hours or reader demand justifies automation

### 2. Scrape SteamDB on a Vercel cron
- Automated pipeline hitting steamdb.info/tech/ on a schedule
- **Cost:** $0 (Vercel free tier)
- **Effort:** ~1 week build, then automated
- **ToS risk:** HIGH — SteamDB has no published API, explicitly rate-limits, ToS discourages scraping. Risks IP ban from a service the whole index depends on.
- **Defensibility:** low — fragile, breaks when SteamDB changes HTML structure
- **Tradeoff accepted:** fragility and potential loss of data source
- **When to revisit:** only if SteamDB publishes a blessed API, or if we're willing to accept the ban risk

### 3. Pay for VGI/Sensor Tower API
- Clean, structured data via commercial API (VGI was acquired by Sensor Tower)
- **Cost:** likely $100s/month (pricing not public; needs sales contact)
- **Effort:** ~1 week integration, then automated
- **ToS risk:** none (paid, blessed)
- **Defensibility:** medium — depends on VGI pricing stability and API coverage
- **Tradeoff accepted:** real budget line item; doesn't include engine detection (that's SteamDB-specific, would still need manual supplement)
- **When to revisit:** if manual snapshot proves unsustainable AND revenue from anygame.dev (newsletter, sponsorships) covers the API cost

### 4. Hybrid: manual SteamDB engine detection + VGI free tier for revenue
- Manual pull of engine detection from SteamDB (same as option 1)
- VGI free tier (if it exists) for review counts, peak CCU, price — automates the revenue math
- **Cost:** $0 if VGI free tier covers 500-game cohorts
- **Effort:** ~1 week to verify VGI free tier + build the hybrid pipeline
- **ToS risk:** low (manual SteamDB + blessed VGI)
- **Defensibility:** medium — depends on VGI free tier limits
- **Tradeoff accepted:** still manual for the engine half; needs verification that VGI free tier exists and covers the cohort size
- **When to revisit:** if VGI free tier is confirmed and covers 500+ games, this becomes the obvious v0.2 upgrade from option 1

## What v0.1 (option 1) actually looks like

1. Once a month, pull from steamdb.info/tech/:
   - Top 500 Steam releases in trailing 12-month window
   - Engine detection per app (SteamDB's detected technology)
   - Review count, peak CCU, price (from SteamDB app pages)
2. Run Boxleiter in a spreadsheet:
   - Estimated gross revenue = reviews × multiplier (20-60, genre-adjusted) × price
   - Also: peak CCU × 8-14 for week-one units as a cross-check
3. Commit `client/public/data/engine-index-2026-08.json` to the repo
4. New page `/engine-index` renders the table + crosstabs from the static JSON
5. Methodology page (`/methodology`) documents:
   - SteamDB detection rules + their known undercounts (Godot, GameMaker, Construct, LibGDX, HTML5)
   - Boxleiter multiplier ranges and genre adjustments
   - Confidence bands (publish the 20-60× range, not a single number)
   - The manual snapshot date
6. Publish alongside the August trend brief

## Known limitations to publish honestly
- SteamDB undercounts Godot, GameMaker, Construct, LibGFX, HTML5 engines (per their own README)
- Boxleiter estimates diverge ~5× across providers (VGI vs Gamalytic vs PlayTracker, per Reddit r/GameDevelopment validation)
- The index is directional, not precise — publish as "engine share trend signal" not "engine revenue census"

## Versioning
- v0.1 (August 2026): manual snapshot, 500 games, static JSON, methodology page
- v0.2 (Q4 2026 or when manual work exceeds 4hrs/month): revisit option 4 (hybrid) or option 3 (paid)
- v1.0 (when automation + verification layer exist): automated monthly pipeline with manual-verify spot checks