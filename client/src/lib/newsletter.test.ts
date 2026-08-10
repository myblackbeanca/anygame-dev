import { describe, it, expect } from 'vitest';
import {
  deriveStats,
  classifySendResult,
  parseSubscribedAt,
  type Subscriber,
} from './newsletter';

const sub = (over: Partial<Subscriber> = {}): Subscriber => ({
  email: 'a@example.com',
  role: 'developer',
  company: 'Acme',
  region: 'North America',
  subscribedAt: '2026-06-24 12:00:00',
  ...over,
});

// Fixed "now" so the 7-day window is deterministic.
const NOW = Date.parse('2026-06-24T18:00:00Z');

describe('parseSubscribedAt', () => {
  it('parses the worker SQLite "YYYY-MM-DD HH:MM:SS" format as UTC', () => {
    // 12:00:00 UTC, not local — must equal the explicit-Z parse.
    expect(parseSubscribedAt('2026-06-24 12:00:00')).toBe(Date.parse('2026-06-24T12:00:00Z'));
  });
  it('passes through already-ISO strings', () => {
    expect(parseSubscribedAt('2026-06-24T12:00:00Z')).toBe(Date.parse('2026-06-24T12:00:00Z'));
  });
  it('returns NaN for empty/blank', () => {
    expect(Number.isNaN(parseSubscribedAt(''))).toBe(true);
  });
});

describe('deriveStats', () => {
  it('returns [] for an empty list (hides the stat row)', () => {
    expect(deriveStats([], NOW)).toEqual([]);
  });

  it('counts subscribers, top role, recent, and distinct companies', () => {
    const subs = [
      sub({ role: 'developer', company: 'Acme', subscribedAt: '2026-06-24 10:00:00' }), // recent
      sub({ role: 'developer', company: 'acme', subscribedAt: '2026-06-20 10:00:00' }), // recent, dup company (case-insensitive)
      sub({ role: 'founder', company: 'Globex', subscribedAt: '2026-06-01 10:00:00' }), // > 7 days old
    ];
    const stats = deriveStats(subs, NOW);
    expect(stats.find((s) => s.label === 'Subscribers')?.value).toBe(3);
    expect(stats.find((s) => s.label === 'Top role')?.value).toBe('developer');
    expect(stats.find((s) => s.label === 'Top role')?.hint).toBe('2 subscribers');
    expect(stats.find((s) => s.label === 'New (7 days)')?.value).toBe(2);
    expect(stats.find((s) => s.label === 'Companies')?.value).toBe(2); // Acme == acme
  });

  it('singularizes the top-role hint for a count of 1', () => {
    const stats = deriveStats([sub({ role: 'press' })], NOW);
    expect(stats.find((s) => s.label === 'Top role')?.hint).toBe('1 subscriber');
  });

  it('does not count a Safari-style space-format date as recent via local-time skew', () => {
    // A timestamp 6 days 23h before NOW in UTC is recent; the same string parsed
    // as local time (negative offset) could fall outside the window. Guard it.
    const stats = deriveStats([sub({ subscribedAt: '2026-06-17 19:00:00' })], NOW);
    expect(stats.find((s) => s.label === 'New (7 days)')?.value).toBe(1);
  });
});

describe('classifySendResult', () => {
  it('flags a config abort as an error, never success', () => {
    const r = classifySendResult({ aborted: true, sent: 0, failed: 8, errors: ['bad token'] });
    expect(r.level).toBe('error');
    expect(r.message).toContain('bad token');
  });

  it('warns on partial failure', () => {
    expect(classifySendResult({ sent: 2, failed: 500 })).toEqual({
      level: 'warning',
      message: 'Sent to 2; 500 failed.',
    });
  });

  it('warns when there is nobody to send to', () => {
    expect(classifySendResult({ sent: 0, failed: 0 }).level).toBe('warning');
  });

  it('reports success only when everything sent', () => {
    expect(classifySendResult({ sent: 5, failed: 0 })).toEqual({
      level: 'success',
      message: 'Sent to 5 subscribers',
    });
  });
});
