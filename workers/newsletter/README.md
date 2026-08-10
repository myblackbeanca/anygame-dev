# anygame-newsletter Worker

POST `/subscribe` → inserts a stakeholder row into D1 (`anygame_subscribers`).

## Request body

```json
{
  "email":   "you@studio.com",   // required
  "role":    "founder",          // required, one of: founder developer designer publisher investor press academic student other
  "company": "Acme Games",       // required, 1–200 chars
  "region":  "North America"     // optional
}
```

Server-side, the Worker also captures `CF-IPCountry`, `Referer`, and `User-Agent`.

## First-time setup

```bash
cd workers/newsletter

# 1. Create the D1 database (once).
wrangler d1 create anygame_subscribers
#   → copy the printed database_id into wrangler.toml (REPLACE_ME_AFTER_d1_create)

# 2. Apply the schema (remote = production).
wrangler d1 execute anygame_subscribers --remote --file=./schema.sql

# 3. Deploy the Worker.
wrangler deploy
```

## Inspect the list

```bash
wrangler d1 execute anygame_subscribers --remote --command \
  "SELECT role, COUNT(*) AS n FROM subscribers GROUP BY role ORDER BY n DESC;"

wrangler d1 execute anygame_subscribers --remote --command \
  "SELECT email, role, company, region, country, created_at FROM subscribers ORDER BY id DESC LIMIT 50;"
```

## Export the list

```bash
wrangler d1 export anygame_subscribers --remote --output=subscribers.sql
# Or CSV via the Cloudflare dashboard → D1 → anygame_subscribers → Console.
```

## Required Cloudflare API token scopes

If `wrangler deploy` fails on `/memberships`, mint a new token with:

- **Account** → Cloudflare Workers Scripts: **Edit**
- **Account** → D1: **Edit**
- **Zone (anygame.dev)** → Workers Routes: **Edit**
- **User** → User Details: **Read** (some accounts need this for `/memberships`)
