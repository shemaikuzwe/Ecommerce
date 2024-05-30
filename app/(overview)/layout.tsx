"use client";
import { ReactNode, useEffect } from "react";
import Navbar from "@/app/_components/navbar";
import { useSelector } from "react-redux";

export default function Layout({ children }: { children: ReactNode }) {
  const cart = useSelector((state) => state.cart.itemsList);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
