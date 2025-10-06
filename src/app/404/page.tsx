// 100% estática y sin hooks
export const dynamic = "force-static";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="card p-8 md:p-12 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold title-grad">
          Página no encontrada
        </h1>

        <p className="mt-3 opacity-80">
          Uy… no pudimos encontrar lo que buscas.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-brand-600 hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft text-white"
          >
            Volver al inicio
          </a>
          <a
            href="/productos"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 border border-white/15 bg-white/5 hover:bg-white/10"
          >
            Ir a productos
          </a>
        </div>
      </section>
    </main>
  );
}
