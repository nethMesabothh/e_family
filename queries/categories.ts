"use server";

import * as schema from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export const fetchAllCategories = async () => {
  const categories = await db.select().from(schema.CategoryTable);

  return categories;
};
