// src/app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    const product = await getProductBySlug(slug);

    if (!product) {
      return NextResponse.json(
        { ok: false, error: "Producto no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      product,
    });
  } catch (error) {
    console.error(`Error en /api/products/${slug}:`, error);

    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}