// ============================================================
// PAGE: /kaggle-insights — Kaggle Data Analysis for Indie Devs
// Design: Editorial Intelligence — LIGHT THEME
// Uses ve-visual-kit hand-drawn SVG figures (no raw JSON / code dumps)
// ============================================================
import { useEffect, useState } from "react";
import { useSeo } from "@/lib/useSeo";
import {
  Section,
  MoreDeepDives,
} from "@/components/sections";
import {
  ResearchNav,
  AtlasStrip,
  ResearchFooter,
  MINY_PLAY_LINK,
} from "@/components/brand";
import {
  HorizontalBars,
  VerticalBars,
  SteamGenresChart,
  VictoryDonut,
} from "@/components/kaggleViz";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";
const cardBg = "bg-[oklch(0.985_0.006_275)]";

type InsightItem = {
  finding: string;
  recommendation: string;
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  rating_by_price?: Record<string, { mean_positive_ratio: number; count: number }>;
};

type ExecSummary = {
  total_steam_games: number;
  total_vgchartz_games: number;
  total_board_games: number;
  total_chess_games: number;
  key_takeaway: string;
};

type InsightsJson = {
  source: string;
  generated_at: string;
  raw_data_location: string;
  individual_summaries: Record<string, unknown>;
  indie_developer_insights: {
    executive_summary: ExecSummary;
  } & Record<string, InsightItem>;
};

function prettyKey(k: string): string {
  return k
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function fmtNumber(v: number, key = ""): string {
  const k = key.toLowerCase();
  const asRatio =
    k.includes("ratio") ||
    k.includes("pct") ||
    // bare 0–1 fractions only when the key signals a share/rate
    ((k.includes("mean") || k.includes("share") || k.includes("positive")) &&
      v > 0 &&
      v <= 1 &&
      !Number.isInteger(v));
  if (asRatio) {
    const pct = v <= 1 ? v * 100 : v;
    return `${pct.toFixed(pct < 10 || !Number.isInteger(pct) ? 1 : 0)}%`;
  }
  if (Math.abs(v) >= 1000) return v.toLocaleString(undefined, { maximumFractionDigits: 0 });
  if (!Number.isInteger(v)) return v.toFixed(Math.abs(v) < 10 ? 2 : 1);
  return v.toString();
}

/** Format already-percent-point values (53.1, 0.6) — never rescale. */
function fmtPercentPoints(v: number): string {
  if (Number.isInteger(v)) return `${v}%`;
  // Keep one decimal for small shares like 0.6
  const decimals = Math.abs(v) < 10 ? 1 : 1;
  return `${v.toFixed(decimals)}%`;
}

/** Strip Python/JSON dumps from findings so the page never shows code. */
function cleanProse(text: string): string {
  if (!text) return "";
  let t = text;
  // Drop list-of-tuples dumps, with optional "Top examples:" prefix
  t = t.replace(
    /\s*(?:Top\s+(?:examples?|openings?|\d+)[^:.]*:\s*)?\[(?:\([^\]]*\)(?:,\s*)?)+\]\.?/gi,
    "",
  );
  // Drop "{'a': 1, ...}" dumps (with or without a leading label:)
  t = t.replace(/\s*\{['"][^}]{8,}\}/g, "");
  t = t.replace(/:\s*\{[^}]{8,}\}/g, "");
  // Drop leftover bare tuples
  t = t.replace(/\(\s*'[^']+'\s*,\s*[\d.]+\s*\)/g, "");
  t = t.replace(/\[\s*,?\s*\]/g, "");
  // Tidy punctuation left behind
  t = t.replace(/\s{2,}/g, " ");
  t = t.replace(/\s+([.,;])/g, "$1");
  t = t.replace(/\.{2,}/g, ".");
  t = t.replace(/:\s*([.])/g, "$1");
  t = t.replace(/^\s*[,;.\s]+/, "");
  t = t.replace(/:\s*$/g, ".");
  // "Label: Full sentence..." after dump strip → keep the sentence only
  // when remainder looks like prose (4+ lowercase words), not "A, B, C" lists
  t = t.replace(
    /^[A-Za-z][^:]{0,80}:\s+(?=[A-Z][a-z]+(?:\s+[a-z']+){3,})/g,
    "",
  );
  t = t.trim();
  // If stripping left only a short label stub, drop it
  if (t.length > 0 && t.length < 36 && /:$/.test(t)) return "";
  if (/^[A-Za-z][\w\s/%$+-]{0,30}\.?$/.test(t) && t.split(" ").length <= 5) return "";
  return t;
}

function isNumericMap(obj: Record<string, unknown>): boolean {
  const vals = Object.values(obj);
  return vals.length > 0 && vals.every((v) => typeof v === "number");
}

function RankedRows({
  title,
  rows,
  valueFmt,
}: {
  title?: string;
  rows: { label: string; value: number }[];
  valueFmt?: (v: number, label: string) => string;
}) {
  if (rows.length === 0) return null;
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className={`rounded-xl border ${border} bg-white overflow-hidden`}>
      {title && (
        <div
          className={`px-4 sm:px-5 py-3 ${border} border-b font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${muted}`}
        >
          {title}
        </div>
      )}
      <ul className="divide-y divide-[oklch(0.92_0.006_280)]">
        {rows.map((r) => (
          <li
            key={r.label}
            className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 items-center px-4 sm:px-5 py-3"
          >
            <div className="min-w-0">
              <div className={`font-['Inter'] text-sm ${ink} truncate`}>{r.label}</div>
              <div className="mt-1.5 h-1.5 rounded bg-[oklch(0.92_0.006_280)] overflow-hidden">
                <div
                  className="h-full bg-[oklch(0.48_0.22_275)]"
                  style={{ width: `${max > 0 ? (r.value / max) * 100 : 0}%` }}
                />
              </div>
            </div>
            <div className="stat-number text-base sm:text-lg tabular-nums shrink-0">
              {valueFmt ? valueFmt(r.value, r.label) : fmtNumber(r.value, r.label)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricGrid({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  if (items.length === 0) return null;
  return (
    <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((it) => (
        <div
          key={it.label}
          className={`rounded-lg border ${border} ${cardBg} p-3 sm:p-4 min-w-0`}
        >
          <div className="stat-number text-xl sm:text-2xl break-words">{it.value}</div>
          <div
            className={`font-['JetBrains_Mono'] text-[10px] sm:text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider break-words`}
          >
            {it.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function HotspotTable({
  rows,
}: {
  rows: { name: string; price: number; ratio: number }[];
}) {
  if (rows.length === 0) return null;
  return (
    <div className={`rounded-xl border ${border} bg-white overflow-hidden`}>
      <div
        className={`px-4 sm:px-5 py-3 ${border} border-b font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${muted}`}
      >
        High-rated games under $10
      </div>
      {/* Mobile: stacked cards */}
      <ul className="sm:hidden divide-y divide-[oklch(0.92_0.006_280)]">
        {rows.map((r) => (
          <li key={r.name} className="px-4 py-3">
            <div className={`font-['Inter'] text-sm ${ink} leading-snug`}>{r.name}</div>
            <div className={`mt-1 flex gap-3 font-['JetBrains_Mono'] text-xs ${muted}`}>
              <span>{fmtNumber(r.ratio, "ratio")} positive</span>
              <span>${r.price.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm min-w-[420px]">
          <thead>
            <tr className={`${border} border-b`}>
              <th
                className={`text-left px-5 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}
              >
                Game
              </th>
              <th
                className={`text-right px-5 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}
              >
                Price
              </th>
              <th
                className={`text-right px-5 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}
              >
                Positive
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.name}
                className={i < rows.length - 1 ? `${border} border-b` : undefined}
              >
                <td className={`px-5 py-3 ${ink}`}>{r.name}</td>
                <td className={`px-5 py-3 text-right tabular-nums ${ink}`}>
                  ${r.price.toFixed(2)}
                </td>
                <td className={`px-5 py-3 text-right tabular-nums ${ink}`}>
                  {fmtNumber(r.ratio, "ratio")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function InsightData({
  data,
  sectionKey,
}: {
  data: InsightItem["data"];
  sectionKey: string;
}) {
  // List payloads (price_value_hotspots)
  if (Array.isArray(data)) {
    const rows = data
      .filter(
        (r): r is { name: string; price: number; ratio: number } =>
          !!r &&
          typeof r === "object" &&
          typeof (r as { name?: unknown }).name === "string",
      )
      .map((r) => ({
        name: String(r.name),
        price: Number(r.price) || 0,
        ratio: Number(r.ratio) || 0,
      }));
    return <HotspotTable rows={rows} />;
  }

  if (!data || typeof data !== "object") return null;

  const entries = Object.entries(data).filter(
    ([k]) => !["finding", "recommendation", "rating_by_price"].includes(k),
  );

  // Nested numeric maps (steam_top, victory_status, top_openings, …)
  const nestedMaps: { key: string; rows: { label: string; value: number }[] }[] =
    [];
  const flatNumeric: { label: string; value: number }[] = [];
  const scalarMetrics: { label: string; value: string }[] = [];

  for (const [k, v] of entries) {
    if (typeof v === "number") {
      // Pure ranking maps use the key as the category label
      // Scalar stats use snake_case keys — keep as metric cards when few
      flatNumeric.push({ label: prettyKey(k), value: v });
    } else if (v && typeof v === "object" && !Array.isArray(v) && isNumericMap(v as Record<string, unknown>)) {
      const rows = Object.entries(v as Record<string, number>)
        .map(([label, value]) => ({ label, value }))
        .sort((a, b) => b.value - a.value);
      nestedMaps.push({ key: k, rows });
    }
    // skip non-numeric nested junk silently — never JSON.stringify
  }

  // Heuristic: if every flat key looks like a category (short, no snake_case),
  // render as ranked rows; otherwise metric cards.
  const looksLikeRanking =
    flatNumeric.length >= 3 &&
    flatNumeric.every((r) => !r.label.includes(" ") || r.label.split(" ").length <= 4) &&
    // keys that are pure categories: Free, Windows, PC, Jan, Sokoban…
    Object.keys(data).every((k) => !k.includes("_") || k.split("_").length <= 2);

  // Prefer ranked list for distribution-style maps (price buckets, platforms, months, tags)
  const rankingKeys = new Set([
    "pricing_strategy",
    "platform_targeting",
    "market_trends",
    "regional_sales",
    "game_design_from_board_games",
    "dev_ecosystem",
    "tag_based_opportunity",
    "release_timing",
  ]);

  const showAsRanked = rankingKeys.has(sectionKey) || looksLikeRanking;

  return (
    <div className="space-y-4">
      {nestedMaps.map((m) => (
        <RankedRows
          key={m.key}
          title={prettyKey(m.key)}
          rows={m.rows}
          valueFmt={(v, label) =>
            m.key.includes("ratio") || m.key === "victory_status"
              ? fmtNumber(v, m.key.includes("ratio") ? "ratio" : label)
              : fmtNumber(v, label)
          }
        />
      ))}

      {flatNumeric.length > 0 && showAsRanked && (
        <RankedRows
          rows={flatNumeric.map((r) => ({
            label: r.label,
            value: r.value,
          }))}
          valueFmt={(v, label) => {
            // Tag ratios are 0–1
            if (sectionKey === "tag_based_opportunity") return fmtNumber(v, "ratio");
            if (sectionKey === "early_access_impact" && label.toLowerCase().includes("ratio"))
              return fmtNumber(v, "ratio");
            // Price buckets + platforms are already percent points (53.1, 100)
            if (sectionKey === "pricing_strategy" || sectionKey === "platform_targeting")
              return fmtPercentPoints(v);
            return fmtNumber(v, label);
          }}
        />
      )}

      {flatNumeric.length > 0 && !showAsRanked && (
        <MetricGrid
          items={flatNumeric.map((r) => ({
            label: r.label,
            value: fmtNumber(r.value, r.label),
          }))}
        />
      )}

      {scalarMetrics.length > 0 && <MetricGrid items={scalarMetrics} />}
    </div>
  );
}

export default function KaggleInsights() {
  const [insights, setInsights] = useState<InsightsJson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/kaggle-insights.json")
      .then((r) => r.json())
      .then((data: InsightsJson) => {
        setInsights(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useSeo({
    title: "Kaggle Insights for Indie Game Devs · anygame.dev",
    description:
      "7 Kaggle datasets analyzed into actionable insights: Steam pricing, platform targeting, discoverability, genre opportunity, playtime, and game design patterns.",
    path: "/kaggle-insights",
  });

  if (loading) {
    return (
      <div className="theme-light research-page min-h-screen bg-background">
        <ResearchNav label="Kaggle Insights" />
        <AtlasStrip current="/kaggle-insights" />
        <div className="container py-20 max-w-[820px]">
          <p className={`font-['JetBrains_Mono'] text-sm ${muted}`}>
            Loading insights from Kaggle data...
          </p>
        </div>
        <MoreDeepDives current="/kaggle-insights" />
        <ResearchFooter label="Kaggle Insights" links={[MINY_PLAY_LINK]} />
      </div>
    );
  }

  if (!insights) {
    return (
      <div className="theme-light research-page min-h-screen bg-background">
        <ResearchNav label="Kaggle Insights" />
        <AtlasStrip current="/kaggle-insights" />
        <div className="container py-20 max-w-[820px]">
          <p className={`font-['JetBrains_Mono'] text-sm ${muted}`}>
            Kaggle data not available right now.
          </p>
        </div>
        <MoreDeepDives current="/kaggle-insights" />
        <ResearchFooter label="Kaggle Insights" links={[MINY_PLAY_LINK]} />
      </div>
    );
  }

  const { indie_developer_insights: data } = insights;
  const insightKeys = Object.keys(data).filter(
    (k) => k !== "executive_summary",
  );

  const priceData = Object.entries(
    (data.pricing_strategy?.data || {}) as Record<string, number>,
  )
    .filter(([, v]) => typeof v === "number")
    .map(([key, val]) => ({ label: key, value: val }));

  const ratingByPrice =
    (data.pricing_strategy?.rating_by_price || {}) as Record<
      string,
      { mean_positive_ratio: number; count: number }
    >;
  const ratingData = Object.entries(ratingByPrice).map(([key, val]) => ({
    label: key,
    value: Math.round((val?.mean_positive_ratio || 0) * 100),
  }));

  const platformData = Object.entries(
    (data.platform_targeting?.data || {}) as Record<string, number>,
  ).map(([key, val]) => ({ label: key, value: val }));

  const tagData = Object.entries(
    (data.tag_based_opportunity?.data || {}) as Record<string, number>,
  ).map(([key, val]) => ({
    label: key,
    value: Math.round(val * 100),
  }));

  const genreData = data.genre_opportunity?.data as {
    steam_top?: Record<string, number>;
    vg_top?: Record<string, number>;
  } | null;

  const monthOrder = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const releaseMonthRaw = (data.release_timing?.data || {}) as Record<string, number>;
  const releaseMonthData = monthOrder
    .filter((m) => releaseMonthRaw[m] !== undefined)
    .map((m) => ({ label: m, value: releaseMonthRaw[m] }));

  const chessData = data.game_theory_from_chess?.data as {
    victory_status?: Record<string, number>;
  } | null;
  const chessVictoryRaw = chessData?.victory_status || {};
  const victoryLabelMap: Record<string, string> = {
    resign: "Resign",
    mate: "Mate",
    outoftime: "Timeout",
    draw: "Draw",
  };
  const victoryData = Object.entries(chessVictoryRaw)
    .map(([key, value]) => ({ label: victoryLabelMap[key] || key, value }))
    .filter((d) => d.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <div className="theme-light research-page min-h-screen bg-background">
      <ResearchNav label="Kaggle Insights" />
      <AtlasStrip current="/kaggle-insights" />

      <header className="container pt-16 sm:pt-20 pb-10 sm:pb-12 max-w-[820px]">
        <p
          className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}
        >
          Research Report 2026 · Section 06
        </p>
        <h1
          className={`font-['Syne'] font-extrabold text-3xl sm:text-4xl md:text-6xl leading-[1.05] ${ink}`}
        >
          Kaggle Data for Game Dev Strategy
        </h1>
        <p className={`mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed ${muted}`}>
          Cross-analysed 7 Kaggle datasets (Steam, VGChartz, Board Games,
          Chess, Sudoku) into actionable intel for indie studios and game
          developers.
        </p>
        {insights.generated_at && (
          <p className={`mt-4 font-['JetBrains_Mono'] text-xs ${muted}`}>
            Generated:{" "}
            {new Date(insights.generated_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </header>

      <Section number="01" label="Findings at a glance">
        <div className="pull-quote mb-8 max-w-2xl">
          {(data.executive_summary as ExecSummary)?.key_takeaway ||
            "Cross-analysed 7 Kaggle datasets into actionable insights for indie game developers."}
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
          {[
            {
              label: "Steam games",
              value:
                data.executive_summary?.total_steam_games?.toLocaleString() ||
                "100K+",
            },
            {
              label: "VGChartz games",
              value:
                data.executive_summary?.total_vgchartz_games?.toLocaleString() ||
                "64K+",
            },
            {
              label: "Board games",
              value:
                data.executive_summary?.total_board_games?.toLocaleString() ||
                "18K+",
            },
            {
              label: "Chess games",
              value:
                data.executive_summary?.total_chess_games?.toLocaleString() ||
                "3M+",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg border ${border} ${cardBg} p-3 sm:p-4`}
            >
              <div className="stat-number text-xl sm:text-2xl">{stat.value}</div>
              <div className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section number="02" label="Market data visualised">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <h3 className={`font-['Syne'] text-lg sm:text-xl font-bold ${ink} mb-3 sm:mb-4`}>
              Steam price distribution
            </h3>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
              % of games in each price bucket
            </p>
            <HorizontalBars
              ariaLabel="Steam price distribution"
              data={priceData}
              fmt={(v) => `${v}%`}
              caption="53% of Steam games are priced under $5 — volume-first, low-price market."
            />
          </div>

          <div className="min-w-0">
            <h3 className={`font-['Syne'] text-lg sm:text-xl font-bold ${ink} mb-3 sm:mb-4`}>
              Platform support (Steam)
            </h3>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
              % of Steam games supporting each platform
            </p>
            <HorizontalBars
              ariaLabel="Platform support"
              data={platformData}
              fmt={(v) => `${v}%`}
              caption="Windows is mandatory (>99% of Steam games). Mac is 17% — consider it."
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-12 min-w-0">
          <h3 className={`font-['Syne'] text-lg sm:text-xl font-bold ${ink} mb-3 sm:mb-4`}>
            Positive rating ratio by price tier
          </h3>
          <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
            Higher price demands higher quality
          </p>
          <HorizontalBars
            ariaLabel="Positive rating ratio by price tier"
            data={ratingData}
            fmt={(v) => `${v}%`}
            caption="$60+ games have a 53.6% positive ratio — premium pricing without premium quality is penalized."
          />
        </div>
      </Section>

      <Section number="03" label="Deep-dive charts">
        <div className="grid gap-10 lg:gap-12 lg:grid-cols-2">
          <div className="min-w-0">
            <h3 className={`font-['Syne'] text-lg sm:text-xl font-bold ${ink} mb-3 sm:mb-4`}>
              Best-rated Steam tags by positive ratio
            </h3>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
              Top 10 tags by community approval
            </p>
            <HorizontalBars
              ariaLabel="Best-rated Steam tags"
              data={tagData}
              fmt={(v) => `${v}%`}
              caption="Wholesome and Cozy tags show 89%+ positive ratios — underserved niches with engaged audiences."
            />
          </div>

          <div className="min-w-0">
            <h3 className={`font-['Syne'] text-lg sm:text-xl font-bold ${ink} mb-3 sm:mb-4`}>
              Steam vs VGChartz genre comparison
            </h3>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
              Game counts by genre across both platforms
            </p>
            <SteamGenresChart
              steamGenres={genreData?.steam_top || {}}
              vgGenres={genreData?.vg_top || {}}
              caption="Steam's most common genres: Action, Casual, Indie, Adventure. VGChartz shows Action and Sports dominate historical sales."
            />
          </div>
        </div>

        <div className="mt-10 sm:mt-12 min-w-0">
          <h3 className={`font-['Syne'] text-lg sm:text-xl font-bold ${ink} mb-3 sm:mb-4`}>
            Steam release volume by month
          </h3>
          <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
            Number of games released each month
          </p>
          <VerticalBars
            ariaLabel="Steam release volume by month"
            data={releaseMonthData}
            fmt={(v) => v.toLocaleString()}
            caption="October is the peak release month (12,207 games) — Q4 is the most competitive."
          />
        </div>

        <div className="mt-10 sm:mt-12 min-w-0">
          <h3 className={`font-['Syne'] text-lg sm:text-xl font-bold ${ink} mb-3 sm:mb-4`}>
            How chess games end
          </h3>
          <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
            Victory status distribution
          </p>
          <VictoryDonut
            data={victoryData}
            accentLabel="Resign"
            ariaLabel="Chess victory status distribution"
            caption="More than half of games end in resignation, not checkmate."
          />
        </div>
      </Section>

      {insightKeys.map((key, i) => {
        const insight = data[key] as InsightItem | undefined;
        if (!insight?.finding) return null;
        const finding = cleanProse(insight.finding);
        const recommendation = cleanProse(insight.recommendation);
        const hasData =
          insight.data &&
          (Array.isArray(insight.data)
            ? insight.data.length > 0
            : Object.keys(insight.data).length > 0);

        return (
          <Section
            key={key}
            number={String(i + 4).padStart(2, "0")}
            label={prettyKey(key)}
          >
            {finding && (
              <div className="pull-quote mb-6 max-w-2xl">{finding}</div>
            )}
            {recommendation && (
              <p className={`mb-6 max-w-2xl leading-relaxed ${muted}`}>
                {recommendation}
              </p>
            )}
            {hasData && (
              <div className="mt-6">
                <InsightData data={insight.data} sectionKey={key} />
              </div>
            )}
          </Section>
        );
      })}

      <Section number="10" label="Data sources">
        <div className={`space-y-3 text-sm ${muted}`}>
          <p>
            Derived from 7 public Kaggle datasets (Steam store, VGChartz, board
            games, chess, sudoku). Only summary statistics are published on this
            page.
          </p>
          <p>
            Data repo:{" "}
            <a
              href="https://github.com/collectivewinca/anygame-data"
              className="text-[oklch(0.48_0.22_275)] break-all"
            >
              collectivewinca/anygame-data
            </a>
          </p>
        </div>
      </Section>

      <MoreDeepDives current="/kaggle-insights" />
      <ResearchFooter
        label="Kaggle Insights"
        links={[MINY_PLAY_LINK, { href: "/july-archive", label: "Archive" }]}
      />
    </div>
  );
}
