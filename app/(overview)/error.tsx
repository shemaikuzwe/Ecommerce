"use client";

import { useEffect } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";
import Button from "../_components/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset(): void;
}) {
  return (
    <div className="flex mx-auto justify-center mt-40">
      <div>
        <InformationCircleIcon width={"100"} height={"100"} />
        <span className=" text-center">Something went wrong</span>
        <center>
          <Button onClick={() => reset()} name="Retry" type="button" />
        </center>
      </div>
    </div>
  );
}
