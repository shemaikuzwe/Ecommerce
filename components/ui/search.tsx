"use client";
import Form from "next/form";
import { Input } from "./input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchForm() {
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
    <Form action={"/search"} className="flex justify-center items-center w-80">
      <Input
        name="search"
        placeholder="Search anything...."
        onChange={(e) => handleChange(e.target.value)}
      />
    </Form>
  );
}
