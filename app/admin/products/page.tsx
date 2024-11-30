import Link from "next/link";
import { getProducts } from "@/lib/action";
import ProductsGrid from "@/components/admin/products-grid";

export default async function Page() {
  const products = await getProducts();
  return (
    <div className="p-4">
     <ProductsGrid products={products}/>
    </div>
  );
}
