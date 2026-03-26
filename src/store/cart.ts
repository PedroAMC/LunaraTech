import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  slug: string;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  add: (p: Product) => void;
  remove: (id: string) => void;
  clear: () => void;
  updateQuantity: (id: string, delta: number) => void;

  subtotal: () => number;
  totalItems: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      // ➕ Agregar producto
      add: (p) => {
        const items = get().items;
        const exists = items.find((i) => i.id === p.id);

        // Ya existe → sumamos cantidad
        if (exists) {
          return set({
            items: items.map((i) =>
              i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        }

        // No existe → crear uno nuevo
        return set({
          items: [
            ...items,
            {
              id: p.id,
              name: p.name,
              price: p.price,
              slug: p.slug,
              image: p.image ?? "",
              quantity: 1,
            },
          ],
        });
      },

      // 🗑️ Eliminar producto del carrito
      remove: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

      // 🔄 Cambiar cantidad (+1 o −1)
      updateQuantity: (id, delta) => {
        const items = get().items;

        return set({
          items: items
            .map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + delta } : i
            )
            .filter((i) => i.quantity > 0),
        });
      },

      // ❌ Vaciar carrito completo
      clear: () => set({ items: [] }),

      // 💰 Subtotal
      subtotal: () =>
        get()
          .items.map((i) => i.price * i.quantity)
          .reduce((acc, x) => acc + x, 0),

      // 🔢 Cantidad de productos totales
      totalItems: () =>
        get()
          .items.map((i) => i.quantity)
          .reduce((acc, x) => acc + x, 0),
    }),
    {
      name: "lunara-cart", // clave en localStorage
    }
  )
);
