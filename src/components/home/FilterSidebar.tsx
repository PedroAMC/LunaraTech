// src/components/home/FilterSidebar.tsx
"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FilterSidebar() {
  const [open, setOpen] = useState({
    category: true,
    price: false,
    sort: false,
    stock: false,
  });

  return (
    <aside
      className="w-full sm:w-64 bg-[#121318]/90 backdrop-blur-md rounded-xl border border-white/10 p-5 text-white
      shadow-[0_0_20px_rgba(0,150,255,0.1)] overflow-y-auto max-h-[75vh] scrollbar-thin 
      scrollbar-thumb-blue-700/50 scrollbar-track-transparent"
    >
      <h2 className="text-lg font-semibold mb-4 border-b border-white/10 pb-2 text-blue-400">
        Filtros (desactivados temporalmente)
      </h2>

      <p className="text-white/50 text-sm mb-4">
        Los filtros serán activados cuando se integre el filtro real conectado a MySQL.
      </p>

      <Section
        title="Categorías"
        open={open.category}
        toggle={() => setOpen({ ...open, category: !open.category })}
      >
        <p className="text-white/40 text-sm italic">
          Esta sección estará activa pronto.
        </p>
      </Section>

      <Section
        title="Precio"
        open={open.price}
        toggle={() => setOpen({ ...open, price: !open.price })}
      >
        <p className="text-white/40 text-sm italic">
          Filtros de precio en desarrollo.
        </p>
      </Section>

      <Section
        title="Ordenar por"
        open={open.sort}
        toggle={() => setOpen({ ...open, sort: !open.sort })}
      >
        <p className="text-white/40 text-sm italic">
          Ordenamiento disponible pronto.
        </p>
      </Section>

      <Section
        title="Disponibilidad"
        open={open.stock}
        toggle={() => setOpen({ ...open, stock: !open.stock })}
      >
        <p className="text-white/40 text-sm italic">
          Filtros de stock pronto.
        </p>
      </Section>
    </aside>
  );
}

function Section({
  title,
  children,
  open,
  toggle,
}: {
  title: string;
  children: React.ReactNode;
  open: boolean;
  toggle: () => void;
}) {
  return (
    <div className="mb-6">
      <button
        onClick={toggle}
        className="w-full flex justify-between items-center text-left uppercase text-xs text-white/70 hover:text-white mb-2 focus:outline-none"
      >
        {title}
        {open ? (
          <ChevronUp className="w-4 h-4 text-white/50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-white/50" />
        )}
      </button>

      <div
        className={`transition-all overflow-hidden ${
          open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
