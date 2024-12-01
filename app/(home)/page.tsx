import Products from "./products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "../auth";

export default async function Page(props: {
  searchParams?: Promise<{ search: string }>;
}) {
  const searchParams = await props.searchParams;

  const search: string | undefined = searchParams?.search;

   
  return (
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">
          Featured Products
        </span>
      </center>
      {<Products search={search} />}

      <center>
        <Button  asChild>
          <Link href={"/products"}>View All</Link>
        </Button>
      </center>
    </div>
  );
}
