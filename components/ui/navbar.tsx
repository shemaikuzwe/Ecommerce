"use client";
import * as React from "react";
import Link from "next/link";
import { LogIn, Menu } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Cart from "../cart/cart-sheet";
import { useSession } from "next-auth/react";
import Search from "./search";
import User from "../user/user";
import { Suspense, useState } from "react";

const Links = [
  { name: "Home", href: "/", icon: <Home className="h-5 w-5" /> },
  {
    name: "Products",
    href: "/products",
    icon: <ShoppingCart className="h-5 w-5" />,
  },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const { status } = useSession();
  return (
    <nav className="bg-card border-b h-20 py-2">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src={"/logo.png"} height={90} width={90} alt="logo" />
            </Link>
          </div>
          <Suspense fallback={null}>
            <Search />
          </Suspense>
          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {Links.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <Link 
                      href={link.href}
                      className="px-3 flex gap-1 py-2 rounded-md text-sm font-medium"
                    >
                      {link.icon}
                      {link.name}
                   </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Cart />
            {status === "authenticated" ? (
              <User />
            ) : (
              <Button asChild variant="ghost">
                <div>
                  <LogIn />
                  <Link href="/login">Login</Link>
                </div>
              </Button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {/* <ModeToggle /> */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="ml-2">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-4">
                  {Links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Cart />
                  {status === "authenticated" ? (
                    <>
                      <User />
                    </>
                  ) : (
                    <Button asChild variant="ghost">
                      <div>
                        <LogIn />
                        <Link href="/login">Login</Link>
                      </div>
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
