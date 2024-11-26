import ProductCard from "@/app/_components/productCard";
import {
  getAllProducts,
  getProducts,
  getSearchProduct,
  paginate,
} from "@/app/_lib/action";
import Select from "@/app/_components/select";
import Pagination from "@/app/_components/pagination";
import { Metadata } from "next";
import { Suspense } from "react";
import { ProductsSkeleton } from "@/app/_components/skeltons";
import Products from "./products";

export default async function Page(
  props: {
    searchParams?: Promise<{ query?: string; search?: string; page?: number }>;
  }
) {
  const searchParams = await props.searchParams;
  const query: string|undefined = searchParams?.query;
  const search: string|undefined = searchParams?.search;
  const page: number|undefined = searchParams?.page;
  // const options=await getOptions(); 



  const options = ["All", "t-shirt", "pants", "shoes"];

  return (
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">All Products</span>
      </center>
      <div className={"flex justify-items-end gap-4"}>
        <Select options={options} />
      </div>
      <div className={"flex flex-wrap gap-2 mt-10"}>
        {<Suspense fallback={<ProductsSkeleton/>}>
           <Products search={search} query={query} page={page}/>
        </Suspense>}
      </div>
     
    </div>
  );
}
export const metadata: Metadata = {
  title: "Products",
};
