// src/lib/db.ts
"use server"; // ⬅️ Obligamos a Next.js a tratar este archivo SOLO como backend

import mysql, { Pool } from "mysql2/promise";

// Singleton global para evitar múltiples conexiones en modo dev
let pool: Pool | null = null;

/**
 * getDB()
 * Devuelve un pool de MySQL reutilizable (Next.js exige async en server utilities)
 */
export async function getDB(): Promise<Pool> {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT ?? 3306),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });
  }

  return pool;
}
