import Image from "next/image";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { LinearProgress } from "@mui/material";
// Loading animation
// const shimmer =
//   'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
export function CardSkelton() {
  return (
    <Box sx={{ width: 3000 }}>
      <Skeleton variant="rectangular" width={400} height={400} />
      <Skeleton animation="wave" width={210} height={40} />
      <Skeleton animation="wave" width={210} height={40} />
    </Box>
  );
}
export default function RootSkelton() {
  return (
    
    <div  className="flex justify-center items-center">
       <Box>
         <Image src={"/logo.png"} width={310} height={310} alt="logo"/>
        <LinearProgress color="primary"/>
      </Box>
    </div>
     
  
  );
}