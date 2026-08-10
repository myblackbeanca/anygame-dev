// ============================================================
// PAGE: /xboxreset-pulse — Xbox Reset: The Last 30 Days (community pulse)
// Companion to /xboxreset. Sourced from a /last30days run (Jul 9, 2026):
// 8 Reddit threads, 23 X posts, 9 YouTube videos, 15 articles.
// Design: Editorial Intelligence — LIGHT THEME.
// ============================================================

import { Link } from "wouter";
import { ArrowRight, Radio, TrendingUp, Quote, Link2, Hammer } from "lucide-react";
import { ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";
const card = `rounded-xl border ${border} bg-[oklch(1_0_0)] p-6`;

// Signal counts from the last30days engine footer (2026-06-09 → 2026-07-09).
const SIGNAL = [
  ["8", "Reddit threads", "80,689 upvotes"],
  ["23", "X posts", "788 likes"],
  ["9", "YouTube videos", "120K views"],
  ["15", "Web articles", "IGN, Fortune, PC Gamer"],
];

// Each finding links to the strongest source in the research dump.
const FINDINGS = [
  {
    head: "The narrative got culture-war-captured",
    body: "The highest-scoring cluster across Reddit, X, and YouTube isn't about strategy — it's the anti-DEI framing. The same current that dominates the memo's reply thread runs the most-viewed video coverage. It's not a fringe; it's the center of gravity on the engagement-driven platforms.",
    cite: "Smash JT — “DE-WOKE-IFY: XBOX FINALLY Cleans House” (12K views)",
    url: "https://www.youtube.com/watch?v=FOmUs2unMQg",
  },
  {
    head: "Relief that studios were spun off, not shut",
    body: "The top Reddit item is Double Fine's own post-reset update (3,074 upvotes). The recurring read: “better than expected — sold or spun off rather than outright closed.” Compulsion and Double Fine going independent with IP and runway is treated as the least-bad outcome — the same “enable, don't own” framing the brief leans on.",
    cite: "r/pcgaming — Double Fine update (3,074 upvotes)",
    url: "https://www.reddit.com/r/pcgaming/comments/1up13ba/update_from_double_fine_after_the_xbox_reset/",
  },
  {
    head: "Exec-pay anger is the loud counter-current",
    body: "The most-quoted critical line is “firing thousands while executives keep earning many times more.” Sentiment splits cleanly between “the reset was overdue” and “this is greed, not necessity.” Laid-off Obsidian art director Daniel Alpert framed it as an industry inflection point.",
    cite: "PC Gamer — the games industry reacts",
    url: "https://www.pcgamer.com/gaming-industry/the-games-industry-reacts-to-xbox-layoffs-we-are-clearly-at-a-turning-point/",
  },
  {
    head: "The indie vacuum opens with pain first",
    body: "The “indie vacuum = opportunity” read is real long-term — but near-term it bites. Xbox reportedly paused new third-party and indie Game Pass deals, killing the guaranteed pre-launch revenue indie payroll relied on. The safety net vanished before any “open tools” arrived. That sharpens anygame.dev's pitch rather than weakening it.",
    cite: "Digital Trends — Game Pass deals drying up",
    url: "https://www.digitaltrends.com/gaming/xbox-game-pass-deals-are-reportedly-drying-up-and-thats-bad-news-for-indies/",
  },
  {
    head: "“No games cancelled” hides deep team cuts",
    body: "Despite the memo's line, the layoffs cut id Software roughly in half as DOOM: The Dark Ages DLC ships, and Obsidian took hits too — studios the brief lists as “safe.” No cancellations coexists with deep gutting.",
    cite: "Pure Xbox — id Software cut in half",
    url: "https://www.purexbox.com/news/2026/07/xbox-layoffs-cut-id-software-in-half-as-doom-the-dark-ages-dlc-launches",
  },
  {
    head: "Game Pass economics are the root story",
    body: "The 50% hike ($19.99 → $29.99) lost “millions” of subscribers and was reversed to $22.99 — the concrete failure behind Sharma's “did not grow at the pace we expected.” The community treats Game Pass, not the studios, as the thing that actually broke.",
    cite: "LEVEL UP — subscribers lost after price hike",
    url: "https://www.levelup.com/en/news/xbox-game-pass-lost-millions-of-subscribers-after-a-50-price-increase-executive-reveals/",
  },
];

// The operator-grade read for indie studios and game devs — mined from the threads.
const INDIE = [
  {
    head: "The de-acquisition deal is now a template",
    take: "Double Fine and Compulsion went back to their founders (Tim Schafer, Guillaume Provost) with IP, catalog, and runway funding. Double Fine's own words: an outcome that “returns ownership of our games to us.” If you ever sell to a platform, IP-reversion + runway is now a real precedent to negotiate for — not a fantasy.",
    cite: "r/Games — Double Fine's statement (2,533 upvotes)",
    url: "https://www.reddit.com/r/Games/comments/1up7x3b/double_fine_were_thankful_to_everyone_at_xbox_for/",
  },
  {
    head: "Acquisition-for-bundle-content is broken math",
    take: "Xbox lost 30–64¢ on every dollar spent on small studios, and admits “$20B in, annual revenue down half a billion.” Being bought to feed a subscription bundle isn't sustainable for either side. Don't architect your studio as bundle fodder — build for sell-through you control.",
    cite: "Andru Edwards — “total liquidation of the prestige studio model” (52.9K views)",
    url: "https://www.youtube.com/watch?v=astXVEkiCLY",
  },
  {
    head: "The Game Pass revenue floor is gone — don't plan a runway on it",
    take: "New third-party and indie Game Pass deals are reportedly frozen. The guaranteed pre-launch advance many indies budgeted payroll around has vanished. Diversify launch funding now — Steam sell-through, direct sales, other platforms — and stop treating a platform advance as your floor.",
    cite: "Digital Trends — Game Pass deals drying up",
    url: "https://www.digitaltrends.com/gaming/xbox-game-pass-deals-are-reportedly-drying-up-and-thats-bad-news-for-indies/",
  },
  {
    head: "Xbox is on record that indies out-compete it",
    take: "Straight from the coverage: “indie studios out there eating your lunch over and over again.” AAA is publicly conceding that craft-per-dollar favors small teams. That's your structural edge - a lean team with a clear vision beats a 14-layer org, and the giant just said so out loud.",
    cite: "Smash JT (YouTube)",
    url: "https://www.youtube.com/watch?v=FOmUs2unMQg",
  },
  {
    head: "Even “safe” studios got cut — headcount is the risk variable",
    take: "id Software was halved and Obsidian took hits despite “no cancellations.” Exposure tracks team size, not project quality. A small, IP-owning team is structurally more resilient to a downturn than a mid-size studio dependent on one patron's balance sheet.",
    cite: "Pure Xbox — id Software cut in half",
    url: "https://www.purexbox.com/news/2026/07/xbox-layoffs-cut-id-software-in-half-as-doom-the-dark-ages-dlc-launches",
  },
  {
    head: "Ownership is a live consumer demand — you can differentiate on it",
    take: "Between the physical-media pleas in the reply thread and Double Fine celebrating that ownership “returns to us,” the signal is consistent: players and makers both want to own, not rent. DRM-free, physical, or true-ownership models are a differentiator AAA is structurally bad at.",
    cite: "Windows Central — the spin-off terms",
    url: "https://www.windowscentral.com/gaming/xbox/xboxs-big-reset-cuts-compulsion-double-fine-undead-labs-ninja-theory-to-leave-xbox",
  },
];

// Verbatim quotes pulled from the research dump.
const QUOTES = [
  {
    text: "Meanwhile, you've got indie studios out there eating your lunch over and over again — and then you cry and say why is no one buying our games?",
    who: "Smash JT",
    ctx: "YouTube · 12K views, 1,078 likes",
    url: "https://www.youtube.com/watch?v=FOmUs2unMQg",
  },
  {
    text: "Xbox was losing 30 cents on every dollar they spent with smaller studios, leading Xbox to focus their investment on bigger franchises.",
    who: "colteastwood",
    ctx: "YouTube · 24.9K views, 1,839 likes — note: the memo itself says 64¢",
    url: "https://www.youtube.com/watch?v=G7gFcdPmUeM",
  },
  {
    text: "We are clearly at a turning point in the games industry. These past months have been difficult for so many talented people, and unfortunately the challenges aren't over yet.",
    who: "Daniel Alpert, laid-off Obsidian art director",
    ctx: "via PC Gamer",
    url: "https://www.pcgamer.com/gaming-industry/the-games-industry-reacts-to-xbox-layoffs-we-are-clearly-at-a-turning-point/",
  },
  {
    text: "This is actually better news than I expected, with studios being spun off or sold rather than just outright closed.",
    who: "r/pcgaming",
    ctx: "on the Double Fine update · 3,074 upvotes",
    url: "https://www.reddit.com/r/pcgaming/comments/1up13ba/update_from_double_fine_after_the_xbox_reset/",
  },
  {
    text: "Xbox is operating at profit margins 3–10x lower than competitors, facing slower-than-expected growth from Game Pass, a weakened core business, and a severe industry hardware crisis.",
    who: "@RinoTheBouncer",
    ctx: "X · 190 likes, 27 reposts",
    url: "https://x.com/RinoTheBouncer/status/2074128336599535620",
  },
];

const PATTERNS = [
  "High-engagement platforms captured the story as a culture war, not a strategy shift.",
  "“Spun off, not closed” is the relief valve softening the reaction.",
  "The Game Pass deal freeze hits indies before any “open tools” exist.",
  "Number drift is everywhere: “4 studios” vs “5,” and “30¢” vs the memo's “64¢” per dollar.",
  "Exec comp vs mass layoffs is the trust wound that outlives the news cycle.",
];

// Full linked source list (durable citations).
const SOURCES = [
  ["IGN", "Full staff email from Asha Sharma", "https://www.ign.com/articles/xbox-boss-asha-sharma-announces-3200-layoffs-including-1600-today-with-4-studios-leaving-for-new-management-read-the-email-to-staff-in-full"],
  ["Fortune", "Exclusive CEO interview — “we spread ourselves too thin”", "https://fortune.com/2026/07/06/exclusive-xbox-ceo-asha-sharma-job-cuts-studios-axed-layoffs/"],
  ["PC Gamer", "The industry reacts — “a turning point”", "https://www.pcgamer.com/gaming-industry/the-games-industry-reacts-to-xbox-layoffs-we-are-clearly-at-a-turning-point/"],
  ["Digital Trends", "Game Pass indie/third-party deals paused", "https://www.digitaltrends.com/gaming/xbox-game-pass-deals-are-reportedly-drying-up-and-thats-bad-news-for-indies/"],
  ["Pure Xbox", "id Software cut roughly in half", "https://www.purexbox.com/news/2026/07/xbox-layoffs-cut-id-software-in-half-as-doom-the-dark-ages-dlc-launches"],
  ["LEVEL UP", "Game Pass lost millions after the price hike", "https://www.levelup.com/en/news/xbox-game-pass-lost-millions-of-subscribers-after-a-50-price-increase-executive-reveals/"],
  ["Windows Central", "Compulsion, Double Fine, Undead Labs, Ninja Theory spun off", "https://www.windowscentral.com/gaming/xbox/xboxs-big-reset-cuts-compulsion-double-fine-undead-labs-ninja-theory-to-leave-xbox"],
  ["Smash JT (YouTube)", "“DE-WOKE-IFY: XBOX FINALLY Cleans House”", "https://www.youtube.com/watch?v=FOmUs2unMQg"],
  ["colteastwood (YouTube)", "“HUGE XBOX LAY-OFFS Sold Off 4 Game Studios”", "https://www.youtube.com/watch?v=G7gFcdPmUeM"],
  ["r/pcgaming", "Double Fine post-reset update (3,074 upvotes)", "https://www.reddit.com/r/pcgaming/comments/1up13ba/update_from_double_fine_after_the_xbox_reset/"],
];

export default function XboxResetPulse() {
  useSeo({
    title: "Xbox Reset - The Last 30 Days · anygame.dev",
    description:
      "What the community said about the Xbox Reset in the 30 days after the memo - plus the operator's read for indie studios: the de-acquisition deal template, why acquisition-for-bundle math is broken, and where small teams have the edge. Companion to anygame.dev's Xbox Reset brief.",
    path: "/xboxreset-pulse",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Community Pulse" />

      {/* Hero */}
      <header className="container pt-20 pb-8 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4 flex items-center gap-2`}>
          <Radio className="w-3.5 h-3.5" /> Last 30 Days · pulled Jul 9, 2026
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          What the Room Actually Said
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          The <Link href="/xboxreset" className={`${indigo} underline underline-offset-2`}>Xbox Reset brief</Link> covered
          the memo. This is what people said back — synthesized from 8 Reddit threads, 23 X posts, 9 YouTube videos, and
          15 articles across the 30 days after the announcement.
        </p>
      </header>

      {/* Connect banner → brief */}
      <section className="container max-w-[820px] pb-4">
        <Link
          href="/xboxreset"
          className={`group flex items-center justify-between gap-4 rounded-2xl border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(1_0_0)] p-5 ${border} border-y border-r hover:shadow-md transition-all`}
        >
          <div>
            <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo}`}>The full brief</p>
            <p className={`font-['Syne'] font-semibold ${ink}`}>Xbox Reset 2026 — the memo, the studio fates, the thesis</p>
          </div>
          <ArrowRight className={`w-5 h-5 ${indigo} group-hover:translate-x-1 transition-transform flex-shrink-0`} />
        </Link>
      </section>

      {/* Signal counts */}
      <section className="container max-w-[1100px] py-10">
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {SIGNAL.map(([n, l, sub]) => (
            <div key={l} className={card}>
              <div className={`font-['Syne'] font-extrabold text-3xl ${ink}`}>{n}</div>
              <div className={`text-sm ${ink} mt-1`}>{l}</div>
              <div className={`font-['JetBrains_Mono'] text-[11px] ${muted} mt-1`}>{sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Findings */}
      <section className="container max-w-[1100px] py-6">
        <div className="flex items-center gap-3 mb-7">
          <TrendingUp className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>What the community said</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {FINDINGS.map((f) => (
            <div key={f.head} className={`${card} flex flex-col`}>
              <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{f.head}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${muted} flex-1`}>{f.body}</p>
              <a href={f.url} target="_blank" rel="noopener noreferrer"
                 className={`mt-4 font-['JetBrains_Mono'] text-[11px] ${indigo} hover:underline`}>
                {f.cite} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* For indie studios — the operator read */}
      <section className="container max-w-[1100px] py-10">
        <div className={`rounded-2xl border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(0.98_0.008_275)] p-6 md:p-9 ${border} border-y border-r`}>
          <div className="flex items-center gap-3 mb-2">
            <Hammer className={`w-5 h-5 ${indigo}`} />
            <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>For indie studios: the operator's read</h2>
          </div>
          <p className={`text-sm ${muted} mb-7 max-w-[720px]`}>
            Past the sentiment - the parts of this story a small studio can actually act on. Mined from the threads,
            the memo, and the deal terms.
          </p>
          <div className="grid gap-5 md:grid-cols-2">
            {INDIE.map((it, i) => (
              <div key={it.head} className={`${card} flex flex-col`}>
                <div className="flex items-baseline gap-3">
                  <span className={`font-['Syne'] font-extrabold text-lg ${indigo} leading-none`}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{it.head}</h3>
                </div>
                <p className={`mt-3 text-sm leading-relaxed ${muted} flex-1`}>{it.take}</p>
                <a href={it.url} target="_blank" rel="noopener noreferrer"
                   className={`mt-4 font-['JetBrains_Mono'] text-[11px] ${indigo} hover:underline`}>
                  {it.cite} ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In their words */}
      <section className="container max-w-[820px] py-10">
        <div className="flex items-center gap-3 mb-6">
          <Quote className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>In their words</h2>
        </div>
        <div className="space-y-4">
          {QUOTES.map((q) => (
            <blockquote key={q.who} className={`border-l-[3px] border-[oklch(0.85_0.05_300)] bg-[oklch(1_0_0)] rounded-r-lg p-5 ${border} border-y border-r`}>
              <p className={`italic ${ink} leading-relaxed`}>&ldquo;{q.text}&rdquo;</p>
              <a href={q.url} target="_blank" rel="noopener noreferrer"
                 className={`mt-3 block font-['JetBrains_Mono'] text-[11px] ${muted} hover:underline`}>
                <span className={indigo}>{q.who}</span> · {q.ctx} ↗
              </a>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Patterns */}
      <section className="container max-w-[820px] py-6">
        <h2 className={`font-['Syne'] font-bold text-2xl ${ink} mb-5`}>Key patterns</h2>
        <ol className="space-y-3">
          {PATTERNS.map((p, i) => (
            <li key={i} className={`flex gap-3 border-b ${border} pb-3`}>
              <span className={`font-['Syne'] font-extrabold ${indigo}`}>{i + 1}</span>
              <span className={`text-sm ${ink}`}>{p}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* What it changes for the brief */}
      <section className="container max-w-[820px] py-6">
        <div className={`rounded-2xl bg-[oklch(0.97_0.01_275)] p-8 md:p-10`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>What this adds to the thesis</p>
          <p className={`text-lg leading-relaxed ${ink}`}>
            The indie vacuum is real — but the last 30 days show it opens with pain, not opportunity, first. Game Pass
            deals froze before any “open tools” shipped, stranding the exact developers the brief points to. That
            doesn't weaken anygame.dev's pitch; it sharpens it: <strong>the safety net just vanished, and nobody has
            replaced it yet.</strong>
          </p>
          <Link
            href="/xboxreset"
            className={`mt-6 inline-flex items-center gap-2 rounded-full bg-[oklch(0.48_0.22_275)] px-6 py-3
              font-['JetBrains_Mono'] text-xs tracking-widest uppercase text-white hover:opacity-90 transition-opacity`}
          >
            Read the full brief <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Full source list */}
      <section className="container max-w-[1100px] py-10">
        <div className="flex items-center gap-3 mb-6">
          <Link2 className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Sources</h2>
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>the 30-day pull</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {SOURCES.map(([name, note, url]) => (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer"
               className={`group flex items-start justify-between gap-3 rounded-lg border ${border} bg-[oklch(1_0_0)] p-4 hover:border-[oklch(0.48_0.22_275)] transition-colors`}>
              <div>
                <span className={`font-['Syne'] font-semibold ${ink}`}>{name}</span>
                <p className={`text-sm ${muted} mt-0.5`}>{note}</p>
              </div>
              <ArrowRight className={`w-4 h-4 ${indigo} opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1`} />
            </a>
          ))}
        </div>
      </section>

      <ResearchFooter
        label="Community Pulse · Xbox Reset · Last 30 Days (pulled Jul 9, 2026)"
        note="Sourced from Reddit, X, YouTube, and the press via a /last30days sweep. Engagement counts are as pulled; community quotes are attributed to their authors."
      />
    </div>
  );
}
