// src/app/api/products/by-collection/route.ts
import { NextResponse } from "next/server";
import { getProductsByCollectionSlug } from "@/lib/collections";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json(
      { ok: false, error: "Falta el parámetro slug" },
      { status: 400 }
    );
  }

  try {
    const products = await getProductsByCollectionSlug(slug);

    return NextResponse.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.error("Error en GET /api/products/by-collection:", error);
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
