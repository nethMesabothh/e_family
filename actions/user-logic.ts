"use server";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { IUser } from "@/types";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const createUser = async (user: IUser) => {
  const newUser = await db
    .insert(schema.UserTable)
    .values({
      ...user,
    })
    .returning();

  return newUser[0];
};

export const updateUser = async (exitsUser: IUser) => {
  if (!exitsUser.id) {
    return NextResponse.json({ message: "no user" });
  }

  await db
    .update(schema.UserTable)
    .set({
      ...exitsUser,
    })
    .where(eq(schema.UserTable.id, exitsUser.id));
};

export const deleteUser = async (user_id: string) => {
  if (!user_id) {
    return NextResponse.json({ message: "no user" });
  }

  await db.delete(schema.UserTable).where(eq(schema.UserTable.id, user_id));
};
