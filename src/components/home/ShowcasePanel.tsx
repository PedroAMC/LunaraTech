"use client";

import Link from "next/link";

type Block = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  href: string;
  highlight?: boolean;
  image: string;
};

const TOP_ROW: Block[] = [
  {
    id: "hardware",
    eyebrow: "SHOP PC HARDWARE",
    title: "Computer Hardware",
    description: "Components, cooling, power and cases ready to ship.",
    cta: "Enter",
    href: "/productos?cat=hardware",
    image: "/placeholders/showcase-hardware.jpg",
  },
  {
    id: "custom-builds",
    eyebrow: "CUSTOM BUILT PCS",
    title: "Custom Builds",
    description:
      "Preconfigured rigs and fully custom builds tuned by LunaraTech.",
    cta: "Explore",
    href: "/colecciones/custom-pc",
    highlight: true,
    image: "/placeholders/showcase-custom.jpg",
  },
  {
    id: "lunara-ai",
    eyebrow: "EXPLORE AI & TECH",
    title: "Lunara AI",
    description:
      "GPUs, workstations and storage for AI, 3D and data workloads.",
    cta: "Explore",
    href: "/colecciones/ai",
    image: "/placeholders/showcase-ai.jpg",
  },
];

const MID_ROW: Block[] = [
  {
    id: "pro-audio",
    eyebrow: "SHOP MUSIC & AUDIO",
    title: "Pro Audio",
    description: "Microphones, interfaces and monitoring for creators.",
    cta: "Enter",
    href: "/productos?cat=audio",
    image: "/placeholders/showcase-audio.jpg",
  },
  {
    id: "pro-gaming",
    eyebrow: "SHOP GAMING & STREAMING",
    title: "Pro Gaming",
    description: "Keyboards, mice, headsets and gear to sweat your MMR.",
    cta: "Enter",
    href: "/productos?cat=gaming",
    highlight: true,
    image: "/placeholders/showcase-gaming.jpg",
  },
  {
    id: "pro-video",
    eyebrow: "SHOP CAMERA & VIDEO",
    title: "Pro Video",
    description: "Cameras, capture and lighting for clean live or VOD.",
    cta: "Enter",
    href: "/productos?cat=video",
    image: "/placeholders/showcase-video.jpg",
  },
  {
    id: "pro-graphics",
    eyebrow: "SHOP PRO GRAPHICS",
    title: "Pro Graphics",
    description: "GPUs and displays for design, CAD and visualization.",
    cta: "Enter",
    href: "/productos?cat=graphics",
    image: "/placeholders/showcase-graphics.jpg",
  },
];

const BOTTOM_ROW: Block[] = [
  {
    id: "categories",
    eyebrow: "CATEGORIES",
    title: "Browse by category",
    description: "See every segment in one structured view.",
    cta: "View all",
    href: "/categorias",
    image: "/placeholders/showcase-browse.jpg",
  },
  {
    id: "catalog",
    eyebrow: "CATALOG",
    title: "Explore all products",
    description:
      "Browse the complete LunaraTech lineup with filters and search.",
    cta: "Explore products",
    href: "/productos",
    image: "/placeholders/showcase-explore_all.jpg",
  },
];

type ShowcaseCardProps = {
  block: Block;
  extraClasses?: string;
};

const ShowcaseCard = ({ block, extraClasses = "" }: ShowcaseCardProps) => {
  const gradientDark = block.highlight
    ? "absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/60"
    : "absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/70";

  const gradientLight =
    "absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white/70";

  return (
    <Link
      href={block.href}
      className={`
        group relative flex flex-col justify-end
        px-7 py-7
        min-h-[260px]
        border
        overflow-hidden transition
        rounded-none
        ${
          block.highlight
            ? "border-cyan-400/70"
            : "border-slate-300 dark:border-cyan-900/40"
        }
        hover:border-cyan-400/80
        hover:shadow-[0_18px_80px_rgba(0,0,0,0.25)] 
        ${extraClasses}
      `}
    >
      {/* Imagen */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={block.image}
          alt={block.title}
          className="
            h-full w-full object-cover object-center
            brightness-[1.15] contrast-[1.05]
            group-hover:brightness-[1.25]
            transform scale-105 group-hover:scale-110
            transition-all duration-500
          "
        />

        {/* gradiente adaptado */}
        <div className={`dark:${gradientDark} light:${gradientLight}`} />
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        <div className="text-[10px] font-semibold tracking-[0.16em]
          text-cyan-800 dark:text-cyan-100 uppercase">
          {block.eyebrow}
        </div>

        <h3 className="mt-1 text-2xl lg:text-[26px] font-semibold
          text-slate-900 dark:text-white">
          {block.title}
        </h3>

        <p className="mt-1 text-[11px] lg:text-xs max-w-sm
          text-slate-700 dark:text-neutral-100">
          {block.description}
        </p>

        <div className="mt-4">
          <span
            className={`
              inline-flex items-center rounded-full px-4 py-2
              text-[10px] font-semibold tracking-wide border transition
              ${
                block.highlight
                  ? "border-cyan-400 bg-gradient-to-r from-sky-500 to-cyan-400 text-black"
                  : "border-cyan-400/70 text-cyan-700 dark:text-cyan-200"
              }
            `}
          >
            {block.cta.toUpperCase()}
            <span className="ml-2 transition-transform group-hover:translate-x-1">
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

export default function ShowcasePanel() {
  return (
    <section className="w-full bg-white dark:bg-[#020509]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {TOP_ROW.map((block) => (
          <ShowcaseCard key={block.id} block={block} extraClasses="lg:min-h-[300px]" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
        {MID_ROW.map((block) => (
          <ShowcaseCard key={block.id} block={block} extraClasses="lg:min-h-[260px]" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
        {BOTTOM_ROW.map((block) => (
          <ShowcaseCard key={block.id} block={block} extraClasses="lg:min-h-[240px]" />
        ))}
      </div>
    </section>
  );
}
