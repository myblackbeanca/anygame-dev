import { useEffect } from "react";

// Per-route SEO for a client-rendered SPA. Patches document.head imperatively
// so each route gets its own <title>, description, canonical, and OG/Twitter
// tags. This covers JS-rendering crawlers (Googlebot) and browser tab titles.
// Note: non-JS social scrapers read the STATIC index.html, so true per-route
// social cards on sub-routes still require build-time prerendering/SSR.

const ORIGIN = "https://anygame.dev";

type SeoInput = {
  title: string;
  description: string;
  path: string;          // route path, e.g. "/junegames"
  image?: string;        // absolute URL or root-relative path
  robots?: string;       // e.g. "noindex" — removed again on unmount
};

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({ title, description, path, image = "/og-image.png", robots }: SeoInput) {
  useEffect(() => {
    const url = ORIGIN + path;
    const img = image.startsWith("http") ? image : ORIGIN + image;

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    // Head edits persist across client-side navigation, so a route-scoped
    // robots directive has to be torn down when that route unmounts.
    if (!robots) return;
    upsertMeta("name", "robots", robots);
    return () => {
      document.head.querySelector('meta[name="robots"]')?.remove();
    };
  }, [title, description, path, image, robots]);
}
