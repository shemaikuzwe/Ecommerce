import { ProductCardSkeleton } from "@/components/skeltons/product-card-skeleton";
export default function ProductGridSkelton() {
  return (
    <div className="p-4">
      <div className="flex flex-wrap gap-2 mt-10">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    </div>
  );
}
