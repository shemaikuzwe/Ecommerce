"use client";
import { ReactNode, useEffect } from "react";
import Navbar from "@/app/_components/navbar";
import { useAppDispatch} from "../_store/hook";
import useStorage from "../_store/storage";
import { cartAction } from "../_store/cartSlice";


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
