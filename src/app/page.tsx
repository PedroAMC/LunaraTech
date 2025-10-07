// src/app/page.tsx
import Link from "next/link";
import CategoriesBar from "@/components/CategoriesBar";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="rounded-2xl border border-white/10 bg-gradient-to-br from-brand-900/40 via-brand-700/20 to-transparent p-8 md:p-12">
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

      {/* NUEVO: categorías tipo tarjetas (6) */}
      <CategoriesBar />

      <section className="mt-10 text-sm opacity-70">
        <p>
          ¿Buscas algo específico? Pronto agregaremos filtros por categoría y
          búsqueda en tiempo real.
        </p>
      </section>
    </main>
  );
}
