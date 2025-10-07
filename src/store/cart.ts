// src/store/cart.ts
"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/lib/products";

export type CartItem = { product: Product; qty: number };

type CartState = {
  items: CartItem[];
  add: (p: Product, qty?: number) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;

  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      add: (p, qty = 1) => {
        const items = structuredClone(get().items);
        const i = items.findIndex((it) => it.product.id === p.id);
        if (i >= 0) items[i].qty += qty;
        else items.push({ product: p, qty });
        set({ items });
      },

      inc: (id) => {
        const items = structuredClone(get().items);
        const it = items.find((i) => i.product.id === id);
        if (it) it.qty += 1;
        set({ items });
      },

      dec: (id) => {
        let items = structuredClone(get().items);
        const i = items.findIndex((it) => it.product.id === id);
        if (i >= 0) {
          items[i].qty -= 1;
          if (items[i].qty <= 0) items = items.filter((_, idx) => idx !== i);
          set({ items });
        }
      },

      remove: (id) => set({ items: get().items.filter((it) => it.product.id !== id) }),
      clear: () => set({ items: [] }),

      count: () => get().items.reduce((acc, it) => acc + it.qty, 0),
      subtotal: () => get().items.reduce((acc, it) => acc + it.product.price * it.qty, 0),
    }),
    {
      name: "lunara-cart",
      // NO intentes usar localStorage en el server:
      storage: typeof window !== "undefined"
        ? createJSONStorage(() => localStorage)
        : undefined,
      skipHydration: true, // evita leer antes de tiempo en SSR
    }
  )
);
