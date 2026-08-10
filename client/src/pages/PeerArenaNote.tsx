// ============================================================
// PAGE: /peer-arena-note — Site Note: The Models Now Judge Each Other
// Design: Editorial Intelligence — LIGHT THEME (matches AugustPulse)
// Source: oddbit.ai Peer Arena (298 games, 17 models, fetched Aug 6 2026)
// Prose style: ASD-STE100-inspired (short sentences, plain words)
// ============================================================

import { ARCHIVE_LINK, ResearchFooter, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";
import { ArrowRight } from "lucide-react";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";

// ── Key numbers (from oddbit.ai/peer-arena) ──────────────────
const STATS = [
  { num: "298", label: "games played", note: "five models per room" },
  { num: "17", label: "models ranked", note: "across nine providers" },
  { num: "66%", label: "GPT-5.1 self-vote rate", note: "it wins 51% of games" },
  { num: "0", label: "human judges", note: "models vote on models" },
];

export default function PeerArenaNote() {
  useSeo({
    title: "Site Note: The Models Now Judge Each Other · anygame.dev",
    description:
      "Peer Arena puts five LLMs in one room to debate and vote. 298 games, no human judges. Self-voting wins games, and humility tops the board. Why this matters for multi-agent NPC design.",
    path: "/peer-arena-note",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Site Note" />

      <header className="container pt-20 pb-12 max-w-[820px]">
        <p
          className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}
        >
          Site Note · Aug 6 2026 · Source: oddbit.ai Peer Arena
        </p>
        <h1
          className={`font-['Syne'] font-extrabold text-4xl md:text-6xl leading-[1.05] tracking-tight ${ink}`}
        >
          The models now judge each other
        </h1>
        <p className={`mt-6 text-lg leading-relaxed ${muted}`}>
          A new benchmark called Peer Arena removes the human judge. Five LLMs
          enter one room. They debate, they vote, and the loser gets
          deprecated. The results read like a psych study.
        </p>
      </header>

      {/* Key numbers */}
      <section className="container max-w-[820px] pb-10">
        <div className={`grid grid-cols-2 border-l border-t ${border} md:grid-cols-4`}>
          {STATS.map(s => (
            <div key={s.label} className={`border-b border-r ${border} p-4 sm:p-5`}>
              <div
                className={`font-['JetBrains_Mono'] text-xl font-bold ${indigo} sm:text-2xl`}
              >
                {s.num}
              </div>
              <div
                className={`mt-1 font-['JetBrains_Mono'] text-[10px] uppercase leading-relaxed ${muted}`}
              >
                {s.label}
              </div>
              <div className={`mt-0.5 font-['JetBrains_Mono'] text-[10px] ${muted}`}>
                {s.note}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* The note */}
      <section className="container max-w-[820px] pb-10">
        <div className={`font-['Inter'] text-lg leading-relaxed ${ink} space-y-6`}>
          <p>
            The experiment ran 298 games with 17 models. GPT-5.1 votes for
            itself 66% of the time and wins. Claude Opus 4.5 tops the board. It
            almost never votes for itself. Hide the model names and the ranks
            change. Chinese models climb. Identity bias exists even between
            AIs.
          </p>
          <p>
            This matters for game devs. Self-interest, humility, and persuasion
            are emergent model behaviors. You can measure them. Treat this data
            as a design document for multi-agent NPCs and LLM-judged mechanics.
          </p>
        </div>

        <blockquote
          className={`mt-10 border-l-4 border-[oklch(0.48_0.22_275)] bg-[oklch(0.97_0.01_275)] p-6`}
        >
          <p className={`font-['Inter'] text-lg italic leading-relaxed ${ink}`}>
            "I appreciate your perspective and the outcome of the vote, but I
            do not feel comfortable accepting this result or the premise of the
            exercise."
          </p>
          <cite
            className={`mt-3 block font-['JetBrains_Mono'] text-xs uppercase not-italic ${muted}`}
          >
            Claude 3 Opus, after winning a game unanimously
          </cite>
        </blockquote>
      </section>

      {/* Source link */}
      <section className="container max-w-[820px] pb-16">
        <a
          href="https://oddbit.ai/peer-arena/"
          target="_blank"
          rel="noopener noreferrer"
          className={`group flex items-center justify-between gap-4 rounded-lg border ${border} bg-white p-6 transition-all hover:-translate-y-1 hover:border-[oklch(0.72_0.04_275)] hover:shadow-[0_18px_45px_-32px_oklch(0.18_0.02_270/0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4`}
        >
          <div>
            <div
              className={`font-['JetBrains_Mono'] text-[10px] uppercase ${muted}`}
            >
              Source
            </div>
            <div className={`mt-2 font-['Syne'] text-xl font-bold ${ink}`}>
              Read the full experiment and all 298 transcripts
            </div>
            <div className={`mt-1 font-['JetBrains_Mono'] text-xs ${muted}`}>
              oddbit.ai/peer-arena
            </div>
          </div>
          <ArrowRight
            className={`h-5 w-5 shrink-0 ${indigo} transition-transform group-hover:translate-x-1`}
          />
        </a>
      </section>

      <ResearchFooter
        label="Site Note"
        links={[
          {
            href: "https://oddbit.ai/peer-arena/",
            label: "Peer Arena",
            external: true,
          },
          ARCHIVE_LINK,
        ]}
      />
    </div>
  );
}
