"use client";

export default function AdminDashboardPage() {
return (
    <div className="space-y-6">
    <h1 className="text-2xl font-semibold">Panel de control</h1>

    <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="text-neutral-400 text-sm">Usuarios activos</div>
        <div className="text-4xl font-semibold mt-2">37</div>
        <div className="text-neutral-500 text-xs mt-1">Últimos 5 min</div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="text-neutral-400 text-sm">Estado</div>
        <div className="text-4xl font-semibold mt-2">ACTIVO</div>
        <div className="text-neutral-500 text-xs mt-1">Uptime 99.9%</div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="text-neutral-400 text-sm">Páginas revalidadas</div>
        <div className="text-4xl font-semibold mt-2">8</div>
        <div className="text-neutral-500 text-xs mt-1">Hoy</div>
        </div>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-400 text-sm grid place-items-center">
        (line chart mock)
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-400 text-sm grid place-items-center">
        (bar chart mock)
        </div>
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-neutral-400 text-sm grid place-items-center">
        (pie chart mock)
        </div>
    </div>
    </div>
);
}
