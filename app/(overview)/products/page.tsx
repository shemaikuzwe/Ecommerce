import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/_components/productCard";
import { getProducts, getSearchProduct, paginate } from "@/app/_lib/action";
import { Product } from "@/app/_lib/definition";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Pagination from "@/app/_components/pagination";
import { Metadata } from "next";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string,search?:string };
}) {
  const query: string = searchParams?.query;
  const search:string=searchParams?.search;
  let products = await getProducts(query);
  if(search){
    products=await getSearchProduct(search);
  }
  const no_of_pages = await paginate();
  console.log(no_of_pages);
  return (
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">All Products</span>
      </center>
      <div className={"flex justify-items-end gap-4"}>
        <Select options={["All", "T-Shirts", "Shoes", "Pants"]} />
        <Select options={["New", "Best", "old"]} />
      </div>
      <div className={"flex flex-wrap gap-2 mt-10"}>
        {products&&products.length>0? products.map((product) => (
          <ProductCard product={product} key={product.id} />
        )):<center className=" text-xl text-center">No products found</center>}
      </div>
      <center className={"mt-4"}>
        {" "}
        <Pagination />
      </center>
    </div>
  );
}
export const metadata: Metadata = {
  title: "products",
};
