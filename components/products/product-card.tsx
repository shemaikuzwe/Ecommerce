"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Product, Size } from "@prisma/client";
import { useDispatch } from "react-redux";
import { cartAction } from "@/store/cartSlice";
import { useAppSelector } from "@/store/hook";
import { cn } from "@/lib/utils";
import { Item } from "@/lib/types/types";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  product: Product;
}

export function ProductCard({ product }: Props) {

  const [selectedSize, setSelectedSize] = useState<Size>("M");
  const cart = useAppSelector((state) => state.cart.itemsList);
  const [quantity, setQuantity] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);

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
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  const handleRemoveFromCart = () => {
    dispatch(cartAction.removeFromCart(product.id));
  };

  const isAdded = () => {
    return cart?.some((item) => item.id === product.id);
  };

  const sizes: Size[] = ["XS", "S", "M", "L", "XL"];

  return (
    <motion.div
      layout
      //@ts-ignore
      className="w-72 max-w-sm p-0 "
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <motion.div
         //@ts-ignore
          className="relative aspect-square cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </motion.div>
      </div>
      <CardFooter className="flex flex-col items-start">
        <h3 className="font-semibold text-lg mb-2 capitalize">{product.name}</h3>
        <AnimatePresence>
          {isExpanded && (
            <motion.div
             //@ts-ignore
              className="w-full space-y-4"
        
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <motion.div
                  //@ts-ignore
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
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
              </motion.div>
              <motion.div
               //@ts-ignore
                className="flex items-center gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
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
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <Button
                  className={cn("w-full disabled:cursor-not-allowed", {
                    "bg-destructive": isAdded(),
                  })}
                  onClick={isAdded() ? handleRemoveFromCart : handleAddToCart}
                >
                  {isAdded() ? "Remove" : "Add To Cart"}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardFooter>
    </motion.div>
  );
}

