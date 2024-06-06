import React from "react";
import { ProductLists } from "./product-list";
import { fetchAllProduct } from "@/queries/products";

const Product = async () => {
  const products = await fetchAllProduct();

  return (
    <div className="my-10">
      <ProductLists products={products} />
    </div>
  );
};

export default Product;
