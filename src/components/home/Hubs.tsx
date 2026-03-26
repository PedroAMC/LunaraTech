// src/components/home/Hubs.tsx
import Link from "next/link";

type Hub = {
  slug: string;
  title: string;
  subtitle: string;
  className?: string;
};

const HUBS: Hub[] = [
  {
    slug: "hardware",
    title: "Computer Hardware",
    subtitle: "SHOP PC HARDWARE",
    className: "from-sky-900/30 to-cyan-900/20",
  },
  {
    slug: "pcs",
    title: "Lunara XS Systems",
    subtitle: "CUSTOM BUILT PCS",
    className: "from-sky-900/30 to-indigo-900/20",
  },
  {
    slug: "ai",
    title: "Lunara AI",
    subtitle: "EXPLORE AI & ACCELERATORS",
    className: "from-slate-900/30 to-zinc-900/20",
  },
  {
    slug: "audio-pro",
    title: "Pro Audio",
    subtitle: "SHOP MUSIC & AUDIO",
    className: "from-rose-900/20 to-fuchsia-900/10",
  },
  {
    slug: "gaming",
    title: "Pro Gaming",
    subtitle: "SHOP GAMING & STREAMING",
    className: "from-violet-900/20 to-sky-900/10",
  },
  {
    slug: "pro-video",
    title: "Pro Video",
    subtitle: "SHOP CAMERA & VIDEO",
    className: "from-amber-900/20 to-orange-900/10",
  },
];

export default function Hubs() {
  return (
    <section className="block">
      <div className="grid gap-4 md:grid-cols-3">
        {HUBS.map((h) => (
          <Link
            key={h.slug}
            href={`/catalogo/${h.slug}`}
            className={
              "relative overflow-hidden rounded-2xl p-5 md:p-6 bg-gradient-to-br " +
              (h.className ?? "")
            }
          >
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight text-white">
                {h.title}
              </h3>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-neutral-200 border-white/10 bg-white/5">
                  {h.subtitle}
                </span>
              </div>
            </div>

            <div className="pointer-events-none absolute -right-6 -bottom-6 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
          </Link>
        ))}
      </div>
    </section>
  );
}
