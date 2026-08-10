// ============================================================
// PAGE: /case-studies — Case Studies (Roblox, Age of Empires)
// Extracted from Home.tsx CaseStudiesSection.
// ============================================================
import { useState } from "react";
import { caseStudies } from "@/lib/data";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useSeo } from "@/lib/useSeo";
import {
  Section,
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

export default function CaseStudies() {
  const [active, setActive] = useState(0);
  const cs = caseStudies[active];

  useSeo({
    title: "Case Studies · anygame.dev",
    description:
      "Roblox economy and Age of Empires deep dives: AI features, creator payouts, and strategic reads.",
    path: "/case-studies",
  });

  return (
    <div className="theme-light research-page min-h-screen bg-background">
      <ResearchNav label="Case Studies" />
      <AtlasStrip current="/case-studies" />

      <header className="container pt-20 pb-12 max-w-[820px]">
        <p
          className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}
        >
          Research Report 2026 · Section 03
        </p>
        <h1
          className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] ${ink}`}
        >
          Case Studies
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          Two platforms that turned AI + UGC into economies. Roblox's creator
          payouts and Age of Empires's AI features — what worked, what didn't,
          and the strategic read for founders.
        </p>
      </header>

      <Section number="03" label="Case Studies">
        <div className="flex gap-4 mb-12">
          {caseStudies.map((c, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`min-h-11 rounded-lg border-2 px-6 py-3 font-['Syne'] text-lg font-bold transition-all ${active === i ? "border-[oklch(0.48_0.22_275)] bg-[oklch(0.48_0.22_275)] text-white" : "border-[oklch(0.88_0.008_280)] bg-white text-[oklch(0.36_0.012_275)] hover:border-[oklch(0.48_0.22_275)] hover:text-[oklch(0.18_0.02_270)]"}`}
            >
              {c.title}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] uppercase tracking-wider mb-2">
              {cs.category} · {cs.year}
            </div>
            <h2 className="font-['Inter'] font-extrabold text-4xl text-[oklch(0.04_0.02_270)] mb-2">
              {cs.title}
            </h2>
            <p className="font-['Inter'] text-lg text-[oklch(0.28_0.012_270)] mb-8">
              {cs.subtitle}
            </p>
            <div
              className="border-l-4 pl-6 mb-8"
              style={{ borderColor: cs.color }}
            >
              <div
                className="font-['JetBrains_Mono'] font-bold text-4xl"
                style={{ color: cs.color }}
              >
                {cs.heroStat}
              </div>
              <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] uppercase tracking-wider mt-1">
                {cs.heroStatLabel}
              </div>
            </div>
            <div className="space-y-3">
              {cs.metrics.map((m, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-[oklch(0.85_0.006_280)]"
                >
                  <span className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)]">
                    {m.label}
                  </span>
                  <div className="text-right">
                    <span className="font-['JetBrains_Mono'] font-bold text-sm text-[oklch(0.08_0.02_270)]">
                      {m.value}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] ml-2">
                      {m.delta}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-4">
                AI Features & Initiatives
              </h3>
              <ul className="space-y-3">
                {cs.aiFeatures.map((f, i) => (
                  <li key={i} className="flex gap-3">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ background: cs.color }}
                    />
                    <span className="font-['Inter'] text-[oklch(0.24_0.015_270)]">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="bg-[#ffffff] border-2 rounded-lg p-6 shadow-sm"
              style={{ borderColor: `${cs.color}60` }}
            >
              <div
                className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider mb-3"
                style={{ color: cs.color }}
              >
                Key Insight
              </div>
              <p className="font-['Inter'] text-lg text-[oklch(0.08_0.02_270)] leading-relaxed">
                {cs.keyInsight}
              </p>
            </div>
            <div className="bg-[oklch(0.9_0.005_280)] border border-[oklch(0.8_0.008_280)] rounded-lg p-6">
              <div className="font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-[oklch(0.4_0.012_275)] mb-3">
                Strategic Read
              </div>
              <p className="font-['Inter'] text-[oklch(0.24_0.015_270)] leading-relaxed">
                {cs.strategicRead}
              </p>
            </div>

            {active === 0 && (
              <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
                <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-1">
                  Roblox Creator Payouts
                </h3>
                <p className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-4 uppercase tracking-wider">
                  USD billions · 2022–2026 projected
                </p>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart
                    data={[
                      { year: "2022", payouts: 0.92 },
                      { year: "2023", payouts: 1.41 },
                      { year: "2024", payouts: 1.51 },
                      { year: "2025", payouts: 2.2 },
                      { year: "2026E", payouts: 2.15 },
                    ]}
                    margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="payoutsGrad"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="oklch(0.48 0.22 275)"
                          stopOpacity={0.2}
                        />
                        <stop
                          offset="95%"
                          stopColor="oklch(0.48 0.22 275)"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                    <XAxis dataKey="year" tick={tickStyle} />
                    <YAxis tick={tickStyle} unit="B" />
                    <Tooltip
                      {...tooltipStyle}
                      formatter={(v: number) => [`$${v}B`, "Payouts"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="payouts"
                      stroke="oklch(0.48 0.22 275)"
                      strokeWidth={2}
                      fill="url(#payoutsGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </Section>

      <MoreDeepDives current="/case-studies" />

      <ResearchFooter
        label="Case Studies"
        links={[ARCHIVE_LINK]}
      />
    </div>
  );
}
