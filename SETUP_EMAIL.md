# Cloudflare Email Service Setup

## Overview
The newsletter system uses Cloudflare Email Sending API. You need an API token with **Email Sending → Edit** permission.

## Step 1: Create API Token

1. Go to **Cloudflare Dashboard** → **My Profile** → **API Tokens**
2. Click **Create Token**
3. Use template: **Edit Cloudflare Email** (or create custom token)
4. Add the following permission:
   - **Permission:** `Email Sending`
   - **Access:** `Edit`
5. Scope: Select your **Account** (not individual zones)
6. Create token and copy the value

## Step 2: Configure Vercel Environment Variables

```bash
cd anygame-dev

# Set Cloudflare Email Account ID (found in Cloudflare dashboard URL)
# URL format: https://dash.cloudflare.com/{ACCOUNT_ID}/email
vercel env add CLOUDFLARE_EMAIL_ACCOUNT_ID production

# Set your API token (starts with sk-)
vercel env add CLOUDFLARE_EMAIL_API_TOKEN production

# Set the sender email (must be domain you've onboarded in Cloudflare)
vercel env add FROM_EMAIL production
# Example: newsletter@anygame.dev or no-reply@anygame.dev
```

Or add via Vercel Dashboard:
- Project → Settings → Environment Variables
- Add the 3 variables above

## Step 3: Onboard Domain in Cloudflare

Before sending emails, onboard your domain in Cloudflare:

1. Go to **Email Sending** → **Domains**
2. Click **Add Domain**
3. Follow DNS record setup (SPF, DKIM, DMARC)
4. Wait for verification (usually 5-10 minutes)

## Step 4: Test

```bash
curl -X POST https://anygame.dev/api/newsletter \
  -H "Content-Type: application/json" \
  -d '{"action":"subscribe","email":"test@example.com","role":"developer","company":"Test","region":"North America"}'
```

Expected: `{"success":true}`

## Admin Dashboard

Access at: https://anygame.dev/admin

## Required Permissions Summary

| Setting | Value |
|---------|-------|
| Token Permission | `Email Sending` |
| Token Access | `Edit` |
| Token Scope | Account-level (not zone-level) |
| Environment | `production` (Vercel) |
