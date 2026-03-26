// src/components/home/NewsTicker.tsx
"use client";

import { useEffect, useRef, useState } from "react";

const RSS_FEEDS = [
  "https://techcrunch.com/feed/",
  "https://www.nasa.gov/rss/dyn/breaking_news.rss",
  "https://www.space.com/feeds/all",
];

export default function NewsTicker() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllFeeds = async () => {
      setLoading(true);

      try {
        const results = await Promise.all(
          RSS_FEEDS.map((url) =>
            fetch(url)
              .then((r) => r.text())
              .then((data) => {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, "text/xml");
                const titles = Array.from(
                  xml.querySelectorAll("item > title")
                )
                  .slice(0, 4)
                  .map((n) => ({
                    icon: "📰",
                    text: n.textContent?.replace(" - TechCrunch", "") || "",
                  }));
                return titles;
              })
              .catch(() => [])
          )
        );

        const merged = results.flat();

        const clean = Array.from(
          new Map(merged.map((n) => [n.text, n])).values()
        ).filter((n) => n.text.length > 10);

        setItems(clean);
        setLoading(false);
      } catch {
        setError("Error al obtener noticias externas");
        setLoading(false);
      }
    };

    fetchAllFeeds();
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    let raf = 0;
    let x = 0;
    const step = () => {
      x = (x + 0.3) % el.scrollWidth;
      el.scrollLeft = x;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  return (
    <div className="full-bleed border-b border-white/10 bg-[var(--surface-2)] text-white/90 select-none">
      <div
        ref={wrapRef}
        className="mx-auto flex max-w-[1400px] gap-6 overflow-x-auto whitespace-nowrap px-4 py-2 [scrollbar-width:none]"
      >
        {loading && <span>Cargando noticias...</span>}
        {error && <span>{error}</span>}
        {items.length === 0 && !loading && !error && (
          <span>No se encontraron noticias.</span>
        )}
        {items.map((it, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 opacity-90 hover:opacity-100 transition"
          >
            <span>{it.icon}</span>
            <span className="text-sm">{it.text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
