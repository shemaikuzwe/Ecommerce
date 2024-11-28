"use client";
import {
  usePathname,
  useRouter,
  useSearchParams,
  
} from "next/navigation";
import { useEffect, useState } from "react";
export default function Pagination({ pages }: { pages: number[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchparams = useSearchParams();
  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchparams);
    params.set("page", page.toString());
    if (page == 1) {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  useEffect(() => {
    handlePage(currentPage);
  }, [currentPage]);

  return (
    <div
      className={
        "inline-flex -space-x-px rounded-md shadow-sm gap-2 text-white mx-auto"
      }
    >
      <button
        onClick={handlePrevious}
        disabled={currentPage <= 1}
        className={
          "relative inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium rounded-md disabled:cursor-not-allowed disabled:bg-indigo-400"
        }
      >
        Previous
      </button>
      {pages.map((page, index) => (
        <button
          key={index}
          disabled={currentPage == index + 1}
          onClick={() => setCurrentPage(page)}
          className={
            "relative inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium rounded-md disabled:cursor-not-allowed disabled:bg-indigo-400"
          }
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage == pages.length}
        onClick={handleNext}
        className={
          "relative inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium rounded-md disabled:cursor-not-allowed disabled:bg-indigo-400"
        }
      >
        Next
      </button>
    </div>
  );
}
