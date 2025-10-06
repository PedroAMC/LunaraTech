"use client";
import { useRef } from "react";
import type { Product } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function CarouselRail({ items }: { items: Product[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const scrollBy = (dx: number) => ref.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Destacados</h2>
        <div className="flex gap-2">
          <button onClick={() => scrollBy(-320)} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">◀</button>
          <button onClick={() => scrollBy(320)} className="px-2 py-1 rounded bg-white/10 hover:bg-white/20">▶</button>
        </div>
      </div>

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
