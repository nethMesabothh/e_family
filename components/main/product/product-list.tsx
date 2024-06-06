import { IProduct } from "@/types";
import React from "react";
import { ProductItems } from "./product-items";

type ProductListsProps = {
  products: IProduct[];
};

export const ProductLists = ({ products }: ProductListsProps) => {
  const renderedProducts = products.map((product) => {
    return <ProductItems key={product.id} product={product} />;
  });

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 justify-items-center">
      {renderedProducts}
    </div>
  );
};
