import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/_components/productCard";
import {
  getAllProducts,
  getOptions,
  getProducts,
  getSearchProduct,
  paginate,
} from "@/app/_lib/action";
import Select from "@/app/_components/select";
import Pagination from "@/app/_components/pagination";
import { Metadata } from "next";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; search?: string;page?:number };
}) {
  const query: string = searchParams?.query;
  const search: string = searchParams?.search;
  const page:number=searchParams?.page;
  const options=await getOptions();
  let products = await getAllProducts();
  if(query){
    products=await getProducts(query);
  }
  if(page){
    const index=page-1;
    const skip=index*4;
    products=await getAllProducts(skip);

  }
  if (search) {
    products = await getSearchProduct(search);
  }
  const no_of_products = await paginate();
  const no_of_pages = Math.ceil(no_of_products / 4);
  
  const pages = [];
  for (let i = 1; i <=no_of_pages; i++) {
    pages.push(i);
  }
 
  
  return (
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">All Products</span>
      </center>
      <div className={"flex justify-items-end gap-4"}>
        <Select options={[options]} />
      </div>
      <div className={"flex flex-wrap gap-2 mt-10"}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))
        ) : (
          <center className=" text-xl text-center">No products found</center>
        )}
      </div>
      <center className={"mt-4"}>
        {" "}
        <Pagination pages={pages} />
      </center>
    </div>
  );
}
export const metadata: Metadata = {
  title: "products",
};
