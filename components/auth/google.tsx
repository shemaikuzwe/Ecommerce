"use client"
import Image from "next/image";
import { signIn } from "next-auth/react";
import {Card} from "@/components/ui/card";
export default function Google() {
  return (
    <Card className="flex p-4 mt-1 rounded-md ">
      <span>
        <Image src="/google.png" alt="google" width={40} height={40} />
      </span>
      <button onClick={()=> signIn("google")} type="submit">Continue with google</button>
    </Card>
  );
}
