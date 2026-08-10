// Cloudflare Worker for anygame.dev newsletter.
// Single backend for the whole newsletter system:
//   POST /subscribe  (public) -> validate, persist to D1, ping Telegram, send welcome email (+vCard)
//   POST /list       (admin)  -> return all subscribers (Bearer ADMIN_TOKEN)
//   POST /send       (admin)  -> send an HTML newsletter to every subscriber (Bearer ADMIN_TOKEN)
//
// Storage: D1 binding `SUBSCRIBERS_DB` (schema in ./schema.sql).
// Email:   Cloudflare Email Sending REST API (env.CLOUDFLARE_EMAIL_API_TOKEN /
//          CLOUDFLARE_EMAIL_ACCOUNT_ID / FROM_EMAIL). from.email must be on a
//          domain verified under Email Sending (not just Email Routing).

const ALLOWED_ROLES = new Set([
  "founder",
  "developer",
  "designer",
  "publisher",
  "investor",
  "press",
  "academic",
  "student",
  "other",
]);

const ALLOWED_ORIGINS = new Set([
  "https://anygame.dev",
  "https://www.anygame.dev",
  "http://localhost:3000",
  "http://localhost:5173",
]);

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : "https://anygame.dev";
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Vary": "Origin",
    "Content-Type": "application/json",
  };
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), { status, headers });
}

// --- email -----------------------------------------------------------------
function fromEmail(env) {
  return env.FROM_EMAIL || "newsletter@anygame.dev";
}

// Send one email via the Cloudflare Email Sending REST API.
// This account's Email Sending API accepts ONLY the string shape (from/to as
// plain strings + subject + html); the object/array and `raw` shapes return
// invalid_request_schema, so attachments (e.g. a vCard) aren't supported here.
// Returns { ok: boolean, error?: string }. Never throws.
async function sendEmail(env, { to, subject, html }) {
  const accountId = env.CLOUDFLARE_EMAIL_ACCOUNT_ID;
  const token = env.CLOUDFLARE_EMAIL_API_TOKEN;
  if (!accountId || !token) return { ok: false, error: "Email not configured" };

  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`;
  const payload = { from: fromEmail(env), to, subject, html };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      // Without a timeout a slow/hung Email API stalls each /send batch for the
      // full Workers wall-clock budget, silently truncating the blast.
      signal: AbortSignal.timeout(10000),
    });
    let body = null;
    try { body = await res.json(); } catch { /* non-JSON response */ }
    if (res.ok && body?.success) return { ok: true };
    // A 429 is retriable rate-limiting, not a bad address — surface it so the
    // batch loop can stop instead of burning the whole list as "failed".
    return { ok: false, error: body?.errors?.[0]?.message || `HTTP ${res.status}`, rateLimited: res.status === 429 };
  } catch (err) {
    return { ok: false, error: String(err?.message || err) };
  }
}

export function welcomeHtml(role) {
  const lens = role
    ? `<p style="font-size:14px;line-height:1.65;color:#3a3a42;margin:0 0 18px;">You're in as a <strong style="color:#15151a;">${role}</strong> — we use that to keep what we send relevant to your seat in the industry.</p>`
    : "";
  return `<!doctype html><html><body style="margin:0;background:#f6f6f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#15151a;">
  <div style="max-width:520px;margin:0 auto;padding:48px 28px;">
    <div style="font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.18em;text-transform:uppercase;color:#a9750f;">anygame.dev</div>
    <h1 style="font-size:24px;line-height:1.25;margin:14px 0 16px;font-weight:800;">You're on the list.</h1>
    <p style="font-size:15px;line-height:1.65;color:#3a3a42;margin:0 0 18px;">
      anygame.dev tracks how AI is rewiring game development — the tools, engines, and market data
      actually moving the industry, written for the people building it: founders, developers,
      publishers, and investors.
    </p>
    ${lens}
    <p style="font-size:15px;line-height:1.65;color:#3a3a42;margin:0 0 18px;">
      Expect signal, not noise: occasional research drops, ranked product and market data, and early
      invites to roundtables and reports.
    </p>
    <div style="height:2px;width:40px;background:#e0a51e;margin:28px 0 18px;border-radius:2px;"></div>
    <p style="font-size:13px;line-height:1.6;color:#8a8a93;margin:0;">— the anygame.dev team · <a href="https://anygame.dev" style="color:#a9750f;text-decoration:none;">anygame.dev</a></p>
  </div></body></html>`;
}

// --- auth ------------------------------------------------------------------
function isAuthed(request, env) {
  const auth = request.headers.get("Authorization") || "";
  const token = auth.replace(/^Bearer\s+/i, "").trim();
  return token.length > 0 && token === (env.ADMIN_TOKEN || "").trim();
}
// --- Telegram --------------------------------------------------------------
// parse_mode=HTML means user-supplied fields must be escaped or a "<" in a
// company name breaks the message (or spoofs markup).
export function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
async function pingTelegram(env, fields) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return;
  const role = escapeHtml(fields.role);
  const company = escapeHtml(fields.company);
  const email = escapeHtml(fields.email);
  const region = fields.region ? ` · ${escapeHtml(fields.region)}` : "";
  const country = fields.country ? ` · ${escapeHtml(fields.country)}` : "";
  const lines = [
    `🎮 <b>anygame.dev signup</b>`,
    `<b>${role}</b> @ ${company}`,
    `${email}${region}${country}`,
  ];
  try {
    await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        chat_id: String(env.TELEGRAM_CHAT_ID),
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: "true",
      }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (err) {
    // Best-effort — never fail the signup because Telegram is sad. Log so a
    // persistent outage is visible in `wrangler tail`, not silently invisible.
    console.error("[subscribe] telegram ping failed:", err?.message || err);
  }
}

// --- handlers --------------------------------------------------------------
async function handleSubscribe(request, env, ctx, headers) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, headers);
  }

  const email = String(payload.email || "").toLowerCase().trim();
  const role = String(payload.role || "").toLowerCase().trim();
  const company = String(payload.company || "").trim();
  const region = String(payload.region || "").trim();
  const referrer = request.headers.get("Referer") || "";
  const userAgent = request.headers.get("User-Agent") || "";
  const country = request.headers.get("CF-IPCountry") || "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    return json({ error: "Invalid email address" }, 400, headers);
  }
  if (!ALLOWED_ROLES.has(role)) {
    return json({ error: "Invalid role" }, 400, headers);
  }
  if (company.length < 1 || company.length > 200) {
    return json({ error: "Company is required" }, 400, headers);
  }
  if (region.length > 100) {
    return json({ error: "Region too long" }, 400, headers);
  }
  if (!env.SUBSCRIBERS_DB) {
    return json({ error: "Storage not configured" }, 500, headers);
  }

  try {
    const result = await env.SUBSCRIBERS_DB
      .prepare(
        `INSERT INTO subscribers (email, role, company, region, country, referrer, user_agent, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
         ON CONFLICT(email) DO NOTHING`
      )
      .bind(email, role, company, region || null, country || null, referrer || null, userAgent || null)
      .run();

    const alreadySubscribed = (result.meta?.changes ?? 0) === 0;
    if (!alreadySubscribed) {
      ctx.waitUntil(pingTelegram(env, { email, role, company, region, country }));
      // Welcome email is fire-and-forget: a mail failure must never fail signup.
      // Log the failure so a misconfigured token (every signup gets no email)
      // surfaces in `wrangler tail` instead of being silently invisible.
      ctx.waitUntil(
        sendEmail(env, { to: email, subject: "Welcome to anygame.dev", html: welcomeHtml(role) }).then((r) => {
          if (!r.ok) console.error("[subscribe] welcome email failed:", r.error);
        })
      );
    }
    return json({ success: true, alreadySubscribed }, 200, headers);
  } catch (err) {
    return json({ error: "Server error", detail: String(err?.message || err) }, 500, headers);
  }
}

async function handleList(env, headers) {
  if (!env.SUBSCRIBERS_DB) return json({ error: "Storage not configured" }, 500, headers);
  try {
    const { results } = await env.SUBSCRIBERS_DB
      .prepare(
        `SELECT email, role, company, region, country, created_at AS subscribedAt
         FROM subscribers ORDER BY created_at DESC`
      )
      .all();
    return json({ subscribers: results || [] }, 200, headers);
  } catch (err) {
    return json({ error: "Server error", detail: String(err?.message || err) }, 500, headers);
  }
}

async function handleSend(request, env, headers) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400, headers);
  }
  const subject = String(payload.subject || "").trim();
  // The admin UI sends the body as `content`; accept `html` too.
  const html = String(payload.content || payload.html || "").trim();
  if (!subject || !html) {
    return json({ error: "subject and content are required" }, 400, headers);
  }
  if (!env.SUBSCRIBERS_DB) return json({ error: "Storage not configured" }, 500, headers);

  let results;
  try {
    ({ results } = await env.SUBSCRIBERS_DB.prepare(`SELECT email FROM subscribers`).all());
  } catch (err) {
    // Mirror the other handlers: a D1 error here would otherwise propagate as an
    // unstructured 500 the admin UI can't parse.
    return json({ error: "Failed to load subscribers", detail: String(err?.message || err) }, 500, headers);
  }
  const recipients = (results || []).map((r) => r.email);

  let sent = 0;
  let failed = 0;
  let rateLimited = false;
  const errors = [];

  // Fan out in small concurrent batches. A single Promise.all over hundreds of
  // recipients would trip Cloudflare's send rate limit and the Workers cap on
  // simultaneous subrequests; one-at-a-time is needlessly slow. Batches of 8
  // keep us comfortably under both while staying reasonably fast.
  const BATCH_SIZE = 8;
  let aborted = false;

  for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
    const batch = recipients.slice(i, i + BATCH_SIZE);
    const outcomes = await Promise.all(
      batch.map((to) => sendEmail(env, { to, subject, html }).then((r) => ({ to, ...r }))),
    );

    for (const o of outcomes) {
      if (o.ok) {
        sent++;
      } else {
        failed++;
        if (o.rateLimited) rateLimited = true;
        errors.push(`${o.to}: ${o.error || "unknown error"}`);
      }
    }

    // Rate limiting is transient and list-wide — stop rather than burn every
    // remaining address as a guaranteed 429 "failure". The admin UI can retry.
    if (rateLimited) {
      aborted = true;
      break;
    }

    // Failure policy: tally-and-continue for a normal newsletter — one bad
    // address shouldn't stop the rest. The one exception: if the FIRST batch
    // fails completely, that's almost certainly a config problem (bad token,
    // unverified sender domain), not bad addresses, so abort instead of
    // grinding through every recipient with the same guaranteed failure.
    // (No list-size clause: an all-failed first batch is a config abort even
    // when the whole list fits in one batch.)
    if (i === 0 && sent === 0 && failed === batch.length) {
      aborted = true;
      break;
    }
  }

  return json(
    { sent, failed, total: recipients.length, aborted, rateLimited, errors: errors.slice(0, 20) },
    200,
    headers,
  );
}

// --- router ----------------------------------------------------------------
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const headers = corsHeaders(request);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, headers);
    }

    if (url.pathname === "/subscribe") {
      return handleSubscribe(request, env, ctx, headers);
    }
    if (url.pathname === "/list") {
      if (!isAuthed(request, env)) return json({ error: "Unauthorized" }, 401, headers);
      return handleList(env, headers);
    }
    if (url.pathname === "/send") {
      if (!isAuthed(request, env)) return json({ error: "Unauthorized" }, 401, headers);
      return handleSend(request, env, headers);
    }

    return json({ error: "Not Found" }, 404, headers);
  },
};
