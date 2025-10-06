import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="card p-8 md:p-10 text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold title-grad">
          404 · Página no encontrada
        </h1>
        <p className="opacity-80">
          La ruta que intentaste abrir no existe o fue movida.
        </p>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-brand-600 hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft text-white"
          >
            Volver al inicio
          </Link>
        </div>
      </section>
    </main>
  );
}
