import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.json({
    bodyRaw: req.body,
    bodyType: typeof req.body,
    bodyKeys: Object.keys(req.body || {}),
    headers: req.headers,
  });
}
