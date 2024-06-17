import { Button } from "@/components/ui/button";
import { formatDateTime, formatPriceKH, formatPriceUSD } from "@/lib/utils";
import { IProduct } from "@/types";
import Image from "next/image";
import React from "react";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { DeleteProductClient } from "@/components/main/delete-product/delete-product";

type ProductItemsProps = {
  product: IProduct;
};

export const ProductItems = ({ product }: ProductItemsProps) => {
  return (
    <section className="border p-2 rounded-xl ">
      {/* Image */}
      <div className="relative h-auto">
        <Link href={`/edit/${product.id}`}>
          <Button
            className="absolute top-2 left-2"
            size="sm"
            variant="secondary"
            asChild
          >
            <Pencil className="h-[2.5rem] w-[2.5rem]" />
          </Button>
        </Link>
        <Image
          src={product.imageUrl ? product.imageUrl : ""}
          alt="product image"
          width={500}
          height={500}
          priority
          className="p-3 rounded-xl"
        />
        <div className="absolute top-2 right-2">
          <DeleteProductClient productId={product.id} />
        </div>
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
