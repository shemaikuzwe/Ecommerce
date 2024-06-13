import Search from "@/app/_components/search";
import { getProducts, getSearchProduct } from "@/app/_lib/action";
import { Suspense } from "react";
import ProductCard from "@/app/_components/productCard";
import { getAllProducts } from "@/app/_lib/action";
import { CardSkelton } from "@/app/_components/skeltons";
export default async function Products({
  search,
  page,
  query,
}: {
  search: string;
  page: number;
  query: string;
}) {
  let products = await getProducts();
  if (query) {
    products = await getProducts(query);
  }
  if (page) {
    const index = page - 1;
    const skip = index * 4;
    products = await getAllProducts(skip);
  }
  if (search) {
    products = await getSearchProduct(search);
  }
  const no_of_products = products.length;
  console.log(no_of_products);

  return (
    <div className={"flex flex-wrap gap-2 mt-10"}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <center className=" text-xl text-center mt-24">
          No products found
        </center>
      )}
    </div>
  );
}
