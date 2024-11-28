"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "@/store/cartSlice";
import { cn } from "@/lib/utils";

interface Props{
  product:Product
}

export function ProductCard({ product}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState<
    Array<{ name: string; size: string; quantity: number }>
  >([]);
  const cart=useSelector(state=>state.cart.itemsList);
  const dispatch=useDispatch();
  const handleAddToCart=()=>{
     dispatch(cartAction.addToCart(product));
  }
  const handleRemoveFromCart=()=>{
    dispatch(cartAction.removeFromCart(product.id))
  }
  const isAdded=()=>{
    if(cart?.some(item =>item.id===product.id) )return true
    return false;
  }
  const sizes = ["XS", "S", "M", "L", "XL"];

  return (
    <Card className="w-72 max-w-sm p-0 min-h-72 ">
      <CardContent>
        <div
          className="relative aspect-square cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Image
            src={`/${product.image}`}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            ${product.price.toLocaleString()} Rwf
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
       <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        {isExpanded && (
          <div className="w-full space-y-4">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min={1}
                className="w-20 text-center"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className="w-full disabled:cursor-not-allowed"
              onClick={handleAddToCart}
              disabled={!selectedSize}
            
            >
              Add to Cart
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
