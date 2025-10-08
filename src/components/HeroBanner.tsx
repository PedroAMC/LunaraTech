// src/components/HeroBanner.tsx
"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Slide = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: string; // si no hay, usa gradiente
};

const SLIDES: Slide[] = [
  { title: "Universo Mario · accesorios", image: "/hero/mario.jpg" },
  { title: "Ghost: setup samurái", image: "/hero/ghost.jpg" },
  { title: "Kirby llega en 8K (guiño)", image: "/hero/kirby.jpg" }, // extra
];

export default function HeroBanner({ interval = 5000 }: { interval?: number }) {
  const [idx, setIdx] = useState(0);
  const safeSlides = useMemo(() => SLIDES, []);
  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % safeSlides.length), interval);
    return () => clearInterval(t);
  }, [safeSlides.length, interval]);

  if (!safeSlides.length) return null;
  const s = safeSlides[idx];

  return (
    <section className="w-full">
      {/* Contenedor full-bleed sin límite lateral */}
      <div
        className="relative overflow-hidden border-b border-white/10"
        // Altura: más alta en desktop (+50% aprox.)
        style={{
          height: "min(70vh, 540px)", // desktop
        }}
      >
        {/* Imagen/gradiente de fondo */}
        <div className="absolute inset-0">
          {s.image ? (
            <Image
              src={s.image}
              alt={s.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background:
                  "linear-gradient(135deg, rgba(30,58,138,.6), rgba(2,6,23,.6)), radial-gradient(1200px 800px at 10% -10%, #0f172a 10%, #0b0f19 60%)",
              }}
            />
          )}
          {/* oscurecer un poco para legibilidad */}
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* Contenido inferior (título, CTA, bullets) */}
        <div className="relative z-10 flex h-full items-end">
          <div className="mx-auto w-full max-w-6xl px-4 pb-6 sm:pb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold drop-shadow">
              {s.title}
            </h2>

            {/* Dots */}
            <div className="mt-4 flex gap-2">
              {safeSlides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir al slide ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === idx ? "w-8 bg-white/90" : "w-3 bg-white/50 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
