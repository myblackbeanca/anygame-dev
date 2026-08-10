---
title: "feat: Enable newsletter welcome email + Telegram ping"
date: 2026-06-24
type: feat
status: ready
---

# feat: Enable newsletter welcome email + Telegram ping

## Summary

The `anygame-newsletter` Cloudflare Worker already implements a welcome email
(Cloudflare Email Sending REST) and a Telegram signup ping, but both are dormant
in production because the worker has no `CLOUDFLARE_EMAIL_API_TOKEN` or
`TELEGRAM_BOT_TOKEN` set. This plan turns them on. It is **config + verification,
not code** — the send paths were written and hardened in the prior review pass
(timeouts, 429 handling, failure logging). The work is: provision two secrets,
confirm the `chefaid.nyc` sender is verified for Email Sending, and prove an
end-to-end signup produces a delivered email + a Telegram ping.

---

## Problem Frame

`workers/newsletter/index.js` calls `sendEmail()` and `pingTelegram()` on every
new `/subscribe`, both as fire-and-forget `ctx.waitUntil(...)`. Each guards on its
credential and returns/early-exits silently when it is missing:

- `sendEmail` returns `{ ok: false, error: "Email not configured" }` when
  `CLOUDFLARE_EMAIL_API_TOKEN` is unset.
- `pingTelegram` returns immediately when `TELEGRAM_BOT_TOKEN` is unset.

`wrangler secret list` currently shows only `ADMIN_TOKEN`. So every signup to date
has produced **no welcome email and no ping**, with no error surfaced. The 3 real
subscribers (`labh@collectivewin.ca`, `garvit@collectivewin.ca`, `alet@velab.org`)
were seeded directly into D1 and never ran through the welcome path.

---

## Requirements

- **R1** — A new signup via `POST /subscribe` sends a welcome email from the
  configured sender and it lands in the recipient's inbox.
- **R2** — A new signup posts a Telegram notification to chat `2134441104`.
- **R3** — A missing/broken credential never fails the signup (already true) and
  now surfaces a `console.error` visible in `wrangler tail` (already implemented).
- **R4** — Secrets are stored as Cloudflare Worker secrets, never committed to git
  (mirrors the `ADMIN_TOKEN` pattern).

---

## Key Technical Decisions

- **KTD1 — Sender stays `newsletter@chefaid.nyc`.** Per the prior decision, the
  send domain is chefaid.nyc (already the account's verified Email-Sending domain),
  not anygame.dev. Verifying anygame.dev is explicitly deferred.
- **KTD2 — No worker code changes.** The hardened `sendEmail`/`pingTelegram` paths
  are already deployed (version `17f368ac`). Enabling is purely setting two secrets;
  the worker reads them at runtime with no redeploy required (secrets take effect on
  `secret put`).
- **KTD3 — Credentials are operator-supplied secrets** set via `wrangler secret put`
  — a Cloudflare API token scoped to *Send Email*, and the Telegram bot token for the
  bot that owns chat `2134441104`. They are values only the operator can create/hold.
- **KTD4 — `chefaid.nyc` must be a verified *Email Sending* domain** (distinct from
  Email Routing). Cloudflare rejects sends from an unverified sender. This is a
  prerequisite, verified before declaring success.

---

## Implementation Units

### U1. Provision the two worker secrets

- **Goal:** Make `CLOUDFLARE_EMAIL_API_TOKEN` and `TELEGRAM_BOT_TOKEN` available to
  the worker.
- **Requirements:** R1, R2, R4
- **Dependencies:** Operator-supplied credentials (see Open Question O1)
- **Files:** none — secrets live in Cloudflare, not the repo. `workers/newsletter/wrangler.toml`
  already documents the secret-not-vars pattern in a comment.
- **Approach:** Create a Cloudflare API token with the Account-level *Email Sending:
  Send* permission (account `aa6789c67f992fd0b9f5933e86e11184`). Obtain the Telegram
  bot token for the bot that posts to chat `2134441104`. From `workers/newsletter/`,
  run `wrangler secret put CLOUDFLARE_EMAIL_API_TOKEN` and
  `wrangler secret put TELEGRAM_BOT_TOKEN`.
- **Verification:** `wrangler secret list` returns all three: `ADMIN_TOKEN`,
  `CLOUDFLARE_EMAIL_API_TOKEN`, `TELEGRAM_BOT_TOKEN`.
- **Test expectation: none** — credential configuration; correctness is proven by U3.

### U2. Confirm `chefaid.nyc` is a verified Email Sending domain

- **Goal:** Ensure the sender domain is authorized so sends are accepted.
- **Requirements:** R1, KTD4
- **Dependencies:** U1 (token needed to exercise a send)
- **Files:** none — DNS on the `chefaid.nyc` Cloudflare zone if records are missing.
- **Approach:** In the Cloudflare dashboard (Email → Email Sending) or via API,
  confirm `chefaid.nyc` is listed as a verified send domain with DKIM/SPF present. If
  not, add the records on the chefaid.nyc zone and complete verification. An
  unverified sender makes U3's send return an `invalid_request`/forbidden error
  rather than `success: true`.
- **Test expectation: none** — verified transitively by U3's first successful send.

### U3. End-to-end deliverability verification

- **Goal:** Prove a real signup yields a delivered email and a Telegram ping.
- **Requirements:** R1, R2, R3
- **Dependencies:** U1, U2
- **Files:** none — exercised against the live worker.
- **Approach:** Trigger a real signup through `POST /subscribe` (via the `/admin`
  manual-add form, or a curl with a controlled address and a valid role/company).
  Confirm the welcome email arrives from `newsletter@chefaid.nyc` and the Telegram
  message posts. Run `wrangler tail` alongside to observe the logging path.
- **Test scenarios:**
  - Happy path: a first-time signup returns `{ success: true, alreadySubscribed: false }`;
    the welcome email is received; the Telegram ping is received in chat `2134441104`.
  - Idempotency: re-submitting the same email returns `{ alreadySubscribed: true }`
    and triggers **no** second email or ping (worker fires only on first insert).
  - Observability: with a deliberately invalid email token, a signup still returns
    `200` (never fails the signup) and `[subscribe] welcome email failed:` appears in
    `wrangler tail`; restore the correct token afterward.

### U4. (Optional) Backfill welcome email to the 3 seeded subscribers

- **Goal:** Decide whether the 3 directly-seeded subscribers receive a retroactive
  welcome email.
- **Requirements:** R1 (retroactive)
- **Dependencies:** U1, U2, U3 (path proven first), Open Question O2
- **Files:** none, or a throwaway local script that calls the Email Sending API for
  the 3 addresses (not committed).
- **Approach:** These 3 bypassed the welcome path (direct D1 insert; re-inserting is a
  no-op under `ON CONFLICT DO NOTHING`). If backfilling, send each a welcome via a
  one-off — **not** the `/send` blast (that is the newsletter template, not the
  welcome). If not, treat them as already-onboarded (they are the team).
- **Test expectation: none** unless executed; if executed, each of the 3 receives
  exactly one welcome email.

---

## Scope Boundaries

In scope: enabling welcome email + Telegram ping on the existing chefaid.nyc sender,
and proving deliverability.

### Deferred to Follow-Up Work

- Verifying `anygame.dev` as a sender domain and switching `FROM_EMAIL` to it
  (DKIM/SPF setup) — only if on-brand sender becomes a priority (KTD1).
- `/send` newsletter-blast hardening (server-side idempotency / send-lock) — a
  separate plan; unrelated to the welcome path.
- Welcome email template/content redesign.

---

## Open Questions

- **O1 (execution dependency, blocking):** Who provides the credentials — the
  Cloudflare *Send Email* API token and the Telegram bot token for chat `2134441104`?
  The plan can be written and sequenced now, but U1 cannot execute until these exist.
- **O2 (decision):** Backfill the 3 existing real subscribers with a welcome email
  (U4), or only email future signups? Default assumption: **skip backfill** — they are
  the team and don't need an onboarding email.

---

## Risks & Dependencies

- **Unverified sender** → sends silently fail. Mitigated by U2 (verify first) and the
  already-deployed failure logging (R3).
- **Wrong/absent Telegram bot in the chat** → pings fail silently; now logged, caught
  in U3's observability scenario.
- **Brand mismatch** — emails come from `chefaid.nyc` for an anygame.dev product.
  Accepted per KTD1; revisit via the deferred anygame.dev verification if it matters.
- **Hard dependency:** operator-supplied credentials (O1). Everything else is
  verification the agent can drive once the secrets exist.

---

## Verification

The feature is complete when: a fresh `POST /subscribe` produces (1) a welcome email
delivered to the inbox from `newsletter@chefaid.nyc` and (2) a Telegram message in
chat `2134441104`; `wrangler secret list` shows all three secrets; and a forced
misconfiguration surfaces a `[subscribe] ... failed` line in `wrangler tail` without
failing the signup.
