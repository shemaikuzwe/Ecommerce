import Image from "next/image";
import { signIn } from "@/app/auth";
export default function Google() {
  return (
    <form
      className="flex px-6 py-4 border border-gray-400 mt-5 rounded-md hover:bg-gray-200"
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <span>
        <Image src="/google.webp" alt="google" width={60} height={60} />
      </span>
      <button type="submit">continue with google</button>
    </form>
  );
}
