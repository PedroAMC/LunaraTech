export type Product = {
  id: string;
  name: string;
  price: number;        // CLP
  category: "perifericos" | "accesorios" | "almacenamiento";
  stock: number;        // 0 = sin stock
  featured?: boolean;   // para el carrusel
};

export const products: Product[] = [
  { id: "hdmi-21", name: "Cable HDMI 2.1 (4K/8K)", price: 9990, category: "accesorios", stock: 12, featured: true },
  { id: "usb-c-25w", name: "Cargador USB-C 25W", price: 14990, category: "accesorios", stock: 0, featured: true },
  { id: "mouse-7200", name: "Mouse Gamer 7200 DPI", price: 19990, category: "perifericos", stock: 7 },
  { id: "tkl-mech", name: "Teclado Mecánico TKL", price: 39990, category: "perifericos", stock: 3, featured: true },
  { id: "headset-71", name: "Audífonos Gamer 7.1", price: 34990, category: "perifericos", stock: 0 },
  { id: "hub-6en1", name: "Hub USB-C 6 en 1", price: 24990, category: "accesorios", stock: 22 },
  { id: "ssd-1tb", name: "SSD NVMe 1TB Gen4", price: 74990, category: "almacenamiento", stock: 9, featured: true },
  { id: "microsd-128", name: "Tarjeta microSD 128GB", price: 12990, category: "almacenamiento", stock: 0 },
  { id: "mousepad-xl", name: "Mousepad XL Antideslizante", price: 9990, category: "perifericos", stock: 18 },
  { id: "soporte-nb", name: "Soporte Notebook Aluminio", price: 19990, category: "accesorios", stock: 5 },
  { id: "dock-joy", name: "Base de Carga Joy-Con", price: 22990, category: "accesorios", stock: 4 },
  { id: "pro-controller", name: "Mando Pro Inalámbrico", price: 49990, category: "perifericos", stock: 0, featured: true },
];

