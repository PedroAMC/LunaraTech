"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

import Toggle from "@/components/admin/Toggle";
import ImageUploader from "@/components/admin/ImageUploader";

import { getProductById } from "@/lib/products";
import { updateProduct } from "@/lib/actions/products";

export default function EditarProductoPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = Number(params.id);

  const [loading, setLoading] = useState(false);
  const [p, setP] = useState<any | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  // Cargar producto real
  useEffect(() => {
    async function load() {
      const data = await getProductById(id);
      setP(data);
      setImageUrl(data?.imageUrl ?? "");
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.currentTarget);
    form.set("id", String(id));

    // 👇 Pasamos la imagen (nueva o actual)
    form.set("imageUrl", imageUrl || "");

    const res = await updateProduct(form);
    setLoading(false);

    if (res?.ok) router.push("/admin/productos");
  }

  if (!p) {
    return (
      <div className="p-6 text-neutral-300">Cargando producto...</div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Editar producto</h1>
        <Link
          href="/admin/productos"
          className="px-3 py-1.5 rounded bg-neutral-800 border border-neutral-700"
        >
          ← Volver
        </Link>
      </div>

      {/* Vista previa de la imagen */}
      <div className="rounded-xl border border-neutral-800 p-6 bg-neutral-950/40">
        <h2 className="text-lg font-medium text-neutral-200 mb-3">Imagen principal</h2>

        <div className="flex items-start gap-4">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={p.name}
              className="w-40 h-40 object-cover rounded-lg border border-neutral-700"
            />
          ) : (
            <div className="w-40 h-40 bg-neutral-800 border border-neutral-700 rounded-lg flex items-center justify-center text-neutral-500 text-sm">
              Sin imagen
            </div>
          )}

          <div className="flex flex-col gap-3">
            <ImageUploader
              label="Subir nueva imagen"
              value={imageUrl}
              onChange={setImageUrl}
            />

            {imageUrl && (
              <button
                type="button"
                onClick={() => setImageUrl("")}
                className="px-3 py-1.5 rounded bg-red-700 hover:bg-red-600 text-sm"
              >
                Eliminar imagen
              </button>
            )}
          </div>
        </div>
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
            defaultValue={p.name}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* SKU */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">SKU</label>
          <input
            name="sku"
            defaultValue={p.sku}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Slug</label>
          <input
            name="slug"
            defaultValue={p.slug}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Descripción corta */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Descripción corta</label>
          <input
            name="shortDescription"
            defaultValue={p.shortDescription ?? ""}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Descripción larga */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Descripción</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={p.description ?? ""}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Precio */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Precio</label>
          <input
            type="number"
            name="price"
            defaultValue={p.price}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Stock</label>
          <input
            type="number"
            name="stock"
            defaultValue={p.stock}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-sm text-neutral-400 mb-1">Categoría</label>
          <select
            name="category"
            defaultValue={p.category ?? ""}
            className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2"
          >
            <option value="">(Ninguna)</option>
            <option value="perifericos">Periféricos</option>
            <option value="accesorios">Accesorios</option>
            <option value="almacenamiento">Almacenamiento</option>
          </select>
        </div>

        {/* Activo / destacado */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-neutral-300">
            <input type="checkbox" name="isActive" defaultChecked={p.isActive} />
            Activo
          </label>

          <label className="flex items-center gap-2 text-neutral-300">
            <input type="checkbox" name="isFeatured" defaultChecked={p.isFeatured} />
            Destacado
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600"
        >
          {loading ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </div>
  );
}
