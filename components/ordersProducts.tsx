"use client";
import React from "react";
import OrdersProductCard from "./order-product-card";

const OrdersProducts = ({ products }) => {
  return (
    <div className="flex flex-col justify-between gap-2">
      {products && products.lenght == 0
        ? null
        : products.map((product) => (
            <OrdersProductCard key={product.id} product={product} />
          ))}
    </div>
  );
};

export default OrdersProducts;
