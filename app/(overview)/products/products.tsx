import { ProductCard } from "@/components/products/product-card";
import { getAllProducts } from "@/lib/action/action";
import Pagination from "@/components/products/pagination";
import ProductsGrids from "@/components/products/products-grid";
export default async function Products({
  search,
  page,
  query,
}: {
  search: string | undefined;
  page: number | undefined;
  query: string | undefined;
}) {
  let products = await getAllProducts();
  if (query) {
    if (query == "All") {
      products = products;
    } else {
      products = products.filter((product) => product.type == query);
    }
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
          <ProductsGrids products={prod}/>
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
