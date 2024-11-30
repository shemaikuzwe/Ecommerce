"use client";
import * as React from "react";
import Link from "next/link";
import { LogIn, Menu, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import { Home } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import Cart from "./cart-sheet";
import { signOut, useSession } from "next-auth/react";
import Search from "./search";
import User from "./user";
import { useState } from "react";

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
    <nav className="bg-background border-b h-20 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <Image src={"/logo.png"} height={90} width={90} alt="logo" />
            </Link>
          </div>

          <Search />

          <div className="hidden md:flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                {Links.map((link) => (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink
                      href={link.href}
                      className="px-3 flex gap-1 py-2 rounded-md text-sm font-medium"
                    >
                      {link.icon}
                      {link.name}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
            <Cart />
            {status === "authenticated" ? (
             <User/>
            ) : (
              <Button asChild variant="ghost">
                <div>
                  <LogIn />
                  <Link href="/login">Login</Link>
                </div>
              </Button>
            )}
            <ModeToggle />
          </div>
          <div className="md:hidden flex items-center">
            <ModeToggle />
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
                  <Link
                    href="/cart"
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <ShoppingBag className="h-6 w-6" />
                  </Link>
                  {status === "authenticated" ? (
                    <>
                      <Link
                        href="/profile"
                        className="px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        href="/orders"
                        className="px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Orders
                      </Link>
                      <Link
                        href="/api/auth/signout"
                        className="px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        Sign out
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/api/auth/signin"
                      className="px-3 py-2 rounded-md text-sm font-medium"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign in
                    </Link>
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
