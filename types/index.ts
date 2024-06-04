import * as schema from "@/db/schema";

export type IUser = typeof schema.UserTable.$inferSelect;
