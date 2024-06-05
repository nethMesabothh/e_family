import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "@/db/schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });

const seed = async () => {
  try {
    console.log("Seeding database...");
    await db.delete(schema.UserTable);
    await db.delete(schema.CategoryTable);
    await db.delete(schema.ProductTable);

    console.log("Finished...");
  } catch (error) {
    console.log(error);
  }
};

seed();
