import { getProducts, getSearchProduct } from "@/lib/action";
import { ProductCard } from "@/components/product-card";
export default async function Products({
  search,
}: {
  search: string | undefined;
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
        <center className=" text-xl text-center mt-24">
          No products found
        </center>
      )}
    </div>
  );
}
