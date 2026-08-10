// ============================================================
// PAGE: /ai-tools — AI Tooling Landscape
// Extracted from Home.tsx AIToolsSection.
// ============================================================
import { useState } from "react";
import { aiToolsData } from "@/lib/data";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

export default function AiTools() {
  const [activeCategory, setActiveCategory] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const tierColors: Record<string, string> = {
    "Industry Standard": "oklch(0.48 0.22 275)",
    Rising: "oklch(0.54 0.18 35)",
    Enterprise: "oklch(0.48 0.14 160)",
    Specialist: "oklch(0.5 0.14 85)",
    Benchmark: "oklch(0.52 0.18 310)",
  };
  const tierBg: Record<string, string> = {
    "Industry Standard": "oklch(0.96 0.025 275)",
    Rising: "oklch(0.96 0.025 35)",
    Enterprise: "oklch(0.96 0.025 160)",
    Specialist: "oklch(0.96 0.03 85)",
    Benchmark: "oklch(0.96 0.025 310)",
  };

  useSeo({
    title: "AI Tooling Landscape · anygame.dev",
    description:
      "The AI stack for game developers: 90% adoption, $3.28B → $51B market, and the tools by category and tier.",
    path: "/ai-tools",
  });

  return (
    <div className="theme-light research-page min-h-screen bg-background">
      <ResearchNav label="AI Tooling Landscape" />
      <AtlasStrip current="/ai-tools" />

      <header className="container pt-20 pb-12 max-w-[820px]">
        <p
          className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}
        >
          Research Report 2026 · Section 01
        </p>
        <h1
          className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] ${ink}`}
        >
          The AI Stack for Game Developers
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          Ninety percent of game developers are now using AI tools, with
          adoption spanning every layer of the production pipeline. The global
          AI-in-gaming market is projected to grow from{" "}
          <strong className={ink}>$3.28 billion in 2024</strong> to over{" "}
          <strong className={ink}>$51 billion by 2033</strong>.
        </p>
      </header>

      <Section number="01" label="AI Tooling Landscape">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="pull-quote mb-8">
              "The most valuable skill is no longer the ability to perform a
              repetitive task quickly, but the ability to guide AI tools to
              produce high-quality, coherent results."
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg border border-[oklch(0.88_0.008_280)] bg-[oklch(0.985_0.006_275)] p-4">
                <div className="stat-number text-2xl">97%</div>
                <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider">
                  Believe AI is transforming the industry
                </div>
              </div>
              <div className="rounded-lg border border-[oklch(0.88_0.008_280)] bg-[oklch(0.985_0.006_275)] p-4">
                <div className="stat-number text-2xl">50–80%</div>
                <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider">
                  Timeline compression for key processes
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              {aiToolsData.map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(i)}
                  className={`min-h-11 rounded border px-3 py-2 font-['JetBrains_Mono'] text-xs transition-all ${activeCategory === i ? "border-[oklch(0.48_0.22_275)] bg-[oklch(0.48_0.22_275)] text-white" : "border-[oklch(0.82_0.008_280)] bg-white text-[oklch(0.36_0.015_275)] hover:border-[oklch(0.48_0.22_275)] hover:text-[oklch(0.48_0.22_275)]"}`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {aiToolsData[activeCategory].tools.map((tool, i) => (
                <div key={i} className="region-card p-4 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-['Inter'] font-bold text-[oklch(0.08_0.02_270)]">
                      {tool.name}
                    </span>
                    <span
                      className="rounded-full border px-2 py-0.5 font-['JetBrains_Mono'] text-xs"
                      style={{
                        color: tierColors[tool.tier] || "oklch(0.48 0.22 275)",
                        borderColor:
                          tierColors[tool.tier] || "oklch(0.48 0.22 275)",
                        background:
                          tierBg[tool.tier] || "oklch(0.96 0.025 275)",
                      }}
                    >
                      {tool.tier}
                    </span>
                  </div>
                  <div className="mb-1 font-['JetBrains_Mono'] text-xs text-[oklch(0.48_0.22_275)]">
                    {tool.use}
                  </div>
                  <div className="font-['Inter'] text-sm text-[oklch(0.28_0.012_270)]">
                    {tool.impact}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-5 md:p-8 shadow-sm">
          <h3 className="font-['Inter'] font-bold text-xl text-[oklch(0.08_0.02_270)] mb-2">
            AI Adoption by Application Area
          </h3>
          <p className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-6 uppercase tracking-wider">
            % of studios using AI for each purpose (2026)
          </p>
          <ResponsiveContainer width="100%" height={isMobile ? 320 : 260}>
            <BarChart
              data={[
                { name: "Code Assist", value: 78 },
                { name: "Concept Art", value: 65 },
                { name: "QA Testing", value: 58 },
                { name: "3D Assets", value: 47 },
                { name: "NPC Dialogue", value: 38 },
                { name: "Level Design", value: 34 },
                { name: "Animation", value: 29 },
                { name: "Audio", value: 22 },
              ]}
              margin={{
                top: 0,
                right: 0,
                left: -20,
                bottom: isMobile ? 50 : 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis
                dataKey="name"
                tick={tickStyle}
                interval={0}
                angle={isMobile ? -40 : 0}
                textAnchor={isMobile ? "end" : "middle"}
                height={isMobile ? 70 : 30}
              />
              <YAxis tick={tickStyle} unit="%" />
              <Tooltip {...tooltipStyle} />
              <Bar
                dataKey="value"
                fill="oklch(0.48 0.22 275)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Section>

      <MoreDeepDives current="/ai-tools" />

      <ResearchFooter
        label="AI Tooling Landscape"
        links={[ARCHIVE_LINK]}
      />
    </div>
  );
}
