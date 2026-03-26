// src/app/api/colecciones/[slug]/route.ts

import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  const { slug } = params;

  try {
    const pool = await getDB();  // ← ← ← ARREGLO AQUÍ

    // 1. Obtener la colección
    const [rows]: any = await pool.query(
      `
      SELECT id, slug, name, description, accent, kicker
      FROM collections
      WHERE slug = ? AND is_active = 1
      LIMIT 1
      `,
      [slug]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { ok: false, error: "Colección no encontrada" },
        { status: 404 }
      );
    }

    const collection = rows[0];

    // 2. Obtener productos asociados
    const [products]: any = await pool.query(
      `
      SELECT
        p.id,
        p.name,
        p.short_description,
        p.price,
        p.slug
      FROM products p
      INNER JOIN collection_products cp ON p.id = cp.product_id
      WHERE cp.collection_id = ?
      `,
      [collection.id]
    );

    return NextResponse.json({
      ok: true,
      collection,
      products,
    });

  } catch (error: any) {
    console.error("Error en API de colección:", error);

    return NextResponse.json(
      { ok: false, error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

