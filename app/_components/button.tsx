"use client";
import { ReactNode } from "react";
import { deleteProduct, deleteUser } from "@/app/_lib/action";

export default function Button({
  name,
  type,
  icon,
  onClick,
  status,
}: {
  name: string;
  type: "submit" | "button";
  icon?: ReactNode;
  status?: boolean;
  onClick?(): void;
}) {
  return (
    <>
      <button
        onClick={onClick}
        type={type}
     
        className="flex mt-5 gap-2 px-1  bg-indigo-600 disabled:bg-indigo-400
         disabled:cursor-pointer max-w-[20vh] py-2 text-white rounded-md"
      >
        {icon}
        {name}
      </button>
    </>
  );
}
export function Remove({ id }: { id: number }) {
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

