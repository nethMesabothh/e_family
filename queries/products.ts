"use server";

import * as schema from "@/db/schema";
import { db } from "@/db";
import { cache } from "react";

export const fetchAllProduct = cache(async () => {
  const products = await db.select().from(schema.ProductTable);

  return products;
});
