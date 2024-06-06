import { formatDateTime, formatPriceKH, formatPriceUSD } from "@/lib/utils";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";

type ProductItemsProps = {
  product: IProduct;
};

export const ProductItems = ({ product }: ProductItemsProps) => {
  return (
    <section className="border p-2 rounded-xl ">
      {/* Image */}
      <div className="h-auto">
        <Image
          src={product.imageUrl ? product.imageUrl : ""}
          alt="product image"
          width={500}
          height={500}
          priority
          className="p-3 bg-slate-300 rounded-xl"
        />
      </div>
      {/* Main Components */}
      <div className="h-auto">
        <h1 className="font-bold text-xl my-2">{product.productName}</h1>
        <h1 className="font-thin">
          ថ្ងៃនាំចូល : {formatDateTime(product.dayInStock!).dateOnly}
        </h1>
        <h1 className="my-2">{product.description}</h1>
        <div className="flex gap-2 my-2">
          <h1 className="p-1 border-2 rounded-md">
            លុយខ្មែរ : {formatPriceKH(product.price!)}
          </h1>
          <h1 className="p-1 border-2 rounded-md">
            លុយដុល្លារ :{formatPriceUSD(product.price!)}
          </h1>
        </div>
      </div>
    </section>
  );
};
