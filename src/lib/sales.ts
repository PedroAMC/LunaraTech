// src/lib/sales.ts
"use server";

import { getDB } from "./db";

export type SaleType = "SALE" | "ADJUSTMENT" | "RETURN";

export type SaleInput = {
  productId: number;
  quantity: number;
  type: SaleType;
  description?: string;
};

export type SaleResult = {
  productId: number;
  previousStock: number;
  newStock: number;
  quantity: number;
  type: SaleType;
};

export async function registerSale(input: SaleInput): Promise<SaleResult> {
  const pool = await getDB();   // 👈 CAMBIO IMPORTANTE
  const { productId, quantity, type, description } = input;

  if (!Number.isFinite(productId) || productId <= 0) {
    throw new Error("productId inválido");
  }
  if (!Number.isFinite(quantity) || quantity === 0) {
    throw new Error("quantity debe ser distinto de 0");
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    const [rows] = await conn.query<any[]>(
      "SELECT id, stock FROM products WHERE id = ? FOR UPDATE",
      [productId]
    );

    if (!rows || rows.length === 0) {
      throw new Error("Producto no existe");
    }

    const currentStock = Number(rows[0].stock ?? 0);
    let delta = 0;
    const qtyAbs = Math.abs(quantity);

    switch (type) {
      case "SALE":
        delta = -qtyAbs;
        break;
      case "RETURN":
        delta = qtyAbs;
        break;
      case "ADJUSTMENT":
        delta = quantity;
        break;
      default:
        throw new Error("Tipo de movimiento inválido");
    }

    const newStock = currentStock + delta;

    if (newStock < 0) {
      throw new Error("Stock insuficiente");
    }

    await conn.query(
      "UPDATE products SET stock = ?, updated_at = NOW() WHERE id = ?",
      [newStock, productId]
    );

    await conn.query(
      `
      INSERT INTO sales_history (product_id, quantity, type, description)
      VALUES (?, ?, ?, ?)
      `,
      [productId, qtyAbs, type, description ?? null]
    );

    await conn.commit();

    return {
      productId,
      previousStock: currentStock,
      newStock,
      quantity: qtyAbs,
      type,
    };
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
}

/* ===========================================================
   Obtener historial
   =========================================================== */

export type HistoryEntry = {
  id: number;
  product_id: number;
  product_name: string;
  quantity: number;
  type: SaleType;
  description: string | null;
  created_at: string;
};

export async function getSalesHistory(options?: {
  limit?: number;
  offset?: number;
}): Promise<HistoryEntry[]> {
  const pool = await getDB();  // 👈 CAMBIO IMPORTANTE
  const limit = options?.limit ?? 50;
  const offset = options?.offset ?? 0;

  const [rows] = await pool.query<any[]>(
    `
    SELECT
      sh.id,
      sh.product_id,
      p.name AS product_name,
      sh.quantity,
      sh.type,
      sh.description,
      sh.created_at
    FROM sales_history sh
    JOIN products p ON p.id = sh.product_id
    ORDER BY sh.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [limit, offset]
  );

  return rows as HistoryEntry[];
}
