"use client";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/16/solid";
import Cart from "@/app/_components/cart";
import Button from "@/app/_components/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { cartAction } from "@/app/_store/cartSlice";

import LoginLink from "@/app/_components/login-link";
import { useSession } from "next-auth/react";
import { addOrder } from "@/app/_lib/action";
export default function Page() {
  const session = useSession();
  const status = session.status;
  const userId=session.data?.user?.id;
  const cart = useSelector((state) => state.cart.itemsList);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(
      cart.reduce((acc, curr) => (acc += curr.price * curr.quantity), 0)
    );
  }, [cart]);
  const handleRemoveAll = () => {
    dispatch(cartAction.removeAll());
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
          <div className={" mt-4"}>
            <form
              action={addOrder}
              method="post"
              className="flex justify-between"
            >
              <input type="hidden" name="userId" value={userId}/>
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />
              <span className={"text-lg font-medium mt-4"}>
                Total Price:
                <input
                  type="text"

                  value={totalPrice}
                  className=" text-black focus:border-0 outline-0"
                  name="totalPrice"
                  readOnly={true}
                />
              </span>
              {status == "unauthenticated" ? (
                <LoginLink />
              ) : (
                <Button
                  name={"Order"}
                  type={"submit"}
                  
                  icon={<BookmarkIcon width={"20"} height={"20"} />}
                />
              )}
            </form>
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
