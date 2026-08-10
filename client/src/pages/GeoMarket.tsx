// ============================================================
// PAGE: /geo-market — Geographic Market Analysis
// Extracted from Home.tsx GeoMarketSection.
// ============================================================
import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { geoData } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useSeo } from "@/lib/useSeo";
import {
  Section,
  useMediaQuery,
  tooltipStyle,
  gridColor,
  tickStyle,
  MoreDeepDives,
} from "@/components/sections";
import { ARCHIVE_LINK, AtlasStrip, ResearchFooter, ResearchNav } from "@/components/brand";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";

export default function GeoMarket() {
  const [activeRegion, setActiveRegion] = useState(geoData[0]);
  const SHORT_REGION: Record<string, string> = {
    "North America": "NA",
    Europe: "EU",
    "Asia-Pacific": "APAC",
    "Latin America": "LATAM",
    "Middle East & Africa": "MEA",
  };
  const isMobile = useMediaQuery("(max-width: 767px)");
  const chartData = geoData.map(r => ({
    name: isMobile ? SHORT_REGION[r.name] || r.name : r.name,
    "2024": r.market2024,
    "2030": r.market2030,
  }));
  const adoptionColors: Record<string, string> = {
    High: "oklch(0.45 0.14 160)",
    Medium: "oklch(0.48 0.14 85)",
    Emerging: "oklch(0.52 0.18 35)",
  };
  const adoptionBg: Record<string, string> = {
    High: "oklch(0.95 0.03 160)",
    Medium: "oklch(0.96 0.035 85)",
    Emerging: "oklch(0.96 0.03 35)",
  };

  useSeo({
    title: "Geographic Market Analysis · anygame.dev",
    description:
      "Five regional game-dev markets — NA, EU, APAC, LATAM, MEA — market size, CAGR, AI adoption, dominant platforms, opportunities, and challenges.",
    path: "/geo-market",
  });

  return (
    <div className="theme-light research-page min-h-screen bg-background">
      <ResearchNav label="Geographic Market Analysis" />
      <AtlasStrip current="/geo-market" />

      <header className="container pt-20 pb-12 max-w-[820px]">
        <p
          className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}
        >
          Research Report 2026 · Section 04
        </p>
        <h1
          className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] ${ink}`}
        >
          The Global Game Development Map
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          Five distinct regional markets, each with its own AI adoption curve,
          dominant platform, regulatory environment, and growth trajectory.
          Asia-Pacific leads — $155B → $282B by 2030.
        </p>
      </header>

      <Section number="04" label="Geographic Market Analysis" alt>
        {/* Market size comparison chart */}
        <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-5 md:p-8 mb-10 shadow-sm">
          <h3 className="font-['Inter'] font-bold text-xl text-[oklch(0.08_0.02_270)] mb-1">
            Market Size by Region
          </h3>
          <p className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-6 uppercase tracking-wider">
            USD billions · 2024 vs 2030 projection
          </p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart
              data={chartData}
              margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={tickStyle} interval={0} />
              <YAxis tick={tickStyle} unit="B" />
              <Tooltip
                {...tooltipStyle}
                formatter={(v: number) => [`$${v}B`]}
              />
              <Legend
                wrapperStyle={{
                  fontFamily: "JetBrains Mono",
                  fontSize: "11px",
                  color: "oklch(0.30 0.015 275)",
                }}
              />
              <Bar
                dataKey="2024"
                fill="oklch(0.48 0.22 275)"
                radius={[3, 3, 0, 0]}
              />
              <Bar
                dataKey="2030"
                fill="oklch(0.66 0.18 35)"
                radius={[3, 3, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
          {isMobile && (
            <p className="mt-3 font-['JetBrains_Mono'] text-[10px] text-[oklch(0.4_0.012_275)] uppercase tracking-wider leading-relaxed">
              NA = North America · EU = Europe · APAC = Asia-Pacific · LATAM =
              Latin America · MEA = Middle East &amp; Africa
            </p>
          )}
        </div>

        {/* Region selector */}
        <div
          role="tablist"
          aria-label="Choose a market region"
          className="mb-10 flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {geoData.map(r => (
            <button
              key={r.id}
              role="tab"
              aria-selected={activeRegion.id === r.id}
              onClick={() => setActiveRegion(r)}
              className={`region-card min-h-28 min-w-[9rem] flex-1 rounded-lg p-4 text-left transition-all lg:min-w-0 ${activeRegion.id === r.id ? "active" : ""}`}
            >
              <div className="text-2xl mb-2">{r.flag}</div>
              <div className="font-['Inter'] font-bold text-sm text-[oklch(0.08_0.02_270)] leading-tight">
                {r.name}
              </div>
              <div
                className="font-['JetBrains_Mono'] text-xs mt-1"
                style={{ color: adoptionColors[r.aiAdoption] }}
              >
                {r.aiAdoption}
              </div>
            </button>
          ))}
        </div>

        {/* Active region detail */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] uppercase tracking-wider mb-4">
                {activeRegion.name} · Key Metrics
              </div>
              <div className="space-y-4">
                <div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-1">
                    Market Size 2024
                  </div>
                  <div className="font-['JetBrains_Mono'] font-bold text-2xl text-[oklch(0.48_0.22_275)]">
                    ${activeRegion.market2024}B
                  </div>
                </div>
                <div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-1">
                    Projected 2030
                  </div>
                  <div className="font-['JetBrains_Mono'] font-bold text-2xl text-[oklch(0.55_0.18_35)]">
                    ${activeRegion.market2030}B
                  </div>
                </div>
                <div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-1">
                    CAGR
                  </div>
                  <div className="font-['JetBrains_Mono'] font-bold text-2xl text-[oklch(0.55_0.14_85)]">
                    {activeRegion.cagr}%
                  </div>
                </div>
                <div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-1">
                    AI Adoption Level
                  </div>
                  <span
                    className="font-['JetBrains_Mono'] font-bold text-sm px-2 py-1 rounded-full"
                    style={{
                      color: adoptionColors[activeRegion.aiAdoption],
                      background: adoptionBg[activeRegion.aiAdoption],
                    }}
                  >
                    {activeRegion.aiAdoption}
                  </span>
                </div>
                <div>
                  <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-1">
                    Dominant Platform
                  </div>
                  <div className="font-['JetBrains_Mono'] text-sm text-[oklch(0.15_0.02_270)]">
                    {activeRegion.dominantPlatform}
                  </div>
                </div>
              </div>
            </div>
            <div
              className="bg-[#ffffff] border-2 rounded-lg p-5 shadow-sm"
              style={{ borderColor: `${activeRegion.color}50` }}
            >
              <div
                className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider mb-2"
                style={{ color: activeRegion.color }}
              >
                Notable Stat
              </div>
              <p className="font-['Inter'] text-sm text-[oklch(0.15_0.02_270)] leading-relaxed">
                {activeRegion.notableStat}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-3">
                Market Overview
              </h3>
              <p className="font-['Inter'] text-[oklch(0.24_0.015_270)] leading-relaxed">
                {activeRegion.description}
              </p>
            </div>
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-3">
                Key Trends
              </h3>
              <ul className="space-y-2">
                {activeRegion.trends.map((t, i) => (
                  <li key={i} className="flex gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: activeRegion.color }}
                    />
                    <span className="font-['Inter'] text-sm text-[oklch(0.24_0.015_270)]">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-3">
                Key Players
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeRegion.keyPlayers.map((p, i) => (
                  <span
                    key={i}
                    className="font-['JetBrains_Mono'] text-xs bg-[oklch(0.88_0.005_280)] border border-[oklch(0.8_0.008_280)] text-[oklch(0.24_0.015_275)] px-2 py-1 rounded"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-3">
                Opportunities
              </h3>
              <ul className="space-y-2">
                {activeRegion.opportunities.map((o, i) => (
                  <li key={i} className="flex gap-3">
                    <TrendingUp
                      size={14}
                      className="mt-1 flex-shrink-0 text-[oklch(0.55_0.16_160)]"
                    />
                    <span className="font-['Inter'] text-sm text-[oklch(0.24_0.015_270)]">
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-3">
                Challenges
              </h3>
              <ul className="space-y-2">
                {activeRegion.challenges.map((c, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-[oklch(0.66_0.18_35)]" />
                    <span className="font-['Inter'] text-sm text-[oklch(0.24_0.015_270)]">
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-3">
                AI Tools in Region
              </h3>
              <div className="flex flex-wrap gap-2">
                {activeRegion.aiTools.map((t, i) => (
                  <span
                    key={i}
                    className="rounded border border-[oklch(0.8_0.02_275)] bg-[oklch(0.96_0.025_275)] px-2 py-1 font-['JetBrains_Mono'] text-xs text-[oklch(0.48_0.22_275)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 md:hidden">
          <h3 className="mb-4 font-['Syne'] text-xl font-bold text-[oklch(0.18_0.02_270)]">
            Regional comparison
          </h3>
          <div className="overflow-hidden rounded-lg border border-[oklch(0.88_0.008_280)] bg-white">
            {geoData.map(region => (
              <button
                key={region.id}
                onClick={() => setActiveRegion(region)}
                className={`grid min-h-20 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-[oklch(0.88_0.008_280)] px-4 py-3 text-left last:border-b-0 ${
                  activeRegion.id === region.id
                    ? "bg-[oklch(0.96_0.025_275)]"
                    : "bg-white"
                }`}
              >
                <span className="min-w-0">
                  <span className="block font-['Syne'] text-sm font-semibold text-[oklch(0.18_0.02_270)]">
                    {region.flag} {region.name}
                  </span>
                  <span className="mt-1 block font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)]">
                    {region.dominantPlatform} / {region.aiAdoption} AI adoption
                  </span>
                </span>
                <span className="text-right font-['JetBrains_Mono'] text-xs text-[oklch(0.18_0.02_270)]">
                  <strong className="block text-[oklch(0.48_0.22_275)]">
                    ${region.market2024}B to ${region.market2030}B
                  </strong>
                  <span className="text-[oklch(0.52_0.015_275)]">
                    {region.cagr}% CAGR
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Summary comparison table */}
        <div className="hidden md:block mt-10 bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[oklch(0.85_0.006_280)]">
            <h3 className="font-['Inter'] font-bold text-xl text-[oklch(0.08_0.02_270)]">
              Regional Comparison Matrix
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[oklch(0.85_0.006_280)] bg-[oklch(0.9_0.004_280)]">
                  {[
                    "Region",
                    "Market 2024",
                    "Market 2030",
                    "CAGR",
                    "AI Adoption",
                    "Platform",
                  ].map(h => (
                    <th
                      key={h}
                      className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] uppercase tracking-wider text-left px-6 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {geoData.map(r => (
                  <tr
                    key={r.id}
                    onClick={() => setActiveRegion(r)}
                    className={`cursor-pointer border-b border-[oklch(0.86_0.005_280)] transition-colors ${activeRegion.id === r.id ? "bg-[oklch(0.96_0.025_275)]" : "hover:bg-[oklch(0.98_0.006_275)]"}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span>{r.flag}</span>
                        <span className="font-['Inter'] font-bold text-sm text-[oklch(0.08_0.02_270)]">
                          {r.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-sm text-[oklch(0.15_0.02_270)]">
                      ${r.market2024}B
                    </td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-sm text-[oklch(0.55_0.18_35)]">
                      ${r.market2030}B
                    </td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-sm text-[oklch(0.55_0.14_85)]">
                      {r.cagr}%
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="font-['JetBrains_Mono'] text-xs px-2 py-1 rounded-full"
                        style={{
                          color: adoptionColors[r.aiAdoption],
                          background: adoptionBg[r.aiAdoption],
                        }}
                      >
                        {r.aiAdoption}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)]">
                      {r.dominantPlatform}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <MoreDeepDives current="/geo-market" />

      <ResearchFooter
        label="Geographic Market Analysis"
        links={[ARCHIVE_LINK]}
      />
    </div>
  );
}
