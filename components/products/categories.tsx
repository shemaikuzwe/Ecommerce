import React from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { categories } from "@/lib/types/data";

export default function Categories() {
  return (
    <div className="lg:block">
      <div className=" py-6">
        <h2 className="text-lg font-medium ">Categories</h2>
        <div className="mt-4 space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox id={category} />
              <Label htmlFor={category} className=" capitalize">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
