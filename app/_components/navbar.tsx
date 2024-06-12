"use client";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { HomeIcon, ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Search from "@/app/_components/search";
import { useAppSelector,useAppStore,useAppDispatch } from "../_store/hook";
import User from "./user";
import { useSession } from "next-auth/react";
import LoginLink from "./login-link";
import { useState } from "react";
import { useRef } from "react";
import { RootState } from "../_store/store";

export default function Navbar() {
 
  
  const Links = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Products", href: "/products", icon: ShoppingCartIcon },
  ];
  // const store=useAppStore();
  // const initial=useRef(false);
  // if(!initial.current){
  //   store.dispatch()
  // }
  const cart = useAppSelector((state: RootState) => state.cart.itemsList);
  const session = useSession();
  const status = session.status;
  return (
    <div className="flex justify-between bg-indigo-600 m-0.5 rounded-md text-white">
      <div className="flex gap-2 m-2">
        <Link href="/" className="text-xl font-bold">
          <Image src="/logo.png" alt="logo" width={80} height={80} />
        </Link>
      </div>
      <div className="m-2 flex gap-3 h-12 bg-white p-2 rounded-md text-black ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600">
        <Search />
      </div>
      <ul className="flex justify-evenly p-3 list-none">
        {Links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className="flex p-3 gap-2">
              <link.icon className="w-6 h-6 cursor-pointer" />
              {link.name}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/cart" className="flex p-3 gap-1">
            <ShoppingBagIcon className="w-6 h-6" />
            <span className="font-medium">Cart</span>
            <span className="bg-red-500 px-2 py-0.5 h-7 rounded">
              {cart?.length}
            </span>
          </Link>
        </li>
        <li>{status == "unauthenticated" ? <LoginLink /> : <User />}</li>
      </ul>
    </div>
  );
}
