// ============================================================
// PAGE: /kaggle-insights — Kaggle Data Analysis for Indie Devs
// Design: Editorial Intelligence — LIGHT THEME
// ============================================================
import { useEffect, useState } from "react";
import { useSeo } from "@/lib/useSeo";
import {
  Section,
  useMediaQuery,
  tooltipStyle,
  gridColor,
  tickStyle,
  MoreDeepDives,
} from "@/components/sections";
import {
  ResearchNav,
  AtlasStrip,
  ResearchFooter,
  MINY_PLAY_LINK,
} from "@/components/brand";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";

type InsightItem = {
  finding: string;
  recommendation: string;
  data: Record<string, unknown>;
};

type InsightsJson = {
  source: string;
  generated_at: string;
  raw_data_location: string;
  individual_summaries: Record<string, unknown>;
  indie_developer_insights: Record<string, InsightItem>;
};

export default function KaggleInsights() {
  const [insights, setInsights] = useState<InsightsJson | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery("(max-width: 767px)");

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
            Kaggle data not available. Run pnpm fetch-snapshots to retrieve.
          </p>
        </div>
        <MoreDeepDives current="/kaggle-insights" />
        <ResearchFooter label="Kaggle Insights" links={[MINY_PLAY_LINK]} />
      </div>
    );
  }

  const { indie_developer_insights: data } = insights;
  const insightKeys = Object.keys(data).filter((k) => k !== "executive_summary");

  // Build chart data from pricing strategy
  const priceData = Object.entries(
    (data.pricing_strategy?.data || {}) as Record<string, number>,
  )
    .filter(([, v]) => typeof v === "number")
    .map(([key, val]) => ({ bucket: key, pct: val }));

  const ratingByPrice =
    (data.pricing_strategy?.data as Record<string, { mean_positive_ratio: number; count: number }>) || {};
  const ratingData = Object.entries(ratingByPrice).map(([key, val]) => ({
    bucket: key,
    ratio: Math.round(val.mean_positive_ratio * 100),
    count: val.count,
  }));

  const platformData = Object.entries(
    (data.platform_targeting?.data || {}) as Record<string, number>,
  ).map(([key, val]) => ({ platform: key, pct: val }));

  return (
    <div className="theme-light research-page min-h-screen bg-background">
      <ResearchNav label="Kaggle Insights" />
      <AtlasStrip current="/kaggle-insights" />

      {/* Hero */}
      <header className="container pt-20 pb-12 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Research Report 2026 · Section 06
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] ${ink}`}>
          Kaggle Data for Game Dev Strategy
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          Cross-analysed 7 Kaggle datasets (Steam, VGChartz, Board Games,
          Chess, Sudoku) into actionable intel for indie studios and game
          developers. Raw data resides on T7 (1.6 GB); only derived JSON
          summaries are committed to the project.
        </p>
        {insights.individual_summaries && (
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

      {/* Exec summary */}
      <Section number="01" label="Findings at a glance">
        <div className="pull-quote mb-8 max-w-2xl">
          {(data.executive_summary as InsightItem)?.key_takeaway ||
            "Cross-analysed 7 Kaggle datasets into actionable insights for indie game developers."}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { label: "Steam games", value: "100K+" },
            { label: "VGChartz games", value: "64K+" },
            { label: "Board games", value: "18K+" },
            { label: "Chess games", value: "3M+" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-lg border border-[oklch(0.88_0.008_280)] bg-[oklch(0.985_0.006_275)] p-4">
              <div className="stat-number text-2xl">{stat.value}</div>
              <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Charts: price distribution + platform support */}
      <Section number="02" label="Market data visualised">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Price distribution */}
          <div>
            <h3 className={`font-['Syne'] text-xl font-bold ${ink} mb-4`}>
              Steam price distribution
            </h3>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
              % of games in each price bucket
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="bucket" tick={tickStyle} />
                <YAxis tick={tickStyle} unit="%" />
                <Tooltip {...tooltipStyle} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="pct" fill="oklch(0.48 0.22 275)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Platform support */}
          <div>
            <h3 className={`font-['Syne'] text-xl font-bold ${ink} mb-4`}>
              Platform support (Steam)
            </h3>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
              % of Steam games supporting each platform
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="platform" tick={tickStyle} />
                <YAxis tick={tickStyle} unit="%" />
                <Tooltip {...tooltipStyle} formatter={(v: number) => `${v}%`} />
                <Bar dataKey="pct" fill="oklch(0.62 0.14 160)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Rating ratio by price tier */}
        {ratingData.length > 0 && (
          <div className="mt-12">
            <h3 className={`font-['Syne'] text-xl font-bold ${ink} mb-4`}>
              Positive rating ratio by price tier
            </h3>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted} mb-3 uppercase`}>
              Higher price requires higher quality to maintain positive ratings
            </p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={ratingData}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="bucket" tick={tickStyle} />
                <YAxis tick={tickStyle} domain={[0, 100]} unit="%" />
                <Tooltip
                  {...tooltipStyle}
                  formatter={(v: number, name: string, props: any) => [
                    `${v}%`,
                    `${props.payload.count} games`,
                  ]}
                />
                <Bar dataKey="ratio" fill="oklch(0.48 0.22 275)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <p className={`mt-4 font-['JetBrains_Mono'] text-xs ${muted}`}>
              $60+ games have a 53.6% positive ratio — premium pricing without premium quality is penalized.
            </p>
          </div>
        )}
      </Section>

      {/* Detailed insights */}
      {insightKeys.map((key, i) => {
        const insight = data[key] as InsightItem | undefined;
        if (!insight?.finding) return null;
        return (
          <Section key={key} number={String(i + 3).padStart(2, "0")} label={key.replace(/_/g, " ")}>
            <div className="pull-quote mb-6 max-w-2xl">{insight.finding}</div>
            <p className={`mb-6 max-w-2xl leading-relaxed ${muted}`}>{insight.recommendation}</p>
            {insight.data && Object.keys(insight.data).length > 0 && (
              <div className="mt-6 max-w-2xl overflow-x-auto">
                <table className="border-collapse border border-[oklch(0.88_0.008_280)] text-sm">
                  <tbody>
                    {Object.entries(insight.data).slice(0, 8).map(([k, v]) => (
                      <tr key={k} className="border-t border-[oklch(0.88_0.008_280)]">
                        <td className={`px-3 py-2 font-['JetBrains_Mono'] text-xs uppercase ${ink}`}>{k}</td>
                        <td className={`px-3 py-2 text-sm ${muted}`}>
                          {typeof v === "object"
                            ? JSON.stringify(v)
                            : typeof v === "number"
                            ? v.toLocaleString()
                            : String(v)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Section>
        );
      })}

      {/* Data sources */}
      <Section number="10" label="Data sources">
        <div className={`space-y-3 text-sm ${muted}`}>
          <p>
            Raw datasets cached at{" "}
            <code className="font-['JetBrains_Mono']">{insights.raw_data_location}</code>
          </p>
          <p>
            Published to here.now:{" "}
            <a href="https://sturdy-ponder-jmzn.here.now/" className="text-[oklch(0.48_0.22_275)]">
              sturdy-ponder-jmzn.here.now
            </a>
          </p>
          <p>
            Data repo:{" "}
            <a href="https://github.com/collectivewinca/anygame-data" className="text-[oklch(0.48_0.22_275)]">
              collectivewinca/anygame-data (PR #1 pending)
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
