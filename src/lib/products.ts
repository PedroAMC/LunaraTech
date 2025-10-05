// src/lib/products.ts
export type Product = { slug: string; name: string; price: number };

export const products: Product[] = [
  { slug: "cable-hdmi-21", name: "Cable HDMI 2.1 (4K/8K)", price: 9990 },
  { slug: "cargador-usb-c-25w", name: "Cargador USB-C 25W", price: 14990 },
  { slug: "mouse-gamer-7200dpi", name: "Mouse Gamer 7200 DPI", price: 19990 },
  { slug: "teclado-mecanico", name: "Teclado Mecánico TKL", price: 39990 },
  { slug: "audifonos-gamer", name: "Audífonos Gamer 7.1", price: 34990 },
  { slug: "hub-usb-c", name: "Hub USB-C 6 en 1", price: 24990 },
];
