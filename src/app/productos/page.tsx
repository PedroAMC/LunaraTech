import Link from "next/link";
import { products } from "@/lib/products";

export default function ProductosPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Productos</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <li key={p.slug} className="card p-4">
            <div className="text-lg font-medium">{p.name}</div>
            <div className="opacity-70">${p.price.toLocaleString("es-CL")}</div>
            <Link
              href={`/producto/${p.slug}`}
              className="mt-2 inline-block underline"
            >
              Ver detalle
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
