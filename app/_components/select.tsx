"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Select({ options }: { options: any }) {
  const searchparams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleTye = (query: string) => {
    const params = new URLSearchParams(searchparams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      className={
        "block w-40 px-4 mt-2 outline-0 rounded-md border-0 py-1.5 pl-3 pr-12 text-gray-900 ring-1 ring-inset ring-indigo-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 capitalize"
      }
      onChange={(event) => handleTye(event.target.value)}
    >
      {options &&
        options.length &&
        options.map((option: string) => (
          <option className={"block w-40 rounded-md border-0 "} key={option}>
            {option}
          </option>
        ))}
    </select>
  );
}
