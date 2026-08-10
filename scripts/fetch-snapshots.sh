#!/usr/bin/env bash
# Pull published JSON snapshots from myblackbeanca/anygame-data (private repo) into
# client/public/data/ before the Vite build.
#
# - If GITHUB_TOKEN is set: fetch via GitHub Contents API (private repos).
# - Otherwise: try raw.githubusercontent.com (works if repo is public or token is configured in CI).
# - On failure: keep last-committed fallback files and exit 0 so deploys don't break.
# - Never deletes existing files on a failed fetch.

set -u

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT_DIR="${ROOT}/client/public/data"
REPO="${ANYGAME_DATA_REPO:-myblackbeanca/anygame-data-private}"
REF="${ANYGAME_DATA_REF:-main}"
BASE_URL="${ANYGAME_DATA_BASE_URL:-https://raw.githubusercontent.com/${REPO}/${REF}}"
CURL_MAX_TIME="${ANYGAME_DATA_CURL_MAX_TIME:-20}"

mkdir -p "${OUT_DIR}"

fetch_one() {
  local rel_path="$1"
  local out_name="$2"
  local dest="${OUT_DIR}/${out_name}"
  local tmp
  tmp="$(mktemp "${OUT_DIR}/.${out_name}.XXXXXX")"

  if ! command -v curl >/dev/null 2>&1; then
    echo "fetch-snapshots: curl not found; keeping ${dest}" >&2
    rm -f "${tmp}"
    return 1
  fi

  local curl_args=(
    -fsSL --max-time "${CURL_MAX_TIME}"
    -H "Accept: application/vnd.github.v3.raw"
    -o "${tmp}"
  )

  # Private repo: use GitHub Contents API with token auth
  if [[ -n "${GITHUB_TOKEN:-}" ]]; then
    curl_args+=(
      -H "Authorization: Bearer ${GITHUB_TOKEN}"
      "https://api.github.com/repos/${REPO}/contents/${rel_path}?ref=${REF}"
    )
  else
    curl_args+=(-H "Accept: application/json" "${BASE_URL}/${rel_path}")
  fi

  if curl "${curl_args[@]}"; then
    if [[ ! -s "${tmp}" ]]; then
      echo "fetch-snapshots: empty body for ${out_name}; keeping fallback" >&2
      rm -f "${tmp}"
      return 1
    fi
    if ! head -c 1 "${tmp}" | grep -q '[{[]'; then
      echo "fetch-snapshots: non-JSON body for ${out_name}; keeping fallback" >&2
      rm -f "${tmp}"
      return 1
    fi
    mv "${tmp}" "${dest}"
    echo "fetch-snapshots: ok  ${out_name}  ($(wc -c < "${dest}" | tr -d ' ') bytes)"
    return 0
  fi

  echo "fetch-snapshots: FAIL ${out_name} — keeping fallback if present" >&2
  rm -f "${tmp}"
  return 1
}

ok=0
fail=0

if fetch_one "engine-index/engine-index-latest.json" "engine-index-latest.json"; then
  ok=$((ok + 1))
else
  fail=$((fail + 1))
fi

if fetch_one "minigame-terms/minigame-terms.json" "minigame-terms.json"; then
  ok=$((ok + 1))
else
  fail=$((fail + 1))
fi

# Fetch Kaggle dataset summaries + indie dev insights (7 summary JSONs + 1 insights JSON)
fetch_kaggle() {
  local rel_path="$1"
  local out_name="$2"
  fetch_one "kaggle/${rel_path}" "${out_name}"
}

fetch_kaggle "insights.json" "kaggle-insights.json"
fetch_kaggle "videogamesales.summary.json" "kaggle-videogamesales.json"
fetch_kaggle "chess.summary.json" "kaggle-chess.json"
fetch_kaggle "boardgames.summary.json" "kaggle-boardgames.json"
fetch_kaggle "vgchartz-2024.summary.json" "kaggle-vgchartz-2024.json"
fetch_kaggle "steam-store.summary.json" "kaggle-steam-store.json"
fetch_kaggle "steam-full.summary.json" "kaggle-steam-full.json"
fetch_kaggle "sudoku.summary.json" "kaggle-sudoku.json"

write_stub() {
  local out_name="$1"
  local dest="${OUT_DIR}/${out_name}"
  case "${out_name}" in
    engine-index-latest.json)
      cat >"${dest}" <<'JSON'
{
  "schema_version": 1,
  "status": "placeholder",
  "snapshot_id": null,
  "generated_at": null,
  "window": { "label": null, "start": null, "end": null },
  "source": {
    "primary": "steamdb.info/tech/",
    "method": "manual_monthly_snapshot",
    "notes": "Index not yet published — first snapshot ships when anygame-data publishes engine-index-latest.json."
  },
  "engines": [],
  "titles": [],
  "meta": {
    "title_count": 0,
    "confidence": null,
    "methodology": "https://github.com/myblackbeanca/anygame-data/blob/main/methodology/engine-index-methodology.md",
    "fallback": true
  }
}
JSON
      ;;
    minigame-terms.json)
      cat >"${dest}" <<'JSON'
{
  "schema_version": 1,
  "status": "placeholder",
  "updated_at": null,
  "platforms": [],
  "columns": [
    "platform",
    "standard_rev_share_pct",
    "incentive_programs",
    "payout_threshold_and_cadence",
    "iaa_iap_support",
    "engine_sdk_support",
    "content_moderation",
    "ios_payments_status",
    "last_verified",
    "source_link"
  ],
  "notes": "Terms table not yet published — first row set ships when anygame-data publishes minigame-terms.json.",
  "methodology": "https://github.com/myblackbeanca/anygame-data/blob/main/methodology/minigame-terms-methodology.md",
  "changelog": "https://github.com/myblackbeanca/anygame-data/blob/main/minigame-terms/changelog.md",
  "meta": {
    "fallback": true
  }
}
JSON
      ;;
    *)
      echo "fetch-snapshots: no stub template for ${out_name}" >&2
      return 1
      ;;
  esac
  echo "fetch-snapshots: wrote empty stub ${out_name} (first-deploy / missing fallback)" >&2
  return 0
}

stubbed=0
for f in engine-index-latest.json minigame-terms.json; do
  if [[ ! -s "${OUT_DIR}/${f}" ]]; then
    if write_stub "${f}"; then
      stubbed=$((stubbed + 1))
    else
      echo "fetch-snapshots: FATAL could not create stub ${OUT_DIR}/${f}" >&2
      exit 1
    fi
  fi
done

# Kaggle data files are supplementary — write empty JSON stubs on first deploy
for f in kaggle-insights.json kaggle-videogamesales.json kaggle-chess.json; do
  if [[ ! -s "${OUT_DIR}/${f}" ]]; then
    cat >"${OUT_DIR}/${f}" <<'JSON'
{"status":"no-data","source":"pending-fetch"}
JSON
    stubbed=$((stubbed + 1))
  fi
done

echo "fetch-snapshots: done (fetched=${ok} failed=${fail} stubs_written=${stubbed})"

# Always exit 0 for CI/Vercel: fetch failure keeps fallbacks; first deploy gets stubs.
exit 0
