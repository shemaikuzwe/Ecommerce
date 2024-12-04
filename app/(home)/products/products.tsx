import Pagination from "@/components/products/pagination";
import ProductsGrids from "@/components/products/products-grid";
import { getAllProducts } from "@/lib/action/server";
export default async function Products({
  search,
  page,
  category,
}: {
  search: string | undefined;
  page: number | undefined;
  category: string[] |string| undefined;
}) {
  let products = await getAllProducts();
  if (category && category.length) {
    products = products.filter((product) => category.includes(product.type));
  }

  if (search) {
    products = products.filter(
      (product) =>
        product.type.toLocaleLowerCase().includes(search) ||
        product.description.toLocaleLowerCase().includes(search) ||
        product.name.toLocaleLowerCase().includes(search)
    );
  }
  const no_of_products = products.length;
  const no_of_pages = Math.ceil(no_of_products / 8);
  const pages = [];
  for (let i = 1; i <= no_of_pages; i++) {
    pages.push(i);
  }
  const itemsPerPage = 8;
  let start = 0;
  let end = 8;
  if (page) {
    start = (page - 1) * itemsPerPage;
    end = start + itemsPerPage;
  }
  const prod = products.slice(start, end);
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className={"flex flex-wrap  gap-2 "}>
        {prod && prod.length > 0 ? (
          <ProductsGrids products={prod} />
        ) : (
          <center className=" text-xl text-center mt-24">
            No products found
          </center>
        )}
      </div>

      {no_of_pages > 1 && <Pagination pages={pages} />}
    </div>
  );
}
