// Charts for /kaggle-insights — CSS layout so mobile + desktop both work.
// No fixed SVG coordinate traps; labels never clip off-screen.
import type { ReactNode } from "react";

const track = "bg-[oklch(0.90_0.008_280)]";
const bar = "bg-[oklch(0.48_0.22_275)]";
const barAlt = "bg-[oklch(0.16_0.22_40)]";
const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const accent = "text-[oklch(0.48_0.22_275)]";

function Fig({
  ariaLabel,
  caption,
  children,
}: {
  ariaLabel: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <figure className="fig" aria-label={ariaLabel}>
      {children}
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function HorizontalBars({
  ariaLabel,
  caption,
  data,
  fmt,
  accentIndex = -1,
}: {
  ariaLabel: string;
  caption?: string;
  data: { label: string; value: number }[];
  fmt: (v: number) => string;
  accentIndex?: number;
  // kept for call-site compat; ignored
  labelX?: number;
  trackX?: number;
  trackWidth?: number;
  rowHeight?: number;
  barHeight?: number;
  fontSize?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Fig ariaLabel={ariaLabel} caption={caption}>
      <ul className="space-y-3 sm:space-y-3.5" role="list">
        {data.map((d, i) => {
          const isAccent = i === accentIndex;
          const pct = Math.max((d.value / max) * 100, 2);
          return (
            <li key={d.label}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span
                  className={`text-sm font-semibold truncate min-w-0 ${
                    isAccent ? accent : ink
                  }`}
                >
                  {d.label}
                </span>
                <span
                  className={`text-sm font-bold tabular-nums shrink-0 ${
                    isAccent ? accent : ink
                  }`}
                >
                  {fmt(d.value)}
                </span>
              </div>
              <div className={`h-2.5 sm:h-3 rounded-full ${track} overflow-hidden`}>
                <div
                  className={`h-full rounded-full ${isAccent ? "bg-[oklch(0.48_0.22_275)]" : "bg-[oklch(0.52_0.015_275)]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </Fig>
  );
}

export function VerticalBars({
  ariaLabel,
  caption,
  data,
  fmt,
  accentIndex = -1,
}: {
  ariaLabel: string;
  caption?: string;
  data: { label: string; value: number }[];
  fmt: (v: number) => string;
  accentIndex?: number;
  unit?: string;
  barWidth?: number;
  gap?: number;
  fontSize?: number;
}) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <Fig ariaLabel={ariaLabel} caption={caption}>
      {/* Mobile: horizontal ranked list (12 months don't fit as columns) */}
      <ul className="sm:hidden space-y-3" role="list">
        {data.map((d, i) => {
          const isAccent = i === accentIndex;
          const pct = Math.max((d.value / max) * 100, 2);
          return (
            <li key={d.label}>
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <span className={`text-sm font-semibold ${isAccent ? accent : ink}`}>
                  {d.label}
                </span>
                <span className={`text-sm font-bold tabular-nums ${isAccent ? accent : ink}`}>
                  {fmt(d.value)}
                </span>
              </div>
              <div className={`h-2.5 rounded-full ${track} overflow-hidden`}>
                <div
                  className={`h-full rounded-full ${isAccent ? bar : "bg-[oklch(0.16_0.22_40)]"}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>

      {/* Desktop: column chart */}
      <div className="hidden sm:block">
        <div className="flex items-end gap-1.5 md:gap-2 h-52 md:h-60">
          {data.map((d, i) => {
            const isAccent = i === accentIndex;
            const pct = Math.max((d.value / max) * 100, 1.5);
            return (
              <div
                key={d.label}
                className="flex-1 min-w-0 flex flex-col items-center justify-end h-full gap-1.5"
              >
                <span className={`text-[10px] md:text-xs font-bold tabular-nums ${ink}`}>
                  {fmt(d.value)}
                </span>
                <div className="w-full flex-1 flex items-end">
                  <div
                    className={`w-full rounded-t-md ${isAccent ? bar : barAlt}`}
                    style={{ height: `${pct}%` }}
                    title={`${d.label}: ${fmt(d.value)}`}
                  />
                </div>
                <span className={`text-[10px] md:text-xs font-medium ${muted}`}>
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Fig>
  );
}

export function SteamGenresChart({
  steamGenres,
  vgGenres,
  caption,
}: {
  steamGenres: Record<string, number>;
  vgGenres: Record<string, number>;
  caption?: string;
}) {
  const steamEntries = Object.entries(steamGenres).sort((a, b) => b[1] - a[1]);
  const maxVal = Math.max(
    ...steamEntries.map(([, v]) => v),
    ...Object.values(vgGenres),
    1,
  );

  // Build union of top genres: steam order first, then any vg-only
  const labels = [
    ...steamEntries.map(([g]) => g),
    ...Object.keys(vgGenres).filter((g) => !(g in steamGenres)),
  ].slice(0, 10);

  return (
    <Fig ariaLabel="Steam vs VGChartz genre comparison" caption={caption}>
      <div className="flex flex-wrap gap-4 mb-4 text-xs font-semibold">
        <span className="inline-flex items-center gap-1.5">
          <span className={`inline-block w-3 h-2.5 rounded-full ${bar}`} />
          <span className={ink}>Steam</span>
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className={`inline-block w-3 h-2.5 rounded-full ${barAlt}`} />
          <span className={ink}>VGChartz</span>
        </span>
      </div>
      <ul className="space-y-4" role="list">
        {labels.map((genre) => {
          const steam = steamGenres[genre] || 0;
          const vg = vgGenres[genre] || 0;
          return (
            <li key={genre}>
              <div className={`text-sm font-semibold ${ink} mb-1.5 truncate`}>
                {genre}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-2.5 rounded-full ${track} overflow-hidden min-w-0`}>
                    <div
                      className={`h-full rounded-full ${bar}`}
                      style={{ width: `${Math.max((steam / maxVal) * 100, steam ? 2 : 0)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold tabular-nums w-14 sm:w-16 text-right shrink-0 ${ink}`}>
                    {steam ? steam.toLocaleString() : "—"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`flex-1 h-2.5 rounded-full ${track} overflow-hidden min-w-0`}>
                    <div
                      className={`h-full rounded-full ${barAlt}`}
                      style={{ width: `${Math.max((vg / maxVal) * 100, vg ? 2 : 0)}%` }}
                    />
                  </div>
                  <span className={`text-xs font-bold tabular-nums w-14 sm:w-16 text-right shrink-0 ${ink}`}>
                    {vg ? vg.toLocaleString() : "—"}
                  </span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Fig>
  );
}

export function VictoryDonut({
  data,
  accentLabel,
  title = "HOW CHESS GAMES END",
  ariaLabel = "How chess games end",
  caption = "More than half of games end in resignation, not checkmate.",
}: {
  data: { label: string; value: number }[];
  accentLabel?: string;
  title?: string;
  ariaLabel?: string;
  caption?: string;
}) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const slices = data.map((d) => ({
    ...d,
    pct: (d.value / total) * 100,
    accent: accentLabel ? d.label === accentLabel : false,
  }));

  // Conic-gradient donut — pure CSS, scales cleanly
  let cursor = 0;
  const stops = slices
    .map((s) => {
      const start = cursor;
      cursor += s.pct;
      const color = s.accent ? "oklch(0.48 0.22 275)" : "oklch(0.88 0.008 280)";
      return `${color} ${start}% ${cursor}%`;
    })
    .join(", ");

  return (
    <Fig ariaLabel={ariaLabel} caption={caption}>
      <p
        className={`font-['JetBrains_Mono'] text-[11px] tracking-[0.1em] uppercase ${muted} mb-5`}
      >
        {title}
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-8 sm:gap-10">
        <div
          className="relative w-40 h-40 sm:w-48 sm:h-48 shrink-0 rounded-full"
          style={{
            background: `conic-gradient(${stops})`,
          }}
          role="img"
          aria-label={ariaLabel}
        >
          <div className="absolute inset-[22%] rounded-full bg-[oklch(0.985_0.006_275)] flex flex-col items-center justify-center">
            <span className={`text-2xl sm:text-3xl font-extrabold tabular-nums ${ink}`}>
              {total.toLocaleString()}
            </span>
            <span className={`text-xs ${muted}`}>games</span>
          </div>
        </div>

        <ul className="w-full sm:flex-1 space-y-3" role="list">
          {slices.map((s) => (
            <li
              key={s.label}
              className="flex items-center justify-between gap-3"
            >
              <span className="inline-flex items-center gap-2 min-w-0">
                <span
                  className="inline-block w-3 h-3 rounded-full shrink-0"
                  style={{
                    background: s.accent
                      ? "oklch(0.48 0.22 275)"
                      : "oklch(0.88 0.008 280)",
                  }}
                />
                <span
                  className={`text-sm font-semibold truncate ${
                    s.accent ? accent : ink
                  }`}
                >
                  {s.label}
                </span>
              </span>
              <span
                className={`text-sm font-bold tabular-nums shrink-0 ${
                  s.accent ? accent : muted
                }`}
              >
                {s.pct.toFixed(1)}% · {s.value.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Fig>
  );
}
