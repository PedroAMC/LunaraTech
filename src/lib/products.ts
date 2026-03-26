// src/lib/products.ts
"use server";

import { getDB } from "./db";

export type Category = "perifericos" | "accesorios" | "almacenamiento" | null;

export type Product = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  shortDescription: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  slug: string;
  category: Category;
  isFeatured: boolean;

  // 👇 NUEVO — ahora sí existe
  imageUrl: string | null;

  sold: number;
  createdAt: string;
  updatedAt: string;
};

/* ===========================================================
   MAPEO DESDE FILA CRUD → Product
   =========================================================== */
function mapRowToProduct(row: any): Product {
  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    description: row.description ?? null,
    shortDescription: row.shortDescription ?? null,
    price: Number(row.price ?? 0),
    stock: Number(row.stock ?? 0),
    isActive: row.isActive === 1 || row.isActive === true,
    slug: row.slug,
    category: (row.category as Category) ?? null,
    isFeatured: row.isFeatured === 1 || row.isFeatured === true,

    // 👇 MAPEO DESDE MySQL
    imageUrl: row.imageUrl ?? null,

    sold: Number(row.sold ?? 0),
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}

/* ===========================================================
   1) Obtener TODOS los productos
   =========================================================== */
export async function getProducts(): Promise<Product[]> {
  const pool = await getDB();

  const [rows] = await pool.query<any[]>(`
    SELECT
      id,
      sku,
      name,
      description,
      short_description AS shortDescription,
      base_price AS price,
      stock,
      is_active AS isActive,
      slug,
      category,
      is_featured AS isFeatured,
      image_url AS imageUrl,   -- 👈 IMPORTANTE
      created_at AS createdAt,
      updated_at AS updatedAt,
      0 AS sold
    FROM products
    ORDER BY id ASC
  `);

  return rows.map(mapRowToProduct);
}

/* ===========================================================
   2) Obtener producto por SLUG (tienda pública)
   =========================================================== */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const pool = await getDB();

  const [rows] = await pool.query<any[]>(
    `
    SELECT
      id,
      sku,
      name,
      description,
      short_description AS shortDescription,
      base_price AS price,
      stock,
      is_active AS isActive,
      slug,
      category,
      is_featured AS isFeatured,
      image_url AS imageUrl,   -- 👈
      created_at AS createdAt,
      updated_at AS updatedAt,
      0 AS sold
    FROM products
    WHERE slug = ? AND is_active = 1
    LIMIT 1
    `,
    [slug]
  );

  if (!rows || rows.length === 0) return null;
  return mapRowToProduct(rows[0]);
}

/* ===========================================================
   3) Obtener producto por ID (ADMIN)
   =========================================================== */
export async function getProductById(id: number): Promise<Product | null> {
  const pool = await getDB();

  const [rows] = await pool.query<any[]>(
    `
    SELECT
      id,
      sku,
      name,
      description,
      short_description AS shortDescription,
      base_price AS price,
      stock,
      is_active AS isActive,
      slug,
      category,
      is_featured AS isFeatured,
      image_url AS imageUrl,   -- 👈
      created_at AS createdAt,
      updated_at AS updatedAt,
      0 AS sold
    FROM products
    WHERE id = ?
    LIMIT 1
    `,
    [id]
  );

  if (!rows || rows.length === 0) return null;
  return mapRowToProduct(rows[0]);
}

/* ===========================================================
   4) Productos destacados
   =========================================================== */
export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
  const pool = await getDB();

  const [rows] = await pool.query<any[]>(
    `
    SELECT
      id,
      sku,
      name,
      description,
      short_description AS shortDescription,
      base_price AS price,
      stock,
      is_active AS isActive,
      slug,
      category,
      is_featured AS isFeatured,
      image_url AS imageUrl,   -- 👈
      created_at AS createdAt,
      updated_at AS updatedAt,
      0 AS sold
    FROM products
    WHERE is_active = 1 AND is_featured = 1
    ORDER BY created_at DESC
    LIMIT ?
    `,
    [limit]
  );

  return rows.map(mapRowToProduct);
}

/* ===========================================================
   5) Productos por categoría
   =========================================================== */
export async function getProductsByCategory(
  category: Exclude<Category, null>
): Promise<Product[]> {
  const pool = await getDB();

  const [rows] = await pool.query<any[]>(
    `
    SELECT
      id,
      sku,
      name,
      description,
      short_description AS shortDescription,
      base_price AS price,
      stock,
      is_active AS isActive,
      slug,
      category,
      is_featured AS isFeatured,
      image_url AS imageUrl,   -- 👈
      created_at AS createdAt,
      updated_at AS updatedAt,
      0 AS sold
    FROM products
    WHERE is_active = 1 AND category = ?
    ORDER BY id ASC
    `,
    [category]
  );

  return rows.map(mapRowToProduct);
}

/* ===========================================================
   6) Productos por IDs
   =========================================================== */
export async function getProductsByIds(ids: number[]): Promise<Product[]> {
  if (!ids.length) return [];

  const pool = await getDB();
  const placeholders = ids.map(() => "?").join(", ");

  const [rows] = await pool.query<any[]>(
    `
    SELECT
      id,
      sku,
      name,
      description,
      short_description AS shortDescription,
      base_price AS price,
      stock,
      is_active AS isActive,
      slug,
      category,
      is_featured AS isFeatured,
      image_url AS imageUrl,   -- 👈
      created_at AS createdAt,
      updated_at AS updatedAt,
      0 AS sold
    FROM products
    WHERE id IN (${placeholders})
    `,
    ids
  );

  return rows.map(mapRowToProduct);
}

/* ===========================================================
   7) Actualizar producto (ADMIN)
   =========================================================== */
export async function updateProduct(
  id: number,
  fields: Partial<{
    name: string;
    sku: string;
    price: number;
    stock: number;
    description: string | null;
    shortDescription: string | null;
    slug: string;
    category: Category;
    isActive: boolean;
    isFeatured: boolean;
    imageUrl: string | null; // 👈 Ahora también editable
  }>
): Promise<boolean> {
  const pool = await getDB();

  const keys = Object.keys(fields);
  if (keys.length === 0) return false;

  const setClause = keys.map((k) => `${k} = ?`).join(", ");
  const values = keys.map((k) => (fields as any)[k]);

  const [result]: any = await pool.query(
    `UPDATE products SET ${setClause}, updated_at = NOW() WHERE id = ?`,
    [...values, id]
  );

  return result.affectedRows > 0;
}
