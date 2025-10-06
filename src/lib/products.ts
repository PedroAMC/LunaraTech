// src/lib/products.ts
export type Category = "perifericos" | "accesorios" | "almacenamiento";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;           // ruta en /public/img/... o placeholder
  stock: number;           // 0 -> sin stock
  slug: string;            // para /producto/[slug]
  category: Category;      // para filtros
  featured?: boolean;      // para el carrusel de destacados
};

// util mínima para generar slugs si te olvidas de ponerlos en los datos
const slugify = (s: string) =>
  s.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// === Datos (mapeados a 3 categorías actuales) =============================
// - "perifericos": teclados, mouse, webcams, parlantes, etc.
// - "accesorios": cables, cargadores/energía, hubs, holders, redes, celulares, mantención, otros
// - "almacenamiento": pendrives, microSD, SSD/HDD externos, lectores, cajas

const RAW: Array<
  Omit<Product, "slug"> & { slug?: string }
> = [
  // ----- ACCESORIOS (Cables / Energía / Redes / Celulares / Mantención / Otros)
  { id:"c-001", name:"Cable HDMI 1.4 (2 m)", price:4990, image:"/img/hdmi14-2m.jpg", stock:12, category:"accesorios" },
  { id:"c-002", name:"Cable HDMI 2.0 (2 m)", price:6990, image:"/img/hdmi20-2m.jpg", stock:20, category:"accesorios" },
  { id:"c-003", name:"Cable HDMI 2.0 (3 m)", price:7990, image:"/img/hdmi20-3m.jpg", stock:15, category:"accesorios" },
  { id:"c-004", name:"Cable HDMI 2.0 (5 m)", price:9990, image:"/img/hdmi20-5m.jpg", stock:10, category:"accesorios" },
  { id:"c-005", name:"Cable HDMI 2.1 8K (2 m)", price:12990, image:"/img/hdmi21-2m.jpg", stock:8, category:"accesorios", featured:true },
  { id:"c-006", name:"DisplayPort → HDMI", price:7990, image:"/img/dp-hdmi.jpg", stock:9, category:"accesorios" },
  { id:"c-007", name:"MiniDP → HDMI", price:7990, image:"/img/minidp-hdmi.jpg", stock:7, category:"accesorios" },
  { id:"c-008", name:"HDMI → VGA activo", price:8990, image:"/img/hdmi-vga.jpg", stock:6, category:"accesorios" },
  { id:"c-009", name:"VGA → HDMI activo", price:9990, image:"/img/vga-hdmi.jpg", stock:5, category:"accesorios" },
  { id:"c-010", name:"USB-A → USB-C (1 m)", price:2990, image:"/img/usb-a-c-1m.jpg", stock:30, category:"accesorios" },
  { id:"c-011", name:"USB-A → USB-C (2 m)", price:3990, image:"/img/usb-a-c-2m.jpg", stock:18, category:"accesorios" },
  { id:"c-012", name:"USB-A → Micro-USB (1 m)", price:1990, image:"/img/usb-a-micro.jpg", stock:22, category:"accesorios" },
  { id:"c-013", name:"USB-C → USB-C PD 60 W (1 m)", price:5990, image:"/img/usb-c-c-60w.jpg", stock:14, category:"accesorios" },
  { id:"c-014", name:"USB-C → USB-C PD 100 W (1 m)", price:8990, image:"/img/usb-c-c-100w.jpg", stock:10, category:"accesorios" },
  { id:"c-015", name:"USB-B impresora (1.5 m)", price:2990, image:"/img/usb-b.jpg", stock:25, category:"accesorios" },
  { id:"c-016", name:"OTG USB-C ↔ USB-A (adaptador)", price:2990, image:"/img/otg-c-a.jpg", stock:19, category:"accesorios" },
  { id:"c-017", name:"Audio 3.5 mm macho-macho (1.5 m)", price:2990, image:"/img/audio35.jpg", stock:17, category:"accesorios" },
  { id:"c-018", name:"Extensión 3.5 mm", price:2990, image:"/img/ext-35.jpg", stock:14, category:"accesorios" },
  { id:"c-019", name:"Splitter 3.5 mm TRRS→2×TRS", price:3990, image:"/img/splitter-35.jpg", stock:11, category:"accesorios" },
  { id:"c-020", name:"Ethernet Cat6 (3 m)", price:3990, image:"/img/cat6-3m.jpg", stock:20, category:"accesorios" },
  { id:"c-021", name:"Ethernet Cat6 (10 m)", price:8990, image:"/img/cat6-10m.jpg", stock:6, category:"accesorios" },
  { id:"c-022", name:"Hub USB 3.0 4 puertos", price:9990, image:"/img/hub4.jpg", stock:10, category:"accesorios", featured:true },
  { id:"c-023", name:"Extensor USB 3.0 (2 m)", price:4990, image:"/img/ext-usb.jpg", stock:8, category:"accesorios" },
  { id:"c-024", name:"HDMI switch 3×1", price:10990, image:"/img/hdmi-switch.jpg", stock:5, category:"accesorios" },
  { id:"c-025", name:"HDMI splitter 1×2", price:10990, image:"/img/hdmi-splitter.jpg", stock:5, category:"accesorios" },

  { id:"e-001", name:"Cargador pared USB 5V/2A", price:5990, image:"/img/cargador-5v2a.jpg", stock:12, category:"accesorios" },
  { id:"e-002", name:"Cargador pared USB-C PD 20W", price:9990, image:"/img/cargador-20w.jpg", stock:10, category:"accesorios" },
  { id:"e-003", name:"Cargador pared USB-C PD 30W", price:14990, image:"/img/cargador-30w.jpg", stock:7, category:"accesorios" },
  { id:"e-004", name:"Cargador auto 12V (USB-A/C)", price:7990, image:"/img/auto-12v.jpg", stock:10, category:"accesorios" },
  { id:"e-005", name:"Powerbank 10 000 mAh", price:17990, image:"/img/power-10k.jpg", stock:6, category:"accesorios" },
  { id:"e-006", name:"Powerbank 20 000 mAh", price:27990, image:"/img/power-20k.jpg", stock:4, category:"accesorios" },

  { id:"r-001", name:"Switch 5 puertos Gigabit", price:21990, image:"/img/switch-5g.jpg", stock:5, category:"accesorios" },
  { id:"r-002", name:"Adaptador USB WiFi", price:9990, image:"/img/usb-wifi.jpg", stock:9, category:"accesorios" },

  { id:"m-001", name:"Pasta térmica 4 g", price:4990, image:"/img/pasta-termica.jpg", stock:20, category:"accesorios" },
  { id:"m-002", name:"Kit limpieza (paños+isoprop.)", price:3990, image:"/img/kit-limpieza.jpg", stock:18, category:"accesorios" },
  { id:"m-003", name:"Aire comprimido", price:6990, image:"/img/aire.jpg", stock:10, category:"accesorios" },

  { id:"o-001", name:"Lámpara LED escritorio", price:12990, image:"/img/lampara.jpg", stock:6, category:"accesorios" },
  { id:"o-002", name:"Soporte de audífonos", price:7990, image:"/img/stand-headset.jpg", stock:8, category:"accesorios" },

  // ----- PERIFÉRICOS
  { id:"p-001", name:"Teclado básico USB", price:9990, image:"/img/teclado-basico.jpg", stock:10, category:"perifericos" },
  { id:"p-002", name:"Teclado mecánico RGB", price:29990, image:"/img/teclado-rgb.jpg", stock:5, category:"perifericos", featured:true },
  { id:"p-003", name:"Mouse básico óptico", price:4990, image:"/img/mouse-basico.jpg", stock:15, category:"perifericos" },
  { id:"p-004", name:"Mouse gamer 6400 DPI", price:13990, image:"/img/mouse-gamer.jpg", stock:0, category:"perifericos" },
  { id:"p-005", name:"Mousepad S", price:3990, image:"/img/mousepad-s.jpg", stock:20, category:"perifericos" },
  { id:"p-006", name:"Mousepad XL", price:9990, image:"/img/mousepad-xl.jpg", stock:7, category:"perifericos" },
  { id:"p-007", name:"Parlantes USB compactos", price:12990, image:"/img/parlantes-usb.jpg", stock:8, category:"perifericos" },
  { id:"p-008", name:"Audífonos 3.5 mm con mic", price:9990, image:"/img/audif-35.jpg", stock:10, category:"perifericos" },
  { id:"p-009", name:"Micrófono USB básico", price:14990, image:"/img/mic-usb.jpg", stock:6, category:"perifericos" },
  { id:"p-010", name:"Webcam 1080p", price:19990, image:"/img/webcam-1080.jpg", stock:5, category:"perifericos", featured:true },

  // ----- ALMACENAMIENTO
  { id:"a-001", name:"Pendrive USB 3.0 32 GB", price:6990, image:"/img/pendrive-32.jpg", stock:25, category:"almacenamiento" },
  { id:"a-002", name:"Pendrive USB 3.0 64 GB", price:9990, image:"/img/pendrive-64.jpg", stock:18, category:"almacenamiento" },
  { id:"a-003", name:"Pendrive USB 3.0 128 GB", price:15990, image:"/img/pendrive-128.jpg", stock:8, category:"almacenamiento" },
  { id:"a-004", name:"microSD 64 GB", price:9990, image:"/img/microsd-64.jpg", stock:14, category:"almacenamiento" },
  { id:"a-005", name:"microSD 128 GB", price:14990, image:"/img/microsd-128.jpg", stock:10, category:"almacenamiento" },
  { id:"a-006", name:"microSD 256 GB", price:24990, image:"/img/microsd-256.jpg", stock:6, category:"almacenamiento" },
  { id:"a-007", name:"Lector SD/microSD USB 3.0", price:5990, image:"/img/lector-sd.jpg", stock:10, category:"almacenamiento" },
  { id:"a-008", name:'Caja externa 2.5" USB 3.0', price:12990, image:"/img/caddy-25.jpg", stock:5, category:"almacenamiento", featured:true },
];

// Exporta con slug garantizado
export const products: Product[] = RAW.map(p => ({
  ...p,
  slug: p.slug ?? slugify(p.name),
}));

// Helper
export function getProductBySlug(slug: string) {
  return products.find(p => p.slug === slug) ?? null;
}
