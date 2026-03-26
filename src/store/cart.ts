import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/products";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  slug: string;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];

  add: (p: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
  updateQuantity: (id: number, delta: number) => void;

  subtotal: () => number;
  totalItems: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (p) => {
        const items = get().items;
        const exists = items.find((i) => i.id === p.id);

        if (exists) {
          return set({
            items: items.map((i) =>
              i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        }

        return set({
          items: [
            ...items,
            {
              id: p.id,
              name: p.name,
              price: p.price,
              slug: p.slug,
              image: p.imageUrl ?? "",
              quantity: 1,
            },
          ],
        });
      },

      remove: (id) =>
        set({
          items: get().items.filter((i) => i.id !== id),
        }),

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

      clear: () => set({ items: [] }),

      subtotal: () =>
        get()
          .items.map((i) => i.price * i.quantity)
          .reduce((acc, x) => acc + x, 0),

      totalItems: () =>
        get()
          .items.map((i) => i.quantity)
          .reduce((acc, x) => acc + x, 0),
    }),
    {
      name: "lunara-cart",
    }
  )
);