// src/app/api/account/overview/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { ok: false, error: "No autenticado" },
        { status: 401 }
      );
    }

    const email = session.user.email;
    const pool = await getDB(); // 👈 AQUÍ EL CAMBIO

    // TODO: ajusta esto cuando tengas tabla de pedidos
    // Ejemplo suponiendo tabla "orders" con columnas:
    // id, user_email, total_amount, currency, status, created_at
    let totalSpent = 0;
    let totalOrders = 0;
    let currency = "CLP";
    let lastOrders: {
      id: string;
      date: string;
      status: string;
      total: string;
    }[] = [];

    try {
      const [rows] = await pool.query(
        `
        SELECT 
          id,
          user_email,
          total_amount,
          currency,
          status,
          created_at
        FROM orders
        WHERE user_email = ?
        ORDER BY created_at DESC
        LIMIT 5
        `,
        [email]
      );

      const anyRows = rows as any[];

      totalOrders = anyRows.length;
      if (anyRows.length > 0) {
        currency = anyRows[0].currency ?? "CLP";
      }

      totalSpent = anyRows.reduce(
        (acc, r) => acc + Number(r.total_amount ?? 0),
        0
      );

      lastOrders = anyRows.map((r) => ({
        id: String(r.id),
        date: new Date(r.created_at).toLocaleDateString("es-CL"),
        status: String(r.status),
        total: `${Number(r.total_amount).toLocaleString("es-CL")} ${
          r.currency ?? "CLP"
        }`,
      }));
    } catch (e) {
      console.warn(
        "WARNING: consulta de orders falló (probablemente tabla no creada aún):",
        e
      );
    }

    return NextResponse.json({
      totalSpent,
      totalOrders,
      currency,
      budget: null,
      lastOrders,
    });
  } catch (error) {
    console.error("Error en /api/account/overview:", error);
    return NextResponse.json(
      { ok: false, error: "Error interno" },
      { status: 500 }
    );
  }
}
