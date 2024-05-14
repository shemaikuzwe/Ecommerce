"use client";
import { MinusIcon, PlusIcon, BackspaceIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

export default function Cart() {
  const [count, setCount] = useState(1);
  const increment = () => {
    setCount(count + 1);
  };
  const decrement = () => {
    setCount(count - 1);
  };
  return (
    <div
      className={"flex justify-between border border-gray-200 p-3 rounded-md"}
    >
      <div className={"block"}>
        <div>
          {" "}
          <span className={"text-lg font-bold"}>White t-shirt</span>
        </div>
        <div className={"text-sm"}>
          {" "}
          <span>Price:2000Rwf</span>
        </div>
      </div>
      <div className={"flex gap-2"}>
        <button
          className={"text-white px-2 py-0.5 bg-indigo-600 rounded-md"}
          disabled={count == 1 ? true : false}
        >
          <MinusIcon width={"20"} height={"20"} onClick={decrement} />
        </button>
        <input
          type={"number"}
          defaultValue={count}
          className={
            "mx-auto border border-gray-300 focus:border-gray-400 w-[10vh] px-5 rounded-md"
          }
        />
        <button className={"text-white px-2 py-0.5 bg-indigo-600 rounded-md"}>
          <PlusIcon width={"20"} height={"20"} onClick={increment} />
        </button>
      </div>
      <button>
        <BackspaceIcon width={"40"} height={"40"} />
      </button>
    </div>
  );
}
