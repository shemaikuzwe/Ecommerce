import Search from "@/app/_components/search";
import { getProducts, getSearchProduct } from "@/app/_lib/action";
import { Suspense } from "react";
import ProductCard from "@/app/_components/productCard";
import { CardSkelton } from "@/app/_components/skeltons";
export default async function Products({
  search,
}: {
  search:string;
}) {
  let products = await getProducts();
  if (search) {
    products = await getSearchProduct(search);
  }
  return (
    <div className={"flex flex-wrap gap-2 mt-10"}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <center className=" text-xl text-center mt-24">No products found</center>
      )}
    </div>
  );
}
