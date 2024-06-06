"use client";
import React, { startTransition, useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICategory } from "@/types";

type CategoryProps = {
  value: string;
  onChangeHandler: () => void;
};

export const DropDownCategory = ({ value, onChangeHandler }: CategoryProps) => {
  const [categories, setCategories] = useState<ICategory[]>([
    {
      id: "1",
      categoryName: "category1",
    },
  ]);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => {
          return (
            <SelectItem value={category.categoryName!} key={category.id}>
              {category.categoryName}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
