"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleChange = (query) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Input
      type={"text"}
      placeholder={"Search anything"}
      onChange={(e) => handleChange(e.target.value)}
      className="w-80"
    />
  );
}
