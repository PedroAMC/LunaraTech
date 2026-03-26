"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCart } from "@/store/cart";

export default function ProductCard({ p }: { p: Product }) {
  const add = useCart((s) => s.add);

  const inStock = (p.stock ?? 0) > 0;

  return (
    <article className="product-card p-4 w-full sm:w-48 md:w-64 rounded-lg bg-white text-black shadow-md mb-6">
      {/* Imagen */}
      <div className="image-container mb-3 w-full h-40 bg-gray-200 rounded-lg flex justify-center items-center">
        <span>Imagen</span>
      </div>

      {/* Info */}
      <h3 className="text-lg font-medium mb-2">{p.name}</h3>
      <p className="text-sm text-gray-600">${p.price.toLocaleString("es-CL")}</p>

      {inStock ? (
        <p className="mt-1 text-xs text-green-500">En stock</p>
      ) : (
        <p className="mt-1 text-xs text-red-500">Sin stock</p>
      )}

      {/* Acciones */}
      <div className="mt-3 flex gap-2">
        <button
          disabled={!inStock}
          onClick={() => add(p)}
          className="w-full bg-blue-600 text-white px-3 py-1 rounded-md disabled:opacity-50"
        >
          Agregar
        </button>

        <Link
          href={`/producto/${p.slug}`}
          className="w-full bg-gray-300 text-black px-3 py-1 rounded-md text-center"
        >
          Ver detalle
        </Link>
      </div>
    </article>
  );
}
