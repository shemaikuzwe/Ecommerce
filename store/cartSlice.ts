import { Cart } from "@/lib/definition";
import { createSlice } from "@reduxjs/toolkit";

const initialState: Cart = {
  itemsList: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
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
    setCart(state, action) {
      state.itemsList = action.payload;
    },
  },
});
export const cartAction = cartSlice.actions;
export default cartSlice;
