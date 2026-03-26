// src/app/colecciones/page.tsx

import Link from "next/link";
import { getCollections } from "@/lib/collections";
import CollectionCard from "@/components/collections/CollectionCard";

export const metadata = {
  title: "Colecciones | LUNARATECH",
};

export default async function CollectionsPage() {
  const collections = await getCollections();

  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-[#05060a] via-[#080a10] to-[#0b0f19] text-white py-16 px-6">
      <section className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              Colecciones
            </h1>
            <p className="text-sm md:text-base text-white/65 max-w-xl">
              Explora productos por franquicia, personaje o saga.
              Más adelante podrás filtrar cada colección por tipo de producto.
            </p>
          </div>

          <Link
            href="/"
            className="hidden sm:inline-flex text-sm text-blue-400 hover:text-blue-300 underline underline-offset-4"
          >
            Volver al inicio
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:gap-7 md:grid-cols-3 sm:grid-cols-2">
          {collections.map((c) => (
            <CollectionCard key={c.slug} c={c} />
          ))}
        </div>

      </section>
    </main>
  );
}
