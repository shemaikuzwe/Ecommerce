import Image from "next/image";
import Button from "@/app/_components/button";
import { Product } from "@/app/_lib/definition";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

export default function ProductCard({ product }) {
  return (
    <div className="block gap-2 p-3 border border-gray-200 rounded-md w-64 ">
      <div>
        <Image
          src={`/${product.image}`}
          alt={"product"}
          width={"400"}
          height={"400"}
          className={"min-h-64 max-h-64"}
        />
      </div>
      <div className={"flex flex-col gap-2"}>
        <span className={"text-lg font-bold text-start capitalize"}>
          {product.name}
        </span>
        <span className={"text-sm text-start capitalize"}>
          {product.description}
        </span>
        <span className={"text-sm text-start capitalize"}>
          Price:{product.price}
        </span>
        <Button
          name={"Add to Cart"}
          type={"button"}
          icon={<CheckCircleIcon width={"25"} height={"25"} />}
        />
      </div>
    </div>
  );
}
