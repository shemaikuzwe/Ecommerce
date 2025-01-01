import ProductsGrid from "@/components/admin/products-grid";
import { getProducts } from "@/lib/action/server";

export default async function Page() {
  const products = await getProducts();
  return (
    <div className="p-4">
      <ProductsGrid products={products} />
    </div>
  );
}
