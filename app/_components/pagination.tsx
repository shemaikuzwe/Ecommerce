import { paginate } from "@/app/_lib/action";

export default function Pagination() {
  return (
    <div
      className={
        "inline-flex -space-x-px rounded-md shadow-sm gap-2 text-white mx-auto"
      }
    >
      <div
        className={
          "relative inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium rounded-md"
        }
      >
        Previous
      </div>
      <div
        className={
          "relative inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium rounded-md"
        }
      >
        1
      </div>
      <div
        className={
          "relative inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium rounded-md"
        }
      >
        1
      </div>
      <div
        className={
          "relative rounded-md inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium"
        }
      >
        1
      </div>
      <div
        className={
          "relative inline-flex items-center bg-indigo-600 px-4 py-1.5 text-sm font-medium rounded-md"
        }
      >
        Next
      </div>
    </div>
  );
}
