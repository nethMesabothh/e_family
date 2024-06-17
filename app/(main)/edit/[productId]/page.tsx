import { UpdateProduct } from "@/components/main/update-product/update-product";
import { fetchProduct } from "@/queries/products";
import { fetchCurrentUser } from "@/queries/users";
import { auth } from "@clerk/nextjs/server";
import React from "react";

type EditProductProps = {
  params: {
    productId: string;
  };
};

const EditProductPage = async ({ params }: EditProductProps) => {
  const { productId } = params;
  const { userId } = auth();
  const user = await fetchCurrentUser(userId ? userId : "");

  const product = await fetchProduct({ productId });

  return (
    <div className="container mt-6">
      {user?.role === "ADMIN" ? (
        <UpdateProduct product={product} />
      ) : (
        "You are not admin!"
      )}
    </div>
  );
};

export default EditProductPage;
