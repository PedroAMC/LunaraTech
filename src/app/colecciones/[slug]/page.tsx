// src/app/colecciones/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";

// 👇 NUEVOS IMPORTS (lo único que agregamos)
import { getCollectionBySlug, getProductsByCollectionSlug } from "@/lib/collections";

export default async function CollectionPage({
  params
}: {
  params: { slug: string };
}) {
  const slug = params.slug;

  // 👇 CARGAR COLECCIÓN REAL DESDE MYSQL
  const collection = await getCollectionBySlug(slug);

  if (!collection) return notFound();

  // 👇 CARGAR PRODUCTOS REALES ASOCIADOS A LA COLECCIÓN
  const products = await getProductsByCollectionSlug(slug);

  // 👇 MANTENGO EXACTAMENTE LOS CAMPOS QUE USA TU UI
  const {
    name,
    subtitle: kicker,
    description,
    // heroImageUrl (opcional si luego quieres agregar)
    // accent (más adelante lo agregamos cuando esté en BD)
  } = collection;

  return (
    <main className="min-h-screen bg-black/95 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">

        {/* Breadcrumb */}
        <div className="text-xs text-white/50 flex items-center gap-1">
          <Link href="/" className="hover:text-emerald-300 transition">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href="/colecciones"
            className="hover:text-emerald-300 transition"
          >
            Colecciones
          </Link>
          <span>/</span>
          <span className="text-white/80">{name}</span>
        </div>

        {/* Hero colección */}
        <section className="grid gap-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-center">
          <div>
            <p className="text-[11px] tracking-[0.18em] text-emerald-300/80 uppercase mb-2">
              colección destacada
            </p>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{name}</h1>

            {/* kicker = subtitle desde la BD */}
            {kicker && (
              <p className="text-[13px] font-semibold text-emerald-300 mb-2">
                {kicker}
              </p>
            )}

            <p className="text-sm text-white/70 max-w-xl">{description}</p>
          </div>

          <div className="relative">
            <div
              className={`rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600 to-teal-400 p-[1px]`}
            >
              <div className="rounded-[14px] bg-black/90 px-6 py-5 flex flex-col gap-3">
                <p className="text-xs text-white/55">
                  Estás viendo una vista previa de la colección. Más
                  adelante podrás personalizar hero images, colores de acento
                  y filtros dinámicos.
                </p>
                <div className="flex flex-wrap gap-2 text-[11px] text-white/70">
                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    Etiquetas por franquicia
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    Filtros por tipo de producto
                  </span>
                  <span className="px-2 py-1 rounded-full bg-white/5 border border-white/10">
                    Integración con catálogo real
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de productos */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/90">
              Productos de la colección
            </h2>
            <Link
              href="/productos"
              className="text-xs text-emerald-300 hover:text-emerald-200 underline underline-offset-4"
            >
              Ver catálogo completo
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="border border-dashed border-white/15 rounded-xl px-4 py-8 text-sm text-white/60 text-center">
              Aún no hay productos asignados a esta colección.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="group relative rounded-xl border border-white/10 bg-white/5 px-4 py-4 flex flex-col justify-between hover:border-emerald-400/70 hover:shadow-[0_0_30px_rgba(16,185,129,0.35)] transition"
                >
                  <div className="space-y-1">
                    <h3 className="text-sm font-semibold">{product.name}</h3>

                    <p className="text-xs text-white/65">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <span className="text-white/50">
                      ${product.price.toLocaleString("es-CL")}
                    </span>
                    <button
                      type="button"
                      disabled
                      className="px-3 py-1 rounded-md bg-white/10 text-[11px] text-white/70 cursor-not-allowed"
                    >
                      Añadir al carrito (pronto)
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
