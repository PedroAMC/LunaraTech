// src/app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/products";

type Params = {
  params: {
    slug: string;
  };
};

export async function GET(_req: Request, { params }: Params) {
  const { slug } = params;

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
