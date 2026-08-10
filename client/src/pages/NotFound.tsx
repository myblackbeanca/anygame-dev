import { ArrowRight } from "lucide-react";
import { Link, useLocation } from "wouter";
import { PickUpSticksMark, ResearchNav } from "@/components/brand";
import { useSeo } from "@/lib/useSeo";

export default function NotFound() {
  // The SPA rewrite serves this at HTTP 200 under any unmatched path, so
  // robots is what actually keeps the 404 out of the index. The canonical is
  // self-referencing rather than "/" so it never vouches for a page that 404s.
  const [location] = useLocation();
  useSeo({
    title: "Page not found · anygame.dev",
    description:
      "This page sits outside the current anygame.dev research atlas. Return to the map to browse the AI-in-game-development research.",
    path: location,
    robots: "noindex, follow",
  });
  return (
    <div className="theme-light min-h-screen bg-background">
      <ResearchNav label="404 / Lost Signal" />

      <main className="container grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 md:grid-cols-[minmax(0,1fr)_minmax(20rem,0.7fr)] md:py-24">
        <div className="max-w-2xl">
          <div className="mb-7 font-['JetBrains_Mono'] text-[11px] uppercase text-[oklch(0.48_0.22_275)]">
            Atlas error / 404
          </div>
          <h1 className="font-['Syne'] text-5xl font-extrabold leading-[0.95] text-[oklch(0.18_0.02_270)] sm:text-6xl md:text-8xl">
            Signal lost.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[oklch(0.52_0.015_275)] md:text-xl">
            This page sits outside the current research atlas. Return to the map
            and pull another thread.
          </p>
          <Link
            href="/"
            className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-lg bg-[oklch(0.48_0.22_275)] px-5 py-3 font-['Inter'] text-sm font-semibold text-white transition-colors hover:bg-[oklch(0.4_0.22_275)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
          >
            Return to the research atlas
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-sm" aria-hidden="true">
          <div className="absolute -left-5 top-1/2 font-['JetBrains_Mono'] text-[clamp(7rem,22vw,13rem)] font-bold leading-none text-[oklch(0.95_0.018_275)] md:-left-24">
            404
          </div>
          <PickUpSticksMark
            className="relative z-10 aspect-square w-full"
            decorative
          />
          <div className="relative z-10 mt-5 border-t border-[oklch(0.88_0.008_280)] pt-3 text-right font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.48_0.22_275)]">
            Re-enter at the atlas index
          </div>
        </div>
      </main>
    </div>
  );
}
