"use client";
import { useRef } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function CarouselRail({ items }: { items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Destacados</h2>
      </div>

      <div className="relative">
        {/* carrusel */}
        <div
          ref={ref}
          className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory [scrollbar-width:none]"
          style={{ scrollBehavior: "smooth" }}
        >
          {items.map((p) => (
            <div key={p.id} className="min-w-[280px] snap-start">
              <ProductCard p={p} />
            </div>
          ))}
        </div>

        {/* Controles flotantes */}
        <button
          onClick={() => scrollBy(-320)}
          aria-label="Anterior"
          className="group absolute left-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] border border-white/10 shadow hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" className="opacity-90">
            <path d="M12.5 4l-5 6 5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          onClick={() => scrollBy(320)}
          aria-label="Siguiente"
          className="group absolute right-2 top-1/2 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] border border-white/10 shadow hover:bg-white/10"
        >
          <svg width="18" height="18" viewBox="0 0 20 20" className="opacity-90">
            <path d="M7.5 4l5 6-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </section>
  );
}
