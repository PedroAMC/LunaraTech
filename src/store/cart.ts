import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type CartItem = { id: string; name: string; price: number; qty: number };

type CartState = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (item) => {
        const exists = get().items.find((i) => i.id === item.id);
        if (exists) {
          set({
            items: get().items.map((i) =>
              i.id === item.id ? { ...i, qty: i.qty + item.qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },
      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((n, i) => n + i.qty, 0),
      total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: "lunara-cart", storage: createJSONStorage(() => localStorage) }
  )
);