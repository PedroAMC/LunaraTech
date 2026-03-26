// src/app/api/admin/sales/route.ts
import { NextResponse } from "next/server";
import { registerSale, SaleType } from "@/lib/sales";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const productId = Number(body.productId);
    const quantity = Number(body.quantity);
    const type = body.type as SaleType | undefined;
    const description = typeof body.description === "string"
      ? body.description
      : undefined;

    if (!productId || !quantity || !type) {
      return NextResponse.json(
        { ok: false, error: "Faltan campos: productId, quantity, type" },
        { status: 400 }
      );
    }

    if (!["SALE", "ADJUSTMENT", "RETURN"].includes(type)) {
      return NextResponse.json(
        { ok: false, error: "Tipo inválido. Usa SALE, ADJUSTMENT o RETURN" },
        { status: 400 }
      );
    }

    const result = await registerSale({
      productId,
      quantity,
      type,
      description,
    });

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    console.error("Error en POST /api/admin/sales:", error);
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
