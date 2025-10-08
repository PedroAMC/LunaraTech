// src/app/page.tsx
import Link from "next/link";
import NewsTicker from "@/components/NewsTicker";
import HeroBanner from "@/components/HeroBanner";
import CategoriesBar from "@/components/CategoriesBar";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 pb-6 pt-2">
      {/* Ticker justo bajo el header */}
      <NewsTicker />

      {/* Héroe full-bleed y más bajo */}
      <HeroBanner />

      {/* Bienvenida debajo del héroe */}
      <section className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-brand-900/40 via-brand-700/20 to-transparent p-8 md:p-10">
        <h1 className="text-3xl md:text-4xl font-semibold">
          Bienvenido a <span className="text-brand-400">LUNARATECH</span>
        </h1>
        <p className="mt-3 max-w-2xl opacity-80">
          Tecnología con estilo espacial. Componentes, periféricos y accesorios
          para llevar tu setup a la estratósfera.
        </p>

        <div className="mt-6 flex gap-3">
          <Link
            href="/productos"
            className="inline-flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2 font-medium text-white shadow-md transition-all ease-soft hover:bg-brand-500 hover:shadow-soft active:translate-y-[1px]"
          >
            Explorar productos
          </Link>
          <Link
            href="/carrito"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-white/90 transition-all ease-soft hover:bg-white/5 active:bg-white/10"
          >
            Ver carrito
          </Link>
        </div>
      </section>

      {/* Categorías */}
      <CategoriesBar />

      {/* Colecciones destacadas (placeholder) */}
      <section className="mt-10 rounded-2xl border border-white/10 bg-[var(--surface-2)] p-4 md:p-6">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Colecciones destacadas</h3>
          <Link href="/colecciones" className="text-brand-400 hover:underline">
            Ver todo
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <article key={i} className="card aspect-[4/3] p-3 flex flex-col justify-end">
              <h4 className="text-sm font-medium">Colección #{i + 1}</h4>
              <p className="text-xs opacity-70">Explora accesorios y más</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
