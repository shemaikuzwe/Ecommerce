import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/app/_components/productCard";
import { getProducts } from "@/app/_lib/action";
import { Product } from "@/app/_lib/definition";
import Button from "@/app/_components/button";
import Select from "@/app/_components/select";
import Pagination from "@/app/_components/pagination";

export default async function Home() {
  const products = await getProducts();
  return (
    <div className="p-14">
      <center>
        <span className="text-center font-bold text-2xl">All Products</span>
      </center>
      <div className={"flex justify-items-end gap-4"}>
        <Select options={["All", "Shirts", "Shoes", "Pants"]} />
        <Select options={["New", "Best rated", "old"]} />
      </div>
      <div className={"flex flex-wrap gap-2 mt-10"}>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <center className={"mt-4"}>
        {" "}
        <Pagination />
      </center>
    </div>
  );
}
