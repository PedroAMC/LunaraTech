// src/app/producto/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProductBySlug } from "@/lib/products";
import AddToCartButton from "@/components/AddToCartButton";
import { getImageUrl } from "@/lib/images";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const CATEGORY_LABEL: Record<string, string> = {
  perifericos: "Periféricos",
  accesorios: "Accesorios",
  almacenamiento: "Almacenamiento",
};

export default async function ProductoDetail({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return notFound();

  const priceLabel = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(product.price);

  const inStock = (product.stock ?? 0) > 0;

  const rawCategory = (product.category ?? "") as keyof typeof CATEGORY_LABEL;
  const categoryName = CATEGORY_LABEL[rawCategory] ?? "Producto";

  // URL final de imagen con fallback
  const imageKey =
    product.imageUrl && product.imageUrl !== ""
      ? product.imageUrl
      : "placeholders/hero-hardware.jpg";

  const imageSrc = getImageUrl(imageKey);

  return (
    <main className="min-h-[90vh] bg-gradient-to-br from-[#05060a] via-[#070a12] to-[#0b0f19] text-white">
      <section className="mx-auto max-w-6xl px-4 py-10 md:px-8 md:py-12 space-y-6">
        <div className="text-xs text-white/55 flex items-center gap-1">
          <Link href="/" className="hover:text-emerald-300 transition">
            Inicio
          </Link>
          <span>/</span>
          <Link
            href="/productos"
            className="hover:text-emerald-300 transition"
          >
            Productos
          </Link>
          <span>/</span>
          <span className="text-white/80">{product.name}</span>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm shadow-[0_0_40px_rgba(15,23,42,0.75)] px-5 py-6 md:px-8 md:py-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="inline-flex items-center rounded-full border border-emerald-500/60 bg-emerald-500/10 px-3 py-1 text-[11px] font-medium tracking-[0.18em] uppercase text-emerald-300 mb-2">
                {categoryName}
              </p>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                {product.name}
              </h1>
            </div>

            {product.isFeatured && (
              <span className="hidden md:inline-flex rounded-full bg-gradient-to-r from-amber-400/90 to-rose-500/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-black shadow-lg">
                Destacado
              </span>
            )}
          </div>

          <div className="mt-4 grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            <div className="w-full">
              <div className="relative w-full aspect-square rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900 via-slate-950 to-black overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),transparent_55%)]" />
                <Image
                  src={imageSrc}
                  alt={product.name}
                  fill
                  className="object-contain p-6 md:p-8"
                  sizes="(min-width: 1024px) 520px, 100vw"
                  priority
                />
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs text-white/60 mb-1">Precio</p>
                <p className="text-3xl font-semibold">
                  {priceLabel.replace("CLP", "").trim()}
                  <span className="ml-1 text-sm align-super text-white/50">
                    CLP
                  </span>
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-white/60">Disponibilidad</p>
                <p
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                    inStock
                      ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/40"
                      : "bg-rose-500/10 text-rose-300 border border-rose-500/40"
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${
                      inStock ? "bg-emerald-400" : "bg-rose-400"
                    }`}
                  />
                  {inStock
                    ? `En stock: ${product.stock}`
                    : "Sin stock por el momento"}
                </p>
              </div>

              {product.description && (
                <div className="space-y-1">
                  <p className="text-xs text-white/60">Descripción</p>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-[11px] text-white/60">
                <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1">
                  ID: {product.id}
                </span>
                <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1">
                  Slug: <code className="text-white/80">{product.slug}</code>
                </span>
                <span className="rounded-full bg-white/5 border border-white/10 px-2 py-1">
                  Vendidos: {product.sold}
                </span>
              </div>

              <div className="pt-3">
                <AddToCartButton product={product} />
              </div>

              <p className="text-[11px] text-white/45 pt-1">
                Más adelante podrás ver cuotas, métodos de envío y retiros en
                tienda directo desde esta vista.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}