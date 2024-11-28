import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { cartAction } from "@/store/cartSlice";
import { Item } from "@/lib/definition";
import { useAppSelector } from "@/store/hook";
import { CartItem } from "./cart-item";
export default function Cart() {
  const dispatch = useDispatch();
  const cart = useAppSelector((state) => state.cart.itemsList);
  // const increment = () => {
  //   dispatch(cartAction.incrementQuantity(item.id));
  // };
  // const decrement = () => {
  //   dispatch(cartAction.decrementQuantity(item.id));
  // };
  // const handleRemoveFromCart = () => {
  //   dispatch(cartAction.removeFromCart(item.id));
  // };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="">
          <ShoppingCart className="mr-2 h-4 w-4" />
          
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>Review your items before checkout</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {cart.map((item, index) => (
            <CartItem item={item} key={index}/>
        ))}
        {cart.length === 0 && (
          <p>Your cart is empty.</p>
        )}
        </div>
        <Button className="w-full">Order</Button>
      </SheetContent>
    
    </Sheet>
  );
}
