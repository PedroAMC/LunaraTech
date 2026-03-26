// src/components/home/Hero.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Btn = { href: string; label: string };

type Slide = {
  id: number;
  badge: string;
};

type Props = {
  title: string;
  subtitle: string;
  ctaPrimary: Btn;
  ctaSecondary?: Btn;
};

const SLIDES: Slide[] = [
  { id: 1, badge: "CONFIANZA LUNARATECH" },
  { id: 2, badge: "ENVÍOS A TODO CHILE" },
  { id: 3, badge: "HARDWARE CURADO" },
];

export default function Hero({
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
}: Props) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % SLIDES.length),
      7000
    );
    return () => clearInterval(timer);
  }, []);

  const current = SLIDES[index];

  const next = () => setIndex((i) => (i + 1) % SLIDES.length);
  const prev = () => setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative">
      <div className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-4 py-1 text-xs font-medium text-cyan-200">
          <span>{current.badge}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-xl">
          {subtitle}
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <Link
            href={ctaPrimary.href}
            className="
              px-5 py-3 rounded-lg text-sm font-medium text-white
              bg-gradient-to-r from-sky-500 to-cyan-400
              hover:from-sky-400 hover:to-cyan-300
              transition-colors
            "
          >
            {ctaPrimary.label}
          </Link>
          {ctaSecondary && (
            <Link
              href={ctaSecondary.href}
              className="
                px-5 py-3 rounded-lg border border-white/15
                bg-white/0 hover:bg-white/5
                text-sm font-medium text-white
                transition-colors
              "
            >
              {ctaSecondary.label}
            </Link>
          )}
        </div>
      </div>

      <button
        onClick={prev}
        aria-label="Slide anterior"
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 hover:bg-black/80"
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </button>

      <button
        onClick={next}
        aria-label="Siguiente slide"
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 hover:bg-black/80"
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </button>

      <div className="mt-4 flex gap-2">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-cyan-400" : "w-2 bg-white/25"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
