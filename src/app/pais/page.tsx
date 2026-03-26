"use client";

import { useState } from "react";
import { regions } from "./countries";
import ReactCountryFlag from "react-country-flag";

export default function CountrySelectorPage() {
  const [activeTab, setActiveTab] = useState(0);

  const handleSelect = (country: string, code?: string) => {
    if (!code) return; // Evita seleccionar los que no están activos
    localStorage.setItem(
      "selectedCountry",
      JSON.stringify({ name: country, code })
    );
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white py-20">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-4">
          Selecciona tu región y país
        </h1>
        <p className="text-neutral-400 text-center mb-10">
          Personaliza tu experiencia en LunaraTech según tu ubicación.
        </p>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8 border-b border-white/10">
          {regions.map((region, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`pb-2 text-sm md:text-base transition-colors ${
                activeTab === idx
                  ? "border-b-2 border-emerald-500 text-emerald-400"
                  : "text-neutral-400 hover:text-emerald-300"
              }`}
            >
              {region.name}
            </button>
          ))}
        </div>

        {/* Country list */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-6">
          {regions[activeTab].countries.map((c, idx) => (
            <div key={idx}>
              {c.comingSoon ? (
                <div className="text-left opacity-50 select-none cursor-default">
                  <div className="flex items-center gap-2 mb-1">
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      style={{
                        width: "1.4em",
                        height: "1.4em",
                        borderRadius: "3px",
                        opacity: 0.6,
                      }}
                    />
                    <span className="font-semibold">{c.name}</span>
                  </div>
                  <div className="text-neutral-500 text-sm">{c.language}</div>
                  <div className="text-xs text-neutral-600 mt-1">
                    Próximamente
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => handleSelect(c.name, c.code)}
                  className="text-left hover:text-emerald-400 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      style={{
                        width: "1.4em",
                        height: "1.4em",
                        borderRadius: "3px",
                        boxShadow: "0 0 3px rgba(0,0,0,0.4)",
                      }}
                    />
                    <span className="font-semibold">{c.name}</span>
                  </div>
                  <div className="text-neutral-500 text-sm">{c.language}</div>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-16 pt-6 text-center text-neutral-500 text-xs">
          © {new Date().getFullYear()} LunaraTech. Todos los derechos reservados.
        </div>
      </div>
    </div>
  );
}
