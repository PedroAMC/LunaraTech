// src/components/HeroBanner.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  image?: string; // opcional: si no hay, mostramos gradiente
};

const SLIDES: Slide[] = [
  { title: "Kirby llega en 8K (guiño)", image: "/hero/kirby.jpg" },
  { title: "Universo Mario — accesorios", image: "/hero/mario.jpg" },
  { title: "Ghost: setup samurái", image: "/hero/ghost.jpg" },
];

export default function HeroBanner({ interval = 4000 }: { interval?: number }) {
  const [idx, setIdx] = useState(0);
  const slides = useMemo(() => SLIDES, []);
  const s = slides[idx];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), interval);
    return () => clearInterval(t);
  }, [slides.length, interval]);

  return (
    <section className="full-bleed mt-0">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/10">
          <div className="relative h-[36vh] md:h-[40vh]">
            {s.image ? (
              <Image
                src={s.image}
                alt={s.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-brand-900/40 via-brand-700/20 to-transparent" />
            )}

            {/* caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-black/0 p-4 md:p-6">
              <h3 className="text-base md:text-lg font-medium">{s.title}</h3>
            </div>
          </div>

          {/* dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Ir al slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={
                  "h-1.5 w-6 rounded-full transition-all " +
                  (i === idx ? "bg-white/80" : "bg-white/35 hover:bg-white/60")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
