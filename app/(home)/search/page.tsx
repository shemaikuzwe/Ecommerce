import ProductsGrid from "@/components/products/products-grid";
import { getSearchProducts } from "@/lib/action/action";
import { getProducts } from "@/lib/action/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const search = (await searchParams).search;
  if (!search || search == "" || search?.trim() == "") {
    redirect("/products");
  }
  let products = await getProducts();
  products = products.filter(
    (product) =>
      product.type.startsWith(search) ||
      product.description.toLocaleLowerCase().includes(search) ||
      product.name.toLocaleLowerCase().includes(search)
  );
  return (
    <div className=" flex justify-center items-center gap-5 pt-4 flex-col">
      <h3 className=" text-2xl">
        Search Results for <span className=" font-bold">{search}</span>
      </h3>
      <ProductsGrid products={products} />
    </div>
  );
}
