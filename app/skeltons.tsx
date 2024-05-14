import Image from "next/image";
import Button from "@/app/_components/button";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";
export function CardSkelton() {
  return (
    <div
      className={`${shimmer}  bg-gray-100 block gap-2 p-3 border border-gray-200 rounded-md w-64 h-64 `}
    >
      <div></div>
      <div className={"flex flex-col gap-2"}>
        <span className={"text-lg font-bold text-start capitalize"}></span>
        <span className={"text-sm text-start capitalize"}></span>
        <span className={"text-sm text-start capitalize"}></span>
      </div>
    </div>
  );
}
