//add items
//remove items
//clear the cart
//keep track of cart items

import { Product } from "@/components/ProductReel";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  decreaseItem: (productId: number) => void;
  clearCart: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const item = state.items.find(
            (item) => item.product.id === product.id
          );
          if (item) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: 1 }],
          };
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== id),
        })),
      decreaseItem: (id) =>
        set((state) => {
          const item = state.items.find((item) => item.product.id === id);
          if (item && item.quantity > 1) {
            return {
              items: state.items.map((item) =>
                item.product.id === id
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              ),
            };
          }
          return {
            items: state.items.filter((item) => item.product.id !== id),
          };
        }),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
//storage: createJSONStorage(() => localStorage): Specifies that localStorage should be used for storage.
