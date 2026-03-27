// src/app/productos/page.tsx
import { getProducts } from "@/lib/products";
import ProductGrid from "@/components/home/ProductGrid";
import FilterSidebar from "@/components/home/FilterSidebar";

export default async function ProductsPage() {
  // 🔥 Cargar productos REALES desde MySQL (server component)
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0a0a0e] via-[#0f1116] to-[#151820] py-16 px-6">
      {/* 🏷️ Título */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold tracking-wide text-white uppercase mb-3 drop-shadow-[0_0_8px_rgba(0,150,255,0.3)]">
          Catálogo de Productos
        </h1>
        <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 mx-auto rounded-full shadow-[0_0_10px_rgba(0,150,255,0.6)]" />
        <p className="text-white/60 mt-4 text-sm tracking-wide">
          Filtra por categoría, precio o tipo de producto.
        </p>
      </div>

      {/* Layout */}
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row gap-8">
        {/* Filtros laterales */}
        <div className="sm:sticky sm:top-24 sm:h-fit w-full sm:w-64">
          <FilterSidebar />
        </div>

        {/* Grilla principal */}
        <div className="flex-1">
          <ProductGrid products={products} />
        </div>
      </div>
    </main>
  );
}
