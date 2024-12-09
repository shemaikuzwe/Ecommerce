import { ProductCardSkeleton } from "@/components/skeltons/product-card-skeleton";

export default function Loading() {
  return (
    <div className=" flex flex-wrap gap-3 mt-10">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}
