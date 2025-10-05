import Link from "next/link";

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
            className="inline-flex items-center gap-2 rounded-lg font-medium transition-all ease-soft px-4 py-2 bg-brand-600 hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft text-white cursor-pointer"
          >
            Explorar productos
          </Link>

          <Link
            href="/carrito"
            className="inline-flex items-center gap-2 rounded-lg font-medium transition-all ease-soft px-4 py-2 bg-transparent hover:bg-white/5 active:bg-white/10 text-white/90 cursor-pointer"
          >
            Ver carrito
          </Link>
        </div>
      </section>

      <section className="mt-10 opacity-70 text-sm">
        <p>
          ¿Buscas algo específico? Pronto agregaremos filtros por categoría y
          búsqueda en tiempo real.
        </p>
      </section>
    </main>
  );
}
