import { useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Item } from '@/lib/types/types'
import { useDispatch } from 'react-redux'
import { cartAction } from '@/store/cartSlice'

// interface CartItemProps {
//   name: string
//   price: number
//   size: string
//   initialQuantity: number
//   onQuantityChange: (newQuantity: number) => void
//   onRemove: () => void
// }
interface Props{
    item:Item
}
export function CartItem({ item}: Props) {
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(cartAction.incrementQuantity(item.id));
  }

  const handleDecrement = () => {
    dispatch(cartAction.decrementQuantity(item.id));
  }
  const handleRemove=()=>{
    dispatch(cartAction.removeFromCart(item.id))
  }

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex-grow mr-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="font-medium">{item.price.toLocaleString()} Rwf</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="icon" onClick={handleDecrement} disabled={item.quantity<=1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button variant="ghost" size="icon" onClick={handleIncrement}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={handleRemove}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

