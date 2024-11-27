"use server";
import React, { Suspense } from "react";
import { getProducts } from "@/lib/action";
import ProductCard from "./productCard";

const Products = async () => {
  const products = await getProducts();
  return (
    <div className={"flex flex-wrap gap-2 mt-10"}>
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))
      ) : (
        <center className=" text-xl text-center">No products found</center>
      )}
    </div>
  );
};

export default Products;
