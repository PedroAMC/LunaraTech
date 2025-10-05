"use client";
import Link from "next/link";
import { products } from "@/lib/products";
import { useCart } from "@/store/cart";

type Props = { params: { slug: string } };

export default function ProductoDetalle({ params }: Props) {
  const add = useCart((s) => s.add);
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl p-6">
        <Link href="/productos" className="underline">&larr; volver</Link>
        <h1 className="text-2xl font-semibold mt-4">Producto no encontrado</h1>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <Link href="/productos" className="underline">&larr; volver</Link>
      <h1 className="text-2xl font-semibold mt-2">{product.name}</h1>
      <p className="mt-2 opacity-80">Detalle placeholder. Aquí irá la info real.</p>
      <button
        className="mt-4 rounded bg-brand-600 px-4 py-2 text-white hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft transition-all ease-soft"
        onClick={() => add({ id: product.slug, name: product.name, price: product.price, qty: 1 })}
      >
        Agregar al carrito (${product.price.toLocaleString("es-CL")})
      </button>
    </main>
  );
}
