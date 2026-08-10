# `client/public/data/`

Static JSON served with the SPA. Populated at **build time** by `scripts/fetch-snapshots.sh` from the private repo `myblackbeanca/anygame-data` via the GitHub Contents API (`GITHUB_TOKEN` required in CI/Vercel):

- `…/engine-index/engine-index-latest.json` → `engine-index-latest.json`
- `…/minigame-terms/minigame-terms.json` → `minigame-terms.json`
- `…/kaggle/insights.json` → `kaggle-insights.json`
- `…/kaggle/{dataset}.summary.json` (7 datasets) → `kaggle-{dataset}.json`

Committed files here are **fallbacks** so a network blip on Vercel does not ship a broken site. After a successful fetch, the on-disk files may match upstream more closely than git; that is expected for local builds — commit refreshed fallbacks when you intentionally pin a new baseline.
