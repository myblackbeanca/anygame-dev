// ============================================================
// PAGE: /junetech — June 2026 Technology Trend Brief
// Design: Editorial Intelligence — LIGHT THEME (matches Home/JuneGames)
// Fully self-hosted — no external here.now dependency.
// ============================================================

import { TrendingUp, Zap } from "lucide-react";
import { MINY_PLAY_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

// Highlights drawn from the June Technology ranking (discovery-first scored, 688 products).
const EARLY = [
  { name: "Portable Waist Fan", growth: "+7000%", note: "The runaway breakout — sub-$25, summer-seasonal, TikTok-native." },
  { name: "Feno Toothbrush", growth: "+6600%", note: "Premium health-tech with real search volume (12K)." },
  { name: "USB-D", growth: "+5600%", note: "The next connector standard, early in its adoption curve." },
  { name: "Balcony Solar Panels", growth: "+4000%", note: "Energy-independence trend with genuine staying power." },
  { name: "Supertank Printers", growth: "+4000%", note: "Structural backlash against ink-cartridge economics." },
  { name: "26K Power Bank", growth: "+3800%", note: "Portable power — durable, high-repeat purchase category." },
];

const SATURATED = [
  { name: "USB-A", note: "550K searches but +100% & commodity — near-zero margin connector." },
  { name: "AI Robot", note: "$1,294, 90.5K searches — high revenue, brand-dominated, no room to curate." },
  { name: "Mini-LED / 500Hz Monitor", note: "Strong, but really the gaming-display story bleeding in." },
];

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";

export default function JuneTech() {
  useSeo({
    title: "Technology Trend Brief — June 2026 · anygame.dev",
    description:
      "anygame.dev's June 2026 Technology Trend Brief: 688 consumer-tech products ranked by a discovery-first model. Breakout gadgets, portable power, and at-home health-tech — what's accelerating and what's already saturated.",
    path: "/junetech",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Trend Brief" />

      {/* Hero */}
      <header className="container pt-20 pb-12 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Issue #0 · June 2026 · Technology · 688 products
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          Technology's Trending Products
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          A monthly read on the consumer technology accelerating fastest. This month: a flood of
          small, viral <strong className={ink}>"smart" objects and AI gadgets</strong>, riding two
          structural waves —           <strong className={ink}>personal energy independence</strong> and
          <strong className={ink}> at-home health-tech</strong>.
        </p>
      </header>

      {/* The Call */}
      <section className="container max-w-[820px] py-10">
        <div className={`rounded-2xl border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(1_0_0)] p-7 md:p-9 ${border} border-y border-r`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>The Call</p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            The breakout isn't a flagship device — it's a thousand small, practical "smart" objects.
            The consumer is buying convenience, energy autonomy, and quantified-self, not marquee gadgets.
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
        label="Technology Trend Brief · Issue #0 · June 2026"
        links={[MINY_PLAY_LINK]}
      />
    </div>
  );
}

// ── Related intelligence briefs (footer of gaming articles) ────
function RelatedBriefs() {
  const briefs = [
    {
      tag: "AI · Coding agents",
      title: "The Coding Agent Reckoning",
      note: "30 days of dev discourse on AI coding agents — the software-engineering parallel to the consumer-tech breakout story.",
      href: "https://freeintelligence.ai/fable-pulse/",
    },
    {
      tag: "Hardware · GPU pricing",
      title: "GPU Pricing Comparison",
      note: "Live GPU pricing — the compute layer behind the smart-gadget and AI-hardware trend wave.",
      href: "https://freeintelligence.ai/gpu-pricing/",
    },
    {
      tag: "AI · Open models",
      title: "Open-Model Transparency Matrix",
      note: "12 AI labs scored across 7 transparency dimensions — relevant to the AI-gadget boom and consumer trust.",
      href: "https://freeintelligence.ai/open-models/",
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
        that overlap with what consumer-tech and gaming devs actually care about.
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
