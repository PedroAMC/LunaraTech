// src/app/producto/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";

type PageProps = {
  params: { slug: string };
};

export default function ProductoDetail({ params }: PageProps) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <section className="card p-6 md:p-8">
        <h1 className="text-2xl md:text-3xl font-semibold title-grad">
          {product.name}
        </h1>

        <div className="mt-4 flex flex-col md:flex-row gap-6">
          {/* Imagen */}
          <div className="md:w-1/2">
            <img
              src={product.image || "/vercel.svg"}
              alt={product.name}
              className="w-full rounded-xl border border-white/10"
            />
          </div>

          {/* Datos */}
          <div className="md:w-1/2 space-y-3">
            <p className="text-lg">
              Precio: ${product.price.toLocaleString("es-CL")}
            </p>

            {product.stock > 0 ? (
              <p className="text-green-400">En stock: {product.stock}</p>
            ) : (
              <p className="text-red-400">Sin stock</p>
            )}

            <button className="mt-4 inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-brand-600 hover:bg-brand-500 active:translate-y-[1px] shadow-md hover:shadow-soft text-white">
              Agregar al carrito
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
