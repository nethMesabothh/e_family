"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchAllCategories } from "@/queries/categories";
import { ICategory } from "@/types";
import { removeKeysFromQuery, urlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export const FilterProduct = () => {
  const [categories, setCategories] = useState<ICategory[]>();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchAllCategories();
      data && setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSelectCategory = (categoryId: string) => {
    let newUrl = "";

    if (categoryId && categoryId !== "All") {
      newUrl = urlQuery({
        params: searchParams.toString(),
        key: "categoryId",
        value: categoryId,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["categoryId"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-6 flex justify-center">
      <Select
        onValueChange={(categoryId: string) => handleSelectCategory(categoryId)}
      >
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          {categories?.map((category) => {
            return (
              <SelectItem key={category.id} value={category.id}>
                {category.categoryName}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};
