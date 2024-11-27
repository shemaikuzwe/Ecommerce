"use client";
import { ReactNode, useEffect } from "react";
import Navbar from "@/components/navbar";
import { useAppDispatch} from "@/store/hook";
import useStorage from "@/store/storage";
import { cartAction } from "@/store/cartSlice";


export  default   function Layout({ children }: { children: ReactNode }) {
  const dispatch=useAppDispatch()
const items=useStorage()
useEffect(()=>{
  dispatch(cartAction.setCart(items))
},[])
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
