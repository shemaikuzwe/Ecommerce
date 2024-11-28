"use client";
import Image from "next/image";
import Button from "@/components/button";
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/store/cartSlice";
import { Product } from "@prisma/client";
import { useAppSelector } from "@/store/hook";

export default function ProductCard({ product }: { product: Product }) {
  const cart = useAppSelector((state) => state.cart.itemsList);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(cartAction.addToCart(product));
  };
  const handleRemoveFromCart = () => {
    dispatch(cartAction.removeFromCart(product.id));
  };
  const isAdded = () => {
    return cart?.some((item) => item.id === product.id);
  };
  return (
    <div className="block gap-2 p-3 border border-gray-200 rounded-md w-64 mt-3 ">
      <div>
        <Image
          src={`/${product.image}`}
          alt={"product"}
          width={"400"}
          height={"400"}
          className={"min-h-64 max-h-64"}
        />
      </div>
      <div className={"flex flex-col gap-2"}>
        <span className={"text-lg font-bold text-start capitalize"}>
          {product.name}
        </span>
        <span className={"text-sm text-start capitalize"}>
          {product.description}
        </span>
        <span className={"text-sm text-start capitalize"}>
          Price:{product.price}
        </span>
        <Button
          onClick={isAdded() ? handleRemoveFromCart : handleAddToCart}
          name={isAdded() ? "Remove" : "Add to cart"}
          type={"button"}
          danger={isAdded()}
          icon={
            isAdded() ? (
              <TrashIcon width={"25"} height={"22"} />
            ) : (
              <CheckCircleIcon width={"25"} height={"25"} />
            )
          }
        />
      </div>
    </div>
  );
}
