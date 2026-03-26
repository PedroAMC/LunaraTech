// src/lib/collections.ts
"use server";

import { getDB } from "@/lib/db";

/**
 * Colección tal como la usamos en el frontend.
 */
export type Collection = {
  id: number;
  slug: string;
  name: string;
  tagline: string | null;      // antes subtitle
  summary: string | null;      // antes description
  heroImageUrl: string | null;
  isActive: boolean;
  showInHome: boolean;
};

/**
 * Producto asociado a una colección.
 */
export type CollectionProduct = {
  id: number;
  sku: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

/**
 * Traer TODAS las colecciones activas.
 */
export async function getCollections(): Promise<Collection[]> {
  const pool = await getDB();

  const [rows] = await pool.query(
    `
    SELECT
      id,
      slug,
      name,
      subtitle       AS tagline,
      description    AS summary,
      hero_image_url AS heroImageUrl,
      is_active      AS isActive,
      show_in_home   AS showInHome
    FROM collections
    WHERE is_active = 1
    ORDER BY name ASC
    `
  );

  return rows as Collection[];
}

/**
 * Traer UNA colección por slug.
 */
export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  const pool = await getDB();

  const [rows] = await pool.query(
    `
    SELECT
      id,
      slug,
      name,
      subtitle       AS tagline,
      description    AS summary,
      hero_image_url AS heroImageUrl,
      is_active      AS isActive,
      show_in_home   AS showInHome
    FROM collections
    WHERE slug = ? AND is_active = 1
    LIMIT 1
    `,
    [slug]
  );

  const list = rows as Collection[];
  return list[0] ?? null;
}

/**
 * Traer los productos de una colección por slug (desde la tabla puente).
 */
export async function getProductsByCollectionSlug(
  slug: string
): Promise<CollectionProduct[]> {
  const pool = await getDB();

  const [rows] = await pool.query(
    `
    SELECT
      p.id,
      p.sku,
      p.name,
      p.description,
      p.base_price   AS price,
      p.stock,
      p.is_active    AS isActive,
      p.is_featured  AS isFeatured,
      p.created_at   AS createdAt,
      p.updated_at   AS updatedAt
    FROM collection_products cp
    INNER JOIN collections c
      ON c.id = cp.collection_id
    INNER JOIN products p
      ON p.id = cp.product_id
    WHERE
      c.slug = ?
      AND c.is_active = 1
      AND p.is_active = 1
    ORDER BY p.name ASC
    `,
    [slug]
  );

  return rows as CollectionProduct[];
}
