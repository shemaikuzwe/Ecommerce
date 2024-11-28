import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, AppStore } from "./store";
import { useEffect } from "react";

function useStorage() {
  const cart = useAppSelector((state: RootState) => state.cart.itemsList);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
  if (typeof window !== "undefined") {
    try {
      const cart = window.localStorage.getItem("cart");
      if (cart === null) return [];
      return JSON.parse(cart);
    } catch (error) {
      return [];
    }
  }
  return [];
}

export default useStorage;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useSelector.withTypes<AppStore>();
