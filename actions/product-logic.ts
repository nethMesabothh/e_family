"use server";

import { db } from "@/db";
import * as schema from "@/db/schema";
import { IProduct, IUser } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type createProductProps = {
  values: {
    productName: string;
    categoryId: string;
    imageUrl: string;
    description: string;
    price: string;
    dayInStock: Date;
  };
};

export const createProduct = async ({ values }: createProductProps) => {
  console.log(values);
  const { userId } = auth();

  if (!userId) {
    throw new Error("no user");
  }

  const product = await db
    .insert(schema.ProductTable)
    .values({
      productName: values.productName,
      categoryId: values.categoryId,
      userId,
      price: values.price,
      imageUrl: values.imageUrl,
      dayInStock: values.dayInStock.toString(),
      description: values.description,
    })
    .returning();

  revalidatePath("/");

  return product;
};
