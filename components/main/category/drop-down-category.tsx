"use client";
import React, { useEffect, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
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
import { Input } from "@/components/ui/input";
import { createCategory } from "@/actions/category-logic";
import { fetchAllCategories } from "@/queries/categories";

type CategoryProps = {
  value: string;
  onChangeHandler: () => void;
};

export const DropDownCategory = ({ value, onChangeHandler }: CategoryProps) => {
  const [categories, setCategories] = useState<ICategory[]>([
    {
      id: "1",
      categoryName: "...",
    },
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleAddCategory = async () => {
    const category = await createCategory(newCategory.trim().toLowerCase());
    category && setCategories((prev) => [...prev, category]);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await fetchAllCategories();
      data && setCategories(data);
    };

    fetchCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => {
          return (
            <SelectItem value={category.categoryName!} key={category.id}>
              {category.categoryName &&
                category.categoryName?.charAt(0).toUpperCase() +
                  category.categoryName?.slice(1)}
            </SelectItem>
          );
        })}
        <AlertDialog>
          <AlertDialogTrigger>
            <h1 className="ml-6 text-sm  hover:text-slate-500">Add Category</h1>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create a category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="add a category"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex items-center">
              <AlertDialogAction onClick={handleAddCategory}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};
