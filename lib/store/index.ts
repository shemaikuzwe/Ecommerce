import { create } from "zustand";
import { Actions, Cart } from "@/lib/types/types";
import {persist} from "zustand/middleware";

export const useCart = create<Cart & Actions>()(persist((set) => ({
    itemsList: [],
    addToCart: (item) =>
        set((state) => ({
            itemsList: [...state.itemsList, item],
        })),
    removeFromCart: (id) =>
        set((state) => ({
            itemsList: state.itemsList.filter((item) => item.id !== id),
        })),
    incrementQuantity: (id) =>
        set((state) => ({
            itemsList: state.itemsList.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1,
                    }
                    : item
            ),
        })),
    decrementQuantity: (id) =>
        set((state) => ({
            itemsList: state.itemsList.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        quantity: Math.max(0, item.quantity - 1),
                    }
                    : item
            ),
        })),
    removeAll: () =>
        set({
            itemsList: [],
        }),
}),{name:"cart"}));