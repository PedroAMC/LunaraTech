// src/components/HeroBanner.tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { id: string; title: string; img: string; href?: string };

const SLIDES: Slide[] = [
  { id: "kirby", title: "Kirby llega en 8K (guiño)", img: "/hero/kirby.jpg" },
  { id: "mario", title: "Universo Mario · accesorios", img: "/hero/mario.jpg" },
  { id: "ghost", title: "Ghost: setup samurái", img: "/hero/ghost.jpg" },
];

export default function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="full-bleed border-y border-white/10 bg-[var(--bg-0)]">
      {/* contenedor full width, sin bordes redondeados */}
      <div className="relative h-[40vh] min-h-[260px] max-h-[520px] w-screen">
        <Image
          key={SLIDES[index].id}
          src={SLIDES[index].img}
          alt={SLIDES[index].title}
          fill
          priority
          className="object-cover"
        />

        {/* overlay + título */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 to-black/20" />
        <div className="absolute bottom-4 left-1/2 w-[min(92vw,1400px)] -translate-x-1/2 px-4">
          <h3 className="text-lg font-semibold drop-shadow-sm">
            {SLIDES[index].title}
          </h3>

          {/* dots */}
          <div className="mt-3 flex items-center gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setIndex(i)}
                aria-label={`Ir al slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-6 bg-white/90" : "w-3 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
