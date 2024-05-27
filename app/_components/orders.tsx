"use client";
import OrdersCard from "@/app/_components/ordersCard";
import React, { useEffect, useState } from "react";
import { Order } from "../_lib/definition";

const Orders = ({ order }) => {
  const [items, setItems] = useState("All");
  const [orders, setOrders] = useState(order);

  const options = [
    { name: "All", value: "All" },
    { name: "Pending", value: false },
    { name: "Done", value: true },
  ];
  const handleClick = (option: boolean | string) => {
    setItems(option);
  };
  useEffect(() => {
    let filterd = order;
    if (items !== "All") {
      filterd = order.filter((order: Order) => order.status === items);
    }
    setOrders(filterd);
  }, [items, order]);

  return (
    <div className="flex justify-center  w-full sm:w-7/12 mx-auto">
      <div className="border mx-auto  w-full rounded-md p-4">
        <ul className="flex mx-auto gap-3  bg-indigo-500 rounded-md text-white p-4 cursor-pointer mb-4 justify-center">
          {options.map((option) => (
            <li
              key={option.name}
              className={`${option.value === items && "  border-b-2 "} cursor-pointer text-lg`}
              onClick={() => handleClick(option.value)}
            >
              {option.name}
            </li>
          ))}
        </ul>

        <div className=" flex flex-col gap-2 ">
          {orders.length == 0
            ? null
            : orders.map((order: Order) => (
                <OrdersCard order={order} key={order.id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
