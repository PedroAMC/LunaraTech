"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { createProduct } from "src/lib/actions/products";
import ImageUploader from "@/components/admin/ImageUploader";

export default function NuevoProductoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);

    // Agregamos la imagen subida a R2 al form
    form.set("imageUrl", imageUrl);

    const res = await createProduct(form);

    setLoading(false);

    if (res?.ok) {
      router.push("/admin/productos");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Nuevo producto</h1>

        <Link
          href="/admin/productos"
          className="px-4 py-2 rounded-lg border border-neutral-700 bg-neutral-900 hover:bg-neutral-800 text-sm"
        >
          ← Volver
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-xl border border-neutral-800 bg-neutral-950/40 p-6"
      >
        {/* Nombre */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Nombre</label>
          <input
            name="name"
            required
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">SKU</label>
          <input
            name="sku"
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Slug (URL)
          </label>
          <input
            name="slug"
            required
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
            placeholder="ej: cable-hdmi-3m"
          />
        </div>

        {/* Descripción corta */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Descripción corta
          </label>
          <input
            name="shortDescription"
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
            placeholder="ej: Cable HDMI 2.0 de 3 m..."
          />
        </div>

        {/* Descripción larga */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Descripción
          </label>
          <textarea
            name="description"
            rows={4}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Imagen principal (R2) */}
        <ImageUploader
          label="Imagen principal (se sube a R2)"
          value={imageUrl}
          onChange={setImageUrl}
        />

        {/* Precio */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Precio</label>
          <input
            type="number"
            min={0}
            name="price"
            required
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Stock</label>
          <input
            type="number"
            min={0}
            name="stock"
            required
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">
            Categoría
          </label>
          <select
            name="category"
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          >
            <option value="">(Ninguna)</option>
            <option value="perifericos">Periféricos</option>
            <option value="accesorios">Accesorios</option>
            <option value="almacenamiento">Almacenamiento</option>
          </select>
        </div>

        {/* Activo / Destacado */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-neutral-300">
            <input type="checkbox" name="isActive" />
            Activo
          </label>

          <label className="flex items-center gap-2 text-neutral-300">
            <input type="checkbox" name="isFeatured" />
            Destacado
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 disabled:opacity-60"
        >
          {loading ? "Guardando..." : "Crear producto"}
        </button>
      </form>
    </div>
  );
}
