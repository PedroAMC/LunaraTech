"use client";
import { useEffect, useState } from "react";

export default function AdminHeader({ name }: { name: string }) {
  const [now, setNow] = useState<string>(() => new Date().toLocaleString("es-CL"));
  useEffect(() => {
    const id = setInterval(() => setNow(new Date().toLocaleString("es-CL")), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold">Panel de control</h1>
        <p className="text-sm text-neutral-400">Hola, {name} - {now}</p>
      </div>
      <div className="px-3 py-1.5 rounded-xl border border-emerald-700/40 bg-emerald-900/20 text-emerald-300 text-sm">
        Sistema: <span className="font-medium">ACTIVO</span>
      </div>
    </div>
  );
}
