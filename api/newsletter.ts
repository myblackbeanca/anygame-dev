// Vercel serverless function served at /api/newsletter.
// Thin same-origin proxy to the anygame-newsletter Cloudflare Worker so the
// browser never deals with CORS. The Worker owns D1 storage, email, and admin
// auth; `list`/`send` are guarded server-side by the forwarded Bearer token.
//
// Typed with minimal inline shapes instead of `@vercel/node` so the build has
// no extra dependency to resolve (a missing `@vercel/node` was breaking the
// Vercel build under its Next.js mis-detection).
type Req = { method?: string; body?: any; headers: Record<string, string | string[] | undefined> };
type Res = {
  setHeader: (k: string, v: string) => void;
  status: (code: number) => Res;
  json: (body: unknown) => void;
};

const WORKER_URL = process.env.WORKER_URL || 'https://anygame-newsletter.alet8891.workers.dev';

async function callWorker(path: string, body: unknown, authHeader?: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (authHeader) headers.Authorization = authHeader;

  const response = await fetch(`${WORKER_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  const text = await response.text();
  try {
    return { status: response.status, json: JSON.parse(text) };
  } catch {
    return { status: 502, json: { error: 'Invalid response from worker: ' + text.slice(0, 200) } };
  }
}

export default async function handler(req: Req, res: Res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).json({});
    return;
  }
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const data = req.body || {};
  const authHeader = req.headers.authorization as string | undefined;

  if (data.action === 'subscribe') {
    const { status, json } = await callWorker('/subscribe', {
      email: String(data.email || ''),
      role: String(data.role || ''),
      company: String(data.company || ''),
      region: String(data.region || ''),
    });
    res.status(status).json(json);
    return;
  }

  if (data.action === 'list') {
    const { status, json } = await callWorker('/list', {}, authHeader);
    res.status(status).json(json);
    return;
  }

  if (data.action === 'send') {
    const { status, json } = await callWorker(
      '/send',
      { subject: String(data.subject || ''), content: String(data.content || '') },
      authHeader,
    );
    res.status(status).json(json);
    return;
  }

  res.status(400).json({ error: 'Unknown action' });
}
