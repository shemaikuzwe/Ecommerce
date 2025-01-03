import { Metadata } from "next";
import Products from "./products";
import Categories from "@/components/products/categories";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Products",
  description: "Products Page",
};

export default async function Page(props: {
  searchParams?: Promise<{
    category?: string[] | string;
    search?: string;
    page?: number;
  }>;
}) {
  const searchParams = await props.searchParams;
  const category = searchParams?.category;
  const page = searchParams?.page;

  return (
    <div className="p-4">
      <center>
        <span className="text-center font-bold text-2xl">All Products</span>
      </center>
      <div className=" flex max-md:flex-col max-md:justify-center max-md:items-center">
        <Categories />

        <div className={"flex flex-wrap gap-2 mt-10"}>
          <Products category={category} page={page} />
        </div>
      </div>
    </div>
  );
}
