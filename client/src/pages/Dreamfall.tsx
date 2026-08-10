// ============================================================
// PAGE: /dreamfall — Builder Spotlight case study
// A 2026 signal of agent-assisted solo game engineering.
// Design: Editorial Intelligence — LIGHT THEME (matches Home)
// ============================================================

import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

const ink = "text-[oklch(0.18_0.02_270)]";
const muted = "text-[oklch(0.52_0.015_275)]";
const indigo = "text-[oklch(0.48_0.22_275)]";
const border = "border-[oklch(0.88_0.008_280)]";

const STATS = [
  { value: "73★", label: "GitHub stars" },
  { value: "11", label: "Forks" },
  { value: "~3 wks", label: "Public commit span" },
  { value: "MIT", label: "License" },
  { value: "0", label: "Open issues" },
];

const STACK = [
  "Vite 8",
  "Solid 1.9",
  "Three r185 WebGPU/TSL",
  "Rapier physics",
  "PartyKit (multiplayer WIP)",
  "Cloudflare Pages",
];

const SCORECARD = [
  { dim: "Technical ambition", score: "9/10", note: "WebGPU-native, multi-system, multi-genre" },
  { dim: "Engineering hygiene", score: "8/10", note: "Boundary verifies, fixed step, agent docs" },
  { dim: "Focus / product clarity", score: "3/10", note: "Too many games, none finished" },
  { dim: "Open-source ergonomics", score: "4/10", note: "1.2GB, no topics/homepage, Blender paths" },
  { dim: "Reuse value", score: "8/10", note: "Best as a technique quarry" },
  { dim: "Multiplayer maturity", score: "3/10", note: "First pass only" },
];

const GOOD = [
  {
    n: "01",
    title: "Engineering discipline rare for a 'playground'",
    body: "A deliberately closed GameRuntime facade that new systems can't edit, ~100 standalone verify-*.mjs regression scripts replacing a test framework, and agent-facing architecture docs (AGENTS.md, CLAUDE.md). This is real engine thinking, not demo spaghetti.",
  },
  {
    n: "02",
    title: "Graphics ambition is real, not blog-demo depth",
    body: "Hex tiling (Mikkelsen) for terrain/roads/mud, wet-road TSL + rain wetness uniforms, GPU mud deform fields shared by rally tires and dog coat, chunk streaming, WFC office interiors, volumetric sky/clouds, SSAO/SSR/bloom, shell fur, XPBD cloth. 'Steal one subsystem' territory.",
  },
  {
    n: "03",
    title: "Content pipeline is first-class",
    body: "Retarget scripts, Blender headless builders, gltf-transform optimize, breed reference boards, SQLite editor store with Vite middleware, separate dog product deploy. Treats assets as contracts.",
  },
  {
    n: "04",
    title: "README as technique index",
    body: "Scene-by-scene tables of gameplay idea → search keywords → docs. Positions the repo as a study atlas, which matches reality better than 'open-world game'.",
  },
];

const WEAK = [
  {
    n: "01",
    title: "Scope explosion (the main risk)",
    body: "Three weeks of commits span GTA freerun, Dirt Rally, The Sims, Untitled Goose/Dog, Quake deathmatch, Matrix highway, Left 4 Dead horde. Shared kernel helps, but integration surface grows faster than any single mode's polish.",
  },
  {
    n: "02",
    title: "Repo weight is a product problem",
    body: "~1.2 GB git size, ~290 MiB runtime assets, Cloudflare free-tier file-count + 25 MiB/file constraints. Clone/CI/fork friction is high for a 'playground'. Breed boards and FBX packs should be LFS or optional download.",
  },
  {
    n: "03",
    title: "Name/positioning mismatch",
    body: "GitHub: threejs-playground. Product: Dreamfall. No description, no topics, no homepage. Discoverability under-sells the work.",
  },
  {
    n: "04",
    title: "Verification ≠ product quality",
    body: "Hundreds of verify scripts prove invariants and regressions. They don't prove fun, coherent art direction, stable 60fps on mid hardware, or multiplayer readiness.",
  },
  {
    n: "05",
    title: "Dependency / platform surface",
    body: "Hardcoded macOS Blender path in npm scripts, better-sqlite3 native rebuild dance, WebGPU-only path with no WebGL fallback mentioned, PartyKit multiplayer + CF Pages split is early.",
  },
];

const ARCH = [
  "main.js → bootstrap.jsx (Solid) → App shell",
  "GameCanvas → GameRuntime (closed facade)",
  "  └─ runtime kernel → ~35 systems + RuntimeFramePipeline",
  "  └─ features / mode controllers",
  "MapBuilder / WorldMapEditor / Garage / Bodyshop / Gunsmith / Dog Studio",
  "store: SQLite via Vite plugin → in-memory fileStore (sync API)",
];

export default function Dreamfall() {
  useSeo({
    title: "Dreamfall — agent-assisted solo dev, shipped in weeks · anygame.dev",
    description:
      "A 2026 case study of agent-assisted game engineering: one developer + AI coding agents shipped a multi-genre browser-3D R&D lab in three weeks. The signal is the verification culture, not the graphics.",
    path: "/dreamfall",
  });

  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="Builder Spotlight" />

      <header className="container pt-16 pb-10 max-w-[720px]">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-[0.18em] uppercase ${indigo} mb-4`}>
          Builder Spotlight · July 2026 · Case study
        </p>
        <h1 className={`font-['Syne'] font-extrabold text-4xl md:text-5xl leading-[1.05] tracking-tight ${ink}`}>
          Dreamfall — agent-assisted solo dev, shipped in weeks
        </h1>
        <p className={`mt-5 text-lg leading-relaxed ${muted}`}>
          One developer + AI coding agents shipped a multi-genre browser-3D R&amp;D lab in roughly
          three weeks of public commit history. The signal is the engineering culture built for
          agents — not the graphics.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="https://github.com/ryanfitzpatrickio/threejs-playground"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[oklch(0.18_0.02_270)] text-white px-5 py-3 text-sm font-semibold hover:bg-[oklch(0.48_0.22_275)] transition-colors"
          >
            View the repo <ArrowRight className="w-4 h-4" />
          </a>
          <Link
            href="/#builder-spotlight"
            className={`inline-flex items-center gap-2 rounded-lg border ${border} bg-[oklch(1_0_0)] px-5 py-3 text-sm font-semibold ${ink} hover:border-[oklch(0.48_0.22_275)] transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to spotlight
          </Link>
        </div>
      </header>

      {/* Stats row */}
      <section className="container max-w-[720px] pb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {STATS.map((s) => (
            <div key={s.label} className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-4`}>
              <div className={`font-['JetBrains_Mono'] font-bold text-xl ${indigo}`}>{s.value}</div>
              <div className={`font-['JetBrains_Mono'] text-[10px] uppercase tracking-wider ${muted} mt-1`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* One-sentence + what it is */}
      <section className="container max-w-[720px] py-6 space-y-4">
        <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6 md:p-7`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>
            One sentence
          </p>
          <p className={`text-xl md:text-2xl font-['Syne'] font-semibold leading-snug ${ink}`}>
            Not a toy Three.js sandbox — a single-author real-time game R&amp;D monorepo, many
            half-to-mostly-complete game modes sharing one WebGPU/TSL + Rapier runtime.
          </p>
        </div>

        <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6 md:p-7`}>
          <p className={`font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase ${indigo} mb-3`}>
            What it is
          </p>
          <p className={`text-base leading-relaxed ${ink} mb-4`}>
            <strong>Dreamfall</strong> (the name on disk) is an exploratory Vite browser playground
            for real-time 3D gameplay, procedural world generation, animation, physics, terrain
            editing, vehicles, weather, and rendering experiments. Honest self-description in its
            README/AGENTS: <em>prototype workspace, not a finished game or drop-in engine.</em>
          </p>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className={`font-['JetBrains_Mono'] text-xs bg-[oklch(0.9_0.005_280)] border ${border} text-[oklch(0.28_0.015_275)] px-2.5 py-1 rounded`}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Scorecard */}
      <section className="container max-w-[720px] py-10">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          Scorecard
        </p>
        <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${border} bg-[oklch(0.9_0.004_280)]`}>
                  {["Dimension", "Score", "Note"].map((h) => (
                    <th
                      key={h}
                      className={`font-['JetBrains_Mono'] text-xs uppercase tracking-wider text-left ${muted} px-5 py-3`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SCORECARD.map((row) => (
                  <tr key={row.dim} className={`border-b ${border} last:border-0`}>
                    <td className={`px-5 py-3.5 font-['Syne'] font-semibold text-sm ${ink}`}>
                      {row.dim}
                    </td>
                    <td className={`px-5 py-3.5 font-['JetBrains_Mono'] font-bold text-sm ${indigo}`}>
                      {row.score}
                    </td>
                    <td className={`px-5 py-3.5 font-['Inter'] text-sm ${muted}`}>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={`px-5 py-4 border-t ${border} bg-[oklch(0.96_0.005_280)]`}>
            <p className={`font-['JetBrains_Mono'] text-xs ${muted}`}>
              <strong className={ink}>Overall as public R&amp;D lab:</strong> 7.5/10 ·{" "}
              <strong className={ink}>Overall as game to play/fork:</strong> 4/10
            </p>
          </div>
        </div>
      </section>

      {/* Architecture snapshot */}
      <section className="container max-w-[720px] py-6">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          Architecture snapshot
        </p>
        <div className={`rounded-2xl border ${border} bg-[oklch(0.18_0.02_270)] p-6 md:p-7`}>
          <pre className={`font-['JetBrains_Mono'] text-xs leading-relaxed text-[oklch(0.85_0.01_90)] overflow-x-auto`}>
{ARCH.join("\n")}
          </pre>
        </div>
        <p className={`mt-4 text-sm leading-relaxed ${muted}`}>
          Ordering contracts that matter: vehicles before mount/movement; traversal chain overrides
          movement result; characters can use analytic ground height, vehicles need real heightfield
          colliders. Real engine thinking, not demo spaghetti — even if many modes are incomplete.
        </p>
      </section>

      {/* What's good */}
      <section className="container max-w-[720px] py-10">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          What's unusually good
        </p>
        <div className="space-y-3">
          {GOOD.map((g) => (
            <div
              key={g.n}
              className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 flex gap-4 items-start`}
            >
              <span className={`font-['JetBrains_Mono'] text-sm font-bold ${indigo} pt-0.5`}>{g.n}</span>
              <div>
                <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{g.title}</h3>
                <p className={`mt-1 text-sm leading-relaxed ${muted}`}>{g.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What's weak */}
      <section className="container max-w-[720px] py-6">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          What's weak / risky
        </p>
        <div className="space-y-3">
          {WEAK.map((w) => (
            <div
              key={w.n}
              className={`rounded-xl border ${border} bg-[oklch(1_0_0)] p-5 flex gap-4 items-start`}
            >
              <span className={`font-['JetBrains_Mono'] text-sm font-bold text-[oklch(0.45_0.14_30)] pt-0.5`}>
                {w.n}
              </span>
              <div>
                <h3 className={`font-['Syne'] font-semibold text-lg ${ink}`}>{w.title}</h3>
                <p className={`mt-1 text-sm leading-relaxed ${muted}`}>{w.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who this is for */}
      <section className="container max-w-[720px] py-10">
        <p className={`font-['JetBrains_Mono'] text-xs tracking-widest uppercase ${muted} mb-4`}>
          Who this is for
        </p>
        <div className={`rounded-2xl border ${border} bg-[oklch(1_0_0)] p-6 md:p-7`}>
          <table className="w-full text-sm">
            <thead>
              <tr className={`border-b ${border}`}>
                <th className={`text-left font-['JetBrains_Mono'] text-xs uppercase tracking-wider ${muted} pb-2`}>
                  Audience
                </th>
                <th className={`text-left font-['JetBrains_Mono'] text-xs uppercase tracking-wider ${muted} pb-2`}>
                  Value
                </th>
              </tr>
            </thead>
            <tbody className={`${ink}`}>
              {[
                ["Engineers studying WebGPU/TSL + Rapier browser games", "High — steal subsystems"],
                ["People wanting a finished playable game", "Low — wrong repo"],
                ["Contributors wanting to land a PR", "Hard — size + density + agent workflow"],
                ["Recruiters / portfolio readers", "Strong signal if framed as R&D atlas"],
              ].map(([aud, val]) => (
                <tr key={aud} className={`border-b ${border} last:border-0`}>
                  <td className="py-3 pr-4 font-['Inter']">{aud}</td>
                  <td className="py-3 font-['JetBrains_Mono'] text-xs">{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Verdict */}
      <section className="container max-w-[720px] py-8">
        <div className="rounded-2xl bg-[oklch(0.18_0.02_270)] text-[oklch(0.96_0.01_90)] p-7 md:p-8">
          <p className="font-['JetBrains_Mono'] text-[11px] tracking-widest uppercase text-[oklch(0.7_0.02_90)] mb-3">
            Bottom line
          </p>
          <p className="font-['Syne'] font-semibold text-xl md:text-2xl leading-snug">
            One of the denser public browser-3D R&amp;D dumps of 2026 — fixed-step Rapier, WebGPU/TSL
            materials, streaming worlds, vehicles, animals, combat, and a verification culture built
            for AI coding agents. The README's "not a finished game" disclaimer is doing real work;
            believe it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-[oklch(0.75_0.01_90)]">
            The same density is the failure mode: genre sprawl + asset bulk will keep this a personal
            lab forever unless something is cut, extracted, or productized. Steal the hex tiling, wet
            roads, mud fields, city PRNG lockstep, runtime boundary pattern, and verify-script
            culture. Don't expect a coherent title, an easy clone, or stable multiplayer.
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://github.com/ryanfitzpatrickio/threejs-playground"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-[oklch(0.18_0.02_270)] text-white px-5 py-3 text-sm font-semibold hover:bg-[oklch(0.48_0.22_275)] transition-colors"
          >
            Source on GitHub <ExternalLink className="w-4 h-4" />
          </a>
          <Link
            href="/#builder-spotlight"
            className={`inline-flex items-center gap-2 rounded-lg border ${border} bg-[oklch(1_0_0)] px-5 py-3 text-sm font-semibold ${ink} hover:border-[oklch(0.48_0.22_275)] transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" /> Back to anygame.dev
          </Link>
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
          <span className={`font-['JetBrains_Mono'] text-xs ${muted}`}>/dreamfall</span>
        </div>
      </footer>
    </div>
  );
}
