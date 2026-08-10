// ============================================================
// PAGE: /july-archive — June-July 2026 Archive index
// Design: Editorial Intelligence — LIGHT THEME (matches Home/JulyTrends)
// Thin index page: cards grouped by the month they were published.
// ============================================================

import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { MINY_PLAY_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";
import { MoreDeepDives } from "@/components/sections";

const JUNE_BRIEFS = [
  {
    tag: "Gaming · June 2026",
    title: "Gaming Hardware Trend Brief",
    desc: "Displays and desk ergonomics are the breakout categories. 85 products ranked by a discovery-first model.",
    href: "/junegames",
  },
  {
    tag: "Technology · June 2026",
    title: "Technology Trend Brief",
    desc: "Smart gadgets, portable power, and at-home health-tech lead. 688 products ranked.",
    href: "/junetech",
  },
] as const;

const JULY_BRIEFS = [
  {
    tag: "Gaming · July 2026",
    title: "What's Trending in Gaming",
    desc: "Carbon engine open-sourced, Godot 4.7 ships, Slay the Spire 2's $108M Godot month, 13 indie releases, and what indie devs and studio CEOs are actually saying.",
    href: "/julytrends",
  },
  {
    tag: "Platform Shift · July 2026",
    title: "Xbox Reset 2026",
    desc: "The largest restructure in Xbox history — 3,200 cut, four studios spun off, and the indie-platform vacuum it opens.",
    href: "/xboxreset",
  },
  {
    tag: "Pulse · July 2026",
    title: "Xbox Reset Pulse",
    desc: "The 30-day reaction map: founder, investor, and press responses to the Xbox restructure.",
    href: "/xboxreset-pulse",
  },
  {
    tag: "Tool note · July 2026",
    title: "Modmixer in plain words",
    desc: "What it is, who it helps, and why broken RimWorld mod lists come before AI mod generation.",
    href: "/modmixer",
  },
  {
    tag: "Builder Spotlight · July 2026",
    title: "Dreamfall",
    desc: "A longform case study on a vibe-coded build, the agent harness, and the pipeline that shipped it.",
    href: "/dreamfall",
  },
] as const;

const ARCHIVE_MONTHS = [
  {
    id: "june-2026",
    month: "June 2026",
    number: "01",
    summary:
      "Two discovery-led reports on the hardware and technology categories gaining momentum.",
    briefs: JUNE_BRIEFS,
    accent: "oklch(0.62 0.14 160)",
  },
  {
    id: "july-2026",
    month: "July 2026",
    number: "02",
    summary:
      "Five field notes spanning engines, platform change, community response, tools, and builder practice.",
    briefs: JULY_BRIEFS,
    accent: "oklch(0.48 0.22 275)",
  },
] as const;

// ── Design tokens (match JulyTrends) ─────────────────────────
const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";

export default function JulyArchive() {
  useSeo({
    title: "June-July 2026 Archive · anygame.dev",
    description:
      "Every brief anygame.dev published in June and July 2026: gaming hardware, technology, Xbox reset, Modmixer, and the Dreamfall builder spotlight.",
    path: "/july-archive",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Archive" />

      {/* Hero */}
      <header className="container pt-20 pb-12 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          June-July 2026 · 7 briefs
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          What we published
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          The full archive of anygame.dev briefs from the first two months of the
          research report. Gaming hardware, technology, the engine wars, the Xbox
          reset, builder spotlights, and the tools the industry is actually using.
        </p>
        <nav
          aria-label="Archive months"
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-[oklch(0.88_0.008_280)] pt-5"
        >
          {ARCHIVE_MONTHS.map(month => (
            <a
              key={month.id}
              href={`#${month.id}`}
              className="inline-flex min-h-11 items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)] hover:text-[oklch(0.34_0.2_275)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
            >
              {month.month}
              <span className="text-[oklch(0.58_0.012_275)]">
                {month.briefs.length}
              </span>
            </a>
          ))}
        </nav>
      </header>

      <main className="container max-w-[1100px] pb-16">
        {ARCHIVE_MONTHS.map(month => (
          <section
            key={month.id}
            id={month.id}
            aria-labelledby={`${month.id}-title`}
            className="scroll-mt-24 border-t border-[oklch(0.88_0.008_280)] py-10 md:py-14"
          >
            <div className="mb-8 grid gap-4 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <div className="mb-3 flex items-center gap-3 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)]">
                  <span>{month.number}</span>
                  <span
                    className="h-1 w-12"
                    style={{ backgroundColor: month.accent }}
                    aria-hidden="true"
                  />
                  <span>{month.briefs.length} briefs</span>
                </div>
                <h2
                  id={`${month.id}-title`}
                  className={`font-['Syne'] text-3xl font-bold md:text-4xl ${ink}`}
                >
                  {month.month}
                </h2>
              </div>
              <p className={`font-['Inter'] leading-relaxed md:col-span-5 ${muted}`}>
                {month.summary}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {month.briefs.map(brief => (
                <Link
                  key={brief.href}
                  href={brief.href}
                  className="group flex min-h-72 flex-col rounded-lg border border-[oklch(0.88_0.008_280)] bg-white p-7 transition-all hover:-translate-y-1 hover:border-[oklch(0.72_0.04_275)] hover:shadow-[0_18px_45px_-32px_oklch(0.18_0.02_270/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
                  style={{ borderTopColor: month.accent, borderTopWidth: 3 }}
                >
                  <div className={`mb-3 font-['JetBrains_Mono'] text-xs uppercase ${indigo}`}>
                    {brief.tag}
                  </div>
                  <h3 className={`mb-3 font-['Syne'] text-2xl font-bold ${ink}`}>
                    {brief.title}
                  </h3>
                  <p className={`mb-5 font-['Inter'] leading-relaxed ${muted}`}>
                    {brief.desc}
                  </p>
                  <span className={`mt-auto inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase ${indigo}`}>
                    Read the brief
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </main>

      <MoreDeepDives current="/july-archive" />

      {/* Footer */}
      <ResearchFooter
        label="Archive · June-July 2026"
        links={[MINY_PLAY_LINK]}
      />
    </div>
  );
}
