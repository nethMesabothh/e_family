"use server";

import * as schema from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const fetchAllCategories = cache(async () => {
  const categories = await db.select().from(schema.CategoryTable);

  return categories;
});
