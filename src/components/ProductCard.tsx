"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/store/cart";

export default function ProductCard({ p }: { p: Product }) {
  const add = useCart((s) => s.add);

  const inStock = (p.stock ?? 0) > 0;

  return (
    <article className="card p-4">
      {/* Imagen */}
      <div className="mb-3 aspect-[4/3] w-full rounded-lg border border-white/10 bg-white/[.03] grid place-items-center text-sm text-white/40">
        Imagen
      </div>

      {/* Info */}
      <h3 className="font-medium">{p.name}</h3>
      <p className="text-sm text-white/70">${p.price.toLocaleString("es-CL")}</p>

      {inStock ? (
        <p className="mt-1 text-xs text-emerald-400">En stock</p>
      ) : (
        <p className="mt-1 text-xs text-rose-400">Sin stock</p>
      )}

      {/* Acciones */}
      <div className="mt-3 flex gap-2">
        <button
          disabled={!inStock}
          onClick={() => add(p)}
          className="rounded-lg bg-brand-600 px-3 py-1.5 text-sm text-white hover:bg-brand-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Agregar
        </button>

        <Link
          href={`/producto/${p.slug}`}
          className="rounded-lg border border-white/15 px-3 py-1.5 text-sm hover:bg-white/10"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
