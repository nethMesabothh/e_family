import React from "react";
import { ProductLists } from "./product-list";
import { fetchAllProduct } from "@/queries/products";

type ProductProps = {
  categoryId: string | undefined;
  searchQuery: string | undefined;
};

const Product = async ({ categoryId, searchQuery }: ProductProps) => {
  const products = await fetchAllProduct({
    categoryIdQuery: categoryId,
    searchQuery: searchQuery,
  });

  return (
    <div className="my-10">
      <ProductLists products={products} />
    </div>
  );
};

export default Product;
