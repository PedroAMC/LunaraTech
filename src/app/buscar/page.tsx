// src/app/buscar/page.tsx
import SectionFull from "@/components/layout/SectionFull";

export default function SearchPage() {
  return (
    <SectionFull
      title="Buscar productos"
      subtitle="Escribe lo que necesitas y pronto conectaremos esto al motor de búsqueda."
    >
      <form className="mt-4 flex gap-3">
        <input
          type="search"
          name="q"
          placeholder="Ej: RTX 4070, teclado mecánico, monitor 144Hz..."
          className="flex-1 rounded-lg bg-neutral-900/70 border border-neutral-700 px-4 py-3 text-sm text-white placeholder:text-neutral-500 outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="px-5 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium"
        >
          Buscar
        </button>
      </form>
      <p className="mt-4 text-xs text-neutral-500">
        (Maqueta: aún no listamos resultados reales, pero la ruta ya funciona.)
      </p>
    </SectionFull>
  );
}
