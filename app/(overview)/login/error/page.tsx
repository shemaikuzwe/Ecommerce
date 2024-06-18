
import { ArrowPathIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default  function Page() {
    return  <div className="flex-col  mx-auto justify-center items-center  m-14 w-[50vh]">
          <div className="flex mx-auto justify-center mt-40">
      
        <ExclamationTriangleIcon width={"120"} height={"120"} />
        </div>
       
        <center>
        <span className=" text-center font-medium text-xl ">Something went wrong</span>
        </center>
        <center className=" mt-3">
        <Link href="/login" className=" btn-primary"><ArrowPathIcon width={20} height={20} className=" text-white"/>Retry</Link>
        </center>
      
    </div>
    
}