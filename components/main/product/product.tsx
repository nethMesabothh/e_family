import React from "react";
import { ProductLists } from "./product-list";
import { fetchAllProduct } from "@/queries/products";

type ProductProps = {
  categoryId: string | undefined;
};

const Product = async ({ categoryId }: ProductProps) => {
  const products = await fetchAllProduct({ categoryIdQuery: categoryId });

  return (
    <div className="my-10">
      <ProductLists products={products} />
    </div>
  );
};

export default Product;
