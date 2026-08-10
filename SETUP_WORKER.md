# Cloudflare Worker Setup

## Install Wrangler

```bash
npm install -g wrangler
# or
npm install --save-dev wrangler
```

## Create API Token

1. Go to **Cloudflare Dashboard** → **My Profile** → **API Tokens**
2. Click **Create Token**
3. Choose **Create Custom Token**
4. Add these permissions:
   - `Workers Scripts: Edit`
   - `Workers Routes: Edit`
   - `Workers KV: Edit`
   - `Account: Read`
5. Scope: Select **Account** → "Alet@chefaid.nyc's Account"
6. Create and copy the token

## Set Environment Variable

```bash
# Unset any existing CLOUDFLARE_API_TOKEN first
unset CLOUDFLARE_API_TOKEN

# Export new token
export CLOUDFLARE_API_TOKEN="your-token-here"

# Then deploy
wrangler deploy
```

## After Deploying

Update the Worker URL in Vercel:
```bash
vercel env add WORKER_URL production
# Enter: https://anygame-email-proxy.YOUR-USERNAME.workers.dev
```

## Test the Worker

```bash
curl -X POST "https://anygame-email-proxy.YOUR-USERNAME.workers.dev/send-email" \
  -H "Content-Type: application/json" \
  -d '{"to":"test@test.com","subject":"Test","html":"<h1>Test</h1>"}'
```

Expected: `{"success":true}`
