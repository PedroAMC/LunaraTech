export type Product = {
  id: string;
  name: string;
  price: number;     // CLP
  stock: number;
  tags: string[];    // etiquetas
  image: string;     // /ruta o URL
  visible: boolean;
};

export const seedProducts: Product[] = [
  { id: "1", name: "Cable HDMI 2.1 2m",      price: 8990,  stock: 24, visible: true,  tags: ["cable","hdmi"],         image: "/images/hdmi.jpg" },
  { id: "2", name: "Cargador USB-C 30W",     price: 17990, stock: 5,  visible: true,  tags: ["cargadores"],           image: "/images/charger.jpg" },
  { id: "3", name: "Ventilador 120mm ARGB",  price: 12990, stock: 0,  visible: false, tags: ["cooling","ventilador"], image: "/images/fan.jpg" },
  { id: "4", name: "Teclado Mecánico TKL",   price: 44990, stock: 12, visible: true,  tags: ["teclados"],             image: "/images/keyboard.jpg" },
];

const KEY = "lt_products";

export function loadProducts(): Product[] {
  if (typeof window === "undefined") return seedProducts;
  const raw = window.localStorage.getItem(KEY);
  if (!raw) return seedProducts;
  try { return JSON.parse(raw) as Product[]; } catch { return seedProducts; }
}

export function saveProducts(list: Product[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  }
}

export function getById(id: string, source?: Product[]): Product | undefined {
  const list = source ?? loadProducts();
  return list.find(p => p.id === id);
}