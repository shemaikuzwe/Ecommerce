import { ProductCard } from "@/components/products/product-card";
import { getProducts } from "@/lib/action/server";
export default async function Products() {
  const  products = await getProducts();
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
