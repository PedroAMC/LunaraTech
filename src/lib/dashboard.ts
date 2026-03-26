// src/lib/dashboard.ts
export type DashboardSnapshot = {
  actives5: number;        // usuarios últimos 5 min
  actives60: number;       // usuarios últimos 60 min
  salesToday: number;      // CLP
  ordersToday: number;     // #
  aovToday: number;        // ticket promedio CLP
  productTop: { name: string; units: number };
  pagesRevalidated: number;
  stockLowCount: number;
  errors60m: number;
  team: {
    name: string;
    role: "Owner" | "Admin" | "Editor" | "Viewer";
    lastSeenMin?: number;
  }[];
  events: { time: string; label: string; tone?: "info" | "warn" | "err" }[];
};

// Snapshot determinista (mock). Cámbialo por fetch a tu backend cuando quieras.
export function getDashboardSnapshot(): DashboardSnapshot {
  return {
    actives5: 37,
    actives60: 212,
    salesToday: 189_990, // CLP
    ordersToday: 6,
    aovToday: 31_665,
    productTop: { name: "Cable HDMI 2.1 (2 m)", units: 9 },
    pagesRevalidated: 8,
    stockLowCount: 1,
    errors60m: 0,
    team: [
      { name: "Pedro A. Muñoz C.", role: "Owner",  lastSeenMin: 1 },
      { name: "Macarena D. Calle J.", role: "Admin", lastSeenMin: 8 },
      { name: "Diego M. Lagos", role: "Editor", lastSeenMin: 35 },
      { name: "Vania Belmar", role: "Viewer" }, // sin actividad reciente
    ],
    events: [
      { time: "12:04", label: "Pico de tráfico 2.5×", tone: "info" },
      { time: "12:20", label: "Producto más vendido: Cable HDMI 2.1 (2 m)", tone: "info" },
      { time: "16:10", label: "Stock bajo en Ventilador 120 mm ARGB", tone: "warn" },
    ],
  };
}
