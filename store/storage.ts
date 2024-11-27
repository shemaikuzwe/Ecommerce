import { useEffect } from "react";
import { useAppSelector } from "./hook";
import { RootState } from "./store";

function useStorage() {
  const cart = useAppSelector((state: RootState) => state.cart.itemsList);
  useEffect(()=>{
    if (typeof window !== "undefined") {
      window.localStorage.setItem("cart",JSON.stringify(cart))
    }
  },[cart])
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
