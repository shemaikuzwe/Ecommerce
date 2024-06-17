"use client";
import { createSlice } from "@reduxjs/toolkit";
export type Items = {
  id: number;
  price: number;
  quantity: number;
  name: string;
};
// const storedCart = localStorage.getItem("cart");
// const initialData = storedCart ? JSON.parse(storedCart) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    itemsList:[],
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
