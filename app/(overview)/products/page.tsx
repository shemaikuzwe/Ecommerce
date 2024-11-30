import { Metadata } from "next";
import { Suspense } from "react";
import { ProductsSkeleton } from "@/components/skeltons";
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

  const options = ["All", "t-shirt", "pants", "shoes"];

  return (
    <div className="p-8">
      <center>
        <span className="text-center font-bold text-2xl">All Products</span>
      </center>
      <div className={"flex justify-items-end gap-4"}>
        {/* using Shcadn select */}
        {/* <Select options={options} /> */}
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
