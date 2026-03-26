//src/app/admin/page.tsx
"use client";

import AdminHeader from "@/components/admin/AdminHeader";
import KPI from "@/components/admin/KPI";
import PresenceDot from "@/components/admin/PresenceDot";
import EventTimeline from "@/components/admin/EventTimeline";
import { getDashboardSnapshot } from "@/lib/dashboard";

export default function EstadoPage() {
  // Snapshot único para que el SSR calce con el primer render del cliente
  const snap = getDashboardSnapshot();

  return (
    <div className="space-y-6">
      <AdminHeader name="Pedro A. Muñoz C." />

      {/* KPIs principales (solo cifras, sin gráficos) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <KPI title="Usuarios activos" value={snap.actives5} subtitle="últimos 5 min" />
        <KPI title="Usuarios activos" value={snap.actives60} subtitle="últimos 60 min" />
        <KPI title="Ventas de hoy" value={`$${snap.salesToday.toLocaleString("es-CL")}`} />
        <KPI title="Órdenes de hoy" value={snap.ordersToday} />
        <KPI title="Ticket promedio" value={`$${snap.aovToday.toLocaleString("es-CL")}`} />
        <KPI title="Producto más vendido" value={snap.productTop.units} subtitle={snap.productTop.name} />
        <KPI title="Páginas revalidadas" value={snap.pagesRevalidated} />
        <KPI title="Productos con bajo stock" value={snap.stockLowCount} tone={snap.stockLowCount ? "warning":"success"} />
        <KPI title="Errores 5xx (60 min)" value={snap.errors60m} tone={snap.errors60m ? "danger":"success"} />
      </div>

      {/* Actividad del equipo: presencia */}
      <div className="rounded-xl border border-neutral-800 bg-neutral-950/40 p-4">
        <div className="text-neutral-300 font-medium mb-2">Actividad del equipo</div>
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {snap.team.map((m, i) => (
            <li key={i} className="flex items-center justify-between rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-2">
              <div>
                <div className="font-medium text-neutral-200">{m.name}</div>
                <div className="text-xs text-neutral-400">{m.role}</div>
              </div>
              <div className="flex items-center gap-2">
                <PresenceDot minutes={m.lastSeenMin} />
                <span className="text-xs text-neutral-400">
                  {m.lastSeenMin === undefined ? "sin actividad" : `visto hace ${m.lastSeenMin} min`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Eventos destacados */}
      <EventTimeline items={snap.events} />
    </div>
  );
}
