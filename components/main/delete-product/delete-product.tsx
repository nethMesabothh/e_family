"use client";

import React, { useEffect } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { deleteProduct } from "@/actions/product-logic";

type DeleteProductClientProps = {
  productId: string;
};

export const DeleteProductClient = ({
  productId,
}: DeleteProductClientProps) => {
  const handleOnclickDelete = async () => {
    const deleted = await deleteProduct(productId);

    if (deleted) {
      alert("Product deleted!");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive" size="sm" asChild>
          <div>
            <Trash className="h-4 w-4 stroke-black" />
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            event and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex items-center">
          <AlertDialogCancel className="mb-2">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleOnclickDelete()}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
