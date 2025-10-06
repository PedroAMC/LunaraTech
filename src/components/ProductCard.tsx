"use client";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ p }: { p: Product }) {
  const inStock = p.stock > 0;
  const low = p.stock > 0 && p.stock <= 5;

  return (
    <div className="card p-4 hover:translate-y-[-2px]">
      {/* Placeholder de imagen (luego cambiamos por <Image />) */}
      <div className="aspect-[4/3] w-full rounded-lg bg-white/10 mb-3 grid place-items-center text-white/60 text-sm">
        Imagen
      </div>

      <h3 className="font-medium">{p.name}</h3>
      <p className="mt-1 text-white/70">${p.price.toLocaleString("es-CL")}</p>

      <div className="mt-2 text-sm">
        {inStock ? (
          low ? (
            <span className="text-amber-300">¡Quedan {p.stock}!</span>
          ) : (
            <span className="text-emerald-300">En stock</span>
          )
        ) : (
          <span className="text-rose-300">Sin stock</span>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button
          className="rounded-md px-3 py-1.5 bg-brand-600 hover:bg-brand-500 font-medium disabled:opacity-50"
          disabled={!inStock}
          title={inStock ? "Agregar al carrito" : "Sin stock"}
        >
          Agregar
        </button>
        <Link
          href={`/producto/${p.id}`}
          className="rounded-md px-3 py-1.5 bg-white/5 hover:bg-white/10"
        >
          Ver detalle
        </Link>
      </div>
    </div>
  );
}
