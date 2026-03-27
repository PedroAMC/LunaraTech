// src/app/productos/page.tsx
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0e] via-[#0f1116] to-[#151820] py-16 px-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-white uppercase mb-3 drop-shadow-[0_0_8px_rgba(0,150,255,0.3)]">
          Catálogo de Productos
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(0,150,255,0.6)]" />
        <p className="text-white/60 mt-4 text-sm tracking-wide">
          Filtra por categoría, precio o tipo de producto.
        </p>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-white/80">
          Productos temporalmente desactivados mientras se configura la base de datos.
        </div>
      </div>
    </main>
  );
}