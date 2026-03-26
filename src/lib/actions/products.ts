"use server";

import { getDB } from "@/lib/db";
import { revalidatePath } from "next/cache";

/* ===========================================================
   CREAR PRODUCTO
   =========================================================== */

export async function createProduct(formData: FormData) {
  const pool = await getDB();

  const name = formData.get("name")?.toString() ?? "";
  const sku = formData.get("sku")?.toString() ?? "";
  const slug = formData.get("slug")?.toString() ?? "";
  const price = Number(formData.get("price") ?? 0);
  const stock = Number(formData.get("stock") ?? 0);

  const description = formData.get("description")?.toString() ?? null;
  const shortDescription =
    formData.get("shortDescription")?.toString() ?? null;
  const category = formData.get("category")?.toString() ?? null;

  const isActive = formData.get("isActive") === "on" ? 1 : 0;
  const isFeatured = formData.get("isFeatured") === "on" ? 1 : 0;

  // NUEVO: viene del ImageUploader (form.set("imageUrl", imageUrl))
  const imageUrl = formData.get("imageUrl")?.toString() ?? null;

  await pool.query(
    `
    INSERT INTO products (
      sku,
      name,
      slug,
      description,
      short_description,
      image_url,
      base_price,
      stock,
      category,
      is_active,
      is_featured
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    [
      sku,
      name,
      slug,
      description,
      shortDescription,
      imageUrl,
      price,
      stock,
      category,
      isActive,
      isFeatured,
    ]
  );

  revalidatePath("/admin/productos");

  return { ok: true };
}

/* ===========================================================
   B2: EDITAR PRODUCTO (UPDATE REAL)
   =========================================================== */

export async function updateProduct(formData: FormData) {
  const pool = await getDB();

  const id = Number(formData.get("id"));
  const name = formData.get("name")?.toString() ?? "";
  const sku = formData.get("sku")?.toString() ?? "";
  const slug = formData.get("slug")?.toString() ?? "";
  const price = Number(formData.get("price") ?? 0);
  const stock = Number(formData.get("stock") ?? 0);

  const description = formData.get("description")?.toString() ?? null;
  const shortDescription =
    formData.get("shortDescription")?.toString() ?? null;
  const category = formData.get("category")?.toString() ?? null;

  const isActive = formData.get("isActive") === "on" ? 1 : 0;
  const isFeatured = formData.get("isFeatured") === "on" ? 1 : 0;

  // NUEVO: también permitimos cambiar la imagen al editar
  const imageUrl = formData.get("imageUrl")?.toString() ?? null;

  await pool.query(
    `
    UPDATE products SET
      sku = ?,
      name = ?,
      slug = ?,
      description = ?,
      short_description = ?,
      image_url = ?,
      base_price = ?,
      stock = ?,
      category = ?,
      is_active = ?,
      is_featured = ?
    WHERE id = ?
    `,
    [
      sku,
      name,
      slug,
      description,
      shortDescription,
      imageUrl,
      price,
      stock,
      category,
      isActive,
      isFeatured,
      id,
    ]
  );

  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${id}`);

  return { ok: true };
}
