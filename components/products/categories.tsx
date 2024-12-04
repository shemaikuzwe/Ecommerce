"use client"
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { categories } from "@/lib/types/data";

export default function Categories() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) => prev.filter((cat) => cat !== category));
    }
  };
  
   
  return (
    <div className="lg:block w-36">
      <div className=" py-6">
        <h2 className="text-lg font-medium ">Categories</h2>
        <div className="mt-4 space-y-4">
          {categories.map((category) => (
            <div key={category} className="flex items-center gap-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked as boolean)
                }
              />
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
