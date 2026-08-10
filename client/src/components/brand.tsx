import { Fragment, useEffect, useRef, type ReactNode, type SVGProps } from "react";
import { Link } from "wouter";

export const ATLAS_LINKS = [
  {
    number: "01",
    short: "AI Tools",
    label: "AI Tooling Landscape",
    href: "/ai-tools",
  },
  {
    number: "02",
    short: "Open Source",
    label: "Open Source Ecosystem",
    href: "/open-source",
  },
  {
    number: "03",
    short: "Case Studies",
    label: "Case Studies",
    href: "/case-studies",
  },
  {
    number: "04",
    short: "Geo Market",
    label: "Geographic Markets",
    href: "/geo-market",
  },
  {
    number: "05",
    short: "Outlook",
    label: "Forward Look 2026-2030",
    href: "/outlook",
  },
  {
    number: "06",
    short: "Kaggle Data",
    label: "Data-Driven Insights",
    href: "/kaggle-insights",
  },
] as const;

type MarkProps = SVGProps<SVGSVGElement> & {
  decorative?: boolean;
};

export function PickUpSticksMark({
  className = "",
  decorative = false,
  ...props
}: MarkProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "anygame.dev pick-up sticks mark"}
      {...props}
    >
      <circle
        cx="60"
        cy="60"
        r="53"
        fill="oklch(0.98 0.003 280)"
        stroke="oklch(0.18 0.02 270)"
        strokeWidth="2"
      />
      <g strokeWidth="5" strokeLinecap="round">
        <line x1="28" y1="78" x2="92" y2="38" stroke="oklch(0.66 0.18 35)" />
        <line x1="34" y1="32" x2="86" y2="88" stroke="oklch(0.62 0.14 225)" />
        <line x1="22" y1="52" x2="98" y2="62" stroke="oklch(0.72 0.14 85)" />
        <line x1="48" y1="22" x2="58" y2="98" stroke="oklch(0.62 0.14 160)" />
        <line x1="70" y1="24" x2="40" y2="94" stroke="oklch(0.18 0.02 270)" />
      </g>
      <g className="brand-lift-stick">
        <line
          x1="76"
          y1="30"
          x2="104"
          y2="18"
          stroke="oklch(0.48 0.22 275)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="104" cy="18" r="3.5" fill="oklch(0.48 0.22 275)" />
      </g>
    </svg>
  );
}

export function AnygameWordmark({
  compact = false,
  className = "",
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex min-w-0 items-center gap-2.5 ${className}`}>
      <PickUpSticksMark
        className={compact ? "h-7 w-7 shrink-0" : "h-9 w-9 shrink-0"}
      />
      <span
        className={`font-['Syne'] font-extrabold leading-none text-[oklch(0.18_0.02_270)] ${
          compact ? "text-sm sm:text-base" : "text-lg"
        }`}
      >
        anygame<span className="text-[oklch(0.48_0.22_275)]">.dev</span>
      </span>
    </span>
  );
}

export function ResearchNav({ label }: { label: string }) {
  return (
    <nav className="sticky top-0 z-50 border-b border-[oklch(0.88_0.008_280)] bg-[oklch(0.99_0.002_280/0.96)] backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex min-h-11 min-w-0 items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[oklch(0.48_0.22_275)] focus-visible:ring-offset-4"
          aria-label="Back to The New Engine home"
        >
          <PickUpSticksMark className="h-7 w-7 shrink-0" decorative />
          <span className="border-l border-[oklch(0.88_0.008_280)] pl-3 font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)]">
            The New Engine
          </span>
        </Link>
        <span className="max-w-[45%] truncate text-right font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.52_0.015_275)] sm:text-xs">
          {label}
        </span>
      </div>
    </nav>
  );
}

type FooterLink = {
  href: string;
  label: string;
  /** Off-site links render as a plain anchor; routes go through the router. */
  external?: boolean;
};

/**
 * The one-line research footer shared by every brief, atlas and archive page.
 * Pages that need a different shape (Dreamfall, Modmixer) keep their own.
 */
export function ResearchFooter({
  label,
  links = [],
  note,
}: {
  label: string;
  links?: readonly FooterLink[];
  note?: ReactNode;
}) {
  return (
    <footer className="border-t border-[oklch(0.88_0.008_280)] py-8">
      <div className="container space-y-1 font-['JetBrains_Mono'] text-[11px] text-[oklch(0.52_0.015_275)]">
        <p>
          anygame.dev — {label}
          {links.map(l => (
            <Fragment key={l.href}>
              {" · "}
              {l.external ? (
                <a href={l.href} className="text-[oklch(0.48_0.22_275)]">
                  {l.label}
                </a>
              ) : (
                <Link href={l.href} className="text-[oklch(0.48_0.22_275)]">
                  {l.label}
                </Link>
              )}
            </Fragment>
          ))}
        </p>
        {note ? <p>{note}</p> : null}
      </div>
    </footer>
  );
}

/** Shared footer links, so a route rename lands in one place. */
export const MINY_PLAY_LINK: FooterLink = {
  href: "https://freeintelligence.ai/miny-play/",
  label: "Read → Play → Own",
  external: true,
};

export const ARCHIVE_LINK: FooterLink = {
  href: "/july-archive",
  label: "June-July 2026 Archive",
};

export function AtlasStrip({ current }: { current: string }) {
  const stripRef = useRef<HTMLDivElement>(null);
  /** True once the reader has scrolled the strip themselves. */
  const userTookOverRef = useRef(false);
  /** Set immediately before our own scrollLeft write, so onScroll can skip it. */
  const programmaticRef = useRef(false);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    // A new route means a new active tab, so auto-centering earns another turn.
    userTookOverRef.current = false;

    const centerActive = () => {
      if (userTookOverRef.current) return;
      const active = strip.querySelector<HTMLElement>('[aria-current="page"]');
      if (!active || strip.scrollWidth <= strip.clientWidth) return;

      const target = Math.max(
        0,
        active.offsetLeft - (strip.clientWidth - active.clientWidth) / 2
      );
      // A write that changes nothing fires no scroll event, which would strand
      // the flag and make us mistake the reader's next real scroll for our own.
      if (target === strip.scrollLeft) return;
      programmaticRef.current = true;
      strip.scrollLeft = target;
    };

    // The browser fires scroll for our own writes as well as the reader's
    // swipes, so the flag above is what tells the two apart.
    const onScroll = () => {
      if (programmaticRef.current) {
        programmaticRef.current = false;
        return;
      }
      // The reader put the strip where they want it. Leave it there rather
      // than snapping back on the next resize; the route change resets this.
      userTookOverRef.current = true;
    };

    strip.addEventListener("scroll", onScroll, { passive: true });
    const frame = window.requestAnimationFrame(centerActive);
    const resizeObserver = new ResizeObserver(centerActive);
    resizeObserver.observe(strip);

    return () => {
      strip.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, [current]);

  return (
    <nav
      aria-label="Research Atlas"
      className="sticky top-16 z-40 border-b border-[oklch(0.88_0.008_280)] bg-[oklch(1_0_0/0.96)] backdrop-blur-md"
    >
      <div
        ref={stripRef}
        className="container flex min-h-11 items-stretch overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <span className="hidden shrink-0 items-center border-r border-[oklch(0.88_0.008_280)] pr-5 font-['JetBrains_Mono'] text-[10px] uppercase text-[oklch(0.48_0.22_275)] lg:flex">
          Atlas index
        </span>
        {ATLAS_LINKS.map(item => {
          const active = item.href === current;
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-w-[8.5rem] items-center gap-2 border-r border-[oklch(0.9_0.006_280)] px-4 py-2 font-['JetBrains_Mono'] text-[10px] uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[oklch(0.48_0.22_275)] ${
                active
                  ? "bg-[oklch(0.96_0.025_275)] text-[oklch(0.36_0.2_275)]"
                  : "text-[oklch(0.52_0.015_275)] hover:bg-[oklch(0.98_0.006_275)] hover:text-[oklch(0.18_0.02_270)]"
              }`}
            >
              <span
                className={
                  active ? "font-bold" : "text-[oklch(0.64_0.015_275)]"
                }
              >
                {item.number}
              </span>
              <span className="whitespace-nowrap">{item.short}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
