"use client";
import {
  CheckCircleIcon,
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ClockIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import OrdersProducts from "./ordersProducts";
import { Order } from "@/lib/definition";
interface Props{
  order:Order
}
const OrdersCard = ({order}:Props) => {
  const { id, userId, products, total_price, date, status } = order;
  const [showProds, setShowProds] = useState(false);
  const currencyFormater = new Intl.NumberFormat("en-rw", {
    style: "currency",
    currency: "RWF",
  });
  return (
    <div className="block gap-2 p-3 border border-gray-200 rounded-md   w-full">
      <div className=" flex justify-between">
        <div>
          <span>
            {" "}
            {date.toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
        {status ? (
          <div className=" bg-indigo-600 px-3 py-1.5 text-white rounded-md">
            <span className="flex gap-1">
              <CheckCircleIcon className="text-white" height={20} width={20} />
              Done
            </span>
          </div>
        ) : (
          <div className=" bg-slate-300 px-3 py-1.5 text-white rounded-md">
            <span className="flex gap-1">
              {" "}
              <ClockIcon className="text-white" height={20} width={20} />
              Pending
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-between  mt-3">
        <div>
          <h2>Products({products.length})</h2>
          <h2 className=" font-semibold">
            Total Price :{currencyFormater.format(total_price)}
          </h2>
        </div>
        <div className="mt-5">
          <button onClick={() => setShowProds(!showProds)}>
            {showProds ? (
              <ChevronDoubleUpIcon
                className="text-black "
                width={20}
                height={20}
              />
            ) : (
              <ChevronDoubleDownIcon
                className="text-black "
                width={20}
                height={20}
              />
            )}
          </button>
        </div>
      </div>
      {showProds && <OrdersProducts products={products} />}
    </div>
  );
};

export default OrdersCard;
