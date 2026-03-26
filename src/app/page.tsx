// src/app/page.tsx
import Ticker from "@/components/home/NewsTicker";
import HeroPanel from "@/components/home/HeroPanel";
import SectionDivider from "@/components/home/SectionDivider";
import ShowcasePanel from "@/components/home/ShowcasePanel";
import NewArrivals from "@/components/home/NewArrivals";

export default function HomePage() {
  return (
    <>
      {/* Carrusel de noticias */}
      <Ticker />

      {/* Hero principal */}
      <HeroPanel />

      {/* ⭐ Bloque separador premium */}
      <SectionDivider />

      {/* Panel de categorías y colecciones */}
      <ShowcasePanel />

      {/* Nuevos productos */}
      <NewArrivals />
    </>
  );
}
