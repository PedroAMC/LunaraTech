"use client";

import { useCart } from "@/store/cart";
import type { Product } from "@/lib/products";

type Props = {
  readonly product: Product;
};

export default function AddToCartButton({ product }: Props) {
  const add = useCart((s) => s.add);
  const disabled = (product.stock ?? 0) <= 0;

  return (
    <button
      type="button"
      onClick={() => add(product)}           // ← un solo argumento
      disabled={disabled}
      aria-disabled={disabled}
      title={disabled ? "Sin stock" : "Agregar al carrito"}
      className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-brand-600 hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft text-white disabled:opacity-50 disabled:pointer-events-none"
    >
      Agregar al carrito
    </button>
  );
}
