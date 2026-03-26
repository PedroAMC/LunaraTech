// src/app/api/admin/sales-history/route.ts
import { NextResponse } from "next/server";
import { getSalesHistory } from "@/lib/sales";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = Number(searchParams.get("limit") ?? 50);
    const offset = Number(searchParams.get("offset") ?? 0);

    const history = await getSalesHistory({ limit, offset });

    return NextResponse.json({
      ok: true,
      history,
    });
  } catch (error) {
    console.error("Error en GET /api/admin/sales-history:", error);
    return NextResponse.json(
      { ok: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
