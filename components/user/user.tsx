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
        <DropdownMenuTrigger  asChild>
          <Avatar className="h-10 w-10 cursor-pointer bg-muted">
            <AvatarImage src={user?.image || ""} alt={user?.name || "user"} />
            <AvatarFallback>
              {user?.name!.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{user?.name!}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/orders">Orders</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator/>
          <DropdownMenuItem className={"w-full p-0"}>
            <Button className={"w-full"} size={"sm"} variant={"ghost"} onClick={() => signOut()}>
              Sign out
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}