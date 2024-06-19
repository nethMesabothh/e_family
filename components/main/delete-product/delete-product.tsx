"use client";

import React, { useEffect, useState } from "react";
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
import { useAuth } from "@clerk/nextjs";
import { fetchCurrentUser } from "@/queries/users";

type DeleteProductClientProps = {
  productId: string;
};

export const DeleteProductClient = ({
  productId,
}: DeleteProductClientProps) => {
  const { userId } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const handleOnclickDelete = async () => {
    const deleted = await deleteProduct(productId);

    if (deleted) {
      alert("Product deleted!");
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const data = await fetchCurrentUser(userId ? userId : "");

      if (data?.role === "ADMIN") {
        setIsAdmin(true);
      }
      console.log(data?.role === "ADMIN");
    };

    fetchUser();
  }, [userId]);
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
          {isAdmin ? (
            <AlertDialogAction onClick={() => handleOnclickDelete()}>
              Delete
            </AlertDialogAction>
          ) : (
            <h1 className="text-center">You`re not admin!</h1>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
