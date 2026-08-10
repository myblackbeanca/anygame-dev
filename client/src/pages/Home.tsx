// ============================================================
// PAGE: Home — The New Engine: AI in Game Development
// Design: Editorial Intelligence — LIGHT THEME
// Sections: Hero, Stats, AI Tools, Open Source, Case Studies,
//           Geographic Market Analysis, Future Outlook, Footer
// ============================================================
import { useState, useEffect } from "react";
import { marketStats } from "@/lib/data";
import { ArrowRight, ChevronDown, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { useSeo } from "@/lib/useSeo";
import { PickUpSticksMark } from "@/components/brand";
import { Section } from "@/components/sections";

// ── Nav ───────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[oklch(0.99_0.002_280/0.96)] backdrop-blur-md border-b border-[oklch(0.88_0.008_280)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <a
          href="#"
          className="inline-flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
          aria-label="The New Engine — back to top"
        >
          <PickUpSticksMark className="h-7 w-7" decorative />
        </a>

        <a
          href="#newsletter"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-[oklch(0.48_0.22_275)] px-4 py-2 font-['JetBrains_Mono'] text-xs uppercase text-white transition-colors hover:bg-[oklch(0.4_0.22_275)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
        >
          Join in <span aria-hidden>→</span>
        </a>
      </div>
    </nav>
  );
}

// ── Hero query console ───────────────────────────────────────
type ConsoleQuery = {
  q: string;
  working: string;
  answer: string;
  href: string;
};

const HERO_QUERIES: ConsoleQuery[] = [
  {
    q: "do developers even use ai yet?",
    working: "polling the tooling landscape",
    answer: "90% do, and Copilot writes 46% of their code",
    href: "/ai-tools",
  },
  {
    q: "which engine is winning open source?",
    working: "reading open-source adoption signals",
    answer: "Godot: 618 to 2,864 Steam launches in two years",
    href: "/open-source",
  },
  {
    q: "where is the money actually going?",
    working: "scanning regional market data, 2024 to 2030",
    answer: "Asia-Pacific leads: $155B to $282B by 2030",
    href: "/geo-market",
  },
  {
    q: "what happens after generative assets?",
    working: "projecting the 2026 to 2030 curve",
    answer: "real-time AI NPCs, then adaptive narratives",
    href: "/outlook",
  },
];

function HeroConsole() {
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<{
    kind: "idle" | "working" | "done";
    text: string;
    href?: string;
  }>({
    kind: "idle",
    text: "",
  });
  const [qi, setQi] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const cur = HERO_QUERIES[qi % HERO_QUERIES.length];
    let i = 0;
    setTyped("");
    setStatus({ kind: "idle", text: "" });
    const tick = () => {
      if (cancelled) return;
      if (i <= cur.q.length) {
        setTyped(cur.q.slice(0, i));
        i += 1;
        setTimeout(tick, 38 + Math.random() * 40);
      } else {
        setStatus({ kind: "working", text: cur.working });
        setTimeout(() => {
          if (cancelled) return;
          setStatus({ kind: "done", text: cur.answer, href: cur.href });
          setTimeout(() => {
            if (!cancelled) setQi(v => v + 1);
          }, 2600);
        }, 1500);
      }
    };
    tick();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qi]);

  return (
    <div className="fade-up fade-up-delay-3 border-y border-[oklch(0.88_0.008_280)] py-4">
      <div className="mb-3 flex items-center justify-between font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)]">
        <span>Live research query</span>
        <span>
          {String((qi % HERO_QUERIES.length) + 1).padStart(2, "0")} /{" "}
          {String(HERO_QUERIES.length).padStart(2, "0")}
        </span>
      </div>
      <div className="font-['JetBrains_Mono'] text-sm leading-relaxed">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[oklch(0.48_0.22_275)]">query</span>
          <span className="min-h-[1.5em] text-[oklch(0.18_0.02_270)]">
            {typed}
            <span className="caret-blink" aria-hidden />
          </span>
        </div>
        <div
          className="mt-2 min-h-[2.75rem] text-[oklch(0.52_0.015_275)]"
          aria-live="polite"
        >
          {status.kind === "working" && <span>Scanning: {status.text}...</span>}
          {status.kind === "done" && status.href && (
            <Link
              href={status.href}
              className="inline-flex items-start gap-2 text-[oklch(0.18_0.02_270)] hover:text-[oklch(0.48_0.22_275)]"
            >
              <span className="text-[oklch(0.48_0.22_275)]">Result</span>
              <span>{status.text}</span>
              <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

function ResearchSignalScene() {
  return (
    <figure className="fade-up fade-up-delay-2 mx-auto w-full max-w-[620px] lg:mx-0">
      <svg
        viewBox="0 0 620 500"
        className="aspect-[1.24/1] w-full overflow-visible"
        role="img"
        aria-labelledby="signal-scene-title signal-scene-desc"
      >
        <title id="signal-scene-title">
          The anygame.dev research atlas as a pick-up-sticks field
        </title>
        <desc id="signal-scene-desc">
          Five research threads cross inside one system while an indigo signal
          lifts free without disturbing the rest.
        </desc>

        <circle
          cx="310"
          cy="250"
          r="184"
          fill="oklch(0.985 0.005 275)"
          stroke="oklch(0.88 0.008 280)"
          strokeWidth="2"
        />
        <circle
          cx="310"
          cy="250"
          r="145"
          fill="none"
          stroke="oklch(0.92 0.008 280)"
          strokeWidth="1"
          strokeDasharray="5 10"
        />

        <g strokeWidth="14" strokeLinecap="round">
          <line
            x1="168"
            y1="326"
            x2="456"
            y2="164"
            stroke="oklch(0.66 0.18 35)"
          />
          <line
            x1="196"
            y1="140"
            x2="438"
            y2="374"
            stroke="oklch(0.62 0.14 225)"
          />
          <line
            x1="132"
            y1="236"
            x2="482"
            y2="276"
            stroke="oklch(0.72 0.14 85)"
          />
          <line
            x1="274"
            y1="102"
            x2="322"
            y2="420"
            stroke="oklch(0.62 0.14 160)"
          />
          <line
            x1="388"
            y1="106"
            x2="238"
            y2="406"
            stroke="oklch(0.18 0.02 270)"
          />
        </g>

        <g className="brand-lift-stick">
          <line
            x1="388"
            y1="184"
            x2="540"
            y2="82"
            stroke="oklch(0.48 0.22 275)"
            strokeWidth="15"
            strokeLinecap="round"
          />
          <circle cx="540" cy="82" r="10" fill="oklch(0.48 0.22 275)" />
        </g>

        <g
          fill="oklch(0.52 0.015 275)"
          fontFamily="JetBrains Mono"
          fontSize="13"
        >
          <text x="72" y="347">
            AI TOOLS
          </text>
          <text x="139" y="112">
            OPEN SOURCE
          </text>
          <text x="78" y="222">
            CASE STUDIES
          </text>
          <text x="290" y="455">
            MARKETS
          </text>
          <text x="409" y="407">
            OUTLOOK
          </text>
        </g>

        <path
          d="M 520 102 L 568 134"
          fill="none"
          stroke="oklch(0.48 0.22 275)"
          strokeWidth="1.5"
        />
        <text
          x="485"
          y="157"
          fill="oklch(0.48 0.22 275)"
          fontFamily="JetBrains Mono"
          fontSize="12"
        >
          THE NEXT MOVE
        </text>
      </svg>
      <figcaption className="flex items-center justify-between gap-4 border-t border-[oklch(0.88_0.008_280)] pt-3 font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)]">
        <span>Five connected systems</span>
        <span className="text-right text-[oklch(0.48_0.22_275)]">
          One decision-ready signal
        </span>
      </figcaption>
    </figure>
  );
}

// ── Hero ──────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="atlas-paper relative overflow-hidden border-b border-[oklch(0.88_0.008_280)] bg-white">
      <div className="container pt-24 pb-8 sm:pt-28 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.03fr)_minmax(380px,0.97fr)] lg:gap-14">
          <div className="max-w-3xl">
            <div className="fade-up fade-up-delay-1 mb-5 flex items-center gap-3 font-['JetBrains_Mono'] text-[11px] uppercase text-[oklch(0.48_0.22_275)]">
              <span className="h-2 w-2 bg-[oklch(0.48_0.22_275)]" />
              Research report 2026 / live atlas
            </div>

            <h1
              className="fade-up fade-up-delay-2 mb-6 font-['Syne'] font-extrabold leading-[0.93] text-[oklch(0.18_0.02_270)]"
              style={{ fontSize: "clamp(3.25rem, 8vw, 7.25rem)" }}
            >
              The New <br />
              Engine
            </h1>

            <p className="fade-up fade-up-delay-3 mb-7 max-w-2xl font-['Inter'] text-lg leading-relaxed text-[oklch(0.36_0.015_275)] md:text-xl">
              A decision-ready map of how AI and open-source tools are changing
              game development, from production pipelines and creator economies
              to regional markets and the next studio model.
            </p>

            <div className="fade-up fade-up-delay-3 mb-7 flex flex-wrap gap-3">
              <a
                href="#research-atlas"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-[oklch(0.48_0.22_275)] px-5 py-3 font-['Inter'] text-sm font-bold text-white transition-colors hover:bg-[oklch(0.4_0.22_275)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
              >
                Open the research atlas <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#newsletter"
                className="inline-flex min-h-11 items-center rounded-md border border-[oklch(0.76_0.012_275)] bg-white px-5 py-3 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.18_0.02_270)] transition-colors hover:border-[oklch(0.48_0.22_275)] hover:text-[oklch(0.48_0.22_275)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
              >
                Join the research list
              </a>
            </div>

            <HeroConsole />
          </div>

          <ResearchSignalScene />
        </div>

        <div className="fade-up fade-up-delay-4 mt-8 grid grid-cols-2 border-l border-t border-[oklch(0.88_0.008_280)] md:grid-cols-4 lg:mt-10">
          {marketStats.slice(0, 4).map(stat => (
            <div
              key={stat.label}
              className="min-h-24 border-b border-r border-[oklch(0.88_0.008_280)] p-4 sm:p-5"
            >
              <div className="font-['JetBrains_Mono'] text-xl font-bold text-[oklch(0.48_0.22_275)] sm:text-2xl">
                {stat.value}
              </div>
              <div className="mt-1 font-['JetBrains_Mono'] text-[10px] uppercase leading-relaxed text-[oklch(0.52_0.015_275)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <a
          href="#research-atlas"
          className="mt-4 inline-flex min-h-11 items-center gap-2 font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)] hover:text-[oklch(0.48_0.22_275)]"
        >
          <ChevronDown size={15} aria-hidden /> Explore the atlas
        </a>
      </div>
    </section>
  );
}

// ── Research Atlas (replaces the 5 infographic sections — moved to inner pages) ──
const RESEARCH_CARDS = [
  {
    number: "01",
    label: "AI Tooling Landscape",
    title: "The AI Stack for Game Developers",
    desc: "Adoption, market growth, tool categories, and the production areas where AI is already standard practice.",
    href: "/ai-tools",
    stat: "90% adoption",
    accent: "oklch(0.48 0.22 275)",
    layout: "md:col-span-7",
    featured: true,
  },
  {
    number: "02",
    label: "Open Source Ecosystem",
    title: "Open Source is Now Enterprise-Grade",
    desc: "Blender, Godot, and the full production stack, including the engine growth signal on Steam.",
    href: "/open-source",
    stat: "618 to 2,864",
    accent: "oklch(0.66 0.18 35)",
    layout: "md:col-span-5",
    featured: false,
  },
  {
    number: "03",
    label: "Case Studies",
    title: "Roblox and Age of Empires",
    desc: "Two platform economies, their AI features, creator payouts, and the strategic read for founders.",
    href: "/case-studies",
    stat: "$2.2B payouts",
    accent: "oklch(0.62 0.14 160)",
    layout: "md:col-span-4",
    featured: false,
  },
  {
    number: "04",
    label: "Geographic Markets",
    title: "The Global Game Dev Map",
    desc: "Five regions compared by market size, CAGR, AI adoption, dominant platforms, and local opportunity.",
    href: "/geo-market",
    stat: "$155B to $282B",
    accent: "oklch(0.62 0.14 225)",
    layout: "md:col-span-4",
    featured: false,
  },
  {
    number: "05",
    label: "Forward Look 2026-2030",
    title: "Where This Is Heading",
    desc: "The market trajectory, the AI-native shift timeline, and five decisions for the next studio model.",
    href: "/outlook",
    stat: "$556B by 2030",
    accent: "oklch(0.72 0.14 85)",
    layout: "md:col-span-4",
    featured: false,
  },
] as const;

function AtlasCardSignal({
  accent,
  featured,
}: {
  accent: string;
  featured: boolean;
}) {
  return (
    <svg
      viewBox="0 0 180 58"
      className={featured ? "h-14 w-44" : "h-12 w-36"}
      aria-hidden="true"
    >
      <g strokeWidth={featured ? 5 : 4} strokeLinecap="round" opacity="0.5">
        <line x1="8" y1="45" x2="138" y2="12" stroke="oklch(0.66 0.18 35)" />
        <line x1="24" y1="10" x2="126" y2="48" stroke="oklch(0.62 0.14 225)" />
        <line x1="12" y1="28" x2="146" y2="34" stroke="oklch(0.72 0.14 85)" />
        <line x1="70" y1="6" x2="80" y2="52" stroke="oklch(0.62 0.14 160)" />
      </g>
      <g className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
        <line
          x1="108"
          y1="24"
          x2="166"
          y2="7"
          stroke={accent}
          strokeWidth={featured ? 6 : 5}
          strokeLinecap="round"
        />
        <circle cx="166" cy="7" r={featured ? 4 : 3.5} fill={accent} />
      </g>
    </svg>
  );
}

function ResearchAtlasSection() {
  return (
    <Section id="research-atlas" number="01" label="The Research Atlas">
      <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="font-['Syne'] text-3xl font-bold leading-tight text-[oklch(0.18_0.02_270)] md:col-span-6 md:text-4xl">
          Start with the thread that changes your next decision.
        </h2>
        <p className="font-['Inter'] text-lg leading-relaxed text-[oklch(0.52_0.015_275)] md:col-span-5 md:col-start-8">
          Five self-contained deep dives form one connected map: tooling, open
          source, platform economies, regional markets, and the 2026-2030
          outlook.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-12">
        {RESEARCH_CARDS.map(card => (
          <Link
            key={card.href}
            href={card.href}
            className={`group relative flex min-h-[20rem] flex-col overflow-hidden rounded-lg border border-[oklch(0.88_0.008_280)] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.72_0.04_275)] hover:shadow-[0_18px_45px_-32px_oklch(0.18_0.02_270/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4 ${card.layout} ${
              card.featured ? "bg-[oklch(0.985_0.006_275)] md:p-8" : "bg-white"
            }`}
            style={{ borderTopColor: card.accent, borderTopWidth: 3 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)]">
                {card.number} / {card.label}
              </div>
              <AtlasCardSignal accent={card.accent} featured={card.featured} />
            </div>

            <div className="mt-auto pt-10">
              <div
                className={`font-['JetBrains_Mono'] font-bold text-[oklch(0.48_0.22_275)] ${card.featured ? "text-3xl" : "text-xl"}`}
              >
                {card.stat}
              </div>
              <h3
                className={`mt-3 font-['Syne'] font-bold leading-tight text-[oklch(0.18_0.02_270)] ${card.featured ? "text-3xl md:text-4xl" : "text-2xl"}`}
              >
                {card.title}
              </h3>
              <p className="mt-3 max-w-2xl font-['Inter'] leading-relaxed text-[oklch(0.52_0.015_275)]">
                {card.desc}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.48_0.22_275)]">
                Open deep dive{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

// ── Newsletter Section ────────────────────────────────────

// ── Resource Links Section ──────────────────────────────────
const RESOURCE_LINKS = [
  {
    title: "Game Development Trends",
    description:
      "Exploding topics, growth metrics, and platform analysis for game developers",
    href: "https://freeintelligence.ai/anygamedev1",
    image:
      "https://images.unsplash.com/photo-1762955178856-dfd83bdbed45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzE0MDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODAwODc0MTB8&ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "AI in Game Creation",
    description:
      "Tools, workflows, and insights for AI-powered game development",
    href: "https://freeintelligence.ai/anygamedev2",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Developer Ecosystem",
    description: "Community insights, network effects, and industry trends",
    href: "https://freeintelligence.ai/anygamedevgraph",
    image:
      "https://images.unsplash.com/photo-1629904853893-c2c8981a1dc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NzE0MDB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3ODAwODc0Mjd8&ixlib=rb-4.1.0&q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "AI Signal — Gaming Hardware (Q3 2026)",
    description:
      "A 30-day signal read of what AI is doing to gaming hardware — the RAM crisis, GPU challengers, and the wedge for anygame.dev. Part of the VE LAB AI-Trends read.",
    href: "https://ve-lab.exe.xyz/ai-trends/ventures/anygame/",
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=800&auto=format&fit=crop",
  },
] as const;

function ResourceLinksSection() {
  return (
    <section className="border-t border-[oklch(0.88_0.008_280)] bg-white py-16 md:py-24">
      <div className="container">
        <div className="mb-10 md:mb-12">
          <div className="mb-3 font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.48_0.22_275)]">
            Connected research
          </div>
          <h2 className="mb-4 font-['Syne'] text-3xl font-bold text-[oklch(0.18_0.02_270)] md:text-4xl">
            More signal from FreeIntelligence
          </h2>
          <p className="max-w-2xl text-base text-[oklch(0.52_0.015_275)] md:text-lg">
            Deep-dive research hubs tracking trending tools, platforms, and
            developer communities in the AI gaming space.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {RESOURCE_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-[oklch(0.88_0.008_280)] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[oklch(0.72_0.04_275)] hover:shadow-[0_18px_45px_-32px_oklch(0.18_0.02_270/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
            >
              <div className="mb-5 aspect-video overflow-hidden rounded-md bg-[oklch(0.97_0.01_275)]">
                <img
                  src={link.image}
                  alt={link.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/600x400/e5e7eb/9ca3af?text=Resource";
                  }}
                />
              </div>
              <h3 className="mb-3 font-['Syne'] text-xl font-semibold text-[oklch(0.18_0.02_270)]">
                {link.title}
              </h3>
              <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-[oklch(0.52_0.015_275)]">
                {link.description}
              </p>
              <span className="inline-flex items-center gap-1.5 font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.48_0.22_275)]">
                View resource
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
const ROLES = [
  { value: "founder", label: "Founder / Studio lead" },
  { value: "developer", label: "Developer / Engineer" },
  { value: "designer", label: "Designer / Artist" },
  { value: "publisher", label: "Publisher / Operator" },
  { value: "investor", label: "Investor / VC" },
  { value: "press", label: "Press / Analyst" },
  { value: "academic", label: "Academic / Researcher" },
  { value: "student", label: "Student" },
  { value: "other", label: "Other" },
] as const;

const REGIONS = [
  "North America",
  "Europe",
  "Asia-Pacific",
  "Latin America",
  "MENA",
  "Africa",
  "Other",
] as const;

function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const API_URL =
    import.meta.env.VITE_NEWSLETTER_API || "https://api.anygame.dev/subscribe";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!role) {
      setStatus("error");
      setErrorMsg("Tell us your role so we can tune what we send.");
      return;
    }
    if (!company.trim()) {
      setStatus("error");
      setErrorMsg("Studio, fund, or affiliation is required.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setAlreadySubscribed(false);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role, company, region }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setAlreadySubscribed(!!data.alreadySubscribed);
        setEmail("");
        setRole("");
        setCompany("");
        setRegion("");
      } else {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Try again?");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Try again?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="newsletter" number="04" label="Be part of it" alt>
      <div className="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <h2 className="mb-6 font-['Syne'] text-4xl font-extrabold leading-tight text-[oklch(0.18_0.02_270)] md:text-5xl">
            Help shape what's next for game dev.
          </h2>
          <p className="font-['Inter'] text-lg text-[oklch(0.24_0.015_270)] leading-relaxed mb-8">
            If you're building, designing, funding, publishing, writing about,
            or researching games right now — we want you in the room. Tell us a
            little about yourself and we'll send the next report straight to
            you, plus invites to the small conversations we keep off the public
            site.
          </p>
          <ul className="space-y-3 mb-8 font-['Inter'] text-[oklch(0.19_0.015_270)]">
            <li className="flex gap-3">
              <span className="mt-1.5 font-['JetBrains_Mono'] text-xs text-[oklch(0.48_0.22_275)]">
                →
              </span>
              <span>
                Quarterly research drops on AI tooling, engines, and market
                shifts.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 font-['JetBrains_Mono'] text-xs text-[oklch(0.48_0.22_275)]">
                →
              </span>
              <span>
                Early access to interactive case studies before they go public.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 font-['JetBrains_Mono'] text-xs text-[oklch(0.48_0.22_275)]">
                →
              </span>
              <span>
                Invites to small-group conversations with operators in your
                region.
              </span>
            </li>
          </ul>
          <div className="pull-quote">
            "The most valuable skill is no longer the ability to perform a
            repetitive task quickly, but the ability to guide AI tools to
            produce high-quality, coherent results."
          </div>
        </div>

        <div>
          <div className="rounded-lg border border-[oklch(0.88_0.008_280)] bg-white p-5 md:p-8">
            <h3 className="mb-2 font-['Syne'] text-xl font-bold text-[oklch(0.18_0.02_270)]">
              Come on in
            </h3>
            <p className="font-['JetBrains_Mono'] text-xs text-[oklch(0.4_0.012_275)] mb-6 uppercase tracking-wider">
              No spam. Unsubscribe anytime.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nl-email"
                  className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] mb-2 block"
                >
                  Work email *
                </label>
                <input
                  id="nl-email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="w-full rounded-lg border border-[oklch(0.88_0.008_280)] px-4 py-3 font-['JetBrains_Mono'] text-sm text-[oklch(0.18_0.02_270)] placeholder:text-[oklch(0.62_0.01_280)] transition-all focus:border-[oklch(0.48_0.22_275)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.48_0.22_275)]"
                />
              </div>

              <div>
                <label
                  htmlFor="nl-role"
                  className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] mb-2 block"
                >
                  Your role *
                </label>
                <select
                  id="nl-role"
                  required
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full rounded-lg border border-[oklch(0.88_0.008_280)] bg-white px-4 py-3 font-['JetBrains_Mono'] text-sm text-[oklch(0.18_0.02_270)] transition-all focus:border-[oklch(0.48_0.22_275)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.48_0.22_275)]"
                >
                  <option value="" disabled>
                    Select one…
                  </option>
                  {ROLES.map(r => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="nl-company"
                  className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] mb-2 block"
                >
                  Studio, fund, or affiliation *
                </label>
                <input
                  id="nl-company"
                  type="text"
                  required
                  maxLength={200}
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="e.g. Hidden Door, a16z games, freelance"
                  className="w-full rounded-lg border border-[oklch(0.88_0.008_280)] px-4 py-3 font-['JetBrains_Mono'] text-sm text-[oklch(0.18_0.02_270)] placeholder:text-[oklch(0.62_0.01_280)] transition-all focus:border-[oklch(0.48_0.22_275)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.48_0.22_275)]"
                />
              </div>

              <div>
                <label
                  htmlFor="nl-region"
                  className="font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.012_275)] mb-2 block"
                >
                  Region{" "}
                  <span className="text-[oklch(0.5_0.01_280)]">(optional)</span>
                </label>
                <select
                  id="nl-region"
                  value={region}
                  onChange={e => setRegion(e.target.value)}
                  className="w-full rounded-lg border border-[oklch(0.88_0.008_280)] bg-white px-4 py-3 font-['JetBrains_Mono'] text-sm text-[oklch(0.18_0.02_270)] transition-all focus:border-[oklch(0.48_0.22_275)] focus:outline-none focus:ring-1 focus:ring-[oklch(0.48_0.22_275)]"
                >
                  <option value="">Skip</option>
                  {REGIONS.map(r => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full rounded-lg px-6 py-3 font-['Inter'] text-sm font-bold transition-all ${
                  loading
                    ? "cursor-not-allowed bg-[oklch(0.78_0.08_275)] text-white/70"
                    : "cursor-pointer bg-[oklch(0.48_0.22_275)] text-white hover:bg-[oklch(0.4_0.22_275)]"
                }`}
              >
                {loading ? "Adding you…" : "Add me to the list"}
              </button>

              <p className="font-['JetBrains_Mono'] text-[10px] text-[oklch(0.4_0.012_275)] leading-relaxed pt-1">
                We use your role and affiliation to tune what we send. No
                third-party sharing.
              </p>
            </form>

            {status === "success" && (
              <div className="mt-4 p-3 rounded-lg bg-[oklch(0.88_0.012_160)] border border-[oklch(0.55_0.16_160)] text-[oklch(0.55_0.16_160)] font-['JetBrains_Mono'] text-xs text-center">
                {alreadySubscribed
                  ? "You're already on the list."
                  : "You're in. Welcome."}
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 p-3 rounded-lg bg-[oklch(0.9_0.01_25)] border border-[oklch(0.55_0.22_25)] text-[oklch(0.55_0.22_25)] font-['JetBrains_Mono'] text-xs text-center">
                {errorMsg || "Please check the form and try again."}
              </div>
            )}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-4">
            <div className="rounded-lg border border-[oklch(0.88_0.008_280)] bg-[oklch(0.985_0.006_275)] p-3 sm:p-4">
              <div className="font-['JetBrains_Mono'] text-base font-bold leading-tight text-[oklch(0.48_0.22_275)] sm:text-2xl">
                Free
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider">
                Always
              </div>
            </div>
            <div className="rounded-lg border border-[oklch(0.88_0.008_280)] bg-[oklch(0.985_0.006_275)] p-3 sm:p-4">
              <div className="font-['JetBrains_Mono'] text-base font-bold leading-tight text-[oklch(0.48_0.22_275)] sm:text-2xl">
                Curated
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider">
                No spam
              </div>
            </div>
            <div className="rounded-lg border border-[oklch(0.88_0.008_280)] bg-[oklch(0.985_0.006_275)] p-3 sm:p-4">
              <div className="font-['JetBrains_Mono'] text-base font-bold leading-tight text-[oklch(0.48_0.22_275)] sm:text-2xl">
                Quarterly
              </div>
              <div className="font-['JetBrains_Mono'] text-[10px] sm:text-xs text-[oklch(0.36_0.012_275)] mt-1 uppercase tracking-wider">
                Cadence
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  const sectionLinks = [
    { href: "/ai-tools", label: "AI Tools" },
    { href: "/open-source", label: "Open Source" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/geo-market", label: "Geographic Markets" },
    { href: "/outlook", label: "Outlook 2026-2030" },
    { href: "/july-archive", label: "June-July 2026 Archive" },
    { href: "#newsletter", label: "Join in" },
  ];

  const brandLinks = [
    { href: "https://anygame.dev", label: "anygame.dev" },
    { href: "https://anything.network", label: "anything.network" },
    { href: "https://velab.org", label: "velab.org" },
  ];

  const sources = [
    "GoodFirms 2026",
    "BCG Report 2026",
    "Naavik UGC Report 2026",
    "Mordor Intelligence",
    "GDC State of the Industry 2025",
  ];

  return (
    <footer className="border-t border-[oklch(0.88_0.008_280)] bg-[oklch(0.97_0.01_275)]">
      {/* Main footer content */}
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <PickUpSticksMark className="mb-4 h-8 w-8" decorative />
            <p className="mb-6 font-['Inter'] text-sm leading-relaxed text-[oklch(0.52_0.015_275)]">
              An interactive research resource on AI adoption in game
              development.
            </p>
            {/* VE LAB brand links */}
            <div className="space-y-2">
              {brandLinks.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 font-['JetBrains_Mono'] text-xs text-[oklch(0.48_0.22_275)] transition-colors hover:text-[oklch(0.34_0.2_275)]"
                >
                  <span className="h-1 w-3 bg-[oklch(0.48_0.22_275)] transition-transform group-hover:translate-x-1" />
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.52_0.015_275)]">
              Sections
            </div>
            <div className="space-y-3">
              {sectionLinks.map(l => {
                const className =
                  "block font-['Inter'] text-sm text-[oklch(0.52_0.015_275)] transition-colors hover:text-[oklch(0.18_0.02_270)]";
                // Routes go through the router; the in-page anchor stays native.
                return l.href.startsWith("#") ? (
                  <a key={l.href} href={l.href} className={className}>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.href} href={l.href} className={className}>
                    {l.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Sources */}
          <div>
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.52_0.015_275)]">
              Sources
            </div>
            <div className="space-y-2">
              {sources.map(s => (
                <div
                  key={s}
                  className="font-['JetBrains_Mono'] text-xs text-[oklch(0.52_0.015_275)]"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Key stats */}
          <div>
            <div className="mb-4 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.52_0.015_275)]">
              Key Numbers
            </div>
            <div className="space-y-3">
              {marketStats.map((s, i) => (
                <div key={i}>
                  <div className="font-['JetBrains_Mono'] text-base font-bold text-[oklch(0.48_0.22_275)]">
                    {s.value}
                  </div>
                  <div className="font-['JetBrains_Mono'] text-[11px] uppercase text-[oklch(0.52_0.015_275)]">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Builder Spotlight ────────────────────────────────────────
function BuilderSpotlightSection() {
  return (
    <Section id="builder-spotlight" number="02" label="Builder Spotlight" alt>
      <div className="max-w-5xl">
        <Link
          href="/dreamfall"
          className="group grid overflow-hidden rounded-lg border border-[oklch(0.88_0.008_280)] bg-white transition-all hover:-translate-y-1 hover:border-[oklch(0.72_0.04_275)] hover:shadow-[0_18px_45px_-32px_oklch(0.18_0.02_270/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4 md:grid-cols-[minmax(0,1fr)_17rem]"
        >
          <div className="p-7 md:p-10">
            <div className="mb-3 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)]">
              Builder Spotlight / July 2026
            </div>
            <h3 className="mb-4 font-['Syne'] text-2xl font-extrabold text-[oklch(0.18_0.02_270)] md:text-3xl">
              Dreamfall: agent-assisted solo dev, shipped in weeks
            </h3>
            <p className="mb-6 font-['Inter'] text-lg leading-relaxed text-[oklch(0.52_0.015_275)]">
              A single developer and AI coding agents shipped a multi-genre
              browser-3D R&amp;D lab in roughly three weeks. The durable signal
              is the engineering culture: a closed runtime facade, around 100
              regression scripts, and architecture written for agents.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {["3 weeks", "~100 verify scripts", "MIT", "WebGPU + Rapier"].map(
                signal => (
                  <span
                    key={signal}
                    className="rounded border border-[oklch(0.88_0.008_280)] bg-[oklch(0.985_0.006_275)] px-2.5 py-1 font-['JetBrains_Mono'] text-xs text-[oklch(0.36_0.015_275)]"
                  >
                    {signal}
                  </span>
                )
              )}
            </div>
            <span className="inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)]">
              Read the case study{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
          <div className="flex min-h-64 flex-col items-center justify-center border-t border-[oklch(0.88_0.008_280)] bg-[oklch(0.18_0.02_270)] p-8 text-white md:border-l md:border-t-0">
            <PickUpSticksMark className="h-28 w-28" />
            <div className="mt-5 text-center font-['JetBrains_Mono'] text-[10px] uppercase text-white/65">
              One protected system
              <br />
              many fast experiments
            </div>
          </div>
        </Link>
      </div>
    </Section>
  );
}

// ── Trend Briefs ──────────────────────────────────────────────
function TrendBriefsSection() {
  const briefs = [
    {
      tag: "Gaming · August 2026",
      title: "What Trended in AI-Native Game Dev",
      desc: "Three.js won the render layer, skills became a game-dev primitive, Karpathy named the ephemeral GTA of X. 48 bookmarks + influencer threads → games to play, build, and subscribe to.",
      href: "/augusttrends",
    },
    {
      tag: "Pulse · August 2026",
      title: "30-Day Community Pulse",
      desc: "What Reddit, HN, and the job boards actually said about AI in game dev in the last 30 days. The AI Act thread, the 'pretending not to use AI' posture, an AI-judge game on Show HN.",
      href: "/august-pulse",
    },
    {
      tag: "Site Note · August 2026",
      title: "The Models Now Judge Each Other",
      desc: "Peer Arena puts five LLMs in one room to debate and vote. 298 games, no human judges. Self-voting wins games, and humility tops the board.",
      href: "/peer-arena-note",
    },
  ];
  const accents = [
    "oklch(0.48 0.22 275)",
    "oklch(0.66 0.18 35)",
    "oklch(0.55 0.12 160)",
  ];
  return (
    <Section id="trend-briefs" number="03" label="Trend Briefs">
      <div className="mb-10 grid gap-6 md:grid-cols-12 md:items-end">
        <h2 className="font-['Syne'] text-3xl font-bold leading-tight text-[oklch(0.18_0.02_270)] md:col-span-6 md:text-4xl">
          The latest signals from the AI-native game-dev stack.
        </h2>
        <p className="font-['Inter'] text-lg leading-relaxed text-[oklch(0.52_0.015_275)] md:col-span-5 md:col-start-8">
          August pairs the editorial brief with a 30-day community pulse.
          Short site notes cover what the models themselves are doing.
        </p>
      </div>
      <div className="grid max-w-5xl gap-6 md:grid-cols-2">
        {briefs.map((brief, index) => (
          <Link
            key={brief.href}
            href={brief.href}
            className="group flex min-h-72 flex-col rounded-lg border border-[oklch(0.88_0.008_280)] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[oklch(0.72_0.04_275)] hover:shadow-[0_18px_45px_-32px_oklch(0.18_0.02_270/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
            style={{
              borderTopColor: accents[index % accents.length],
              borderTopWidth: 3,
            }}
          >
            <div className="mb-3 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)]">
              {brief.tag}
            </div>
            <h3 className="mb-3 font-['Syne'] text-2xl font-bold text-[oklch(0.18_0.02_270)]">
              {brief.title}
            </h3>
            <p className="mb-5 font-['Inter'] leading-relaxed text-[oklch(0.52_0.015_275)]">
              {brief.desc}
            </p>
            <span className="mt-auto inline-flex items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)]">
              Read the brief{" "}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-8 flex max-w-5xl flex-col gap-4 border-t border-[oklch(0.88_0.008_280)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)]">
            Earlier editions
          </div>
          <p className="mt-1 font-['Inter'] text-sm text-[oklch(0.52_0.015_275)]">
            Seven briefs, tool notes, and spotlights from June and July 2026.
          </p>
        </div>
        <Link
          href="/july-archive"
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 font-['JetBrains_Mono'] text-xs uppercase text-[oklch(0.48_0.22_275)] transition-colors hover:text-[oklch(0.34_0.2_275)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
        >
          Browse the June-July archive
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </Section>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function Home() {
  useSeo({
    title: "anygame.dev — AI in Game Development · Research Report 2026",
    description:
      "Interactive research on how AI is rewiring game development — AI tools, open-source engines, market data, and founder strategy for 2026–2030. Join the conversation.",
    path: "/",
  });
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Nav />
      <Hero />
      <ResearchAtlasSection />
      <BuilderSpotlightSection />
      <TrendBriefsSection />
      <NewsletterSection />
      <ResourceLinksSection />
      <Footer />
    </div>
  );
}
