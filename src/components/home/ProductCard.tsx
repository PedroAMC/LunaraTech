// src/components/home/ProductCard.tsx
"use client";

import Link from "next/link";
import type { Product as BaseProduct } from "@/lib/products";
import { useCart } from "@/store/cart";

type CardProduct = BaseProduct & {
  image?: string | null;
};

export default function ProductCard({ p }: { p: CardProduct }) {
  const add = useCart((s) => s.add);
  const inStock = (p.stock ?? 0) > 0;

  const imageSrc = p.image ?? "/placeholders/product-generic.png";

  return (
    <article
      className="
        group relative w-full p-4
        bg-[#0c0e12] border border-transparent
        shadow-[0_0_10px_rgba(0,0,0,0.5)]
        hover:shadow-[0_0_25px_rgba(0,180,255,0.25)]
        hover:border-cyan-400/40
        transition-all duration-300
      "
    >
      <div
        className="
          relative z-10 mb-3 w-full h-52 overflow-hidden
          flex justify-center items-center bg-transparent
        "
      >
        <img
          src={imageSrc}
          alt={p.name}
          className="
            object-contain w-full h-full
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      <div className="relative z-10">
        <h3
          className="
            mb-1 text-base font-semibold tracking-wide text-white
            transition group-hover:text-cyan-300
          "
        >
          {p.name}
        </h3>

        <p className="mb-1 text-sm text-gray-400">
          ${p.price.toLocaleString("es-CL")}
        </p>

        {inStock ? (
          <p className="mb-3 text-xs font-medium text-cyan-300">En stock</p>
        ) : (
          <p className="mb-3 text-xs font-medium text-rose-400">Sin stock</p>
        )}
      </div>

      <div className="relative z-10 mt-2 flex gap-2">
        <button
          disabled={!inStock}
          onClick={() => add(p)}
          className="
            flex-1 px-3 py-2 text-sm font-medium uppercase tracking-wide
            bg-gradient-to-r from-cyan-600 to-blue-600
            hover:from-cyan-500 hover:to-blue-500
            text-white
            transition-all duration-300
            disabled:opacity-40 disabled:cursor-not-allowed
          "
        >
          Agregar
        </button>

        <Link
          href={`/producto/${p.slug}`}
          className="
            flex-1 px-3 py-2 text-sm text-center uppercase tracking-wide
            border border-white/10 text-white/80
            hover:border-cyan-400/40 hover:text-white
            transition-all duration-300
          "
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
