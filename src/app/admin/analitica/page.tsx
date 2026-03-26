"use client";

import Link from "next/link";

export default function AnaliticaPage() {
return (
    <div className="space-y-6">
    <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Analítica</h1>
        <Link
        href="/admin"
        className="px-3 py-2 rounded-md border border-neutral-700 hover:bg-neutral-800"
        >
        Volver al panel
        </Link>
    </div>

    <section className="rounded-xl border border-neutral-800 p-4 h-64 grid place-items-center text-neutral-500">
        (gráfico de líneas — mock)
    </section>
    <section className="rounded-xl border border-neutral-800 p-4 h-64 grid place-items-center text-neutral-500">
        (gráfico de barras — mock)
    </section>
    <section className="rounded-xl border border-neutral-800 p-4 h-64 grid place-items-center text-neutral-500">
        (gráfico de torta — mock)
    </section>
    </div>
);
}

