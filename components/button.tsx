"use client";
import { ReactNode } from "react";
import { deleteProduct } from "@/lib/action";

export default function Button({
  name,
  type,
  icon,
  onClick,
  status,
  danger,
}: {
  name: string;
  type: "submit" | "button";
  icon?: ReactNode;
  status?: boolean;
  danger?: boolean;
  onClick?(): void;
}) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
        disabled={status}
        className={`flex mt-5 gap-2 px-2.5 ${
          danger ? " bg-red-700" : "bg-indigo-600"
        }  disabled:bg-indigo-300
         disabled:cursor-not-allowed max-w-[25vh] py-1.5 text-white rounded-md`}
      >
        {icon}
        {name}
      </button>
    </>
  );
}
export function Remove({ id }: { id: string }) {
  const handleDelete = () => {
    deleteProduct(id);
  };
  return (
    <button
      className={
        "flex mt-5 gap-2 px-1 bg-indigo-500  py-2 text-white rounded-md"
      }
      type={"submit"}
      onClick={handleDelete}
    >
      Remove
    </button>
  );
}
