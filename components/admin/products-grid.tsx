import { Button } from "@/components/ui/button"
 import { ProductCard } from "./product-card"
import { Product } from "@prisma/client"
import Link from "next/link"


export default function ProductsGrid({ products }: { products: Product[] }) {
  return (
    <div className="space-y-8 flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length === 0 ? (
          <p className="text-muted-foreground">No products available</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
      <Button className="w-full sm:w-auto" size="lg" asChild>
        <Link href={"/admin/products/new"}>Add new Product</Link>
      </Button>
    </div>
  )
}

