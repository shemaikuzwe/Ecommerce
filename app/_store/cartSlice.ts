"use client";
import { createSlice } from "@reduxjs/toolkit";
export type Items = [id: number, price: number, quantity: number, name: string];
function storage() {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    if (cart == null) return [];
    return JSON.parse(cart);
  }
  return [];
}
const initialData = storage();
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList: initialData,
  },
  reducers: {
    addToCart(state, action) {
      const newItem: Items = action.payload;
      state.itemsList.push({
        id: newItem.id,
        quantity: 1,
        price: newItem.price,
        name: newItem.name,
      });
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.itemsList = state.itemsList.filter((item) => item.id !== id);
    },
    incrementQuantity(state, action) {
      const id = action.payload;
      state.itemsList = state.itemsList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });
    },
    decrementQuantity(state, action) {
      const id = action.payload;
      state.itemsList = state.itemsList.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });
    },
    removeAll(state) {
      state.itemsList = [];
    },
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice;
