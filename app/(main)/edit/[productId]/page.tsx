import { UpdateProduct } from "@/components/main/update-product/update-product";
import { fetchProduct } from "@/queries/products";
import React from "react";

type EditProductProps = {
  params: {
    productId: string;
  };
};

const EditProductPage = async ({ params }: EditProductProps) => {
  const { productId } = params;

  const product = await fetchProduct({ productId });

  return (
    <div className="container mt-6">
      <UpdateProduct product={product} />
    </div>
  );
};

export default EditProductPage;
