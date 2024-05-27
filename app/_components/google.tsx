"use client"
import Image from "next/image";
import { signIn } from "next-auth/react";
export default function Google() {
  return (
    <div className="flex px-6 py-4 border border-gray-400 mt-5 rounded-md hover:bg-gray-200">
      <span>
        <Image src="/google.webp" alt="google" width={60} height={60} />
      </span>
      <button onClick={()=> signIn("google")} type="submit">continue with google</button>
    </div>
  );
}
