"use client";
import { ArrowPathIcon, ExclamationTriangleIcon, } from "@heroicons/react/24/solid";
import Button from "../_components/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset(): void;
}) {
  return (
    <div className="flex-col  mx-auto justify-center items-center  m-14 w-[50vh]">
    <div className="flex mx-auto justify-center mt-40">

  <ExclamationTriangleIcon width={"120"} height={"120"} />
  </div>
 
  <center>
  <span className=" text-center  text-xl font-medium ">Something went wrong</span>
  </center>
  <center>
          <Button icon={<ArrowPathIcon width={20} height={20} className=" text-white"/>} onClick={() => reset()} name="Retry" type="button" />
        </center>

</div>
  );
}
