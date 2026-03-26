// src/components/home/HeroPanel.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Cta = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

type Slide = {
  id: string;
  badge: string;
  title: string;
  description: string;
  ctas: Cta[];
  image: string;
};

const slides: Slide[] = [
  {
    id: "hardware",
    badge: "CURATED HARDWARE",
    title: "Stock real, fast shipping",
    description:
      "What you see is what we ship. No smoke, just serious components for your setup.",
    ctas: [
      { label: "Browse catalog", href: "/productos", variant: "primary" },
      {
        label: "View GPUs & CPUs",
        href: "/productos?cat=hardware",
        variant: "ghost",
      },
    ],
    image: "/placeholders/hero-hardware-pro.jpg",
  },
  {
    id: "custom-builds",
    badge: "CUSTOM BUILDS",
    title: "We build, you launch",
    description:
      "From clean minimal rigs to full ARGB rockets, we assemble and tune it for you.",
    ctas: [
      { label: "Custom PCs", href: "/colecciones/custom-pc", variant: "primary" },
      { label: "See presets", href: "/colecciones", variant: "ghost" },
    ],
    image: "/placeholders/hero-custom-pro.jpg",
  },
  {
    id: "lunara-ai",
    badge: "LUNARA AI & PRO",
    title: "Power for creators & AI",
    description:
      "Workstations, displays and storage tuned for rendering, editing and AI workloads.",
    ctas: [
      { label: "Creator gear", href: "/productos?tag=creator", variant: "primary" },
      { label: "Explore all", href: "/productos", variant: "ghost" },
    ],
    image: "/placeholders/hero-ai-pro.jpg",
  },
];

export default function HeroPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      8000
    );
    return () => clearInterval(timer);
  }, []);

  const current = slides[index];

  const goTo = (i: number) => {
    const len = slides.length;
    setIndex(((i % len) + len) % len);
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  return (
    <section className="relative full-bleed bg-transparent">
      <div
        className="
          relative overflow-hidden bg-black/95 border-b border-cyan-900/40
          shadow-[0_18px_80px_rgba(0,0,0,0.9)]
          px-6 sm:px-10 lg:px-16
          pt-12 pb-16
          min-h-[620px]         // ← HERO AGRANDADO
        "
      >
        {/* Background */}
        <div className="absolute inset-0">
          <img
            key={current.id}
            src={current.image}
            alt={current.title}
            className="h-full w-full object-cover opacity-40 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/92 via-black/85 to-sky-900/18" />
        </div>

        {/* Text + CTAs */}
        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center rounded-full border border-cyan-400/50 bg-black/40 px-5 py-2 text-xs font-medium tracking-[0.16em] uppercase text-cyan-200">
            {current.badge}
          </div>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white">
            {current.title}
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-neutral-300">
            {current.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            {current.ctas.map((cta, i) => {
              const base =
                "inline-flex items-center justify-center px-6 py-3 rounded-full text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/80";

              if (cta.variant === "ghost") {
                return (
                  <Link
                    key={i}
                    href={cta.href}
                    className={
                      base +
                      " border border-white/18 bg-transparent text-white/90 hover:bg-white/5 hover:text-cyan-300"
                    }
                  >
                    {cta.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={i}
                  href={cta.href}
                  className={
                    base +
                    " bg-gradient-to-r from-sky-500 to-cyan-400 text-black hover:from-sky-400 hover:to-cyan-300"
                  }
                >
                  {cta.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="relative z-10 mt-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label="Previous highlight"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/60 hover:bg-black hover:border-cyan-400/70 transition"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>

            <button
              onClick={next}
              aria-label="Next highlight"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-black/60 hover:bg-black hover:border-cyan-400/70 transition"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <button
                  key={slide.id}
                  onClick={() => goTo(i)}
                  aria-label={slide.title}
                  className={`h-2 rounded-full transition-all ${
                    active
                      ? "w-8 bg-cyan-400"
                      : "w-2.5 bg-white/26 hover:bg-cyan-300/70"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
