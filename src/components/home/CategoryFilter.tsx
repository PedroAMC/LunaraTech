// src/components/home/CategoryFilter.tsx
"use client";

import { useState } from "react";

const categories = ["Todos", "Cables", "Periféricos", "Accesorios", "Almacenamiento"];

export default function CategoryFilter({
  onSelectCategory,
}: {
  onSelectCategory: (category: string) => void;
}) {
  const [selected, setSelected] = useState("Todos");

  const handleClick = (category: string) => {
    setSelected(category);
    onSelectCategory(category);
  };

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleClick(category)}
          className={`px-5 py-2 text-sm font-medium rounded-full border transition-all duration-300 
            ${
              selected === category
                ? "bg-gradient-to-r from-blue-600 to-cyan-400 text-white border-blue-400 shadow-[0_0_10px_rgba(0,150,255,0.6)]"
                : "border-white/10 text-white/70 hover:border-blue-400 hover:text-white"
            }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
