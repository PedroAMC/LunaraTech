"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = { id: string; title: string; img: string; href?: string };

const SLIDES: Slide[] = [
  { id: "kirby",   title: "Kirby llega en 8K (guiño)", img: "/hero/kirby.jpg" },
  { id: "mario",   title: "Universo Mario – accesorios", img: "/hero/mario.jpg" },
  { id: "ghost",   title: "Ghost: setup samurai", img: "/hero/ghost.jpg" },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timer = useRef<number | null>(null);

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const goto = (i: number) => setIndex(i % SLIDES.length);

  // autoplay cada 6s
  useEffect(() => {
    timer.current && clearTimeout(timer.current);
    timer.current = window.setTimeout(next, 6000);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [index]);

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/10">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`relative aspect-[16/7] w-full transition-opacity duration-700
                        ${i === index ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"}`}
          >
            <Image
              src={s.img}
              alt={s.title}
              fill
              priority={i === 0}
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h3 className="text-xl font-semibold">{s.title}</h3>
            </div>
          </div>
        ))}

        {/* Controles */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => goto(i)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-2 w-2 rounded-full transition-all
                         ${i === index ? "w-6 bg-white" : "bg-white/50 hover:bg-white/80"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
