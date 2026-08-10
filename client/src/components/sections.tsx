// ============================================================
// Shared section infrastructure — extracted from Home.tsx
// Used by: Home, AiTools, OpenSource, CaseStudies, GeoMarket, Outlook
// ============================================================
import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import {
  AnygameWordmark,
  ATLAS_LINKS,
  PickUpSticksMark,
} from "@/components/brand";

// ── Utility: media-query hook ────────────────────────────────
export function useMediaQuery(query: string) {
  const get = () =>
    typeof window !== "undefined" && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

// ── Utility: Intersection Observer hook ──────────────────────
export function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ── Section wrapper ──────────────────────────────────────────
export function Section({
  id,
  number,
  label,
  children,
  alt = false,
}: {
  id?: string;
  number: string;
  label: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${alt ? "bg-[oklch(0.97_0.01_275)]" : "bg-[#ffffff]"}`}
    >
      <div className="container" ref={ref}>
        <div className="relative mb-10 md:mb-16">
          <div className="section-number absolute -top-6 md:-top-8 left-0 md:-left-4 select-none">
            {number}
          </div>
          <div
            className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <div className="section-divider">
              <span className="section-divider-label">{label}</span>
            </div>
          </div>
        </div>
        <div
          className={`transition-all duration-700 delay-150 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}

// ── Chart styles (light) ────────────────────────────────────
export const tooltipStyle = {
  contentStyle: {
    background: "oklch(1 0 0)",
    border: "1px solid oklch(0.88 0.008 280)",
    borderRadius: "6px",
    fontFamily: "JetBrains Mono",
    fontSize: "12px",
    color: "oklch(0.18 0.02 270)",
    boxShadow: "0 8px 28px rgba(0,0,0,0.12)",
  },
  labelStyle: { color: "oklch(0.18 0.02 270)", fontWeight: 700 },
  itemStyle: { color: "oklch(0.48 0.22 275)" },
};

export const gridColor = "oklch(0.90 0.006 280)";
export const tickStyle = {
  fill: "oklch(0.36 0.012 275)",
  fontSize: 11,
  fontFamily: "JetBrains Mono",
};

// ── "More from anygame.dev" footer — keeps all pages connected ──
export function MoreDeepDives({ current }: { current: string }) {
  const briefs = [
    { tag: "August brief", title: "AI-Native Game Dev", href: "/augusttrends" },
    {
      tag: "Community pulse",
      title: "What developers said",
      href: "/august-pulse",
    },
    { tag: "Archive", title: "June-July 2026", href: "/july-archive" },
  ] as const;

  return (
    <section className="border-y border-[oklch(0.88_0.008_280)] bg-[oklch(0.97_0.01_275)] py-12 md:py-16">
      <div className="container max-w-[1180px]">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <PickUpSticksMark className="h-9 w-9" />
              <div className="font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.48_0.22_275)]">
                Research Atlas
              </div>
            </div>
            <h2 className="max-w-xl font-['Syne'] text-2xl font-bold text-[oklch(0.18_0.02_270)] md:text-3xl">
              Pull another thread without losing the map.
            </h2>
          </div>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center font-['JetBrains_Mono'] text-[11px] uppercase text-[oklch(0.48_0.22_275)] hover:text-[oklch(0.34_0.2_275)]"
          >
            Back to the full atlas →
          </Link>
        </div>

        <div className="grid border-l border-t border-[oklch(0.88_0.008_280)] sm:grid-cols-2 lg:grid-cols-5">
          {ATLAS_LINKS.map(item => {
            const active = item.href === current;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group min-h-32 border-b border-r border-[oklch(0.88_0.008_280)] p-5 transition-colors ${
                  active
                    ? "bg-[oklch(0.48_0.22_275)] text-white"
                    : "bg-white text-[oklch(0.18_0.02_270)] hover:bg-[oklch(0.985_0.006_275)]"
                }`}
              >
                <div
                  className={`font-['JetBrains_Mono'] text-[10px] ${active ? "text-white/70" : "text-[oklch(0.48_0.22_275)]"}`}
                >
                  {item.number}
                </div>
                <div className="mt-6 font-['Syne'] text-base font-semibold leading-snug">
                  {item.label}
                </div>
                <div
                  className={`mt-2 font-['JetBrains_Mono'] text-[10px] uppercase ${active ? "text-white/70" : "text-[oklch(0.52_0.015_275)]"}`}
                >
                  {active ? "Current page" : "Open deep dive →"}
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-[oklch(0.88_0.008_280)] pt-5">
          <AnygameWordmark compact className="mr-auto" />
          {briefs
            .filter(item => item.href !== current)
            .map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="group inline-flex min-h-11 flex-col justify-center"
              >
                <span className="block font-['JetBrains_Mono'] text-[9px] uppercase text-[oklch(0.52_0.015_275)]">
                  {item.tag}
                </span>
                <span className="font-['Syne'] text-sm font-semibold text-[oklch(0.18_0.02_270)] group-hover:text-[oklch(0.48_0.22_275)]">
                  {item.title} →
                </span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
