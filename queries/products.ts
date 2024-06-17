"use server";

import * as schema from "@/db/schema";
import { db } from "@/db";
import { cache } from "react";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

type fetchAllProductProps = {
  searchQuery?: string;
  categoryIdQuery?: string;
};

export const fetchAllProduct = cache(
  async ({ categoryIdQuery, searchQuery }: fetchAllProductProps) => {
    const products = await db.query.ProductTable.findMany({
      where: (product, { eq, and, ilike }) => {
        const conditions = [];

        if (searchQuery) {
          conditions.push(
            eq(product.productName, searchQuery) &&
              ilike(product.productName, `%${searchQuery}%`) &&
              eq(product.description, searchQuery) &&
              ilike(product.description, `%${searchQuery}%`)
          );
        }

        if (categoryIdQuery) {
          conditions.push(
            eq(product.categoryId, categoryIdQuery) &&
              ilike(product.categoryId, `%${categoryIdQuery}%`)
          );
        }

        return and(...conditions);
      },
    });

    return products;
  }
);

type fetchProductProps = {
  productId: string;
};

export const fetchProduct = async ({ productId }: fetchProductProps) => {
  const { userId } = auth();

  if (!userId || !productId) {
    return;
  }

  const product = db.query.ProductTable.findFirst({
    where: eq(schema.ProductTable.id, productId),
  });

  return product;
};
