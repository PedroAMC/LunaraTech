// src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.trim() ?? "";

    // Menos de 2 letras -> no buscamos nada
    if (!q || q.length < 2) {
      return NextResponse.json({ ok: true, results: [], total: 0 });
    }

    const pool = await getDB();

    // Consulta principal (máx. 6 sugerencias)
    const [rows] = await pool.query(
      `
      SELECT
        id,
        slug,
        name,
        short_description AS description,
        base_price AS price,
        image_url AS image
      FROM products
      WHERE (name LIKE ? OR slug LIKE ?)
        AND is_active = 1
      ORDER BY name ASC
      LIMIT 6
      `,
      [`%${q}%`, `%${q}%`]
    );

    // Conteo total de coincidencias (para "ver más")
    const [countRows] = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM products
      WHERE (name LIKE ? OR slug LIKE ?)
        AND is_active = 1
      `,
      [`%${q}%`, `%${q}%`]
    );

    const total =
      Array.isArray(countRows) && countRows.length > 0
        ? // @ts-ignore
          Number((countRows as any)[0].total) || 0
        : 0;

    return NextResponse.json({
      ok: true,
      results: rows,
      total,
    });
  } catch (err) {
    console.error("Error en /api/search:", err);
    return NextResponse.json(
      { ok: false, error: "Error procesando búsqueda" },
      { status: 500 }
    );
  }
}
