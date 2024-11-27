import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
export default function LoginLink() {
  return (
    <Link className="flex p-3 gap-2" href="/login">
      <ArrowTopRightOnSquareIcon className="w-6 h-6 cursor-pointer"></ArrowTopRightOnSquareIcon>
      Login
    </Link>
  );
}
