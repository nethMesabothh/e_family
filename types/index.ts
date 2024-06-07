import * as schema from "@/db/schema";

export type IUser = typeof schema.UserTable.$inferSelect;
export type ICategory = typeof schema.CategoryTable.$inferSelect;
export type IProduct = typeof schema.ProductTable.$inferSelect;

export type urlQueryProps = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryProps = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params?: { id: string };
  searchParams?: { [key: string]: string | undefined };
};
