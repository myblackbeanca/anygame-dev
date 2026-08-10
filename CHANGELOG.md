# Changelog

Reverse-chronological record of what's shipped on anygame.dev. Dates are deploy dates (UTC), not commit dates.

## 2026-07-19

### Added
- **`/julytrends` — July 2026 Gaming Trend Brief** (commit `e6e66db`)
  - 8 sections: Carbon engine open-sourced, Engine Wars (5 named-dev quotes), July indie releases (13 games), Slay the Spire 2's $108M Godot month, AI in game dev, Top 17 open-source repos, HN/Reddit consensus, recommendations
  - All quotes attributed to named devs/CEOs with source links; no fabricated quotes
  - Wired into router at `/julytrends`; added as lead card in Home's Trend Briefs section
- **Related Briefs footer** on `/julytrends` (commit `d833791`)
  - Links to gaming-relevant freeintelligence.ai briefs: `/fable-pulse/`, `/gpu-pricing/`, `/local-ai-box/`, `/miny-play/`
  - Reciprocal: freeintelligence.ai/miny-play card upgraded to deep-link to `/julytrends` + the next-moves research report
  - Gaming stays off the FI main page (connection lives in the miny-play hub + gaming-article footers)

### Changed
- **JuneGames, JuneTech, XboxReset made fully self-hosted** (commit `5f398d3`)
  - Removed `BRIEF_URL` constants pointing to here.now briefs (JuneGames, JuneTech)
  - Removed "Read the full brief" / "Open the brief" CTAs (JuneGames, JuneTech)
  - Added Related Briefs footer to all three pages (JuneGames, JuneTech, XboxReset)
  - Footer now carries "Read → Play → Own" link to `freeintelligence.ai/miny-play/`
  - All four gaming brief pages (`/julytrends`, `/junegames`, `/junetech`, `/xboxreset`) now follow the same pattern: self-hosted, FI cross-links, Read → Play → Own footer
- **`/julytrends` made fully self-hosted** (commit `60b9796`)
  - Removed `BRIEF_URL` constant pointing to `waxen-sphinx-39n2.here.now`
  - Removed hero CTA and trailing "Read the full brief" section
  - Removed stale `here-now/index.html` artifact from the repo
  - Page now contains the complete report inline

### Removed
- **Deleted the here.now site** for the July brief
  - `DELETE /api/v1/publish/waxen-sphinx-39n2` — site now returns HTTP 404
  - All anygame.dev content now lives at anygame.dev (no here.now dependency for the July brief)

### Fixed
- **Vercel webhook miss** (commit `0463513`)
  - Commit `60b9796` (here.now removal) did not trigger a Vercel deployment
  - Pushed empty commit `0463513` to retrigger; verified live bundle `index-Wp7a2uFl.js` contains no `waxen-sphinx` references

## 2026-07-09

### Added
- **`/xboxreset-pulse`** — Xbox Reset community pulse page (commit `cfdd8b2`)
  - Cross-linked with the `/xboxreset` brief
  - Enriched with verbatim quotes and full linked source list (commit `fbd0bdd`)
  - Added "For indie studios" operator-read section (commit `7afd998`)
  - Added "If you're building" operator box linking to the pulse (commit `3ed1ea9`)

### Changed
- **Xbox Reset brief** updated with last-30-days corrections (commit `dd4cb52`)
  - Game Pass indie freeze, id/Obsidian cuts folded in

## 2026-07-08

### Added
- **`/xboxreset` — Xbox Reset 2026 Trend Brief** (commit `89eb478`)
  - Full report self-hosted natively at `/xboxreset` (commit `025eb4c`, dropped here.now link-out)
  - Added Xbox Reset card to homepage Trend Briefs section (commit `1a0f0d5)

## Earlier 2026

### Added
- JuneGames, JuneTech pages (showcase cards linking to here.now briefs — later made self-hosted on 2026-07-19)
- AI Signal (gaming hardware) resource link to VE LAB AI-Trends page (commit `eb1c13c`)
- Newsletter signup (Cloudflare Worker at `anygame-newsletter.alet8891.workers.dev`, proxied via `/api/newsletter` Vercel function, writing to D1 `anygame_subscribers`)

## Notes

- Deployments are automatic via Vercel on push to `main`. The webhook missed once (2026-07-19, commit `60b9796`) and was retriggered with an empty commit.
- All here.now dependencies for gaming brief pages were removed on 2026-07-19. The deep research report (`tropic-pepper-pxps.here.now`) is still on here.now — it's a one-off, not a recurring anygame.dev surface.
- The freeintelligence.ai/miny-play hub card is maintained in the separate `free-intelligence` repo, not in this repo.