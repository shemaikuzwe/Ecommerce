import Link from "next/link";
import {
  HomeIcon,
  ShoppingCartIcon,
  ArrowTopRightOnSquareIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import InputGroup from "@/app/_components/inputGroup";
import Image from "next/image";
import Search from "@/app/_components/search";
export default function Navbar() {
  const Links = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      name: "Products",
      href: "/products",
      icon: ShoppingCartIcon,
    },
    {
      name: "Login",
      href: "/login",
      icon: ArrowTopRightOnSquareIcon,
    },
  ];
  return (
    <div className="flex justify-between  bg-indigo-600 m-0.5 rounded-md text-white">
      <div className={"flex gap-2 m-2"}>
        <Link href={"/"} className={"text-xl font-bold"}>
          <Image src={"/logo.png"} alt={"logo"} width={"80"} height={"80"} />
        </Link>
      </div>
      <div
        className={
          " m-2  flex gap-2 h-12 bg-white p-2 rounded-md text-white ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-indigo-600"
        }
      >
        <Search />
      </div>
      <ul className="flex justify-evenly p-3 list-none">
        {Links.map((link) => (
          <li key={link.name}>
            <Link href={link.href} className={"flex p-3 gap-2"}>
              {" "}
              {<link.icon className={"w-[3vh] h-[3vh] cursor-pointer"} />}
              {link.name}
            </Link>
          </li>
        ))}
        <Link href={"/cart"} className={"flex p-3"}>
          <ShoppingBagIcon className={"w-[3vh] h-[3vh]"} />
          <span className={"font-medium"}>Cart</span>
        </Link>
      </ul>
    </div>
  );
}