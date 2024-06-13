import ProductCard from "@/app/_components/productCard";
import { getProducts, getSearchProduct } from "@/app/_lib/action";
import ButtonLink from "@/app/_components/Link";
import { Suspense } from "react";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import {CardSkelton} from "../_components/skeltons";
import { auth } from "../auth";

export default async function Page({
  searchParams,
}: {
  searchParams?: { search: string };
}) {
  const session = await auth();
  let products = await getProducts();
  const search = searchParams?.search;
  if (search) {
    products = await getSearchProduct(search);
  }
  return (
     
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">
          Featured Products
        </span>
      </center>
      <div className={"flex flex-wrap gap-2 mt-10"}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Suspense key={product.id} fallback={<CardSkelton />}>
              {" "}
              <ProductCard product={product} key={product.id} />
            </Suspense>
          ))
        ) : (
          <center className=" text-xl text-center">No products found</center>
        )}
      </div>
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
