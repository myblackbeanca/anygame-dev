// ============================================================
// PAGE: /august-pulse — 30-Day Community Pulse (last30days engine)
// Design: Editorial Intelligence — LIGHT THEME (matches JulyTrends)
// Source: last30days v3.11.1 engine run, Aug 4 2026
// Topic: "AI in game development" · window Jul 6 – Aug 5 2026
// ============================================================

import { Link } from "wouter";
import { ARCHIVE_LINK, MINY_PLAY_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";
import { MoreDeepDives } from "@/components/sections";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";
const accentRailL = "border-l-[color:oklch(0.48_0.22_275)]";
const accentRailT = "border-t-[color:oklch(0.48_0.22_275)]";
const softBg = "bg-[oklch(0.97_0.01_275)]";

// ── Engine stats (from the PASS-THROUGH FOOTER) ───────────────
const ENGINE_STATS = [
  {
    num: "1,617",
    label: "upvotes on the AI Act thread",
    note: "r/gamedev · 295 comments",
    signal: "Lead community signal",
  },
  {
    num: "22.6k",
    label: "views on the top build video",
    note: "Building a $1M Mobile Game with Only AI",
    signal: "Top creator signal",
  },
  {
    num: "12",
    label: "Reddit threads",
    note: "inside the 30-day window",
    signal: "Discussion volume",
  },
  {
    num: "8",
    label: "active sources",
    note: "X unavailable during this run",
    signal: "Research coverage",
  },
];

// ── Key patterns (from the synthesis) ────────────────────────
const PATTERNS = [
  { n: "01", text: "Regulation as community moment - the AI Act thread (1,617 upvotes, 295 comments) is the rare case where a policy change produced genuine discussion, not just outrage retweets. The substantive read: this mostly doesn't apply to code; it applies to deepfake-grade media." },
  { n: "02", text: "AI-skepticism as a skill signal - \"pretending not to use AI\" as a deliberate practice is a new posture that only emerges once AI is the default. Watch for this framing to spread." },
  { n: "03", text: "AI-as-mechanic, not AI-as-tool - the argument-duello game (wram.chat) is the first shipped example this window of an AI-native genre where the model is the game, not the production pipeline." },
  { n: "04", text: "The clone-the-hits YouTube wave - RandomAI's \"Claude Opus 5 is INSANE at Game Development\" (16.3k views) recreates Geometry Dash, Rocket League, and Black Ops 2 from scratch. Cole's \"Building a $1M Mobile Game with Only AI\" (22.6k views) builds a mobile ad game with Claude Code. The genre is settled: recreate, record, ship." },
  { n: "05", text: "The AAA AI controversy is live - Stellar Blade's CEO willingly using a Gen AI music video to promote the game drew 135 pts and 193 comments on r/CharacterActionGames. The community read: \"not a good sign for the development of this upcoming game.\" AAA AI use is a flashpoint, not a non-issue." },
  { n: "06", text: "The hard part moved - r/aigamedev's \"AI can generate a game in minutes. Why is improving it still so hard?\" names the new bottleneck. First playable build is fast; iteration is the craft. The Gauntlet Loop on X and this Reddit thread are the same signal from two directions." },
  { n: "07", text: "Job postings as leading indicator - \"AI-assisted production workflows\" role language is now standard in postings; the org charts are catching up to the tooling." },
];

// ── Community comments (verbatim from the engine) ─────────────
const COMMENTS = [
  {
    body: "I don't think the comments freaking out about how \"unenforceable\" this is actually read article 50. From my non-lawyer reading, none of this is relevant to the vast majority of game devs.",
    who: "u/MotleyGames",
    votes: "263 upvotes",
    src: "r/gamedev · AI Act disclosure thread",
  },
  {
    body: "The fact that there are hundreds of comments discussing coding again, when it is clearly stated that this does not apply to the code, only confirms that no one has read these documents, and people just react.",
    who: "u/SilverGur1911",
    votes: "149 upvotes",
    src: "r/gamedev · AI Act disclosure thread",
  },
  {
    body: "\"Deployers of an AI system that generates or manipulates image, audio or video content constituting a deepfake, shall disclose that the content has been artificially generated or manipulated.\"",
    who: "u/phase_distorter41",
    votes: "133 upvotes",
    src: "r/gamedev · quoting Article 50",
  },
];

// ── Stories (HN + YouTube + Reddit) ───────────────────────────
const STORIES = [
  { tag: "YouTube · Aug 2", title: "Building a $1M Mobile Game with Only AI", href: "https://www.youtube.com/watch?v=lhjLENxEr9k", note: "Cole · 22.6k views, 811 likes, 68 comments. Claude Code builds a mobile ad game from scratch. The genre is settled: recreate, record, ship." },
  { tag: "YouTube · Jul 26", title: "Claude Opus 5 is INSANE at Game Development", href: "https://www.youtube.com/watch?v=9jIIWPGYKFY", note: "RandomAI · 16.3k views, 274 likes. Recreates Geometry Dash, Rocket League, and Black Ops 2 from scratch to test Opus 5." },
  { tag: "Reddit · Aug 1", title: "Stellar Blade CEO uses Gen AI music video", href: "https://www.reddit.com/r/CharacterActionGames/comments/1vcmbn9/kim_hyung_tae_ceo_of_shift_up_is_willingly_using/", note: "r/CharacterActionGames · 135 pts, 193 comments. AAA AI use as a flashpoint - \"not a good sign for the development of this upcoming game.\"" },
  { tag: "Reddit · Aug 4", title: "AI can generate a game in minutes. Why is improving it still so hard?", href: "https://www.reddit.com/r/aigamedev/comments/1veywxa/ai_can_generate_a_game_in_minutes_why_is/", note: "r/aigamedev · The hard part moved: first build is fast, iteration is the craft." },
  { tag: "Ask HN · Jul 29", title: "How would you learn AI-assisted development from the ground up?", href: "https://news.ycombinator.com/item?id=49098829", note: "The from-zero framing - the other half of the AI-skepticism coin." },
  { tag: "Tell HN · Aug 3", title: "Pretending not to use AI has made me a better developer", href: "https://news.ycombinator.com/item?id=49157839", note: "The deliberate-restriction posture that only emerges once AI is the default." },
  { tag: "Show HN · Aug 4", title: "Real-time argument duello game - AI judge decides who's right", href: "https://wram.chat/", note: "AI-as-game-mechanic, not AI-as-production-tool. A new genre shipping as a product." },
];

export default function AugustPulse() {
  useSeo({
    title: "30-Day Community Pulse — August 2026 · anygame.dev",
    description:
      "What Reddit, Hacker News, and the job boards actually said about AI in game development in the last 30 days. Europe's AI Act disclosure rule, the \"pretending not to use AI\" posture, an AI-judge game on Show HN, and 5 AI-assisted production job postings.",
    path: "/august-pulse",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Community Pulse" />

      <header className="container pt-20 pb-12 max-w-[820px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          30-Day Pulse · Aug 4 2026 · powered by last30days v3.11.1
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}>
          What the community actually said
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          A 30-day read on what Reddit, Hacker News, and the job boards discussed about AI in game
          development (Jul 6 - Aug 5 2026). This is the community-side complement to the
          <Link href="/augusttrends" className={indigo}> August Trend Brief</Link> - the X-side signal lives
          there; this page is what the developer forums and job postings actually said.
        </p>
      </header>

      {/* The Call */}
      <section className="container max-w-[820px] py-10">
        <div className={`rounded-2xl border-l-[3px] ${accentRailL} bg-[oklch(1_0_0)] p-7 md:p-9 ${border} border-y border-r`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>The Call</p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            The 30-day community signal is thinner than the X signal - but what it lacks in volume it
            makes up in substance. One regulation thread (1,617 upvotes, 295 comments) carried the
            month. The tooling conversation (Three.js, Grok Build, Godot) hasn't landed on Reddit or HN
            yet; it lives on X. Watch for it to migrate.
          </p>
        </div>
      </section>

      {/* Engine stats */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>
            01
          </span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>
            Engine stats
          </h2>
        </div>
        <div className={`grid border-l border-t ${border} md:grid-cols-12`}>
          {ENGINE_STATS.map((s, index) => (
            <div
              key={s.label}
              className={`border-b border-r ${border} bg-white p-5 md:p-7 ${
                index === 0
                  ? "min-h-52 md:col-span-7 md:row-span-3 md:flex md:flex-col md:justify-between"
                  : index === 1
                    ? "md:col-span-5"
                    : "md:col-span-5"
              }`}
            >
              <div
                className={`font-['JetBrains_Mono'] text-[10px] uppercase ${index === 0 ? indigo : muted}`}
              >
                {s.signal}
              </div>
              <div className={index === 0 ? "mt-10 md:mt-14" : "mt-7"}>
                <div
                  className={`font-['JetBrains_Mono'] font-bold leading-none ${indigo} ${
                    index === 0
                      ? "text-5xl md:text-7xl"
                      : "text-3xl md:text-4xl"
                  }`}
                >
                  {s.num}
                </div>
                <div
                  className={`mt-3 font-['Syne'] font-semibold ${ink} ${index === 0 ? "text-xl md:text-2xl" : "text-base"}`}
                >
                  {s.label}
                </div>
                <div className={`mt-1 text-xs leading-relaxed ${muted}`}>
                  {s.note}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className={`mt-4 text-xs ${muted}`}>
          Sources active: GitHub, Web, Hacker News, Instagram, Jobs, Reddit,
          TikTok, YouTube. X/Twitter errored this run (needs browser login).
          Window: Jul 6 - Aug 5 2026. 46 dated items, 8 sources.
        </p>
      </section>

      {/* The AI Act thread */}
      <section className="container max-w-[820px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>02</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>The AI Act disclosure thread</h2>
        </div>
        <p className={`mb-6 leading-relaxed ${muted}`}>
          Europe's AI Act transparency obligations took effect August 2. r/gamedev's thread on the
          disclosure rule pulled <strong className={ink}>1,617 upvotes and 295 comments</strong> - the
          single largest game-dev community moment in the window. The community's read was sharper than
          the headline: the rule applies to deployers of AI systems that generate deepfake-grade media,
          not to code. Most game devs shipping code are unaffected; studios shipping AI-generated
          cutscenes or NPC voice are.
        </p>
        <div className="space-y-4">
          {COMMENTS.map(c => (
            <figure key={c.who} className={`relative rounded-r-xl rounded-l-sm border-l-[3px] ${accentRailL} bg-[oklch(1_0_0)] border-y border-r ${border} p-6`}>
              <blockquote className={`font-['Inter'] italic ${ink} leading-relaxed mb-4`}>
                {c.body}
              </blockquote>
              <figcaption>
                <div className={`font-['JetBrains_Mono'] text-sm font-semibold ${indigo}`}>{c.who}</div>
                <div className={`font-['JetBrains_Mono'] text-[11px] ${muted}`}>{c.votes} · {c.src}</div>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className={`mt-4 text-xs ${muted}`}>
          Source: <a href="https://www.reddit.com/r/gamedev/comments/1va9yh5/europe_will_require_mandatory_disclosure_for_ai/" className={indigo}>r/gamedev · Europe will require mandatory disclosure for AI generated content</a>
        </p>
      </section>

      {/* Stories and videos that circulated (YouTube, Reddit, HN) */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>03</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Stories and videos</h2>
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>{STORIES.length} items · YouTube, Reddit, Hacker News</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {STORIES.map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className={`group block rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 hover:border-[oklch(0.48_0.22_275)] transition-colors`}>
              <div className={`font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase ${indigo} mb-2`}>{s.tag}</div>
              <h4 className={`font-['Syne'] font-semibold ${ink} mb-2`}>{s.title}</h4>
              <p className={`text-sm ${muted} leading-relaxed`}>{s.note}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Key patterns */}
      <section className="container max-w-[1100px] py-12">
        <div className="flex items-center gap-3 mb-6">
          <span className={`font-['JetBrains_Mono'] text-xs ${indigo}`}>04</span>
          <h2 className={`font-['Syne'] font-bold text-2xl ${ink}`}>Key patterns from the research</h2>
        </div>
        <div className="space-y-4">
          {PATTERNS.map(p => (
            <div key={p.n} className={`flex gap-4 py-3 border-b border-[oklch(0.86_0.005_280)] last:border-0`}>
              <span className={`font-['JetBrains_Mono'] font-bold text-xs ${indigo} flex-shrink-0 mt-0.5`}>{p.n}</span>
              <p className={`font-['Inter'] text-sm ${muted} leading-relaxed`}>{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* One-line summary */}
      <section className="container max-w-[820px] py-8">
        <div className={`rounded-2xl border-t-[3px] ${accentRailT} ${softBg} p-7 md:p-9`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>One-line summary</p>
          <p className={`text-lg font-['Syne'] font-semibold leading-snug ${ink}`}>
            <strong>Regulation:</strong> the AI Act thread carried the month - 1,617 upvotes, real
            discussion, mostly doesn't apply to code. <strong>Posture:</strong> "pretending not to use
            AI" is the new deliberate-practice signal. <strong>Genre:</strong> an AI-judge game shipped on
            Show HN - AI-as-mechanic, not AI-as-tool. <strong>Hiring:</strong> "AI-assisted production
            workflows" is now standard role language. <strong>Gap:</strong> the tooling conversation
            (Three.js, Grok, Godot) lives on X, not yet on Reddit/HN.
          </p>
        </div>
      </section>

      {/* Methodology */}
      <section className="container max-w-[820px] py-10">
        <p className={`text-xs leading-relaxed ${muted}`}>
          Methodology: research run via the <code className={`text-xs px-1 py-0.5 rounded ${softBg}`}>last30days</code> engine (v3.11.1) on the topic "AI in game development," window Jul 6 - Aug 5 2026. 8 sources active: Reddit (12 threads, with comments), Hacker News (12 stories), YouTube (2 videos with transcripts), TikTok (12 videos), Instagram (2 reels), GitHub (8 items), Web (5), Jobs (5). X/Twitter errored this run (needs browser login). Community comments quoted verbatim from named accounts. No quotes were fabricated; where a source could not be verified, it was excluded. Compiled August 4 2026.
        </p>
      </section>

      <MoreDeepDives current="/august-pulse" />

      <ResearchFooter
        label="30-Day Community Pulse · August 2026"
        links={[MINY_PLAY_LINK, ARCHIVE_LINK]}
      />
    </div>
  );
}
