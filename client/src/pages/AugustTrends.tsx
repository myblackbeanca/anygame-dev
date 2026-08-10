// ============================================================
// PAGE: /augusttrends — August 2026 Gaming Trend Brief (Issue #2)
// Design: Editorial Intelligence — LIGHT THEME (matches Home/JulyTrends)
// Fully self-hosted — no external here.now dependency.
// Source: docs/plans/data/game.txt (48 game-related X bookmarks)
// + bird thread dumps in /tmp/anygame-bm/ (influencer replies)
// ============================================================

import { Zap, Quote as QuoteIcon, TrendingUp, Gamepad2 } from "lucide-react";
import { ARCHIVE_LINK, MINY_PLAY_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";
import { MoreDeepDives } from "@/components/sections";

// ── Data ──────────────────────────────────────────────────────
const THREEJS_STATS = [
  { num: "17+", label: "Three.js bookmarks in the set" },
  { num: "5", label: "open-source skill suites shipped" },
  { num: "0", label: "mentions of Babylon/PlayCanvas as AI target" },
];

const PIPELINE_STATS = [
  { num: "<5min", label: "T-pose → rigged 3D model" },
  { num: "3", label: "image-to-3D paths (Hunyuan, Tripo, Meshy)" },
  { num: "28.6MB", label: "from 900MB (thebuggeddev, on-demand)" },
];

const GAUNTLET_STATS = [
  { num: "~$10", label: "LoTR Three.js render cost (1M tokens)" },
  { num: "5500", label: "lines of code Opus 5 wrote" },
  { num: "~2h", label: "Opus 5 runtime" },
  { num: "3.8M", label: "views on Shumer's single-prompt game" },
];

const SKILL_SUITES = [
  { tag: "Grok Build · core", title: "game-asset-core", note: "Engine-ready defaults you never have to ask for: isolated subjects, flat keyable backgrounds, seamless tiles, no text on UI, edit-chaining the same character instead of regenerating a cousin." },
  { tag: "Grok Build · animation", title: "game-animation-frames", note: "Video-first: base sprite → image_to_video → harvest frames → flip-test the loop. Video understands gait, arcs, cloth, fire. Still-image pose guessing is the fallback." },
  { tag: "Grok Build · characters", title: "game-character-consistency", note: "Identity-locked across turnarounds, damage states, palette swaps, and equipment. One base. Everything else is an edit with a freeze-list." },
  { tag: "MengTo · Three.js", title: "Three.js game-dev skills", note: "Isometric action RPG with camera controls, VFX, audio, monster assets, combat systems. Open-sourced July 25." },
  { tag: "scottstts · graphics", title: "Awesome Graphics Agent Skills", note: "F1 race car, motorcycle, hologram VFX, undersea effect. v0.5.0 — npx install for Codex." },
];

const ENGINE_TABLE = [
  { rank: 1, name: "godotengine/godot", stars: "111k (Jun 2026)", lang: "C++", note: "MIT — the assumption that died in Buenos Aires" },
  { rank: 2, name: "Unreal Engine + MCP", stars: "new (Jun 2026)", lang: "C++/MCP", note: "Build entire games by talking to Claude" },
  { rank: 3, name: "s&box/Box3D", stars: "new (Jul 2026)", lang: "C++", note: "3D physics engine open-sourced — Erin Catto" },
  { rank: 4, name: "KAPLAY.js", stars: "new (Jun 2026)", lang: "JS/TS", note: "2D component-based, 90+ examples, web playground" },
];

const VIBE_CARDS = [
  {
    who: "dvassallo (Jun 17)",
    body: "Single Go binary turns one Hetzner box into a push-to-deploy host for many apps. Born from kids vibecoding Cursor games; FULL SEND hit 38,000+ players at Vibe Jam 2026. Zero-downtime, Cloudflare tunnels, SQLite backups.",
  },
  {
    who: "mattshumer_ (Jul 27)",
    body: "3.8M-view game Claude built from a single prompt, driven by the \"Gauntlet Loop\" technique. Works for far more than games — gill_works confirmed with a 30-hour Battlefield clone.",
  },
];

const MARKET_BLOCKS = [
  {
    tag: "Xbox reset",
    body: "ASHA's July 6 email: 3,200 reductions FY27, four studios leaving (Compulsion, Double Fine, Ninja Theory, Undead Labs), \"lost 64 cents for every dollar invested,\" \"most severe hardware crisis in the industry's history.\" Mojang + King now report to CEO. The \"billion players\" line is the aspiration, not the reset's frame.",
  },
  {
    tag: "Cloud gaming economics",
    body: "Home console/PC is idle 90%+ of the day; datacenters target 5–10% idle. Cost-per-effective-FLOP-hour favors a $50k datacenter GPU over a $500 consumer GPU because utilization compounds. lauriewired: \"I think it's going to be the default soon.\"",
  },
  {
    tag: "Gameplay dataset",
    body: "DevvMandal + @markov__ai open-sourced 500+ hours of gameplay screen recordings + keystrokes/mouse across Valorant, Minecraft, GTA. The largest open-source gaming dataset for computer-use.",
  },
];

const TAKEAWAYS = [
  {
    icon: "🎮",
    title: "Games to play",
    items: [
      { name: "Drive anywhere in the world", note: "DVLPLONDON — live, OSM + satellite, multiplayer races" },
      { name: "Isometric ARPG demo", note: "MengTo — open-source, playable" },
      { name: "3D human anatomy", note: "thebuggeddev — interactive 3D, not a game per se" },
      { name: "LoTR Three.js world", note: "Karpathy — the demo video, not a standalone game" },
    ],
  },
  {
    icon: "🛠",
    title: "Games to build",
    items: [
      { name: "Grok Build 5-skill suite", note: "tetsuoai — shipped (core, animation, character, tilesets, UI)" },
      { name: "img2threejs", note: "NickDevFE — shipped, v1.3 (one photo → procedural Three.js)" },
      { name: "metatransformr framework", note: "announced, not yet released — engine-independent" },
      { name: "dvassallo push-to-deploy", note: "shipped, open source (single Hetzner binary)" },
      { name: "Unreal MCP server", note: "per_simmons_ — shipped (talk to Claude, build a city)" },
    ],
  },
  {
    icon: "📡",
    title: "Leet insights to subscribe to",
    items: [
      { name: "@karpathy", note: "ephemeral GTA of X thesis" },
      { name: "@tetsuoai", note: "Grok Imagine + game-asset skills (deepest craft)" },
      { name: "@MengTo", note: "Three.js game-dev skills + open-source drops" },
      { name: "@metatransformr", note: "engine-independent AI game-dev framework" },
      { name: "@mattshumer_", note: "the Gauntlet Loop technique" },
      { name: "@thebuggeddev", note: "vibe-coded 3D builds with full process notes" },
      { name: "@NickDevFE", note: "img2threejs releases" },
      { name: "@asha_shar", note: "Xbox internals (industry reset signal)" },
      { name: "@DevvMandal + @markov__ai", note: "gameplay datasets for computer-use" },
    ],
  },
];

const QUOTES = [
  {
    body: "every new model, same ritual: build {something cool} in @threejs. that's my whole benchmark",
    who: "Majid Manzarpour",
    role: "Indie builder",
    src: "x.com/majidmanzarpour, May 28 2026",
  },
  {
    body: "Three.js can do everything now. VFX and audio sync handled in browser.",
    who: "Matt Greenberg",
    role: "Engineer, McGreenBeats",
    src: "x.com/McGreenBeats, May 6 2026",
  },
  {
    body: "Have fun! I'm going to go learn C in a remote cabin in the woods, so long and thanks for all the fish!",
    who: "Ryan Fitzpatrick",
    role: "Indie dev (rfitzpatrick_io)",
    src: "x.com/rfitzpatrick_io, Jul 23 2026",
  },
  {
    body: "You ask for a knight walk cycle. You get a looping frame sequence on a keyable background.",
    who: "tetsuo",
    role: "Grok Imagine craft, tetsuoai",
    src: "x.com/tetsuoai, Jul 18 2026",
  },
  {
    body: "It looked so real, folks were convinced it was fake. It's real, driven by a technique I'm calling the Gauntlet Loop.",
    who: "Matt Shumer",
    role: "AI researcher, mattshumer_",
    src: "x.com/mattshumer_, Jul 27 2026",
  },
  {
    body: "Something like an ephemeral GTA of X on demand.",
    who: "Andrej Karpathy",
    role: "On Opus 5 + 1M tokens rendering LoTR in Three.js",
    src: "x.com/karpathy, Aug 2 2026",
  },
  {
    body: "you'll get mad at me for saying this…but cloud gaming is so obviously more economically efficient than physical hardware I think it's going to be the default soon.",
    who: "LaurieWired",
    role: "Reverse engineer",
    src: "x.com/lauriewired, Jun 27 2026",
  },
  {
    body: "History is full of companies that mistake longevity for inevitability. We will not be one of them.",
    who: "ASHA",
    role: "Xbox, internal restructure email",
    src: "x.com/asha_shar, Jul 6 2026",
  },
];

// Conversation callouts (verbatim from bird thread dumps)
const CONVERSATIONS = [
  {
    section: "02",
    who: "DilumSanjaya → thebuggeddev",
    body: "Looks amazing! I started making those science demos hoping more people would build science related apps with AI, so it's really nice to see demos like yours",
    src: "x.com/DilumSanjaya, Aug 2 2026 (in-thread reply)",
  },
  {
    section: "03",
    who: "signerless → tetsuoai",
    body: "this could cut weeks of work and thousands in costs from indie game production",
    src: "x.com/signerless, Jul 18 2026",
  },
  {
    section: "03",
    who: "bygregorr → tetsuoai",
    body: "Character consistency is the piece that makes or breaks the suite. The gap is frame metadata. Pivot points and hitbox bounds don't live in the PNG, so engine integration stays manual.",
    src: "x.com/bygregorr, Jul 18 2026",
  },
  {
    section: "03",
    who: "coscosmico → tetsuoai",
    body: "Identity-locked characters plus engine-ready defaults is the difference between a demo sprite and something you can actually drop in a pipeline. Freeze-list edit chaining beats regenerating cousins.",
    src: "x.com/coscosmico, Jul 25 2026",
  },
  {
    section: "05",
    who: "gill_works → mattshumer_",
    body: "Can confirm this actually works — ran Claude Opus 5 for 30+ hours on a Battlefield clone. Everything you see & hear is 100% procedurally generated.",
    src: "x.com/gill_works, Jul 28 2026",
  },
  {
    section: "05",
    who: "staskulesh → mattshumer_",
    body: "It works with AA and A games too. I asked Claude to re-write your prompt for a tower defense game. And it worked.",
    src: "x.com/staskulesh, Jul 27 2026",
  },
  {
    section: "05",
    who: "marco_rotili → mattshumer_ (the pushback)",
    body: "The problem with this is the bar. If you have a bar, it means there is already something out there to copy. But most of us want to craft something new. So we can't really set a bar.",
    src: "x.com/marco_rotili, Jul 27 2026",
  },
  {
    section: "05",
    who: "whinrocs → mattshumer_ (the quality critique)",
    body: "I am a fellow vibe coder & a gamer. To me, this is complete shit, but given the timeframe very cool to have something somewhat playable. My only issue with these games are the lack of soul, sound, and the odd viewmodel. Even if these issues were corrected, would it be fun?",
    src: "x.com/whinrocs, Jul 28 2026",
  },
  {
    section: "06",
    who: "elonmusk → karpathy",
    body: "Yah",
    src: "x.com/elonmusk, Aug 2 2026",
  },
  {
    section: "06",
    who: "saranormous → karpathy",
    body: "it's time for The Mind Game",
    src: "x.com/saranormous, Aug 2 2026",
  },
  {
    section: "06",
    who: "mckaywrigley → karpathy",
    body: "someone *please* fund doing the entire trilogy like this as a benchmark.",
    src: "x.com/mckaywrigley, Aug 2 2026",
  },
  {
    section: "06",
    who: "ziwenxu_ → karpathy",
    body: "Just started this to see how far we can build. How long does it take a loop of AI agents to build the entire planet?",
    src: "x.com/ziwenxu_, Aug 2 2026",
  },
  {
    section: "06",
    who: "aaronmharrisamh → DVLPLONDON",
    body: "Very buggy for me, but put this through a polish phase and it's actually a great idea!",
    src: "x.com/aaronmharrisamh, Aug 3 2026",
  },
  {
    section: "06",
    who: "Bitcopath → DVLPLONDON (a build signal)",
    body: "Great work. Any chance you can send me to a direction where I can find elevation data for roads. I'm trying to make a trucking game with @threejs, I'm stuck on road creation, osm have good data except elevation.",
    src: "x.com/Bitcopath, Aug 3 2026",
  },
];

// ── Design tokens (match JulyTrends) ─────────────────────────
const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";
const accentRailL = "border-l-[color:oklch(0.48_0.22_275)]";
const accentRailT = "border-t-[color:oklch(0.48_0.22_275)]";
const softBg = "bg-[oklch(0.97_0.01_275)]";

export default function AugustTrends() {
  useSeo({
    title: "Gaming Trend Brief — August 2026 · anygame.dev",
    description:
      "anygame.dev's August 2026 Gaming Trend Brief: Three.js won the AI-render layer, skills became a game-dev primitive, Karpathy named the ephemeral GTA of X, and Xbox reset. 48 bookmarks + influencer threads → games to play, games to build, leet insights to subscribe to.",
    path: "/augusttrends",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Trend Brief" />

      {/* Hero */}
      <header className="container pt-20 pb-12 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Issue #2 · August 2026 · Gaming · AI-Native Game Dev
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          What Trended in AI-Native Game Dev
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          A monthly read on the engines, skills, and builds shaping AI-native game dev. This month:
          <strong className={ink}> Three.js won the render layer</strong>,{" "}
          <strong className={ink}>skills became a game-dev primitive</strong>,{" "}
          <strong className={ink}>Karpathy named the "ephemeral GTA of X"</strong>, and{" "}
          <strong className={ink}>Xbox reset for a billion-player aspiration</strong>. 48 bookmarks +
          influencer threads, grounded in verbatim quotes.
        </p>
      </header>

      {/* The Call */}
      <section className="container max-w-[820px] py-10">
        <div className={`rounded-2xl border-l-[3px] ${accentRailL} bg-[oklch(1_0_0)] p-7 md:p-9 ${border} border-y border-r`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>The Call</p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            AI-native game dev had its breakout month: Three.js won the render layer, skills became a
            game-dev primitive, Karpathy named the "ephemeral GTA of X," and Xbox reset for a
            billion-player aspiration. The signal is no longer "will AI help make games" — it's
            "which games are now makeable that weren't 90 days ago."
          </p>
        </div>
      </section>

      {/* 01. Three.js is the AI-render layer */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>01</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Three.js is the AI-render layer</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          Every new model gets "build something cool in @threejs" as the default benchmark
          (<strong className={ink}>majidmanzarpour</strong>, May 28). The signal is overwhelming and one-directional:
          <strong className={ink}> McGreenBeats</strong> — "Three.js can do everything now. VFX and audio sync handled in browser" (May 6).
          <strong className={ink}> EHuanglu</strong> — Gemini 3 + three.js generated a 3D product interactive app with zero coding, hand-gesture control (Jan 12).
          <strong className={ink}> MengTo</strong> open-sourced Three.js game-dev skills — isometric ARPG with camera/VFX/audio/monsters/combat (Jul 25).
          <strong className={ink}> scottstts</strong> shipped <code className={`text-xs px-1.5 py-0.5 rounded ${softBg}`}>threejs-awesome-graphics-agent-skills</code> v0.5.0 — F1 car, motorcycle, hologram VFX (Jul 25).
          <strong className={ink}> NickDevFE</strong>'s img2threejs: one photo → procedural Three.js code, no meshes (Jul 18, v1.3 Jul 23).
          <strong className={ink}> monokern</strong>: a Claude skill that clones complex 3D websites from a single active link (Jul 17).
          Babylon and PlayCanvas appear <em>zero</em> times as AI targets in the set.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {THREEJS_STATS.map(s => (
            <div key={s.label} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 text-center`}>
              <div className={`font-['JetBrains_Mono'] text-2xl font-bold ${indigo}`}>{s.num}</div>
              <div className={`mt-1 text-xs ${muted}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <Quote body={QUOTES[0].body} who={QUOTES[0].who} role={QUOTES[0].role} src={QUOTES[0].src} />
        <Quote body={QUOTES[1].body} who={QUOTES[1].who} role={QUOTES[1].role} src={QUOTES[1].src} />
        <SoWhat s={SOWHAT[0]} />
      </section>

      {/* 02. Image→3D pipeline */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>02</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>The image→3D asset pipeline is consolidated</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          The pipeline is now a recipe: <strong className={ink}>deedydas</strong> (Jan 8) — Nano Banana
          Pro T-pose → Hunyuan3D 3.1 image-to-3D → Mixamo rigging → Claude + three.js render. Under 5
          minutes. <strong className={ink}>thebuggeddev</strong> (Aug 2) — GPT Image 2.0 design → Tripo
          AI image-to-3D → Codex master prompt → 900MB of assets optimized to 28.6MB, on-demand loading.
          <strong className={ink}> rfitzpatrick_io</strong> (Jul 23) — open-sourced a customizable avatar
          foundation; Hunyuan/Tripo/Meshy clothes on open-source skeletons. "I'm going to go learn C in
          a remote cabin in the woods, so long and thanks for all the fish."
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {PIPELINE_STATS.map(s => (
            <div key={s.label} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 text-center`}>
              <div className={`font-['JetBrains_Mono'] text-2xl font-bold ${indigo}`}>{s.num}</div>
              <div className={`mt-1 text-xs ${muted}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <Conversation c={CONVERSATIONS[0]} />
        <Quote body={QUOTES[2].body} who={QUOTES[2].who} role={QUOTES[2].role} src={QUOTES[2].src} />
        <SoWhat s={SOWHAT[1]} />
      </section>

      {/* 03. Skills as a game-dev primitive */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>03</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Skills as a game-dev primitive</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          <strong className={ink}>tetsuoai</strong> (Jul 18) documented Grok Build's full game-asset
          skill suite — five skills shipping engine-ready defaults. <strong className={ink}>metatransformr</strong>{" "}
          (Aug 1) announced an engine-independent framework for procedural generation, animation/rigging,
          concept art, 3D modeling, world sim, automated playtesting, capsule/trailer design —{" "}
          <em>announced, not yet released</em>. <strong className={ink}>victormustar</strong> (May 24) —
          LongCat, a SOTA open-source talking-avatar model (MIT) with "NPC dialogue" explicitly named as a
          use case. The character/NPC pipeline is now a real stack.
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_SUITES.map(s => (
            <div key={s.title} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 hover:border-[oklch(0.48_0.22_275)] transition-colors`}>
              <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>{s.tag}</div>
              <h4 className={`font-['Syne'] font-semibold ${ink} mb-2`}>{s.title}</h4>
              <p className={`text-sm ${muted} leading-relaxed`}>{s.note}</p>
            </div>
          ))}
        </div>
        <Conversation c={CONVERSATIONS[1]} />
        <Conversation c={CONVERSATIONS[2]} />
        <Conversation c={CONVERSATIONS[3]} />
        <Quote body={QUOTES[3].body} who={QUOTES[3].who} role={QUOTES[3].role} src={QUOTES[3].src} />
        <SoWhat s={SOWHAT[2]} />
      </section>

      {/* 04. Engine landscape reshapes */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>04</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Engine landscape reshapes</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted} max-w-2xl`}>
          <strong className={ink}>Godot</strong> — "the assumption that died in Buenos Aires" (ihteshamali, Jun 1). 111k stars, MIT, no royalties, no per-install charge. <strong className={ink}>Unreal Engine + MCP</strong> — per_simmons_ (Jun 24) showed Claude building a full playable city, cloning a real city from Google Earth via Cesium, custom buildings in Blender headless. The Unreal + Claude pairing is the closed-engine counter to Godot's text-first AI-friendly thesis from July. <strong className={ink}>Box3D</strong> — s&box open-sourced its 3D physics engine (s8box, Jul 1). <strong className={ink}>KAPLAY.js</strong> — 2D component-based JS/TS game library, 90+ examples (GithubProjects, Jun 14).
        </p>
        <div className={`rounded-xl border ${border} bg-[oklch(1_0_0)] overflow-hidden overflow-x-auto`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`${border} border-b`}>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>#</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Engine</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Stars</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>Lang</th>
                <th className={`text-left px-4 py-3 font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${muted}`}>What it is</th>
              </tr>
            </thead>
            <tbody>
              {ENGINE_TABLE.map(r => {
                const isWinner = r.rank === 1;
                return (
                  <tr key={r.name} className={`${border} border-b hover:bg-[oklch(0.97_0.01_275)] transition-colors`}>
                    <td className={`px-4 py-3 font-['JetBrains_Mono'] ${muted}`}>{r.rank}</td>
                    <td className={`px-4 py-3 ${isWinner ? `${indigo} font-semibold` : ink}`}>{r.name}</td>
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
          Sources: x.com/ihteshamali (Jun 1) · x.com/per_simmons_ (Jun 24) · x.com/s8box (Jul 1) · x.com/GithubProjects (Jun 14)
        </p>
        <SoWhat s={SOWHAT[3]} />
      </section>

      {/* 05. Vibe-coded games & deploy */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>05</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Vibe-coded games & deploy</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          {VIBE_CARDS.map(v => (
            <div key={v.who} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5`}>
              <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>{v.who}</div>
              <p className={`text-sm ${muted} leading-relaxed`}>{v.body}</p>
            </div>
          ))}
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          <strong className={ink}>meta_alchemist</strong> (Jun 18) — "you can now vibe code games that look this cool… these 40 tools will help with the whole process." The tooling layer is no longer the bottleneck; the bottleneck moved to taste and the loop.
        </p>
        <Conversation c={CONVERSATIONS[4]} />
        <Conversation c={CONVERSATIONS[5]} />
        <Conversation c={CONVERSATIONS[6]} />
        <Conversation c={CONVERSATIONS[7]} />
        <Quote body={QUOTES[4].body} who={QUOTES[4].who} role={QUOTES[4].role} src={QUOTES[4].src} />
        <SoWhat s={SOWHAT[4]} />
      </section>

      {/* 06. The Ephemeral GTA of X */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>06</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>The Ephemeral GTA of X</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          <strong className={ink}>Karpathy</strong> (Aug 2) — Opus 5 + 1M tokens (~$10) + the first paragraph of Lord of the Rings → 5500 lines of Three.js code rendering the story over ~2 hours. "Hyper custom worlds you can imagine dropping players into… an ephemeral GTA of X on demand." The weakness he names: LLMs can't natively perceive video or play games to audit their work — multimodal gameplay is the raw capability still lacking.
          <strong className={ink}> 0xPaulius</strong> (Aug 1) — the canonical sub-agent-fanout prompt: "recreate Pokemon Leaf Green in modern 3D cartoon style, AAA quality, fan out sub-agents, /loop until utterly perfect, separate sub-agent is a harsh critic comparing side by side blind."
          <strong className={ink}> DVLPLONDON</strong> (Aug 3) — drive anywhere in the world in browser, OpenStreetMap + satellite elevation, real-time world gen as you drive, multiplayer races. "Need For Speed + Google Maps."
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {GAUNTLET_STATS.map(s => (
            <div key={s.label} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 text-center`}>
              <div className={`font-['JetBrains_Mono'] text-2xl font-bold ${indigo}`}>{s.num}</div>
              <div className={`mt-1 text-xs ${muted}`}>{s.label}</div>
            </div>
          ))}
        </div>
        <Conversation c={CONVERSATIONS[8]} />
        <Conversation c={CONVERSATIONS[9]} />
        <Conversation c={CONVERSATIONS[10]} />
        <Conversation c={CONVERSATIONS[11]} />
        <Conversation c={CONVERSATIONS[12]} />
        <Conversation c={CONVERSATIONS[13]} />
        <Quote body={QUOTES[5].body} who={QUOTES[5].who} role={QUOTES[5].role} src={QUOTES[5].src} />
        <SoWhat s={SOWHAT[5]} />
      </section>

      {/* 07. Market signals */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>07</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Market signals</h2>
        </div>
        <div className="space-y-4 mb-6">
          {MARKET_BLOCKS.map(b => (
            <div key={b.tag} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5`}>
              <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>{b.tag}</div>
              <p className={`text-sm ${muted} leading-relaxed`}>{b.body}</p>
            </div>
          ))}
        </div>
        <Quote body={QUOTES[6].body} who={QUOTES[6].who} role={QUOTES[6].role} src={QUOTES[6].src} />
        <Quote body={QUOTES[7].body} who={QUOTES[7].who} role={QUOTES[7].role} src={QUOTES[7].src} />
        <SoWhat s={SOWHAT[6]} />
      </section>

      {/* 08. Takeaways */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <Zap className={`w-5 h-5 ${indigo}`} />
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Takeaways</h2>
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>games to play · build · subscribe to</span>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {TAKEAWAYS.map(col => (
            <div key={col.title} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-6`}>
              <h3 className={`font-['Syne'] font-bold text-lg ${ink} mb-4`}>
                <span className="mr-2">{col.icon}</span>{col.title}
              </h3>
              <ul className="space-y-3">
                {col.items.map(it => (
                  <li key={it.name} className="text-sm">
                    <div className={`font-['Syne'] font-semibold ${ink}`}>{it.name}</div>
                    <div className={`text-xs ${muted} leading-relaxed`}>{it.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Concepts to watch */}
        <div className={`mt-6 rounded-xl ${softBg} p-5`}>
          <p className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>Concepts to watch</p>
          <p className={`text-sm ${ink} leading-relaxed`}>
            <strong>IndieGameJoe "Kick"</strong> — soccer-to-school through beautiful levels. Concept teaser, no demo yet.
            <strong> metatransformr's framework</strong> — engine-independent AI game-dev stack (procedural gen, playtesting, trailer design). Announced, not yet released.
          </p>
        </div>

        {/* One-line summary */}
        <div className={`mt-10 rounded-2xl border-t-[3px] ${accentRailT} ${softBg} p-7 md:p-9`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>One-line August 2026 summary</p>
          <p className={`text-lg font-['Syne'] font-semibold leading-snug ${ink}`}>
            <strong>Render:</strong> Three.js won. <strong>Assets:</strong> image→3D pipeline consolidated.
            <strong> Skills:</strong> Grok + MengTo + scottstts + metatransformr = the new stack.
            <strong> Worlds:</strong> Karpathy's ephemeral GTA of X is the forward look.
            <strong> Market:</strong> Xbox reset, cloud gaming economics favor datacenter, gameplay datasets are now open-source.
            <strong> Your move:</strong> play the demos, fork the skills, follow the leet voices.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="container max-w-[820px] py-14">
        <p className={`text-xs leading-relaxed ${muted}`}>
          Methodology: quotes sourced verbatim from the author's X bookmarks (48 game-related entries pulled via <code className={`text-xs px-1 py-0.5 rounded ${softBg}`}>bird</code> CLI, Dec 2025 → Aug 3 2026) and <code className={`text-xs px-1 py-0.5 rounded ${softBg}`}>bird thread</code> reply dumps. Influencer-reply callouts are verbatim from named accounts. No quotes were fabricated; where a source could not be verified, it was excluded. Compiled August 3, 2026. Source set committed at <code className={`text-xs px-1 py-0.5 rounded ${softBg}`}>docs/plans/data/game.txt</code>.
        </p>
      </section>

      {/* Related intelligence briefs */}
      <RelatedBriefs />

      <MoreDeepDives current="/augusttrends" />

      <ResearchFooter
        label="Gaming Trend Brief · Issue #2 · August 2026"
        links={[MINY_PLAY_LINK, ARCHIVE_LINK]}
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
      note: "30 days of dev discourse on what AI coding agents are doing to software engineering. Directly relevant to the Gauntlet Loop and the vibe-coded games in this brief.",
      href: "https://freeintelligence.ai/fable-pulse/",
    },
    {
      tag: "Hardware · GPU pricing",
      title: "GPU Pricing Comparison",
      note: "Live GPU pricing — the hardware layer under every indie build box. Relevant to lauriewired's cloud-vs-local gaming economics.",
      href: "https://freeintelligence.ai/gpu-pricing/",
    },
    {
      tag: "Hardware · Local AI",
      title: "The Final Local-AI Box",
      note: "On-device AI hardware for builders — relevant to the image→3D pipeline and the agent harness running the Gauntlet Loop.",
      href: "https://freeintelligence.ai/local-ai-box/",
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
        — the VE Lab briefs hub.
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
            <h4 className={`font-['Syne'] font-semibold ${ink} mb-2`}>
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
    <figure className={`relative my-6 rounded-r-xl rounded-l-sm border-l-[3px] ${accentRailL} bg-[oklch(1_0_0)] border-y border-r ${border} p-6 md:p-7`}>
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

// ── Conversation callout component ─────────────────────────────
function Conversation({ c }: { c: { section: string; who: string; body: string; src: string } }) {
  return (
    <div className={`my-4 rounded-lg ${softBg} border-l-[2px] border-[oklch(0.48_0.22_275)] p-4`}>
      <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-1`}>
        Conversation · {c.who}
      </div>
      <p className={`text-sm ${ink} leading-relaxed italic`}>{c.body}</p>
      <div className={`font-['JetBrains_Mono'] text-[10px] ${muted} mt-2`}>Source: {c.src}</div>
    </div>
  );
}

// ── "So what" editorial explainer ──────────────────────────────
const SOWHAT = [
  {
    section: "01",
    body: "The render layer is settled. For any AI agent that needs to show 3D in a browser, Three.js is the default — not because it's the fastest or the prettiest, but because it's the one every model has seen enough of in training to write competently. Babylon and PlayCanvas are technically capable, but they lost the AI-ergonomics war without a fight. The implication for builders: if you're picking a web 3D stack in 2026 and you want AI agents to be able to build and modify it, Three.js is the only defensible choice.",
  },
  {
    section: "02",
    body: "The asset pipeline is no longer a research project — it's a recipe you can run today. The bottleneck moved from \"can we make a 3D model from an image\" to \"can we make it small enough to ship.\" thebuggeddev's 900MB → 28.6MB optimization is the real lesson: generation is cheap, optimization is the craft. For any team building a 3D web experience, the pipeline is now: image-gen → image-to-3D → rig → optimize → ship. The last step is where the hours go.",
  },
  {
    section: "03",
    body: "Skills are the new libraries. tetsuoai's five-skill Grok suite is the most concrete artifact: a knight walk cycle is no longer a week of sprite work, it's a prompt. But bygregorr's reply names the real gap — frame metadata, pivot points, hitbox bounds don't live in the PNG, so engine integration stays manual. The next primitive someone ships will be a skill that emits engine-ready metadata alongside the sprite. Whoever does that wins the asset-pipeline layer.",
  },
  {
    section: "04",
    body: "The engine wars didn't end — they bifurcated. Godot owns the open, AI-friendly, text-first tier. Unreal + MCP owns the closed, fidelity-first, agent-controllable tier. There is no middle. If you're starting a game in 2026, the question is no longer \"which engine\" but \"which AI workflow\" — and the answer depends on whether your AI agent reads code (Godot) or drives an editor (Unreal). Box3D and KAPLAY are the specialist picks for physics-2D and component-2D respectively.",
  },
  {
    section: "05",
    body: "The Gauntlet Loop is the first prompt-engineering pattern that produces visibly-shippable games — but marco_rotili's pushback is the one to internalize. The loop works by setting a \"bar\" (a reference to copy), so it can only produce things that already exist. If you want something genuinely new, the loop won't get you there; you need a different technique (or a different kind of bar — a feeling, a mechanic, a constraint). gill_works's 30-hour Battlefield clone is the proof the loop works for clones; whinrocs's \"lack of soul\" critique is the proof it doesn't yet work for originality.",
  },
  {
    section: "06",
    body: "Karpathy's LoTR render is the single most important artifact in this brief. It proves that a sufficiently-prompted LLM can hold an entire procedural world in working memory and emit it as code — janky, but real. The \"ephemeral GTA of X\" framing is the thesis: games that don't exist until you ask for them, played once, discarded. The weakness he names (LLMs can't audit their own gameplay) is the next frontier. Whoever solves gameplay-self-perception — an agent that can play the game it just wrote and decide if it's fun — unlocks the next order of magnitude. DVLPLONDON's drive-anywhere world is the first shipping example of an OSM-grounded ephemeral world; Bitcopath's reply shows a builder already forking it for a trucking game.",
  },
  {
    section: "07",
    body: "The market signals compound in one direction: the AAA middle is hollowing. Xbox's \"64 cents on the dollar\" admission, the four studios spun off, and the \"most severe hardware crisis in the industry's history\" line together say the consolidated publisher model is breaking. lauriewired's cloud-gaming economics makes the hardware side worse for consumers (your $500 GPU is idle 90% of the time) and better for datacenters. DevvMandal's open-source gameplay dataset means the next generation of AI game agents will be trained on human play — which is the substrate for the ephemeral-GTA thesis to actually ship. The opportunity is in the gap the AAA exit creates: indie + AI + niche.",
  },
];

function SoWhat({ s }: { s: { section: string; body: string } }) {
  return (
    <aside className="my-8 border-l-[3px] border-[oklch(0.48_0.22_275)] bg-[oklch(0.97_0.01_275)] px-5 py-6 md:px-7">
      <div className="mb-3 inline-flex bg-[oklch(0.48_0.22_275)] px-2.5 py-1 font-['JetBrains_Mono'] text-[10px] uppercase text-white">
        So what · {s.section}
      </div>
      <p
        className={`font-['Inter'] text-base leading-relaxed md:text-lg ${ink}`}
      >
        {s.body}
      </p>
    </aside>
  );
}
