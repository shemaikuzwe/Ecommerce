"use client";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteDialog from "./delete-dialog";

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="aspect-square relative overflow-hidden">
            <Image
              src={`${product.image}`}
              alt={product.name}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold leading-none tracking-tight capitalize">
                  {product.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>
              <Badge variant="secondary" className="ml-2">
                {product.type}
              </Badge>
            </div>
            <p className="font-semibold">
              {product.price.toLocaleString()} RWF
            </p>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8"
                onClick={() =>
                  router.push(`/admin/products/edit/${product.id}`)
                }
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit product</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Edit product</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => setIsOpen(!isOpen)}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove product</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent className=" bg-destructive">
              Remove product
            </TooltipContent>
          </Tooltip>
        </CardFooter>
      </Card>
      {isOpen && (
        <DeleteDialog product={product} isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </>
  );
}
