"use client";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import {
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  BookmarkIcon,
} from "@heroicons/react/16/solid";
import Cart from "@/app/_components/cart";
import Button from "@/app/_components/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartAction } from "@/app/_store/cartSlice";
export default function Page() {
  const cart = useSelector((state) => state.cart.itemsList);
   const dispatch=useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
   
    setTotalPrice(
      cart.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)
    );
  }, [cart]);
  const handleRemoveAll = () => {
    dispatch(cartAction.removeAll())
  };
  return (
    <div className="flex flex-col p-14 w-6/12 mx-auto border border-gray-300 rounded-md gap-2">
      {cart && cart.length ? (
        <div>
         <div className=" flex justify-end items-end mb-2 ">
         <button
            type="button"
            onClick={handleRemoveAll}
            className=" flex justify-end "
          >
            Remove All
          </button>
          </div> 
          {cart.map((item) => (
            <Cart item={item} key={item.id} />
          ))}
          <div className={"flex justify-between mt-4"}>
            <span className={"text-lg font-medium mt-4"}>
              Total price:{totalPrice} Rwf
            </span>
            <Button
              name={"Order"}
              type={"submit"}
              icon={<BookmarkIcon width={"20"} height={"20"} />}
            />
          </div>
        </div>
      ) : (
        <div className={"mx-auto"}>
          <DocumentTextIcon width={"70"} height={"70"} className={"mx-auto"} />
          <span className={"text-lg font-medium mx-auto"}>
            No items available
          </span>
        </div>
      )}
    </div>
  );
}
