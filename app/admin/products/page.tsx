import ProductsTable from "@/components/productsTable";
import Link from "next/link";
import { getProducts } from "@/lib/action";

export default async function Page() {
  const products = await getProducts();
  return (
    <div className="p-4">
      <ProductsTable products={products} />

      <center>
        <Link
          href="/admin/products/new"
          className="mt-5 block bg-indigo-500 w-[20vh] py-2 text-white rounded-md"
        >
          New
        </Link>
      </center>
    </div>
  );
}
