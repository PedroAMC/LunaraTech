// src/lib/products.ts

export type Category = "perifericos" | "accesorios" | "almacenamiento";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;         // ruta dentro de /public (ej: /img/mouse.jpg)
  stock: number;         // 0 = sin stock
  slug: string;          // usado por /producto/[slug]
  category: Category;    // para filtros
  featured?: boolean;    // para el carrusel
};

// util: genera slug si se olvida declararlo en los datos
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// =============================
// Datos de ejemplo (ajústalos)
// =============================
const RAW_PRODUCTS: Array<
  Omit<Product, "slug"> & { slug?: string }
> = [
  {
    id: "p-001",
    name: "Mouse RGB Lunar",
    price: 15990,
    image: "/img/mouse-rgb.jpg",
    stock: 8,
    category: "perifericos",
    featured: true,
    // slug: "mouse-rgb-lunar",
  },
  {
    id: "p-002",
    name: "Teclado Mecánico Astro",
    price: 29990,
    image: "/img/teclado-astro.jpg",
    stock: 0,
    category: "perifericos",
    featured: true,
  },
  {
    id: "p-003",
    name: "Soporte para Audífonos Nebula",
    price: 8990,
    image: "/img/soporte-hp.jpg",
    stock: 12,
    category: "accesorios",
  },
  {
    id: "p-004",
    name: "SSD 1TB Warp",
    price: 69990,
    image: "/img/ssd-1tb.jpg",
    stock: 5,
    category: "almacenamiento",
  },
];

// export con slug garantizado
export const products: Product[] = RAW_PRODUCTS.map((p) => ({
  ...p,
  slug: p.slug ?? slugify(p.name),
}));

// helpers
export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}
export function getProductsByCategory(cat: Category) {
  return products.filter((p) => p.category === cat);
}
