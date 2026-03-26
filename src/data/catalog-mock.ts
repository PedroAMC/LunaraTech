// src/data/catalog-mock.ts
// ------------------------------------------------------------------
// Semilla de productos y helpers de inventario + tipos consistentes.
// ------------------------------------------------------------------

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;

  // Campos de la UI que pueden no venir en todos los mocks:
  tags?: string[];
  visible?: boolean;

  // Galería de imágenes (soporta hasta 3; la UI acepta vacías)
  images?: string[];   // URLs de imágenes, ej: ["https://...", "...", "..."]
  cover?: number;      // índice de portada 0..2 (cuál se muestra primero)
};

// Usamos un objeto constante para valores y derivamos el tipo (evita choques enum vs string)
export const STOCK = {
  ok:  "ok",
  low: "low",
  out: "out",
} as const;

export type StockStatus = typeof STOCK[keyof typeof STOCK];

// Umbral de bajo stock (ajústalo si ya lo tenías diferente)
export const LOW_STOCK_THRESHOLD = 5;

// Calcula el estado en base al stock (devuelve SIEMPRE uno de STOCK)
export function calcStatus(stock: number): StockStatus {
  if (stock <= 0) return STOCK.out;
  if (stock < LOW_STOCK_THRESHOLD) return STOCK.low;
  return STOCK.ok;
}

// ------------------------------------------------------------------
// Semilla estática para hidratar SSR = cliente
// (Deja tu arreglo real aquí; este placeholder solo mantiene el tipo.)
// ------------------------------------------------------------------
export const PRODUCTS: Product[] = [
  // ... tu arreglo existente de productos
];
