import Image from "next/image";
import Button from "@/app/_components/button";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
export function CardSkelton() {
  return (
    <Box sx={{ width: 3000 }}>
      <Skeleton variant="rectangular" width={400} height={400} />
      <Skeleton animation="wave" width={210} height={40} />
      <Skeleton animation="wave" width={210} height={40} />
    </Box>
  );
}
