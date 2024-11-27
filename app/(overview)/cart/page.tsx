"use client";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { BookmarkIcon } from "@heroicons/react/16/solid";
import Cart from "@/components/cart";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { cartAction, Items } from "@/store/cartSlice";

import { addOrder } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import { useSession } from "next-auth/react";
import LoginLink from "@/components/login-link";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { RootState } from "@/store/store";
import { OrderState } from "@/lib/definition";
export default function Page() {
  const session = useSession();
  const status = session.status;
  const userId = session.data?.user?.id;
  const cart = useAppSelector((state: RootState) => state.cart.itemsList);
  const dispatch = useAppDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    setTotalPrice(
      cart.reduce(
        (acc: number, curr: { price: number; quantity: number }) =>
          (acc += curr.price * curr.quantity),
        0
      )
    );
  }, [cart]);
  const handleRemoveAll = () => {
    dispatch(cartAction.removeAll());
  };
  const initial:OrderState ={status:"",message:""};
  const[state,newOrder]=useFormState(addOrder,initial);
  useEffect(() => {
    if (state.status == "success") {
      handleRemoveAll();
    }
  }, [state]);

  return (
    <div className="flex flex-col p-14 w-6/12 mx-auto border border-gray-300 rounded-md gap-2">
      {/*TODO: Using schadn alert */}
      {/* {state && (
        <Alert severity={state.status}>
          {state.message}{" "}
          {state.status == "success" && (
            <Link href="/orders" className=" underline">
              View Orders
            </Link>
          )}{" "}
        </Alert>
      )} */}
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
          {cart.map((item:Items) => (
            <Cart item={item} key={item.id} />
          ))}
          <div className={" mt-4"}>
            <form
              action={newOrder}
              method="post"
              className="flex justify-between"
            >
              <input type="hidden" name="userId" value={userId} />
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
              {status =="authenticated" ? <OrderBtn /> : <LoginLink />}
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
function OrderBtn() {
  const { pending } = useFormStatus();
  return (
    <Button
      status={pending}
      name="Order"
      icon={<BookmarkIcon width={"20"} height={"20"} />}
      type={"submit"}
    />
  );
}
