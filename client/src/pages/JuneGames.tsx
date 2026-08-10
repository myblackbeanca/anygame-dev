// ============================================================
// PAGE: /junegames — June 2026 Gaming Hardware Trend Brief
// Design: Editorial Intelligence — LIGHT THEME (matches Home)
// Fully self-hosted — no external here.now dependency.
// ============================================================

import { TrendingUp, Zap } from "lucide-react";
import { MINY_PLAY_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

// Highlights drawn from the June ranking (discovery-first scored).
const EARLY = [
  { name: "500Hz Gaming Monitor", growth: "+3000%", note: "Bleeding-edge refresh rate — the halo product for a display-led edit." },
  { name: "Mini-LED Monitors", growth: "+2700%", note: "The mid-tier where volume actually converts to sales." },
  { name: "One-Handed Gaming Keyboard", growth: "+2800%", note: "Specialized, configurable input — the enthusiast wave." },
  { name: "Portable Gaming Monitor", growth: "+2100%", note: "Second-screen demand for travel and console play." },
  { name: "Hot-Swappable Keyboard", growth: "+223%", note: "Premium hobbyist tier; defensible community margin." },
  { name: "Desk Ergonomics", growth: "+1700–2800%", note: "Arm rests, lap desks, pillows — huge growth, repeat purchase." },
];

const SATURATED = [
  { name: "Over-Ear Headphones", note: "135K searches, 30K+ reviews — proven, but you compete with everyone." },
  { name: "OLED Monitor / NVMe SSD", note: "Commodity-adjacent; thin margin, fast race to the bottom." },
  { name: "Gaming Smartphone", note: "Brand-dominated; little room for a curator." },
];

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";

export default function JuneGames() {
  useSeo({
    title: "Gaming Hardware Trend Brief — June 2026 · anygame.dev",
    description:
      "anygame.dev's June 2026 Gaming Hardware Trend Brief: 85 consumer products ranked by a discovery-first model. What's breaking out (displays, desk ergonomics), what's saturated, and what it means for game-industry builders.",
    path: "/junegames",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Trend Brief" />

      {/* Hero */}
      <header className="container pt-20 pb-12 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Issue #0 · June 2026 · Gaming Hardware
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          The Movers
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          A monthly read on the gaming hardware accelerating fastest — and what it means for the
          people building, funding, and covering the industry. This month: <strong className={ink}>displays
          and desk ergonomics</strong> are the breakout categories.
        </p>
      </header>

      {/* The Call */}
      <section className="container max-w-[820px] py-10">
        <div className={`rounded-2xl border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(1_0_0)] p-7 md:p-9 ${border} border-y border-r`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>The Call</p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            The breakout isn't a product — it's two categories: high-refresh / next-gen displays and
            desk ergonomics. The consumer dollar is moving toward the setup around the screen, not the
            console or the GPU.
          </p>
        </div>
      </section>

      {/* EARLY watchlist */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-7">
          <Zap className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>EARLY Watchlist</h2>
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>first-mover, pre-saturation</span>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {EARLY.map((p) => (
            <div key={p.name} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-6 hover:border-[oklch(0.48_0.22_275)] transition-colors`}>
              <div className="flex items-baseline justify-between gap-3">
                <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{p.name}</h3>
                <span className={`font-['JetBrains_Mono'] text-sm font-bold ${indigo} whitespace-nowrap`}>{p.growth}</span>
              </div>
              <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Saturation warnings */}
      <section className="container max-w-[820px] py-8">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className={`w-5 h-5 ${muted}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Saturation Warnings</h2>
        </div>
        <ul className="space-y-4">
          {SATURATED.map((s) => (
            <li key={s.name} className={`flex gap-4 border-b ${border} pb-4`}>
              <span className={`font-['Syne'] font-semibold ${ink} min-w-[180px]`}>{s.name}</span>
              <span className={`text-sm ${muted}`}>{s.note}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA + methodology */}
      <section className="container max-w-[820px] py-14">
        <p className={`text-xs leading-relaxed ${muted}`}>
          Methodology: figures are Amazon-marketplace estimates (Best Sellers Rank, revenue, sales,
          reviews), ranked by a discovery-first model that rewards momentum and sell-through while
          penalizing saturation. Directional signal for the industry — not first-party demand.
        </p>
      </section>

      {/* Related intelligence briefs (freeintelligence.ai) */}
      <RelatedBriefs />

      <ResearchFooter
        label="Gaming Hardware Trend Brief · Issue #0 · June 2026"
        links={[MINY_PLAY_LINK]}
      />
    </div>
  );
}

// ── Related intelligence briefs (footer of gaming articles) ────
function RelatedBriefs() {
  const briefs = [
    {
      tag: "Hardware · GPU pricing",
      title: "GPU Pricing Comparison",
      note: "Live GPU pricing — the hardware layer under every gaming-hardware brief. Companion to this display/keyboard coverage.",
      href: "https://freeintelligence.ai/gpu-pricing/",
    },
    {
      tag: "Hardware · Local AI",
      title: "The Final Local-AI Box",
      note: "On-device AI hardware for builders — the workstation under the desk that drives game-dev AI tooling.",
      href: "https://freeintelligence.ai/local-ai-box/",
    },
    {
      tag: "AI · Coding agents",
      title: "The Coding Agent Reckoning",
      note: "30 days of dev discourse on AI coding agents — directly relevant to who can ship a game solo in 2026.",
      href: "https://freeintelligence.ai/fable-pulse/",
    },
    {
      tag: "Hub · Read → Play → Own",
      title: "MINY Play",
      note: "The VE Lab hub that connects Free Intelligence briefs, AnyGame's games thesis, and the live Music Mogul A&R game.",
      href: "https://freeintelligence.ai/miny-play/",
    },
  ];
  return (
    <section className="container max-w-[1100px] py-12">
      <div className="flex items-center gap-3 mb-2">
        <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>↔</span>
        <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Related intelligence briefs</h2>
      </div>
      <p className={`mb-8 text-sm ${muted} max-w-2xl`}>
        Companion briefs on <a href="https://freeintelligence.ai/" className={indigo}>freeintelligence.ai</a>{" "}
        — the VE Lab briefs hub. Gaming stays off the FI main page; these are the briefs
        that overlap with what gaming devs actually care about.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {briefs.map(b => (
          <a
            key={b.href}
            href={b.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`group block rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 hover:border-[oklch(0.48_0.22_275)] hover:shadow-sm transition-all`}
          >
            <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>
              {b.tag} · freeintelligence.ai
            </div>
            <h4 className={`font-['Syne'] font-semibold ${ink} mb-2`}>{b.title}</h4>
            <p className={`text-sm ${muted} leading-relaxed`}>{b.note}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
