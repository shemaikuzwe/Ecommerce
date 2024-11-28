import { getProducts } from "@/lib/action";
import ButtonLink from "@/components/Link";
import { Suspense } from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { auth } from "../auth";
import Products from "./products";

export default async function Page(props: {
  searchParams?: Promise<{ search: string }>;
}) {
  const searchParams = await props.searchParams;
  const session = await auth();

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
