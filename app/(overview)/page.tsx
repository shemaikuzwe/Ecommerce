import { getProducts, getSearchProduct } from "@/app/_lib/action";
import ButtonLink from "@/app/_components/Link";
import { Suspense } from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { ProductsSkeleton } from "../_components/skeltons";
import { auth } from "../auth";
import Products from "./products";

export default async function Page(
  props: {
    searchParams?: Promise<{ search: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const session = await auth();

  const search: string = searchParams?.search;

  return (
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">
          Featured Products
        </span>
      </center>
      {
        
          <Products search={search} />
       
      }

      <center>
        {" "}
        <ButtonLink
          to={"/products"}
          name={"View all"}
          icon={<ArrowRightIcon width={"25"} height={"25"} />}
        />
      </center>
    </div>
  );
}
