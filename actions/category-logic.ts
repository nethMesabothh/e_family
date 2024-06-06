"use server";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { IUser } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const createCategory = async (categoryName: string) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("no user");
  }

  const category = await db
    .insert(schema.CategoryTable)
    .values({
      categoryName,
    })
    .returning();

  revalidatePath("/create");

  return category[0];
};
