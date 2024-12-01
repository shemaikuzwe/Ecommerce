"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus, UserSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Product } from "@prisma/client";
import { useDispatch } from "react-redux";
import { cartAction } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hook";
import { cn } from "@/lib/utils";
import { Item, Size } from "@/lib/types/types";

interface Props {
  product: Product;
}

export function ProductCard({ product}: Props) {
  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const cart = useAppSelector((state) => state.cart.itemsList);
  const [quantity, setQuantity] = useState(1);
  const[isExpanded,setIsExpanded]=useState(false)

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const payload: Item = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity,
    };
    dispatch(cartAction.addToCart(payload));
  };

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
  };

  const handleRemoveFromCart = () => {
    dispatch(cartAction.removeFromCart(product.id));
  };

  const isAdded = () => {
    return cart?.some((item) => item.id === product.id);
  };

  const sizes: Size[] = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="w-72 max-w-sm p-0 min-h-72">
      <div>
        <div
          className="relative aspect-square cursor-pointer"
           onClick={()=>setIsExpanded(!isExpanded)}
        >
          <Image
            src={`${product.image}`}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
          <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
            {product.price.toLocaleString()} Rwf
          </Badge>
        </div>
      </div>
      <CardFooter className="flex flex-col items-start">
        <h3 className="font-semibold text-lg mb-2 capitalize">{product.name}</h3>
        {isExpanded && (
          <div className="w-full space-y-4">
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <Button
                  size="sm"
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
                disabled={quantity <= 1}
                onClick={handleDecrement}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                readOnly
                min={1}
                className="w-20 text-center"
              />
              <Button variant="outline" size="icon" onClick={handleIncrement}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button
              className={cn("w-full disabled:cursor-not-allowed", {
                "bg-destructive": isAdded(),
              })}
              onClick={isAdded() ? handleRemoveFromCart : handleAddToCart}
            >
              {isAdded() ? "Remove" : "Add To Cart"}
            </Button>
          </div>
        )}
      </CardFooter>
    </div>
  );
}
