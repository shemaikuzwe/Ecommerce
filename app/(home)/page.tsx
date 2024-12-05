import Products from "./products";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  return (
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">
          Featured Products
        </span>
      </center>
      {<Products/>}

      <center>
        <Button variant={"default"} asChild>
          <Link href={"/products"}>View All</Link>
        </Button>
      </center>
    </div>
  );
}
