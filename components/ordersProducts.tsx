"use client";
import React from "react";
import OrdersProductCard from "./order-product-card";
import { Item } from "@/lib/definition";
interface Props{
  products:Item[]
}

const OrdersProducts = ({products}:Props) => {
  return (
    <div className="flex flex-col justify-between gap-2">
      {products && products.length == 0
        ? null
        : products.map((product) => (
            <OrdersProductCard key={product.id} product={product} />
          ))}
    </div>
  );
};

export default OrdersProducts;
