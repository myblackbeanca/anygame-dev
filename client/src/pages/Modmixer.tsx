// ============================================================
// PAGE: /modmixer — Modmixer plain explainer (self-hosted)
// Design: Editorial Intelligence — LIGHT THEME (matches Home)
// ============================================================

import { Link } from "wouter";
import { ArrowRight, Check, X } from "lucide-react";
import { ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";

const NOW = [
  "Game breaks",
  "Turn mods off at random",
  "Ask Reddit",
  "Paste the log into ChatGPT",
  "Hope it boots again",
];

const LOOP = [
  "Launch the game",
  "Read the error log",
  "Change the right files",
  "Save a checkpoint",
  "Launch again",
];

const WHO = [
  {
    n: "01",
    title: "You play RimWorld with lots of mods",
    body: "Your list breaks often. You waste nights finding the bad mod.",
  },
  {
    n: "02",
    title: "You already try ChatGPT on logs",
    body: "You want that help tied to the real game folder, not a chat window.",
  },
  {
    n: "03",
    title: "You want one small custom mod",
    body: "A QoL change or retexture. Not a full modding career.",
  },
];

const JOBS = [
  { n: "01", title: "Fix", body: "Watch logs, patch files, relaunch." },
  { n: "02", title: "Manage", body: "Load order and conflicts for your whole list." },
  { n: "03", title: "Build", body: "Describe a small mod, then play it." },
];

const YES = [
  "RimWorld is your game",
  "Big mod lists stress you",
  "You will still test in-game",
  "You can spend a few dollars on AI credits",
];

const NO = [
  "You do not play RimWorld or Minecraft",
  "You only need a simple mod sorter",
  "You want zero AI cost",
  "You want perfect mods with no testing",
];

export default function Modmixer() {
  useSeo({
    title: "Modmixer in plain words · anygame.dev",
    description:
      "What Modmixer is, who it helps, and why broken RimWorld mod lists come before AI mod generation. A plain explainer.",
    path: "/modmixer",
  });

  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Tool Note" />

      <header className="container pt-16 pb-10 max-w-[720px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Plain words · July 2026 · Mod tools
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-tight ${ink}`}>
          Modmixer, in plain words
        </h1>
        <p className={`mt-5 text-lg leading-relaxed ${muted}`}>
          What it is. Who it helps. Why broken mods come first.
        </p>
      </header>

      <section className="container max-w-[720px] pb-6 space-y-4">
        <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6 md:p-7`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>
            One sentence
          </p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            Modmixer is a free desktop app that helps RimWorld players fix broken mod lists and build
            small mods with AI.
          </p>
          <p className={`mt-3 text-sm leading-relaxed ${muted}`}>
            You bring your own AI account. The app is free and open source.
          </p>
        </div>

        <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6 md:p-7`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>
            The real problem
          </p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            People run 50–200 mods. Something breaks. The game shows a red error. Finding the bad mod
            can take hours.
          </p>
          <p className={`mt-3 text-sm leading-relaxed ${muted}`}>
            Many players already paste the error log into ChatGPT. That helps a bit. It does not launch
            the game or apply the fix for you.
          </p>
        </div>
      </section>

      <section className="container max-w-[720px] py-10">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          Today vs closed loop
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={`rounded-2xl border border-[oklch(0.85_0.04_30)] bg-[oklch(0.97_0.015_40)] p-6`}>
            <h2 className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase text-[oklch(0.45_0.14_30)] mb-4`}>
              What people do now
            </h2>
            <ol className={`space-y-2.5 list-decimal list-inside text-sm ${ink}`}>
              {NOW.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
          <div className={`rounded-2xl border border-[oklch(0.82_0.04_170)] bg-[oklch(0.97_0.015_170)] p-6`}>
            <h2 className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase text-[oklch(0.4_0.1_170)] mb-4`}>
              What Modmixer aims to do
            </h2>
            <ol className={`space-y-2.5 list-decimal list-inside text-sm ${ink}`}>
              {LOOP.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="container max-w-[720px] py-6">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          Who it is for
        </p>
        <div className="space-y-3">
          {WHO.map((w) => (
            <div
              key={w.n}
              className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 flex gap-4 items-start`}
            >
              <span className={`font-['JetBrains_Mono'] text-sm font-bold ${indigo} pt-0.5`}>{w.n}</span>
              <div>
                <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{w.title}</h3>
                <p className={`mt-1 text-sm leading-relaxed ${muted}`}>{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container max-w-[720px] py-10">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          What the app does
        </p>
        <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6 md:p-7`}>
          <p className={`text-sm ${muted} mb-5`}>Think of three jobs, in this order:</p>
          <div className="space-y-3">
            {JOBS.map((j) => (
              <div key={j.n} className={`flex gap-4 items-start border-t ${border} pt-3 first:border-0 first:pt-0`}>
                <span className={`font-['JetBrains_Mono'] text-xs font-bold ${indigo}`}>{j.n}</span>
                <div>
                  <h3 className={`font-['Syne'] font-semibold ${ink}`}>{j.title}</h3>
                  <p className={`text-sm ${muted}`}>{j.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={`mt-5 text-sm ${muted}`}>
            It also helps publish to Steam Workshop when you are ready. Minecraft support exists in beta.
          </p>
        </div>
      </section>

      <section className="container max-w-[720px] py-6">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          Yes or no
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6`}>
            <h2 className={`font-['Syne'] font-semibold text-lg text-[oklch(0.4_0.1_170)] mb-3 flex items-center gap-2`}>
              <Check className="w-4 h-4" /> Try it if…
            </h2>
            <ul className="space-y-2">
              {YES.map((s) => (
                <li key={s} className={`text-sm ${muted} border-t ${border} pt-2 first:border-0 first:pt-0`}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6`}>
            <h2 className={`font-['Syne'] font-semibold text-lg text-[oklch(0.45_0.14_30)] mb-3 flex items-center gap-2`}>
              <X className="w-4 h-4" /> Skip it if…
            </h2>
            <ul className="space-y-2">
              {NO.map((s) => (
                <li key={s} className={`text-sm ${muted} border-t ${border} pt-2 first:border-0 first:pt-0`}>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container max-w-[720px] py-8">
        <div className="rounded-2xl border border-[oklch(0.88_0.04_85)] bg-[oklch(0.98_0.02_90)] p-6">
          <p className={`text-sm leading-relaxed ${muted}`}>
            <strong className={ink}>Important:</strong> This community dislikes low-quality AI spam.
            Modmixer works best when <em>you</em> stay in charge and test every change. The goal is
            fewer broken nights — not unlimited junk mods.
          </p>
        </div>
      </section>

      <section className="container max-w-[720px] pb-8">
        <div className="rounded-2xl bg-[oklch(0.18_0.02_270)] text-[oklch(0.96_0.01_90)] p-7 md:p-8">
          <p className="font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase text-[oklch(0.7_0.02_90)] mb-3">
            A simple test
          </p>
          <p className="font-['Syne'] font-semibold text-xl md:text-2xl leading-snug">
            Install the app. Add about $5 of AI credit. Give it one real red error from your list — or
            one tiny change you want in the game. Play the result.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://modmixer.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[oklch(0.18_0.02_270)] text-white px-5 py-3 text-sm font-semibold hover:bg-[oklch(0.48_0.22_275)] transition-colors"
          >
            Go to modmixer.com <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/lebek/modmixer"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-lg border ${border} bg-[oklch(1_0_0)] px-5 py-3 text-sm font-semibold ${ink} hover:border-[oklch(0.48_0.22_275)] transition-colors`}
          >
            Source on GitHub
          </a>
          <a
            href="https://modmixer.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 rounded-lg border ${border} bg-[oklch(1_0_0)] px-5 py-3 text-sm font-semibold ${ink} hover:border-[oklch(0.48_0.22_275)] transition-colors`}
          >
            Docs
          </a>
        </div>
      </section>

      <footer className={`border-t ${border} mt-8`}>
        <div className="container py-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className={`inline-flex min-h-11 items-center font-['Syne'] text-sm font-bold ${ink}`}
          >
            anygame.dev
          </Link>
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>/modmixer</span>
        </div>
      </footer>
    </div>
  );
}
