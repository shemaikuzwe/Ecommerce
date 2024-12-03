import { ProductCard } from "@/components/products/product-card";
import { getProducts } from "@/lib/action/server";
export default async function Products({
  searchParams,
}: {
  searchParams: Promise<{ search: string }>;
}) {
  const { search } = await searchParams;
  let products = await getProducts();
  if (search) {
    products = products.filter(
      (product) =>
        product.type.startsWith(search) ||
        product.description.toLocaleLowerCase().includes(search) ||
        product.name.toLocaleLowerCase().includes(search),
    );
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
