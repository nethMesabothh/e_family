"use server";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { eq } from "drizzle-orm";

export const fetchCurrentUser = async (userId: string) => {
  if (!userId) {
    return;
  }

  const user = await db
    .select()
    .from(schema.UserTable)
    .where(eq(schema.UserTable.id, userId));

  return user[0];
};
