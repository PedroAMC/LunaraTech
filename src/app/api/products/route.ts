// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";

export async function GET() {
  try {
    const products = await getProducts();

    return NextResponse.json({
      ok: true,
      products,
    });
  } catch (error) {
    console.error("Error en GET /api/products:", error);
    return NextResponse.json(
      {
        ok: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
