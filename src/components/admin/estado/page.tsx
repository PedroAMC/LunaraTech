"use client";

export default function EstadoPage() {
return (
    <div className="space-y-6">
    <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Estado del sistema</h1>
    </div>

    <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="text-neutral-400 text-sm">Estado</div>
        <div className="text-4xl font-semibold mt-2 text-emerald-300">ACTIVO</div>
        <div className="text-neutral-500 text-xs mt-1">Uptime 99.9%</div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="text-neutral-400 text-sm">Última incidencia</div>
        <div className="text-xl mt-2">No reportada</div>
        </div>

        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-4">
        <div className="text-neutral-400 text-sm">Revalidaciones hoy</div>
        <div className="text-4xl font-semibold mt-2">8</div>
        </div>
    </div>
    </div>
);
}
