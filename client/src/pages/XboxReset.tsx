// ============================================================
// PAGE: /xboxreset — Xbox Reset 2026 Trend Brief (FULL, self-hosted)
// Design: Editorial Intelligence — LIGHT THEME (matches Home/JuneGames)
// Full report lives here natively — no external here.now dependency.
// ============================================================

import { Link } from "wouter";
import { ArrowRight, Radio, Building2, MessageSquare, FileText, Gamepad2, Zap, Compass } from "lucide-react";
import { MINY_PLAY_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

// ---- design tokens (shared with JuneGames) ----
const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";
const card = `rounded-xl border ${border} bg-[oklch(1_0_0)] p-6`;

// ---- data ----
const STATS = [
  { num: "3,200", label: "Jobs cut (~20% of workforce) through FY27", tone: "red" },
  { num: "1,600", label: "Eliminated immediately (July 6)", tone: "amber" },
  { num: "4", label: "Studios leaving Xbox to new ownership", tone: "red" },
  { num: "64¢", label: "Lost per dollar invested in small studios", tone: "red" },
  { num: "14 → 5", label: "Management layers, targeted (ideally 3)", tone: "indigo" },
  { num: "$89B+", label: "Spent on acquisitions without revenue growth", tone: "amber" },
];

const HIGHLIGHTS = [
  ["New CEO, new direction", "Asha Sharma replaced Phil Spencer in February 2026. After 100 days of assessment, she's executing the biggest reset in Xbox's 25-year history."],
  ["“Business is not healthy”", "Direct admission. Margins are 3–10x lower than comparable platform and publishing businesses."],
  ["Game Pass growth stalled", "The bet on subscriptions and multi-platform publishing “did not grow at the pace we expected.” A 50% price hike was already reversed after mass cancellations."],
  ["Hardware crisis", "“The most severe hardware crisis in its history” — console sales declining across the industry, costs skyrocketing."],
  ["Acquisition strategy failed", "$69B+ on Activision Blizzard and $20B+ on other studios didn't translate to growth. Gaming revenues are down ~$500M vs 5 years ago."],
  ["Flattening management", "Some workflows had 14 layers of management. New target: max 5, ideally 3."],
  ["Helen Chiang promoted to COO", "Former Minecraft/Mojang head now has end-to-end P&L responsibility across content, hardware, platform, and services."],
  ["No announced games cancelled — but teams still gutted", "No first-party title was cancelled, per the memo. Yet the layoffs still cut id Software roughly in half (as DOOM DLC ships) and hit Obsidian — studios listed as “safe” below — per press reports (July 2026)."],
];

const QUOTES = [
  ["Our business today is not healthy. We are operating at margins that are 3–10x lower than comparable platform and publishing businesses.", "Asha Sharma"],
  ["In a typical year, we lost 64 cents for every dollar we invested.", "On the small studio acquisition strategy"],
  ["It is neither possible nor desirable to own every great independent studio. We have also learned that we are not the best home for every type of studio.", "The core strategic reversal"],
  ["We will help independent creators succeed by providing open development tools and audiences to realize their vision.", "The new platform play"],
  ["History is full of companies that mistake longevity for inevitability. We will not be one of them.", "Closing line"],
];

type Fate = "SPUN OFF" | "BEING SOLD" | "IN LIMBO" | "ELEVATED" | "STAYS";
const STUDIOS: { studio: string; known: string; status: Fate; fate: string }[] = [
  { studio: "Double Fine", known: "Psychonauts, Grim Fandango", status: "SPUN OFF", fate: "Independent, retains IP & catalog" },
  { studio: "Compulsion Games", known: "We Happy Few, South of Midnight", status: "SPUN OFF", fate: "Independent, retains IP & catalog" },
  { studio: "Ninja Theory", known: "Hellblade: Senua's Sacrifice", status: "BEING SOLD", fate: "New ownership, funded to finish Senua" },
  { studio: "Undead Labs", known: "State of Decay", status: "BEING SOLD", fate: "New ownership, funded to finish State of Decay 3" },
  { studio: "Arkane (Lyon)", known: "Dishonored, Prey, Blade", status: "IN LIMBO", fate: "Works Council consultation; sale, closure, or spin-off. Blade uncertain" },
  { studio: "Mojang", known: "Minecraft", status: "ELEVATED", fate: "Reports directly to CEO. Acknowledged as “fallen behind Roblox”" },
  { studio: "King", known: "Candy Crush", status: "ELEVATED", fate: "Reports directly to CEO. Critical mobile MAUs" },
  { studio: "343 / Halo Studios", known: "Halo", status: "STAYS", fate: "Refocused on core Halo franchise" },
  { studio: "Playground Games", known: "Forza, Fable", status: "STAYS", fate: "Safe" },
  { studio: "Obsidian", known: "Avowed, The Outer Worlds", status: "STAYS", fate: "Safe" },
  { studio: "The Coalition", known: "Gears of War", status: "STAYS", fate: "Safe" },
  { studio: "Rare", known: "Sea of Thieves, Everwild", status: "STAYS", fate: "Safe (Everwild was previously cancelled)" },
  { studio: "Turn 10", known: "Forza Motorsport", status: "STAYS", fate: "Safe" },
];
const fateClass: Record<Fate, string> = {
  "SPUN OFF": "bg-[oklch(0.95_0.05_85)] text-[oklch(0.45_0.12_75)]",
  "BEING SOLD": "bg-[oklch(0.95_0.04_25)] text-[oklch(0.5_0.18_25)]",
  "IN LIMBO": "bg-[oklch(0.95_0.04_25)] text-[oklch(0.5_0.18_25)]",
  ELEVATED: "bg-[oklch(0.94_0.05_150)] text-[oklch(0.42_0.12_150)]",
  STAYS: "bg-[oklch(0.94_0.05_150)] text-[oklch(0.42_0.12_150)]",
};

const FRANCHISE = [
  { head: "🟢 Priority", sub: "increased investment", items: ["Halo — core franchise, underfunded for years, now resourced.", "Call of Duty — Activision's crown jewel. Central to strategy.", "Fallout / Elder Scrolls — Bethesda tentpoles; ship more than once a decade.", "Doom — Bethesda's other flagship. Safe.", "Minecraft — elevated to CEO report; a platform, not a game.", "Candy Crush / King — mobile reach and the billion-player goal."] },
  { head: "🟡 Uncertain", sub: "in limbo", items: ["Blade (Arkane) — tied to Arkane Lyon's fate.", "South of Midnight (Compulsion) — continues, without Xbox funding.", "Psychonauts (Double Fine) — IP with the now-independent studio.", "Next Senua (Ninja Theory) — funded to completion under new owner.", "State of Decay 3 (Undead Labs) — funded to completion under new owner."] },
  { head: "🔴 Shelved / dead", sub: "abandoned", items: ["Perfect Dark & Everwild — cancelled in July 2025 layoffs.", "Small-studio acquisition spree (2018–23) — completely reversed.", "Game Pass as growth engine — stalled; price hike backfired.", "Multi-platform publishing push — quietly reversed toward exclusives.", "The “offbeat indie” strategy — no more funding quirky experiments."] },
];

const POST_STATS = [
  ["8,631", "Replies"], ["8,545", "Retweets"], ["84,838", "Likes"],
  ["17,894", "Bookmarks"], ["14.3M", "Views"], ["4,475", "Quote Tweets"],
];

// Verbatim top replies, ranked by likes (pulled July 9, 2026).
const REPLIES = [
  ["@MemeNonLibs · 15.0K", "The easiest solution is just look for the pink-haired devs that are destroying your IP and send them on their merry way. People want good games, but the shoved ideologies into what could be good stories shows why your revenue is down."],
  ["@SynthPotato · 14.3K", "Glad no studios were closed, really happy about that"],
  ["@Ryze_Jones · 4,445", "Let no rainbow rock be left unturned. The Sharma Purge continues — quietly, efficiently, and with surgical precision. Every DEI hire, every glitter-soaked woke appointee, every virtue-signal specialist is being hunted down and removed like the ideological tumors they are. The rainbow doesn't fade… it gets deleted."],
  ["@RudyLTX · 2,726", "Translation: ‘We need to fire 3,200 people so myself and the rest of the execs can continue to get paid. Sure we could have taken a cut in pay but it's easier this way.’"],
  ["@Adam_On_X_ · 1,134", "I haven't owned an Xbox since the 360 days. Since PlayStation isn't for the consumer anymore. I'll gladly buy an Xbox for first time after 20+ years if you're willing to give us the option to still purchase physical media that we can still own. This is Xbox's chance to win over so many PlayStation users with one simple decision."],
  ["@AccessIPOs · 512", "As an XBOX X owner, the UI experience is painful. Hard to believe how challenging it is to simply login, navigate between users, changes settings, and just use the basic system before entering a game. You guys should start with a total redesign of the UI."],
  ["@Mr_Rebs_ · 282", "It's upsetting to hear that previous decisions have led to 3,200 people losing their jobs… But, I do appreciate the fact that no studios were closed and you shared your email with us. Hopefully these changes will prevent mass layoffs in the future because this has to end!"],
  ["@TheDookyBooty · 271", "It is astonishing how many people actually think ‘woke agendas’ are actually creating true obstructions in game sales 😂 … the rest of us living in reality understand it's not a social problem, it's a greed problem."],
  ["@YorchTorchGames · 112", "What I'm hearing is that Xbox's strategy now revolves around Minecraft, reportedly using it to fund other studios…. You're not resetting XBOX. You're retreating to the only franchises still carrying the business: Minecraft and TES."],
  ["@MadMatikus · 108", "Your email sounds evil. Do you know why? Because you talk about firing thousands of people, but you don't talk about whether they will be cared for or not… you need to lead with compassion on this and not leave these people out in the cold."],
];

const SIGNALS = [
  ["The indie vacuum (opens with pain first)", "Xbox is done funding the offbeat and acquiring small studios. Near-term it bites: Xbox reportedly froze new third-party and indie Game Pass deals, cutting the guaranteed pre-launch revenue indies relied on — the safety net vanished before any “open tools” shipped."],
  ["“Open development tools” — teased, not built", "Sharma names the platform play out loud but ships nothing for it. The gap between the promise and the product is the opening."],
  ["Newly independent studios", "Double Fine and Compulsion spin off with IP + runway; Ninja Theory and Undead Labs move to new owners. Potential partners, not competitors."],
  ["Enable, don't own", "The 64¢-on-the-dollar loss is the thesis: owning creative talent underperforms enabling it. Creator-first economics win the next cycle."],
  ["Platforms, not studios", "Xbox's most valuable assets are Minecraft and Candy Crush — platforms, not games. Build the platform that serves creators."],
  ["Home for the weird", "AAA is retreating to safe bets. The offbeat and experimental — what Game Pass used to bankroll — now has nowhere to go."],
];

const COMPARE = [
  ["Owned studios → 64¢ loss per dollar", "Empowered indies → keep 100%"],
  ["14 layers of management", "Flat, direct-to-audience"],
  ["Hardware-dependent", "Cloud / community-native"],
  ["Safe bets only", "Home for experiments"],
  ["Acquisition model", "Enablement model"],
  ["“Open tools” teased but not built", "Actually deliver them"],
  ["Game Pass burned money", "Sustainable creator-first model"],
  ["AAA-only focus", "Indie-scale sweet spot"],
];

const CALL =
  "Microsoft spent $89B to learn you can't acquire great games into existence — you can only " +
  "enable them. Xbox is retreating from the indie tier it could never profitably own; the " +
  "platform that hands those creators the tools, distribution, and audience it only promised " +
  "inherits the vacuum.";

function SectionHead({ icon: Icon, title, note }: { icon: any; title: string; note?: string }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <Icon className={`w-5 h-5 ${indigo}`} />
      <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>{title}</h2>
      {note && <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>{note}</span>}
    </div>
  );
}

export default function XboxReset() {
  useSeo({
    title: "Xbox Reset 2026 — Trend Brief · anygame.dev",
    description:
      "anygame.dev's full brief on the largest restructure in Xbox history: 3,200 jobs cut, four studios spun off, the strategic reversal on studio ownership, the live thread, and the indie-platform vacuum it opens.",
    path: "/xboxreset",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Trend Brief" />

      {/* Hero */}
      <header className="container pt-20 pb-10 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Issue #1 · July 2026 · Platform Shift
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          The Vacuum
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          Xbox just executed the largest restructure in its history — and in the process admitted it
          is <strong className={ink}>not the best home for independent studios</strong>. That admission
          is the story. It opens a vacuum in the indie ecosystem exactly where builders can move.
        </p>
        <p className={`mt-3 font-['JetBrains_Mono'] text-xs ${muted}`}>
          Based on the July 6, 2026 public memo from Xbox CEO Asha Sharma · thread metrics &amp; replies pulled July 9, 2026.
        </p>
        <Link
          href="/xboxreset-pulse"
          className={`group mt-6 flex items-center justify-between gap-4 rounded-2xl border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(1_0_0)] p-5 ${border} border-y border-r hover:shadow-md transition-all`}
        >
          <div className="flex items-center gap-3">
            <Radio className={`w-4 h-4 ${indigo} flex-shrink-0`} />
            <div>
              <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo}`}>Community Pulse · Last 30 Days</p>
              <p className={`font-['Syne'] font-semibold ${ink}`}>What people actually said back - and what it changes</p>
            </div>
          </div>
          <ArrowRight className={`w-5 h-5 ${indigo} group-hover:translate-x-1 transition-transform flex-shrink-0`} />
        </Link>
      </header>

      {/* The Call */}
      <section className="container max-w-[820px] py-6">
        <div className={`rounded-2xl border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(1_0_0)] p-7 md:p-9 ${border} border-y border-r`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>The Call</p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>{CALL}</p>
        </div>
      </section>

      {/* At a Glance */}
      <section className="container max-w-[1100px] py-12">
        <SectionHead icon={FileText} title="At a Glance" />
        <div className="grid gap-5 grid-cols-2 lg:grid-cols-3">
          {STATS.map((s) => (
            <div key={s.label} className={card}>
              <div className={`font-['Syne'] font-extrabold text-3xl ${s.tone === "red" ? "text-[oklch(0.55_0.2_25)]" : s.tone === "amber" ? "text-[oklch(0.6_0.13_75)]" : indigo}`}>{s.num}</div>
              <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Highlights */}
      <section className="container max-w-[820px] py-6">
        <SectionHead icon={Zap} title="Key Highlights" />
        <ul className="space-y-4">
          {HIGHLIGHTS.map(([h, b]) => (
            <li key={h} className={`border-b ${border} pb-4`}>
              <span className={`font-['Syne'] font-semibold ${ink}`}>{h}. </span>
              <span className={`text-sm ${muted}`}>{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* The Memo */}
      <section className="container max-w-[820px] py-10">
        <SectionHead icon={FileText} title="The Memo" note="key quotes" />
        <div className="space-y-4">
          {QUOTES.map(([q, a]) => (
            <blockquote key={a} className={`border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(1_0_0)] rounded-r-lg p-5 ${border} border-y border-r`}>
              <p className={`italic ${ink}`}>&ldquo;{q}&rdquo;</p>
              <cite className={`mt-2 block not-italic font-['JetBrains_Mono'] text-xs ${muted}`}>— {a}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Studio Fates */}
      <section className="container max-w-[1100px] py-10">
        <SectionHead icon={Building2} title="Studio Fates" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${border}`}>
                {["Studio", "Known For", "Status", "Fate"].map((h) => (
                  <th key={h} className={`text-left font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider ${muted} py-3 pr-4`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {STUDIOS.map((s) => (
                <tr key={s.studio} className={`border-b ${border} align-top`}>
                  <td className={`py-3 pr-4 font-['Syne'] font-semibold ${ink} whitespace-nowrap`}>{s.studio}</td>
                  <td className={`py-3 pr-4 ${muted}`}>{s.known}</td>
                  <td className="py-3 pr-4"><span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${fateClass[s.status]}`}>{s.status}</span></td>
                  <td className={`py-3 pr-4 ${muted}`}>{s.fate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Franchise Focus */}
      <section className="container max-w-[1100px] py-10">
        <SectionHead icon={Gamepad2} title="Franchise Focus" note="what gets investment" />
        <div className="grid gap-5 md:grid-cols-3">
          {FRANCHISE.map((f) => (
            <div key={f.head} className={card}>
              <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{f.head}</h3>
              <p className={`font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider ${muted} mb-3`}>{f.sub}</p>
              <ul className="space-y-2">
                {f.items.map((it) => <li key={it} className={`text-sm leading-relaxed ${muted}`}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Thread Reactions */}
      <section className="container max-w-[1100px] py-10">
        <SectionHead icon={MessageSquare} title="The Thread" note="@asha_shar · live July 9" />
        <div className="grid gap-3 grid-cols-3 md:grid-cols-6 mb-8">
          {POST_STATS.map(([n, l]) => (
            <div key={l} className={`${card} text-center py-4`}>
              <div className={`font-['Syne'] font-extrabold text-xl ${ink}`}>{n}</div>
              <div className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-wide ${muted} mt-1`}>{l}</div>
            </div>
          ))}
        </div>
        <p className={`text-sm ${muted} mb-5 max-w-[820px]`}>
          Top replies, verbatim, ranked by likes — presented as-is, including the culture-war reactions
          that dominate the top of the thread alongside product complaints and cautious relief that no
          studios were closed outright.
        </p>
        <ul className="space-y-4 max-w-[820px]">
          {REPLIES.map(([who, q]) => (
            <li key={who} className={`border-l-[3px] border-[oklch(0.85_0.05_300)] pl-4`}>
              <p className={`text-base leading-relaxed ${ink}`}>&ldquo;{q}&rdquo;</p>
              <p className={`mt-1 font-['JetBrains_Mono'] text-xs ${muted}`}>{who} likes</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Signals for Builders */}
      <section className="container max-w-[1100px] py-10">
        <SectionHead icon={Building2} title="Signals for Builders" note="where the opening is" />
        <div className="grid gap-5 md:grid-cols-2">
          {SIGNALS.map(([n, note]) => (
            <div key={n} className={`${card} hover:border-[oklch(0.48_0.22_275)] transition-colors`}>
              <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{n}</h3>
              <p className={`mt-3 text-sm leading-relaxed ${muted}`}>{note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* If you're building — operator box (deep version lives on the pulse page) */}
      <section className="container max-w-[820px] py-6">
        <div className={`rounded-2xl border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(0.98_0.008_275)] p-7 md:p-9 ${border} border-y border-r`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>If you're building</p>
          <p className={`text-lg ${ink} font-['Syne'] font-semibold mb-4`}>Three things a small studio can act on today:</p>
          <ul className="space-y-2">
            <li className={`text-sm ${muted}`}><strong className={ink}>The de-acquisition deal is a template.</strong> Double Fine and Compulsion got IP, catalog, and runway back — negotiate for IP-reversion + runway, it's now a real precedent.</li>
            <li className={`text-sm ${muted}`}><strong className={ink}>Acquisition-for-bundle math is dead.</strong> Xbox lost 30–64¢ per dollar on small studios — build for sell-through you own, not bundle inclusion.</li>
            <li className={`text-sm ${muted}`}><strong className={ink}>The Game Pass revenue floor is gone.</strong> New indie deals are frozen — don't budget payroll on a platform advance.</li>
          </ul>
          <Link
            href="/xboxreset-pulse"
            className={`mt-6 inline-flex min-h-11 items-center gap-2 font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${indigo} hover:gap-3 transition-all`}
          >
            The full operator's read — 6 takeaways from the threads <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Failure -> Opportunity */}
      <section className="container max-w-[820px] py-10">
        <SectionHead icon={Compass} title="Xbox's Failure → Your Opportunity" />
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className={`border-b ${border}`}>
                <th className={`text-left font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider ${muted} py-3 pr-4`}>Xbox's Failure</th>
                <th className={`text-left font-['JetBrains_Mono'] text-[11px] uppercase tracking-wider ${muted} py-3`}>Your Opportunity</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map(([a, b]) => (
                <tr key={a} className={`border-b ${border}`}>
                  <td className={`py-3 pr-4 text-[oklch(0.5_0.18_25)] font-medium`}>{a}</td>
                  <td className={`py-3 text-[oklch(0.42_0.12_150)] font-medium`}>{b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Strategic Read */}
      <section className="container max-w-[820px] py-10">
        <SectionHead icon={Compass} title="The Strategic Read" />
        <div className={`${card} p-7 md:p-9`}>
          <p className={`${muted} leading-relaxed`}>
            Xbox is retreating to AAA blockbusters and admitting it can't be the home for indie-scale
            creativity. The studios it's spinning off are the exact kind of talented, mid-sized teams
            that make interesting games. The lane is now clear:
          </p>
          <ul className="mt-4 space-y-2">
            {[
              "Xbox won't fund the weird stuff anymore → that's your audience",
              "Xbox talks “open development tools” but hasn't built them → that's your product",
              "Double Fine, Compulsion, Ninja Theory are now independent → those are your partners",
              "The indie devs who'd have gone to Game Pass for funding now have nowhere to go → that's your community",
            ].map((li) => <li key={li} className={`text-sm ${ink}`}>{li}</li>)}
          </ul>
          <p className={`mt-5 font-['Syne'] font-semibold ${indigo}`}>
            The timing is almost perfect. Xbox just created a massive vacuum in the indie ecosystem.
          </p>
        </div>
      </section>

      {/* Related intelligence briefs (freeintelligence.ai) */}
      <RelatedBriefs />

      <ResearchFooter
        label="Trend Brief · Issue #1 · July 2026 · Xbox Reset"
        links={[MINY_PLAY_LINK]}
        note="Source: public memo from Xbox CEO Asha Sharma (July 6, 2026) and the live X thread. Editorial synthesis is anygame.dev's own; figures are as stated in the memo."
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
      note: "AI coding agents in software engineering — directly relevant to the indie devs Xbox just orphaned who now need to ship faster with smaller teams.",
      href: "https://freeintelligence.ai/fable-pulse/",
    },
    {
      tag: "AI · Frontier models",
      title: "/whathappened: Fable 5",
      note: "Anthropic's Mythos-class model and the access fight — relevant to which AI tools indie devs can actually afford to build on.",
      href: "https://freeintelligence.ai/fable-5/",
    },
    {
      tag: "Hardware · GPU pricing",
      title: "GPU Pricing Comparison",
      note: "Live GPU pricing — the dev-hardware layer for the indie studios now operating without Xbox's infrastructure.",
      href: "https://freeintelligence.ai/gpu-pricing/",
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
        that overlap with what orphaned-indie devs actually care about.
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
