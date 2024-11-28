import { ProductCard } from "@/components/product-card";
import { getAllProducts } from "@/lib/action";
import Pagination from "@/components/pagination";
export default async function Products({
  search,
  page,
  query,
}: {
  search: string |undefined;
  page: number|undefined;
  query: string |undefined;
}) {
  let products = await getAllProducts();
  if(query){
    if(query=="All"){
      products=products;
    }
    else{
      products=products.filter(product =>product.type==query);
    }
    
  }
    if (search) {
      
      products = products.filter(product => product.type.toLocaleLowerCase().includes(search) || product.description.toLocaleLowerCase().includes(search) || product.name.toLocaleLowerCase().includes(search));
    }
  const no_of_products = products.length;
  const no_of_pages = Math.ceil(no_of_products / 4);
  const pages = [];
  for (let i = 1; i <= no_of_pages; i++) {
    pages.push(i);
  }
  const itemsPerPage = 4;
  let start=0;
  let end=4;
  if (page) {
     start = (page-1) * itemsPerPage;
     end = start + itemsPerPage;
  }
 const prod=products.slice(start,end);
  return (
   <div>
      <div className={"flex flex-wrap  gap-2 mt-10"}>
      {prod && prod.length > 0 ? (
        prod.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <center className=" text-xl text-center mt-24">
          No products found
        </center>
      )}  
    </div>
    <center className={"mt-4 ml-80 flex justify-center items-center"}>
       {no_of_pages >1 && <Pagination pages={pages} />}
      
      </center>
   </div>
  );
}
