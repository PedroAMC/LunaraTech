// src/app/colecciones/page.tsx
import Link from "next/link";

export default function CollectionsPage() {
  // más adelante: leer ?q=franquicia y aplicar reglas de “no hay → parecidos”
  return (
    <main className="mx-auto max-w-6xl p-6">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Colecciones</h1>
          <p className="opacity-75 text-sm">
            Explora productos por franquicia, personaje o saga.
          </p>
        </div>
        <Link href="/" className="hover:underline text-brand-400">
          Volver al inicio
        </Link>
      </header>

      {/* Placeholder de grupos/colecciones */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Mario", "Zelda", "Kirby", "Metroid", "Pokémon", "Monster Hunter"].map((name) => (
          <article key={name} className="card p-4">
            <div className="aspect-[3/2] w-full rounded-lg bg-white/5 mb-3" />
            <h2 className="text-lg font-medium">{name}</h2>
            <p className="text-sm opacity-70">
              Productos inspirados en {name}. Si no hay stock, te mostraremos
              coincidencias cercanas automáticamente.
            </p>
            <div className="mt-3">
              <Link
                href={`/colecciones/${encodeURIComponent(name.toLowerCase())}`}
                className="inline-flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm hover:bg-white/5"
                style={{ borderColor: "var(--surface-border)" }}
              >
                Ver colección
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
