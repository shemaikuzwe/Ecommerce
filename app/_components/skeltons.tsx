import Image from "next/image";
import Button from "@/app/_components/button";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
export function CardSkelton() {
  return (
    <Box sx={{ width: 3000 }}>
      <Skeleton variant="rectangular" width={400} height={400} />
      <Skeleton animation="wave" width={210} height={40} />
      <Skeleton animation="wave" width={210} height={40} />
    </Box>
  );
}
export default function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <CardSkelton />
        <CardSkelton />
        <CardSkelton />
        <CardSkelton />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
      <CardSkelton />
      <CardSkelton />
      </div>
    </>
  );
}