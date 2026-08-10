// ============================================================
// PAGE: /julytrends — July 2026 Gaming Trend Brief
// Design: Editorial Intelligence — LIGHT THEME (matches Home/JuneTech)
// Fully self-hosted — no external here.now dependency.
// ============================================================

import { Zap, Quote as QuoteIcon, TrendingUp, Gamepad2 } from "lucide-react";
import { MINY_PLAY_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

// ── Data ──────────────────────────────────────────────────────
const CARBON_STATS = [
  { num: "23+", label: "years in production at EVE" },
  { num: "24+", label: "Carbon modules open-sourced" },
  { num: "8,825", label: "players in record battle" },
  { num: "MIT", label: "license (most modules)" },
];

const STS2_STATS = [
  { num: "3M+", label: "copies in first week" },
  { num: "~$108M", label: "first-month revenue" },
  { num: "574k", label: "peak concurrent on Steam" },
  { num: "2", label: "core developers" },
];

const GODOT_47 = [
  { tag: "Rendering", title: "HDR output", note: "Windows, macOS, iOS, visionOS, Linux/Wayland. Internal HDR finally reaches the panel." },
  { tag: "3D", title: "AreaLight3D", note: "Real-time rectangular area lights. No more emissive + GI hacks for soft shadows." },
  { tag: "Mobile", title: "VirtualJoystick + GABE", note: "Built-in touch joystick node. Android Build Environment goes stable — export APKs on-device." },
  { tag: "Ecosystem", title: "Asset Store", note: "Replaces AssetLib. Ratings, threaded background loading, zoomable previews." },
  { tag: "XR", title: "Android XR + Steam Frame", note: "Day-one production-ready support — Godot's XR story keeps widening." },
  { tag: "Foundation", title: "Vulkan RT plumbing", note: "Low-level hooks for acceleration structures. No usable RT feature yet, but the foundation is in." },
];

const INDIE_RELEASES = [
  { date: "Jul 1", name: "Cat Squeeze", note: "Puzzle cat-through-pipes. \"Unhinged concept, oddly cosy.\" Demo available." },
  { date: "Jul 7", name: "Moonlight Peaks", note: "Cozy life sim with a vampire twist. Farm, brew, cast spells undead." },
  { date: "Jul 15", name: "The Mound: Omen of Cthulhu", note: "4-player co-op FPS, Lovecraftian dread in a cursed jungle. PC/PS5/Xbox." },
  { date: "Jul 16", name: "Fogpiercer", note: "Roguelite deckbuilder. \"Snowpiercer meets FTL.\" Out now on Steam/GOG/PC Game Pass. $19.99." },
  { date: "Jul 17", name: "Desktop Explorer", note: "Nostalgic horror mystery inside a fake 1990s OS. $16.19 launch discount." },
  { date: "Jul 20", name: "Ritter & Rotwein", note: "2D physics ragdoll knight. Drink wine to heal — which wrecks your physics. Demo 89% positive." },
  { date: "Jul 21", name: "Scarlet Deer Inn", note: "Every character frame physically embroidered. Dark Slavic folk tale platformer." },
  { date: "Jul 23", name: "Gurei", note: "Boss-rush platformer, Japanese mythology. Ink-wash art, dynamic difficulty scaling." },
  { date: "Jul 23", name: "Dinoblade", note: "Dinosaurs + souls-like + action RPG combat. One of the louder July launches." },
  { date: "Jul 27", name: "Forsaken Realms of Varen's Call", note: "Classless action RPG. Blend pyromancy with shield bashes. Voice-acted companions." },
  { date: "Jul 29", name: "Mistfall Hunter", note: "Dark-fantasy extraction ARPG. Souls-like meets extraction shooter. PC + consoles." },
  { date: "Jul 30", name: "Kusan: City of Wolves", note: "Kinetic action brawler, urban jungle. Cross-platform launch." },
  { date: "Jul 31", name: "Corsair Cove", note: "Vertical city-builder in the golden age of piracy. Cliff-hanging pirate havens." },
];

const QUOTES = [
  {
    body: "Carbon was built for a very specific purpose: to support living virtual worlds that can endure for decades. It has carried EVE Online through more than 20 years of continuous operation… Open sourcing Carbon is about making that foundation visible, understandable, and useful to others.",
    who: "Ben Hunter",
    role: "Senior Development Director, Core Technology, Fenris Creations",
    src: "fenris.com · GamesIndustry.biz · PC Gamer",
  },
  {
    body: "Before going indie, I was a professional technical artist specialised in Unity for close to a decade… the limitations became apparent. Alongside juggling multiple versions between LTS, the various pipeline packages and third party plugins, it was an absolute nightmare… Unity is a bit of a black box. That sunken cost fallacy was exactly why I was still dependent on software from companies I am so ideologically opposed to.",
    who: "Daan Last",
    role: "Indie dev, Bibidi Bibidi (Godot)",
    src: "gdindies.com interview",
  },
  {
    body: "The studio chose Godot to keep their production process simple and modern. This contrasts with larger, more resource-heavy engines often used by major studios for AAA strategy titles. By leveraging a lighter engine, developers like Żywiczyński — who previously worked on Ori and the Will of the Wisps and Frostpunk — can focus on unique rule sets rather than technical overhead.",
    who: "Błażej Żywiczyński",
    role: "CEO & co-founder, Fairy Mount Games (Flame, Forest & Flood)",
    src: "newsy-today.com",
  },
  {
    body: "If you left Unity for Godot or Unreal in 2023-2024, should you come back? Honest answer: probably not for an in-progress project. Migration cost is high and the marginal benefit is small. For a new project starting in 2026, Unity is a defensible choice again, especially for mobile, XR, or visionOS targets. The engine wars of 2023-2024 are over. Pick the right tool, ship the game.",
    who: "Oceanview Games",
    role: "Unity-specialist contract studio (12y dev, ex-Jagex)",
    src: "DEV Community, July 5 2026",
  },
  {
    body: "We definitely have workflows which speed up our development, things like agents that are able to do bug fixing whilst we sleep… What we won't do is have character art in the game that is AI-generated. Concepting 3D models, world building — all that type of stuff is very much with a specialist, and that's our stance on it.",
    who: "Simon Lockerby",
    role: "Co-founder, Fateless (Godforge — 100k beta players May 2026; ex-Riot/Epic/Amazon)",
    src: "Pocket Tactics interview, July 12 2026",
  },
];

const REPOS = [
  { rank: 1, name: "godotengine/godot", stars: "~114k", lang: "C++", note: "2D+3D MIT engine — the open-source leader" },
  { rank: 2, name: "pixijs/pixijs", stars: "~49k", lang: "JS", note: "2D WebGL renderer" },
  { rank: 3, name: "bevyengine/bevy", stars: "~47k", lang: "Rust", note: "Modern ECS, data-driven, WebGPU-friendly" },
  { rank: 4, name: "phaserjs/phaser", stars: "~40k", lang: "JS", note: "2D HTML5 game framework" },
  { rank: 5, name: "raysan5/raylib", stars: "~30k", lang: "C", note: "Lightweight, code-first, beloved by purists" },
  { rank: 6, name: "BabylonJS/Babylon.js", stars: "~26k", lang: "JS/TS", note: "3D web engine, Microsoft-backed" },
  { rank: 7, name: "libgdx/libgdx", stars: "~25k", lang: "Java", note: "Cross-platform veteran" },
  { rank: 8, name: "4ian/GDevelop", stars: "~24k", lang: "JS/C++", note: "No-code / low-code engine" },
  { rank: 9, name: "cocos2d/cocos2d-x", stars: "~19k", lang: "C++", note: "Legacy 2D (use Cocos Creator / COCOS 4)" },
  { rank: 10, name: "kitao/pyxel", stars: "~17k", lang: "Python", note: "Retro pixel-art engine" },
  { rank: 11, name: "playcanvas/engine", stars: "~16k", lang: "JS", note: "Web game engine with cloud editor" },
  { rank: 12, name: "MonoGame/MonoGame", stars: "~14k", lang: "C#", note: "XNA successor (Stardew, Celeste, Carrion)" },
  { rank: 13, name: "hajimehoshi/ebiten", stars: "~13k", lang: "Go", note: "Simple 2D for Go" },
  { rank: 14, name: "o3de/o3de", stars: "~9k", lang: "C++", note: "Open-source CryEngine descendant (LF-hosted)" },
  { rank: 15, name: "FlaxEngine/FlaxEngine", stars: "~7k", lang: "C++/C#", note: "HN \"underrated\" Unity-alt, fast startup" },
  { rank: 16, name: "defold/defold", stars: "~6k", lang: "C++", note: "Lightweight, free, Switch/PlayStation support" },
  { rank: 17, name: "carbonengine (NEW)", stars: "just released", lang: "C++/Python", note: "Fenris/EVE Online engine — open-sourced July 1, 2026" },
];

const PILLARS = [
  { tag: "Engine", title: "If 2D-first → Godot", note: "Faster iteration, cleaner licensing, purpose-built 2D pipeline. — Oceanview Games" },
  { tag: "Engine", title: "If mobile/F2P → Unity", note: "Mature monetisation, deep contractor pool, deep asset ecosystem. Licensing back to pre-2023. — Oceanview Games" },
  { tag: "Engine", title: "If AAA visuals → Unreal", note: "Only if visual fidelity is the marketing hook and C++ depth exists. Free MetaHumans, Lumen. — Oceanview Games" },
  { tag: "Process", title: "Don't switch mid-project", note: "Migration cost is high, marginal benefit is small. Pick the right tool, ship the game. — Oceanview Games" },
  { tag: "AI", title: "Use AI for grind, not art", note: "No AI character art in-game. Concepting and world-building stay with specialists. — Simon Lockerby, Fateless" },
  { tag: "AI", title: "Build the workflow, don't buy it", note: "The winning pattern is a tailored pipeline composing multiple MCP tools across the full game-dev lifecycle. — Vindler" },
  { tag: "Market", title: "Genre matters more than engine", note: "July's deckbuilder wave (Fogpiercer, Raccoons to Riches, StS2's long tail) shows genre-timing compounds." },
  { tag: "Market", title: "Median Steam indie = $4k lifetime", note: "Top 1% capture 90% of revenue. Scope accordingly — AI compresses timelines but doesn't fix bad genres." },
];

// ── Design tokens (match JuneTech) ─────────────────────────────
const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";
const accentBg = "bg-[oklch(0.48_0.22_275)]";
const softBg = "bg-[oklch(0.97_0.01_275)]";

export default function JulyTrends() {
  useSeo({
    title: "Gaming Trend Brief — July 2026 · anygame.dev",
    description:
      "anygame.dev's July 2026 Gaming Trend Brief: Carbon engine open-sourced, Godot 4.7 ships, Slay the Spire 2's $108M Godot month, 13 indie releases, and what indie devs and studio CEOs are actually saying — grounded in real quotes.",
    path: "/julytrends",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Trend Brief" />

      {/* Hero */}
      <header className="container pt-20 pb-12 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Issue #1 · July 2026 · Gaming · Engines, Indie Releases, Studio Voices
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          What's Trending in Gaming
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          A monthly read on the engines, releases, and studio moves shaping game development. This month:
          <strong className={ink}> EVE Online's Carbon engine goes open source</strong>,{" "}
          <strong className={ink}>Godot 4.7 ships HDR and a built-in mobile joystick</strong>, and{" "}
          <strong className={ink}>Slay the Spire 2's $108M Godot month</strong> rewrites the commercial-engine ceiling.
          All grounded in real quotes from named devs and studio CEOs.
        </p>
      </header>

      {/* The Call */}
      <section className="container max-w-[820px] py-10">
        <div className={`rounded-2xl border-l-[3px] ${accentBg} bg-[oklch(1_0_0)] p-7 md:p-9 ${border} border-y border-r`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>The Call</p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            The engine wars of 2023–2024 are over. Godot for 2D, Unity for mobile, Unreal for fidelity,
            Carbon for research. AI is a force multiplier, not a replacement — and Godot's text-first
            architecture is quietly winning the AI-workflow battle.
          </p>
        </div>
      </section>

      {/* 01. Carbon */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>01</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Carbon Goes Open Source</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          On July 1, 2026, Fenris Creations (formerly CCP Games) completed the full open-source release
          of Carbon — the engine behind <strong className={ink}>EVE Online</strong> for 23 years and the
          in-development survival MMO <strong className={ink}>EVE Frontier</strong>. Twenty-plus modules
          landed on GitHub under the MIT license, including Destiny (the physics/pathfinding stack behind
          EVE's 8,825-player world-record battle) and Trinity (the rendering core).
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {CARBON_STATS.map(s => (
            <div key={s.label} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 text-center`}>
              <div className={`font-['JetBrains_Mono'] text-2xl font-bold ${indigo}`}>{s.num}</div>
              <div className={`mt-1 text-xs ${muted}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <Quote
          body={QUOTES[0].body}
          who={QUOTES[0].who}
          role={QUOTES[0].role}
          src={QUOTES[0].src}
        />
        <ul className={`mt-6 space-y-3 text-sm ${muted}`}>
          <li>• <strong className={ink}>Rare in 2026.</strong> Even CD Projekt abandoned Red Engine for Unreal. Fenris is swimming against the current.</li>
          <li>• <strong className={ink}>Purpose-built for persistence.</strong> Carbon wasn't built to license — it was built to run a single-shard universe for 23 years. A research artifact for anyone studying large-scale online worlds.</li>
          <li>• <strong className={ink}>Not a Unity/Godot competitor.</strong> Fenris' own FPS Vanguard is built in Unreal — Carbon is a specialist tool.</li>
        </ul>
      </section>

      {/* 02. Engine Wars */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>02</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Engine Wars: Where Indies Landed</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          Three years after Unity's September 2023 Runtime Fee fiasco, the dust has settled — but not
          back to the old shape. Unity cancelled the fee in September 2024 under new CEO Matt Bromberg;
          Godot used the window to grow; and indies now have a real choice for the first time in a decade.
        </p>

        <Quote body={QUOTES[1].body} who={QUOTES[1].who} role={QUOTES[1].role} src={QUOTES[1].src} />
        <Quote body={QUOTES[2].body} who={QUOTES[2].who} role={QUOTES[2].role} src={QUOTES[2].src} />
        <Quote body={QUOTES[3].body} who={QUOTES[3].who} role={QUOTES[3].role} src={QUOTES[3].src} />

        <h3 className={`mt-10 mb-4 font-['Syne'] font-semibold text-xl ${ink}`}>Godot 4.7 release (June 18, 2026)</h3>
        <p className={`mb-6 text-sm ${muted}`}>The "Director's Cut" shipped with real shipping features, not just editor polish:</p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GODOT_47.map(g => (
            <div key={g.title} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 hover:border-[oklch(0.48_0.22_275)] transition-colors`}>
              <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>{g.tag}</div>
              <h4 className={`font-['Syne'] font-semibold ${ink} mb-2`}>{g.title}</h4>
              <p className={`text-sm ${muted} leading-relaxed`}>{g.note}</p>
            </div>
          ))}
        </div>
        <p className={`mt-4 text-xs ${muted}`}>
          Sources: godotengine.org/releases/4.7 · GitHub release · 80.lv · Digital Production
        </p>
      </section>

      {/* 03. July Indie Releases */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <Gamepad2 className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>July 2026 Indie Releases</h2>
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>13 launches worth watching</span>
        </div>
        <p className={`mb-8 leading-relaxed ${muted} max-w-2xl`}>
          A surprisingly strong month after a quiet June. Notable launches across deckbuilders,
          souls-likes, cosy life sims, and physics ragdoll experiments.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {INDIE_RELEASES.map(r => (
            <div key={r.name} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5`}>
              <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>{r.date}</div>
              <h4 className={`font-['Syne'] font-semibold ${ink} mb-2`}>{r.name}</h4>
              <p className={`text-sm ${muted} leading-relaxed`}>{r.note}</p>
            </div>
          ))}
        </div>
        <div className={`mt-8 rounded-2xl ${softBg} p-7`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-2`}>Genre pulse</p>
          <p className={`text-base ${ink} leading-relaxed`}>
            <strong>Deckbuilder month.</strong> Fogpiercer, Raccoons to Riches, and the ongoing Slay the Spire 2
            wave pull the same audience. Souls-likes remain oversaturated but still shipping. Cosy expands
            into adjacent genres (vampire farming, pirate city-building).
          </p>
        </div>
      </section>

      {/* 04. Slay the Spire 2 */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>04</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Slay the Spire 2's $108M Godot Month</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          The single most cited data point in July 2026 indie discourse: Mega Crit's Godot rebuild of
          Slay the Spire 2 sold <strong className={ink}>over 3 million copies in its first week</strong> after
          launching into Steam Early Access on March 5, 2026 — and earned roughly{" "}
          <strong className={ink}>$108M in its first month</strong>. Built by a two-person core team that
          walked away from two years of Unity work after the 2023 Runtime Fee.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {STS2_STATS.map(s => (
            <div key={s.label} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 text-center`}>
              <div className={`font-['JetBrains_Mono'] text-2xl font-bold ${indigo}`}>{s.num}</div>
              <div className={`mt-1 text-xs ${muted}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          The story is now the canonical "Godot is commercial-grade" proof point. Multiple July 2026 blog
          posts cite it as the moment the "Godot is hobbyist only" narrative died. Before StS2, the ceiling
          for a Godot commercial game was roughly Buckshot Roulette ($6.9M) or Dome Keeper ($6.1M).{" "}
          <strong className={ink}>$108M in 30 days ended that argument.</strong>
        </p>

        {/* Steam Next Fest table */}
        <div className={`mt-8 rounded-xl border ${border} bg-[oklch(1_0_0)] overflow-hidden`}>
          <div className={`px-5 py-3 ${border} border-b font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${muted}`}>
            Steam Next Fest · February 2026 · engine share
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className={`${border} border-b`}>
                <th className={`text-left px-5 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Engine</th>
                <th className={`text-left px-5 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Demos</th>
                <th className={`text-left px-5 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>YoY</th>
                <th className={`text-left px-5 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Read</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`${border} border-b`}>
                <td className={`px-5 py-3 ${ink}`}>Unity</td>
                <td className={`px-5 py-3 ${ink}`}>52%</td>
                <td className={`px-5 py-3 ${muted}`}>down from 58%</td>
                <td className={`px-5 py-3 ${muted}`}>Still dominant, shrinking</td>
              </tr>
              <tr className={`${border} border-b`}>
                <td className={`px-5 py-3 ${indigo} font-semibold`}>Godot</td>
                <td className={`px-5 py-3 ${indigo} font-semibold`}>9%</td>
                <td className={`px-5 py-3 ${indigo} font-semibold`}>up from ~6%</td>
                <td className={`px-5 py-3 ${indigo} font-semibold`}>Directional trend obvious</td>
              </tr>
              <tr className={`${border} border-b`}>
                <td className={`px-5 py-3 ${ink}`}>Unreal</td>
                <td className={`px-5 py-3 ${ink}`}>~30%</td>
                <td className={`px-5 py-3 ${muted}`}>stable</td>
                <td className={`px-5 py-3 ${muted}`}>Owns 3D/fidelity niche</td>
              </tr>
              <tr>
                <td className={`px-5 py-3 ${ink}`}>Other (GM, Defold, Bevy, custom)</td>
                <td className={`px-5 py-3 ${ink}`}>~9%</td>
                <td className={`px-5 py-3 ${muted}`}>mixed</td>
                <td className={`px-5 py-3 ${muted}`}>Specialist plays</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className={`mt-3 text-xs ${muted}`}>Source: Indie Hackers, April 2026 · figures from Steam Next Fest Feb 2026</p>
      </section>

      {/* 05. AI */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>05</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>AI in Game Dev: The 2026 Reality</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          The AI-in-gamedev conversation has moved from "will it take my job?" to "which stack do I
          actually pay for, and where does it still stall?" July 2026 coverage is unusually concrete.
        </p>
        <Quote body={QUOTES[4].body} who={QUOTES[4].who} role={QUOTES[4].role} src={QUOTES[4].src} />
        <p className={`mt-6 leading-relaxed ${muted}`}>
          <strong className={ink}>Where AI ships now:</strong> code agents, image gen, sprite-sheet gen,
          image-to-3D, auto-rig, music gen, SFX gen, voice gen, BG removal.{" "}
          <strong className={ink}>Still human-led:</strong> game-systems design, playtesting, collision
          tuning, publishing strategy, balance iteration, live-ops design.
        </p>
        <p className={`mt-4 leading-relaxed ${muted}`}>
          The structural argument gaining ground: Godot's text-first architecture ({" "}
          <code className={`text-xs px-1.5 py-0.5 rounded ${softBg}`}>.tscn</code> scenes are human-readable,
          GDScript is Python-like and LLM-fluent) makes it structurally easier for AI agents to work with
          than Unity's binary YAML + <code className={`text-xs px-1.5 py-0.5 rounded ${softBg}`}>.meta</code>{" "}
          format. Godot is reportedly drowning in "AI slop" PRs — a problem you only have when AI can
          actually work with your codebase.
        </p>
      </section>

      {/* 06. Top Repos */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Top Open-Source Game Repos</h2>
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>GitHub · July 2026 · by stars</span>
        </div>
        <div className={`rounded-xl border ${border} bg-[oklch(1_0_0)] overflow-hidden overflow-x-auto`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`${border} border-b`}>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>#</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Repo</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Stars</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Lang</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>What it is</th>
              </tr>
            </thead>
            <tbody>
              {REPOS.map(r => {
                const isNew = r.name.includes("NEW");
                const isWinner = r.rank === 1;
                return (
                  <tr key={r.name} className={`${border} border-b hover:bg-[oklch(0.97_0.01_275)] transition-colors`}>
                    <td className={`px-4 py-3 font-['JetBrains_Mono'] ${muted}`}>{r.rank}</td>
                    <td className={`px-4 py-3 ${isWinner || isNew ? `${indigo} font-semibold` : ink}`}>{r.name}</td>
                    <td className={`px-4 py-3 font-['JetBrains_Mono'] ${ink}`}>{r.stars}</td>
                    <td className={`px-4 py-3 ${muted}`}>{r.lang}</td>
                    <td className={`px-4 py-3 ${muted}`}>{r.note}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className={`mt-3 text-xs ${muted}`}>
          Sources: OSSInsight · Refolk · bobeff/open-source-engines · GitHub repo pages
        </p>
      </section>

      {/* 07. Recommendations */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <Zap className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Recommendations from Devs, for Devs</h2>
        </div>
        <p className={`mb-8 leading-relaxed ${muted} max-w-2xl`}>
          Compiled from the public statements above — what working indie devs and studio CEOs are telling
          other devs right now.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map(p => (
            <div key={p.title} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5`}>
              <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>{p.tag}</div>
              <h4 className={`font-['Syne'] font-semibold ${ink} mb-2`}>{p.title}</h4>
              <p className={`text-sm ${muted} leading-relaxed`}>{p.note}</p>
            </div>
          ))}
        </div>

        {/* One-line summary */}
        <div className={`mt-10 rounded-2xl border-t-[3px] ${accentBg} ${softBg} p-7 md:p-9`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>One-line July 2026 summary</p>
          <p className={`text-lg font-['Syne'] font-semibold leading-snug ${ink}`}>
            <strong>Engine:</strong> Godot for 2D, Unity for mobile, Unreal for fidelity, Carbon for
            research. <strong>AI:</strong> force multiplier, not replacement — Godot's text-first
            architecture is quietly winning the AI-workflow battle. <strong>Market:</strong> deckbuilders
            and souls-likes are hot; cosiness is expanding genres; median indie revenues are brutal, so
            scope and genre-timing matter more than engine choice.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="container max-w-[820px] py-14">
        <p className={`text-xs leading-relaxed ${muted}`}>
          Methodology: quotes sourced from public statements by named developers and studio CEOs
          (interviews, blog posts, press releases, Twitter/X, GDC talks). All sources cited inline
          with each quote. No quotes were fabricated; where a source could not be verified, it was
          excluded. Compiled July 18, 2026 from public sources.
        </p>
      </section>

      {/* Related intelligence briefs (freeintelligence.ai) */}
      <RelatedBriefs />

      <ResearchFooter
        label="Gaming Trend Brief · Issue #1 · July 2026"
        links={[MINY_PLAY_LINK]}
      />
    </div>
  );
}

// ── Related intelligence briefs (footer of gaming articles) ────
// Connects anygame.dev gaming briefs to the relevant freeintelligence.ai
// briefs without surfacing gaming on the FI main page. Reciprocal link:
// freeintelligence.ai/miny-play links back here.
function RelatedBriefs() {
  const briefs = [
    {
      tag: "AI · Coding agents",
      title: "The Coding Agent Reckoning",
      note: "30 days of dev discourse on what AI coding agents are doing to software engineering. Directly relevant to the Godot-is-AI-friendly structural argument in this brief.",
      href: "https://freeintelligence.ai/fable-pulse/",
    },
    {
      tag: "Hardware · GPU pricing",
      title: "GPU Pricing Comparison",
      note: "Live GPU pricing — the hardware layer under every indie dev's build box. Relevant to the engine-economics question (Unreal assumes a powerful PC).",
      href: "https://freeintelligence.ai/gpu-pricing/",
    },
    {
      tag: "Hardware · Local AI",
      title: "The Final Local-AI Box",
      note: "On-device AI hardware for builders — relevant to the AI-in-game-dev stack economics section (running code agents locally vs. in the cloud).",
      href: "https://freeintelligence.ai/local-ai-box/",
    },
    {
      tag: "Hub · Read → Play → Own",
      title: "MINY Play",
      note: "The VE Lab hub that connects Free Intelligence briefs, AnyGame's games thesis, and the live Music Mogul A&R game. The anygame.dev card lives here.",
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
            <h4 className={`font-['Syne'] font-semibold ${ink} mb-2 group-hover:${indigo} transition-colors`}>
              {b.title}
            </h4>
            <p className={`text-sm ${muted} leading-relaxed`}>{b.note}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

// ── Quote component ────────────────────────────────────────────
function Quote({ body, who, role, src }: { body: string; who: string; role: string; src: string }) {
  return (
    <figure className={`relative my-6 rounded-r-xl rounded-l-sm border-l-[3px] ${accentBg} bg-[oklch(1_0_0)] border-y border-r ${border} p-6 md:p-7`}>
      <QuoteIcon className={`absolute -top-2 left-4 w-7 h-7 ${indigo} opacity-25`} />
      <blockquote className={`font-['Inter'] italic text-[oklch(0.18_0.02_270)] leading-relaxed mb-4`}>
        {body}
      </blockquote>
      <figcaption>
        <div className={`font-['JetBrains_Mono'] text-sm font-semibold ${indigo}`}>{who}</div>
        <div className={`font-['Inter'] text-sm ${muted}`}>{role}</div>
        <div className={`font-['JetBrains_Mono'] text-[11px] ${muted} mt-1`}>Source: {src}</div>
      </figcaption>
    </figure>
  );
}
