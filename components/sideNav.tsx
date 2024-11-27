"use client";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Squares2X2Icon,
  ShoppingCartIcon,
  UserIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/16/solid";
import { signOut } from "next-auth/react";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default function SideNav() {
  const pathname = usePathname();
  const links = [
    {
      name: "Dashboard",
      to: "/admin",
      icon: Squares2X2Icon,
    },
    {
      name: "Products",
      to: "/admin/products",
      icon: ShoppingCartIcon,
    },
    {
      name:"Orders",
      to:"/admin/orders",
      icon:ShoppingBagIcon
    },
    {
      name: "Users",
      to: "/admin/users",
      icon: UserIcon,
    },
  ];
  return (
    <div className="flex flex-col  p-8 bg-indigo-600 rounded-md h-[90vh] w-[40vh]">
      <span className={"flex "}>
        <Image src={"/logo.png"} alt={"logo"} width={"80"} height={"80"} />
        <h3 className={"text-white ml-2 mt-5"}>Ecommerce</h3>
      </span>
      <ul className="list-none mt-10">
        {links.map((link) => (
          <li
            key={link.name}
            className={clsx(
              "p-2 m-2 flex  gap-3 text-white text-xl font-medium w-full hover:bg-blue-900 rounded-md",
              {
                "bg-blue-900": pathname == link.to,
              }
            )}
          >
            <link.icon className="w-6" />
            <Link href={link.to}>{link.name}</Link>
          </li>
        ))}

        <li className=" mt-32 p-2 m-2 flex  gap-3 text-white text-xl font-medium w-full hover:bg-blue-900 rounded-md">
          <button className=" flex" onClick={()=> signOut()}>
            <ArrowRightEndOnRectangleIcon className="w-6 text-white" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
