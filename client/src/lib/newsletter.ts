// Pure, framework-free newsletter logic — extracted from Admin.tsx so it can be
// unit-tested without pulling in React / shadcn, and reused by other callers.

export interface Subscriber {
  email: string;
  role: string;
  company: string;
  region: string;
  subscribedAt: string;
}

export interface Stat {
  label: string;
  value: string | number;
  hint?: string;
}

export const ROLES = [
  'founder',
  'developer',
  'designer',
  'publisher',
  'investor',
  'press',
  'academic',
  'student',
  'other',
];

export const REGIONS = [
  'North America',
  'Europe',
  'Asia-Pacific',
  'Latin America',
  'MENA',
  'Africa',
  'Other',
];

// Parse the worker's created_at, which SQLite datetime('now') writes as
// "YYYY-MM-DD HH:MM:SS" (UTC, no zone). new Date() parses that as LOCAL on V8
// and as Invalid Date in Safari, so normalize to ISO (T + Z) first.
export function parseSubscribedAt(v: string): number {
  if (!v) return NaN;
  const iso = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(v) ? v.replace(' ', 'T') + 'Z' : v;
  return new Date(iso).getTime();
}

// The four metrics an operator wants at a glance: list size, who it skews
// toward, how fast it's growing, and how broad the reach is. `now` is injectable
// so the 7-day window is deterministic under test.
export function deriveStats(subscribers: Subscriber[], now: number = Date.now()): Stat[] {
  if (subscribers.length === 0) return [];

  const roleCounts = subscribers.reduce<Record<string, number>>((acc, s) => {
    if (s.role) acc[s.role] = (acc[s.role] || 0) + 1;
    return acc;
  }, {});
  const [topRole, topRoleCount] = Object.entries(roleCounts).sort((a, b) => b[1] - a[1])[0] || ['—', 0];

  const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const recent = subscribers.filter((s) => {
    const t = parseSubscribedAt(s.subscribedAt);
    return !Number.isNaN(t) && t >= weekAgo;
  }).length;

  const companies = new Set(
    subscribers.map((s) => s.company?.trim().toLowerCase()).filter(Boolean),
  ).size;

  return [
    { label: 'Subscribers', value: subscribers.length },
    { label: 'Top role', value: topRole, hint: `${topRoleCount} subscriber${topRoleCount === 1 ? '' : 's'}` },
    { label: 'New (7 days)', value: recent, hint: recent === 0 ? 'none this week' : undefined },
    { label: 'Companies', value: companies },
  ];
}

export interface SendResult {
  aborted?: boolean;
  sent?: number;
  failed?: number;
  errors?: string[];
}

// Translate the worker's /send response into a toast intent. The worker reports
// aborted / failed / errors; reading only `sent` would render a total send
// outage (aborted, sent:0) as a green success — the bug this guards against.
export function classifySendResult(data: SendResult): {
  level: 'success' | 'warning' | 'error';
  message: string;
} {
  const sent = data.sent || 0;
  const failed = data.failed || 0;
  if (data.aborted) {
    return {
      level: 'error',
      message: `Send aborted — 0 delivered. Check email config: ${data.errors?.[0] || 'first batch failed'}`,
    };
  }
  if (failed > 0) return { level: 'warning', message: `Sent to ${sent}; ${failed} failed.` };
  if (sent === 0) return { level: 'warning', message: 'No subscribers to send to.' };
  return { level: 'success', message: `Sent to ${sent} subscribers` };
}
