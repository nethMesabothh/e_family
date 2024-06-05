import * as schema from "@/db/schema";

export type IUser = typeof schema.UserTable.$inferSelect;
export type ICategory = typeof schema.CategoryTable.$inferSelect;
