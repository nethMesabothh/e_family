"use server";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { IUser } from "@/types";

export const userCreate = async (user: IUser) => {
  const newUser = await db
    .insert(schema.UserTable)
    .values({
      ...user,
    })
    .returning();

  return newUser[0];
};
