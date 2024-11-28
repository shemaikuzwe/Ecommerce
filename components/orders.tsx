"use client";
import OrdersCard from "@/components/ordersCard";
import React, { useEffect, useState } from "react";
import { Order } from "@/lib/definition";
import { Status } from "@prisma/client";

const Orders = ({ order }: { order: Order[] }) => {
  const [items, setItems] = useState<Status>(Status.PENDING);
  const [orders, setOrders] = useState(order);

  const handleClick = (option: Status) => {
    setItems(option);
  };
  useEffect(() => {
    let filterd = order;
    if (items !== Status.PENDING) {
      filterd = order.filter((order) => order.status === items);
    }
    setOrders(filterd);
  }, [items, order]);

  return (
    <div className="flex justify-center  w-full sm:w-7/12 mx-auto">
      <div className="border mx-auto  w-full rounded-md p-4">
        <ul className="flex mx-auto gap-3  bg-indigo-500 rounded-md text-white p-4 cursor-pointer mb-4 justify-center">
          {[Status.COMPLETED, Status.FAILED, Status.FAILED].map((option) => (
            <li
              key={option}
              className={`${
                option === items && "  border-b-2 "
              } cursor-pointer text-lg`}
              onClick={() => handleClick(option)}
            >
              {option.toLocaleLowerCase()}
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
