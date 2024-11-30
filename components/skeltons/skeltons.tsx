import Image from "next/image";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { LinearProgress } from "@mui/material";

export function CardSkelton() {
  return (
    <Box >
      <Skeleton variant="rectangular" width={250} height={250} />
      <Skeleton animation="wave" width={200} height={30} />
      <Skeleton animation="wave" width={200} height={30} />
      <Skeleton animation="wave" width={100} height={30} />
    </Box>
  );
}
export function ProductsSkeleton() {
  return (
    <div className={"flex flex-wrap gap-3 mt-10"}>
      <CardSkelton />
      <CardSkelton />
      <CardSkelton />
      <CardSkelton />
    </div>
  );
}
export default function RootSkelton() {
  return (
    <div className="flex justify-center items-center mt-24 ">
      <Box>
        <Image src={"/logo.png"} width={310} height={310} alt="logo" />
        <LinearProgress color="primary" />
      </Box>
    </div>
  );
}
