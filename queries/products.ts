"use server";

import * as schema from "@/db/schema";
import { db } from "@/db";
import { cache } from "react";

type fetchAllProductProps = {
  // searchQuery?: string;
  categoryIdQuery?: string;
};

export const fetchAllProduct = cache(
  async ({ categoryIdQuery }: fetchAllProductProps) => {
    const products = await db.query.ProductTable.findMany({
      where: (product, { eq, and, ilike }) => {
        const conditions = [];

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
