"use client";

import { useCart } from "@/store/cart";

type Props = { params: { slug: string } };

export default function ProductoDetalle({ params }: Props) {
  const add = useCart((s) => s.add);

  // Producto ficticio solo para la demo (usa el slug como nombre)
  const product = {
    id: params.slug,
    name: params.slug.replace(/-/g, " "),
    price: 12990,
  };

  return (
    <main className="mx-auto max-w-3xl p-6">
      <a href="/productos" className="underline">
        ← volver
      </a>

      <h1 className="text-2xl font-semibold mt-2">{product.name}</h1>
      <p className="mt-2 opacity-80">
        Detalle placeholder. Aquí irá la info real más adelante.
      </p>

      <button
        className="mt-4 rounded bg-blue-600 px-4 py-2 text-white"
        onClick={() =>
          add({ id: product.id, name: product.name, price: product.price, qty: 1 })
        }
      >
        Agregar al carrito (${product.price.toLocaleString("es-CL")})
      </button>
    </main>
  );
}
