import { ProductCardSkeleton } from "@/components/skeltons/product-card-skeleton";

export default function ProductSkelton() {
  return (
    <div className=" grid grid-cols-4 px-14 ">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}
