"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = (query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <>
      <MagnifyingGlassIcon className={"w-[5vh] h-[5vh] text-gray-400"} />
      <input
        type={"text"}
        placeholder={"Search anything"}
        onChange={(e) => handleChange(e.target.value)}
        className={
          "block w-full mt-2 outline-0 border-0 py-1 pl-3 pr-12 text-black  placeholder:text-gray-400  sm:text-sm sm:leading-6"
        }
      />
    </>
  );
}
