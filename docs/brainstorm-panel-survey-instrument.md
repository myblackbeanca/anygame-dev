# Indie Founder Panel — Survey Instrument Options

Saved during brainstorm July 19, 2026. Revisit if/when the self-hosted approach hits a maintenance cost wall.

## Decision (July 19, 2026)
**Chosen: Option 3 — Self-hosted on existing MINY PocketBase.**

Extend the existing PocketBase deployment at **`https://miny-database.exe.xyz`** (the VM that already serves miny-directory's `intake_optins` collection and the artist-opt-in form). Add a new PocketBase collection for founder-panel pulses; build a custom form on anygame.dev's `/panel` route that writes to it via the existing Cloudflare Worker / Vercel function proxy pattern.

Considered **FormDB** (PocketBase-based form builder) as a layer on top — defer for v0.2 if hand-rolling the form turns out to be more than a week of work. For v0.1, a custom form matching anygame.dev's design system + direct PocketBase collection is the cleaner path.

## The four options

### 1. Tally.so (was the recommended default)
- Free, one-click, founder-friendly UX, conditional logic, exportable results
- **Cost:** $0
- **Effort:** ~2 days to set up the form + monthly export-to-JSON pipeline
- **Tradeoff accepted:** third-party SaaS, data lives on Tally's servers until exported, form UX doesn't match anygame.dev's design system
- **When to revisit:** if self-hosted maintenance cost exceeds ~2 hours/month

### 2. Google Forms
- Free, universal, every founder knows it
- **Cost:** $0
- **Effort:** ~1 day setup
- **Tradeoff accepted:** clunky UX, no conditional logic on free tier, Google-brand friction, form looks like every other Google Form
- **When to revisit:** not recommended — Tally dominates this option on every dimension

### 3. Self-hosted on existing MINY PocketBase ✅ CHOSEN
- Extend `https://miny-database.exe.xyz` PocketBase instance with a new collection
- Custom form on anygame.dev `/panel` route, writes via existing Vercel function → PocketBase pattern (mirrors the newsletter Worker)
- **Cost:** $0 (VM already paid for by MINY)
- **Effort:** ~1-2 weeks build (PB collection + form UI + auth + admin view)
- **ToS risk:** none (you own the data)
- **Defensibility:** high — data stays in the VE Lab ecosystem, cross-links with miny-directory artist data (some panelists are also MINY artists)
- **Tradeoff accepted:** 1-2 weeks build, you own form UX + validation, panelists trust anygame.dev directly
- **Integration bonus:** PB collection can join to `intake_optins` and artist entities already on the same instance — a future "founder + artist" crosstab is free

### 4. Typeform
- Best-in-class form UX, conditional logic, payment tier
- **Cost:** ~$25/month for the features that matter
- **Effort:** ~2 days setup
- **Tradeoff accepted:** paid, third-party, data export is fine but the form lives on Typeform
- **When to revisit:** if self-hosted UX proves worse than Typeform's and panelists complain

## What v0.1 (option 3) actually looks like

1. **PocketBase collection** on `miny-database.exe.xyz`:
   - Collection name: `founder_panel_pulses`
   - Fields: `panelist_id` (relation to a `founder_panelists` collection), `pulse_month` (e.g. "2026-08"), `engine_choice`, `engine_switch_intent`, `ai_tooling_spend_usd`, `distribution_mix` (JSON), `top_friction` (text), `quote_ok` (bool — consent to be quoted by name), `submitted_at`
   - `founder_panelists` collection: `name`, `role`, `studio`, `engine_primary`, `joined_at`, `active` (bool), `public_bio_url`
2. **Custom form** on anygame.dev `/panel`:
   - 5 questions, monthly cadence
   - Auth: panelist-specific token (PocketBase auth, emailed monthly link)
   - Matches anygame.dev's Editorial Intelligence design system
   - Submits via `/api/panel-pulse` Vercel function → PocketBase (same pattern as `/api/newsletter`)
3. **Admin view** on anygame.dev `/panel/admin`:
   - Auth-guarded, lists responses by month
   - Export to JSON for the static repo commit + brief rendering
4. **Recruitment** starts from the July brief's 5 existing contacts:
   - Błażej Żywiczyński (Fairy Mount Games)
   - Simon Lockerby (Fateless)
   - Daan Last (Bibidi Bibidi)
   - Tomasz Kaye (Axe Ghost)
   - Sole Survivor Games
   - Target: 20-30 named CEOs by September

## The 5 monthly questions
1. **Engine choice** — "What engine are you primarily using this month?" (single select: Godot, Unity, Unreal, GameMaker, Defold, Bevy, Other)
2. **Engine switch intent** — "Did you switch engines in the last 30 days, or are you actively considering it?" (yes/no + which)
3. **AI tooling spend** — "Roughly how much did you spend on AI tools (code agents, image gen, audio, voice) this month?" (ranges: $0, $1-50, $51-200, $201-500, $500+)
4. **Distribution mix** — "Where are you shipping/selling?" (multi-select: Steam, itch.io, Epic, mobile stores, Discord Activities, WeChat Mini Games, TikTok Mini Games, other)
5. **Top friction** — "What's the single biggest thing slowing you down right now?" (free text)

## Versioning
- v0.1 (August 2026): PB collection + custom form + 5-question pulse + first 5 panelists
- v0.2 (September 2026): 20-30 panelists, first published crosstab in the September brief
- v0.3 (Q4 2026): admin view + automated monthly reminder emails + quote-consent workflow
- v1.0 (when panel is stable): longitudinal dashboard, year-over-year engine-switch intent tracking

## FormDB evaluation (deferred)
FormDB (a PocketBase-based form builder) was considered as a layer on top of the self-hosted PB. For v0.1 a custom form is cleaner (matches anygame.dev's design system, full control of validation). Revisit FormDB for v0.2 if hand-rolling the form turns out to be more than a week of work.