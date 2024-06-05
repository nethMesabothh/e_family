import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";

// Define an enum for the roles
export const userRoleEnum = pgEnum("USER_ROLE", ["ADMIN", "USER"]);

export const UserTable = pgTable("ef_users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  username: text("username"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatar: text("avatar"),
  role: userRoleEnum("role").notNull().default("USER"),
  createAt: timestamp("create_at").defaultNow(),
  updateAt: timestamp("update_at").$onUpdateFn(() => new Date(Date.now())),
});

export const UserRelation = relations(UserTable, ({ many }) => ({
  product: many(ProductTable),
}));

export const ProductTable = pgTable("ef_products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => createId()),
  productName: text("product_name").notNull(),
  imageUrl: text("image_url"),
  description: text("description"),
  price: text("price"),
  dayInStock: text("day_in_stock"),

  userId: text("userId")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),

  categoryId: text("categoryId")
    .references(() => CategoryTable.id, { onDelete: "cascade" })
    .notNull(),

  createAt: timestamp("create_at").defaultNow(),
  updateAt: timestamp("update_at").$onUpdateFn(() => new Date(Date.now())),
});

export const ProductRelation = relations(ProductTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [ProductTable.userId],
    references: [UserTable.id],
  }),
  category: one(CategoryTable, {
    fields: [ProductTable.categoryId],
    references: [CategoryTable.id],
  }),
}));

export const CategoryTable = pgTable(
  "ef_category",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => createId()),
    categoryName: text("category_name"),
  },
  (table) => {
    return {
      categoryNameIndex: uniqueIndex("category_name_index").on(
        table.categoryName
      ),
    };
  }
);

export const CategoryRelation = relations(CategoryTable, ({ many }) => ({
  product: many(ProductTable),
}));
