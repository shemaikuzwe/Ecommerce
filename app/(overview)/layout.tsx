"use client";
import { ReactNode, useEffect } from "react";
import Navbar from "@/app/_components/navbar";
import { useAppSelector } from "../_store/hook";
import { RootState } from "../_store/store";

export default function Layout({ children }: { children: ReactNode }) {
  // const cart = useAppSelector((state: RootState) => state.cart.itemsList);
  // useEffect(() => {
  //   localStorage.setItem("cart", JSON.stringify(cart));
  // }, [cart]);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
