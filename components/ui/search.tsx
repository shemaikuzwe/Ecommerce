"use client";
import { useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./input";
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
    <Input
      type={"text"}
      placeholder={"Search anything"}
      onChange={(e) => handleChange(e.target.value)}
      className="sm:w-80 w-52"
    />
  );
}
