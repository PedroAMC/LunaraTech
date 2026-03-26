// src/components/home/HomeAboveFold.tsx
"use client";

import Container from "@/components/layout/Container";
import Hero from "./Hero";
import Categories from "./Categories";

const CATEGORY_ITEMS = [
  { slug: "hardware", label: "Hardware" },
  { slug: "perifericos", label: "Periféricos" },
  { slug: "audio-pro", label: "Audio Pro" },
  { slug: "almacenamiento", label: "Almacenamiento" },
  { slug: "redes", label: "Redes" },
  { slug: "accesorios", label: "Accesorios" },
];

export default function HomeAboveFold() {
  return (
    <section className="full-bleed bg-[#05070d] border-b border-white/5">
      <Container className="py-8">
        <div
          className="
            rounded-3xl
            bg-[radial-gradient(1200px_800px_at_0%_0%,rgba(56,189,248,.16),transparent),
                radial-gradient(900px_600px_at_100%_0%,rgba(37,99,235,.15),transparent),
                #020308]
            border border-white/8
            shadow-[0_18px_55px_rgba(0,0,0,0.65)]
            px-6 sm:px-10 pt-10 pb-6
            flex flex-col gap-8
          "
        >
          <Hero
            title="Stock real, envíos rápidos"
            subtitle="Lo que ves es lo que hay. Sin humo, solo hardware serio para tu setup."
            ctaPrimary={{ href: "/productos", label: "Ver catálogo" }}
            ctaSecondary={{ href: "/colecciones", label: "Novedades" }}
          />

          <div className="-mb-2">
            <Categories items={CATEGORY_ITEMS} />
          </div>
        </div>
      </Container>
    </section>
  );
}
