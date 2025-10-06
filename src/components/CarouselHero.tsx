"use client";

import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: string; // opcional; si no hay, usa gradiente
};

export default function CarouselHero({ slides, interval = 3000 }: { slides: Slide[]; interval?: number }) {
  const [idx, setIdx] = useState(0);
  const safeSlides = useMemo(() => slides ?? [], [slides]);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % safeSlides.length), interval);
    return () => clearInterval(t);
  }, [safeSlides.length, interval]);

  const s = safeSlides[idx];
  if (!s) return null;

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="relative overflow-hidden rounded-2xl border" style={{ borderColor: "var(--surface-border)" }}>
        <div
          className="aspect-[16/6] w-full bg-center bg-cover"
          style={{
            backgroundImage: s.image
              ? `url(${s.image})`
              : "linear-gradient(135deg,#1d4ed8 0%,#0ea5e9 50%,#14b8a6 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="p-6 md:p-10">
            <h2 className="text-2xl md:text-4xl font-semibold title-grad">{s.title}</h2>
            {s.subtitle && <p className="mt-2 max-w-xl opacity-90">{s.subtitle}</p>}
            {s.ctaText && s.ctaHref && (
              <a
                href={s.ctaHref}
                className="mt-5 inline-flex items-center rounded-lg bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-500"
              >
                {s.ctaText}
              </a>
            )}
          </div>
        </div>

        {/* bullets */}
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          {safeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`h-2 w-2 rounded-full ${i === idx ? "bg-white" : "bg-white/50"}`}
              aria-label={`Ir al slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
