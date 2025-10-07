// src/components/CarouselRail.tsx
"use client";

import { useRef } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function CarouselRail({ items }: { items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="relative mx-auto max-w-6xl px-4">
      <h2 className="mb-3 text-lg font-semibold">Destacados</h2>

      {/* Botones centrados superpuestos */}
      <button
        aria-label="Anterior"
        onClick={() => scrollBy(-320)}
        className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 hover:bg-black/80"
      >
        ◀
      </button>
      <button
        aria-label="Siguiente"
        onClick={() => scrollBy(320)}
        className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/60 p-2 hover:bg-black/80"
      >
        ▶
      </button>

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
    </section>
  );
}
