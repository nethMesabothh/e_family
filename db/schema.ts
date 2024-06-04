import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";

export const UserTable = pgTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatar: text("avatar"),
  createAt: timestamp("create_at").defaultNow(),
  updateAt: timestamp("update_at").$onUpdateFn(() => new Date(Date.now())),
});
