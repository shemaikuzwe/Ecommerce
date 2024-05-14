import Link from "next/link";
import { ReactNode } from "react";

export default function ButtonLink({
  to,
  name,
  icon,
}: {
  to: string;
  name: string;
  icon?: ReactNode;
}) {
  return (
    <>
      <Link
        href={to}
        className="flex mt-5  py-2  px-4 max-w-[20vh] bg-indigo-500  text-white rounded-md"
      >
        {icon}
        {name}
      </Link>
    </>
  );
}
