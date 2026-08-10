// ============================================================
// PAGE: /outlook — Forward Look 2026–2030
// Extracted from Home.tsx OutlookSection.
// ============================================================
import { ExternalLink } from "lucide-react";
import { futureOutlook } from "@/lib/data";
import {
  LineChart,
  Line,
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

export default function Outlook() {
  useSeo({
    title: "Forward Look 2026–2030 · anygame.dev",
    description:
      "The global game market trajectory to $556B by 2030, the timeline of AI-native shifts, and the bottom line for founders.",
    path: "/outlook",
  });

  return (
    <div className="theme-light research-page min-h-screen bg-background">
      <ResearchNav label="Forward Look 2026-2030" />
      <AtlasStrip current="/outlook" />

      <header className="container pt-20 pb-12 max-w-[820px]">
        <p
          className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}
        >
          Research Report 2026 · Section 05
        </p>
        <h1
          className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] ${ink}`}
        >
          Where This Is Heading
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          The global video game market is projected to reach{" "}
          <strong className={ink}>$556 billion by 2030</strong>. Metaverse
          gaming alone is projected at{" "}
          <strong className={ink}>$648 billion by 2034</strong>. The
          infrastructure being built today — open-source engines, AI asset
          pipelines, UGC economies — is the foundation for that market.
        </p>
      </header>

      <Section number="05" label="Forward Look 2026–2030">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="space-y-6">
              {futureOutlook.map((item, i) => (
                <div key={i} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-[oklch(0.48_0.22_275)] bg-[oklch(0.96_0.025_275)]">
                      <span className="font-['JetBrains_Mono'] text-xs font-bold text-[oklch(0.48_0.22_275)]">
                        {item.year.slice(-2)}
                      </span>
                    </div>
                    {i < futureOutlook.length - 1 && (
                      <div className="w-px flex-1 bg-[oklch(0.8_0.008_280)] mt-2" />
                    )}
                  </div>
                  <div className="pb-6">
                    <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-1">
                      {item.year} · {item.probability}
                    </div>
                    <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-2">
                      {item.title}
                    </h3>
                    <p className="font-['Inter'] text-[oklch(0.28_0.012_270)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Field example */}
            <div className="mt-2 rounded-lg border-2 border-[oklch(0.48_0.22_275)] bg-[oklch(0.96_0.025_275)] p-6">
              <div className="mb-3 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)]">
                Field example · 2026
              </div>
              <p className="font-['Inter'] text-[oklch(0.15_0.02_270)] leading-relaxed">
                A single developer + AI coding agents shipped <em>Dreamfall</em>
                , a multi-genre browser-3D R&amp;D lab — procedural cities,
                rally physics, horde combat, a procedural dog park — in roughly
                three weeks of public commits. The signal isn't the graphics;
                it's the engineering culture built for agents: a closed{" "}
                <code className="font-['JetBrains_Mono'] text-xs px-1 py-0.5 rounded bg-[oklch(0.85_0.006_280)]">
                  GameRuntime
                </code>{" "}
                facade new systems can't edit, ~100 standalone{" "}
                <code className="font-['JetBrains_Mono'] text-xs px-1 py-0.5 rounded bg-[oklch(0.85_0.006_280)]">
                  verify-*.mjs
                </code>{" "}
                regression scripts in place of a test framework, and
                agent-facing architecture docs (
                <code className="font-['JetBrains_Mono'] text-xs px-1 py-0.5 rounded bg-[oklch(0.85_0.006_280)]">
                  AGENTS.md
                </code>
                ,{" "}
                <code className="font-['JetBrains_Mono'] text-xs px-1 py-0.5 rounded bg-[oklch(0.85_0.006_280)]">
                  CLAUDE.md
                </code>
                ). This is the "AI as core engine infrastructure" thesis made
                concrete — not a prediction. The moat isn't the generation; it's
                the discipline that keeps agent-written code maintainable:
                boundaries, regression hooks, a closed surface area.
              </p>
              <a
                href="https://github.com/ryanfitzpatrickio/threejs-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)] transition-all hover:gap-3"
              >
                Source · threejs-playground{" "}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-5 md:p-8 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-xl text-[oklch(0.08_0.02_270)] mb-1">
                Global Market Trajectory
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-6 uppercase tracking-wider">
                USD billions · Gaming + AI-in-Gaming
              </p>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart
                  data={[
                    { year: "2024", gaming: 282, aiGaming: 3.28 },
                    { year: "2025", gaming: 310, aiGaming: 6.2 },
                    { year: "2026", gaming: 340, aiGaming: 11.5 },
                    { year: "2027", gaming: 375, aiGaming: 19.8 },
                    { year: "2028", gaming: 415, aiGaming: 30.2 },
                    { year: "2029", gaming: 483, aiGaming: 40.5 },
                    { year: "2030", gaming: 556, aiGaming: 51.0 },
                  ]}
                  margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="year" tick={tickStyle} />
                  <YAxis yAxisId="left" tick={tickStyle} unit="B" />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    tick={tickStyle}
                    unit="B"
                  />
                  <Tooltip
                    {...tooltipStyle}
                    formatter={(v: number, name: string) => [
                      `$${v}B`,
                      name === "gaming" ? "Global Gaming" : "AI-in-Gaming",
                    ]}
                  />
                  <Legend
                    wrapperStyle={{
                      fontFamily: "JetBrains Mono",
                      fontSize: "11px",
                      color: "oklch(0.30 0.015 275)",
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="gaming"
                    stroke="oklch(0.48 0.22 275)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.48 0.22 275)", r: 4 }}
                    name="gaming"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="aiGaming"
                    stroke="oklch(0.66 0.18 35)"
                    strokeWidth={2}
                    dot={{ fill: "oklch(0.66 0.18 35)", r: 4 }}
                    name="aiGaming"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-xl text-[oklch(0.08_0.02_270)] mb-5">
                Bottom Line for Founders
              </h3>
              <div className="space-y-4">
                {[
                  {
                    n: "01",
                    text: "AI is table stakes, not a moat. The moat is how you combine AI with community, IP, and distribution.",
                  },
                  {
                    n: "02",
                    text: "Open source is now enterprise-grade. Blender + Godot is a legitimate production stack, not a compromise.",
                  },
                  {
                    n: "03",
                    text: "UGC platforms are economies, not just games. Build for creator monetization if you want platform defensibility.",
                  },
                  {
                    n: "04",
                    text: "The AAA layoff cycle is structural. Talent is available; the opportunity is to build leaner, faster studios.",
                  },
                  {
                    n: "05",
                    text: "Discoverability is the new production bottleneck. Solve distribution before scaling content output.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 py-3 border-b border-[oklch(0.86_0.005_280)] last:border-0"
                  >
                    <span className="mt-0.5 flex-shrink-0 font-['JetBrains_Mono'] text-xs font-bold text-[oklch(0.48_0.22_275)]">
                      {item.n}
                    </span>
                    <p className="font-['Inter'] text-sm text-[oklch(0.24_0.015_270)] leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <MoreDeepDives current="/outlook" />

      <ResearchFooter
        label="Forward Look 2026–2030"
        links={[ARCHIVE_LINK]}
      />
    </div>
  );
}
