import { useState } from 'react'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Item } from '@/lib/definition'

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
//   const [quantity, setQuantity] = useState(initialQuantity)

//   const handleIncrement = () => {
//     const newQuantity = quantity + 1
//     setQuantity(newQuantity)
//     onQuantityChange(newQuantity)
//   }

//   const handleDecrement = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1
//       setQuantity(newQuantity)
//       onQuantityChange(newQuantity)
//     }
//   }

  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex-grow mr-4">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">Size: {item.size}</p>
        <p className="font-medium">{item.price.toLocaleString()} Rwf</p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="icon" >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center">{item.quantity}</span>
          <Button variant="ghost" size="icon" >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

