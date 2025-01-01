"use client"
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "../ui/button";
export default function User() {
  const session = useSession();
  const user = session?.data?.user;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={"w-full flex cursor-pointer bg-muted "}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.image || ""} alt={user?.name || "user"} />
            <AvatarFallback>
              {user?.name!.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className={"flex flex-col"}>
            <span className={"text-base"}>{user?.name}</span>
            <span className={"text-muted-foreground text-sm"}>
              {user?.email}
            </span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-56"}>
        <DropdownMenuLabel>{user?.name!}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/orders">Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className={"w-full"}>
          <Button size={"sm"} className={"w-full"} onClick={() => signOut()}>
            Sign out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
