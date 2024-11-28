import React from 'react'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'

export default function Cart() {
  return (
    <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" className="">
        <ShoppingCart className="mr-2 h-4 w-4" />
        {/* View Cart ({cartItems.length}) */}
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
        <SheetDescription>
          Review your items before checkout
        </SheetDescription>
      </SheetHeader>
      <div className="mt-4 space-y-4">
        {/* {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between items-center">
            <span>{item.name} - {item.size}</span>
            <span>Qty: {item.quantity}</span>
          </div>
        ))}
        {cartItems.length === 0 && (
          <p>Your cart is empty.</p>
        )} */}
      </div>
    </SheetContent>
  </Sheet>
  )
}
