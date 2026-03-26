// src/app/colecciones/[slug]/productos/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCollectionBySlug } from "@/lib/collections";
import { getProductsByCollectionSlug } from "@/lib/collections";

export default async function CollectionProductsPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  // 1) validar colección
  const collection = await getCollectionBySlug(slug);
  if (!collection) return notFound();

  // 2) cargar productos
  const products = await getProductsByCollectionSlug(slug);

  return (
    <main className="min-h-screen bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        {/* Breadcrumb */}
        <div className="text-xs text-white/50 flex items-center gap-1">
          <Link href="/" className="hover:text-emerald-300">Inicio</Link>
          <span>/</span>
          <Link href="/colecciones" className="hover:text-emerald-300">Colecciones</Link>
          <span>/</span>
          <Link href={`/colecciones/${slug}`} className="hover:text-emerald-300">
            {collection.name}
          </Link>
          <span>/</span>
          <span className="text-white/80">Productos</span>
        </div>

        <h1 className="text-2xl font-bold">
          Productos de {collection.name}
        </h1>

        {/* Productos */}
        {products.length === 0 && (
          <p className="text-sm text-white/60 mt-2">
            Esta colección aún no tiene productos asignados.
          </p>
        )}

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold">{p.name}</h3>
              <p className="text-xs text-white/60 mt-1">{p.description}</p>
              <div className="mt-3 text-emerald-300 font-semibold text-xs">
                ${p.price.toLocaleString("es-CL")}
              </div>

              <Link
                className="mt-2 inline-block text-[11px] underline"
                href={`/productos/${p.id}`}
              >
                Ver detalle
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
