// ============================================================
// PAGE: /open-source — Open Source Ecosystem
// Extracted from Home.tsx OpenSourceSection.
// ============================================================
import { Code2, Zap } from "lucide-react";
import { openSourceData } from "@/lib/data";
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

export default function OpenSource() {
  const godotGrowth = openSourceData.godot.steamGrowth;

  useSeo({
    title: "Open Source Ecosystem · anygame.dev",
    description:
      "Blender + Godot + the full open-source game-dev stack: market share, Steam growth, and why open source is now enterprise-grade.",
    path: "/open-source",
  });

  return (
    <div className="theme-light research-page min-h-screen bg-background">
      <ResearchNav label="Open Source Ecosystem" />
      <AtlasStrip current="/open-source" />

      <header className="container pt-20 pb-12 max-w-[820px]">
        <p
          className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}
        >
          Research Report 2026 · Section 02
        </p>
        <h1
          className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] ${ink}`}
        >
          Open Source is Now Enterprise-Grade
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          The open-source game development stack — anchored by Blender and Godot
          — has matured to the point where it is no longer a compromise. It is a
          strategic choice. Zero licensing fees, full source access, and
          community-driven innovation are compounding advantages that
          proprietary tools cannot match.
        </p>
      </header>

      <Section number="02" label="Open Source Ecosystem" alt>
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-['Inter'] text-lg text-[oklch(0.24_0.015_270)] leading-relaxed mb-8">
              The Unity pricing controversy of 2023 was a catalyst, but Godot's
              momentum is now self-sustaining. In January 2026, Cocos engine
              went fully open-source, explicitly citing AI integration as the
              rationale — a signal that open-source and AI are converging as a
              combined competitive strategy.
            </p>
            <div className="space-y-4">
              <div className="region-card p-5 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-[oklch(0.96_0.025_275)]">
                    <Code2 size={16} className="text-[oklch(0.48_0.22_275)]" />
                  </div>
                  <div>
                    <div className="font-['Inter'] font-bold text-[oklch(0.08_0.02_270)]">
                      Blender
                    </div>
                    <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)]">
                      GPL · 3D Creation Suite
                    </div>
                  </div>
                </div>
                <p className="font-['Inter'] text-sm text-[oklch(0.28_0.012_270)]">
                  {openSourceData.blender.useCase}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {openSourceData.blender.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="font-['JetBrains_Mono'] text-xs bg-[oklch(0.87_0.006_280)] text-[oklch(0.28_0.015_275)] px-2 py-1 rounded border border-[oklch(0.8_0.008_280)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="region-card p-5 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-[oklch(0.89_0.012_35)] rounded flex items-center justify-center">
                    <Zap size={16} className="text-[oklch(0.55_0.18_35)]" />
                  </div>
                  <div>
                    <div className="font-['Inter'] font-bold text-[oklch(0.08_0.02_270)]">
                      Godot Engine
                    </div>
                    <div className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)]">
                      MIT · Game Engine (2D + 3D)
                    </div>
                  </div>
                </div>
                <p className="font-['Inter'] text-sm text-[oklch(0.28_0.012_270)]">
                  {openSourceData.godot.useCase}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {openSourceData.godot.strengths.map((s, i) => (
                    <span
                      key={i}
                      className="font-['JetBrains_Mono'] text-xs bg-[oklch(0.87_0.006_280)] text-[oklch(0.28_0.015_275)] px-2 py-1 rounded border border-[oklch(0.8_0.008_280)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] rounded-lg p-5 md:p-8 mb-6 shadow-sm">
              <h3 className="font-['Inter'] font-bold text-xl text-[oklch(0.08_0.02_270)] mb-1">
                Godot on Steam
              </h3>
              <p className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-6 uppercase tracking-wider">
                Games shipped per year
              </p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart
                  data={godotGrowth}
                  margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                  <XAxis dataKey="period" tick={tickStyle} />
                  <YAxis tick={tickStyle} />
                  <Tooltip
                    {...tooltipStyle}
                    formatter={(v: number) => [v, "Games Shipped"]}
                  />
                  <Bar
                    dataKey="games"
                    fill="oklch(0.66 0.18 35)"
                    radius={[4, 4, 0, 0]}
                    name="Games Shipped"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="font-['Inter'] font-bold text-lg text-[oklch(0.08_0.02_270)] mb-4">
                The Full Open-Source Stack
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {openSourceData.otherTools.map((t, i) => (
                  <div
                    key={i}
                    className="bg-[#ffffff] border border-[oklch(0.8_0.008_280)] p-3 rounded-lg shadow-sm"
                  >
                    <div className="font-['Inter'] font-bold text-sm text-[oklch(0.08_0.02_270)] mb-1">
                      {t.name}
                    </div>
                    <div className="font-['Inter'] text-xs text-[oklch(0.32_0.012_270)]">
                      {t.use}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      <MoreDeepDives current="/open-source" />

      <ResearchFooter
        label="Open Source Ecosystem"
        links={[ARCHIVE_LINK]}
      />
    </div>
  );
}
