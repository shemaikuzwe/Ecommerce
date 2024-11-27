"use client";
import { MinusIcon, PlusIcon, BackspaceIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { cartAction, Items } from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Cart({ item }) {
  const dispatch = useDispatch();

  const increment = () => {
    dispatch(cartAction.incrementQuantity(item.id));
  };
  const decrement = () => {
    dispatch(cartAction.decrementQuantity(item.id))
  };
  const handleRemoveFromCart = () => {
    dispatch(cartAction.removeFromCart(item.id));
  };
  return (
    <div
      className={"flex justify-between border border-gray-200 p-3 rounded-md mt-2"}
    >
      <div className={"block"}>
        <div>
          {" "}
          <span className={"text-lg font-bold"}>{item.name}</span>
        </div>
        <div className={"text-sm"}>
          {" "}
          <span>Price:{item.price * item.quantity} Rwf</span>
        </div>
      </div>
      <div className={"flex gap-2"}>
        <button disabled={item.quantity<=1} className={"text-white px-2 py-0.5 bg-indigo-600 rounded-md disabled:cursor-not-allowed disabled:bg-indigo-400"}>
          <MinusIcon width={"20"} height={"20"} onClick={decrement} />
        </button>
        <input
          type={"number"}
          value={item.quantity}
          className={
            "mx-auto border border-gray-300 focus:border-gray-400 w-[10vh] px-5 rounded-md"
          }
        />
        <button className={"text-white px-2 py-0.5 bg-indigo-600 rounded-md"}>
          <PlusIcon width={"20"} height={"20"} onClick={increment} />
        </button>
      </div>
      <button onClick={handleRemoveFromCart}>
        <BackspaceIcon width={"40"} height={"40"} />
      </button>
    </div>
  );
}
