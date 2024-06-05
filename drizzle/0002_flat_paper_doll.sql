CREATE TABLE IF NOT EXISTS "ef_products" (
	"id" text PRIMARY KEY NOT NULL,
	"product_name" text NOT NULL,
	"image_url" text,
	"description" text,
	"price" text,
	"day_in_stock" text,
	"userId" text NOT NULL,
	"categoryId" text NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"update_at" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ef_users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text,
	"first_name" text,
	"last_name" text,
	"avatar" text,
	"role" "USER_ROLE" DEFAULT 'USER' NOT NULL,
	"create_at" timestamp DEFAULT now(),
	"update_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "users" RENAME TO "ef_category";--> statement-breakpoint
ALTER TABLE "ef_category" ADD COLUMN "category_name" text;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ef_products" ADD CONSTRAINT "ef_products_userId_ef_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ef_users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ef_products" ADD CONSTRAINT "ef_products_categoryId_ef_category_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."ef_category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "category_name_index" ON "ef_category" USING btree (category_name);--> statement-breakpoint
ALTER TABLE "ef_category" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "ef_category" DROP COLUMN IF EXISTS "first_name";--> statement-breakpoint
ALTER TABLE "ef_category" DROP COLUMN IF EXISTS "last_name";--> statement-breakpoint
ALTER TABLE "ef_category" DROP COLUMN IF EXISTS "avatar";--> statement-breakpoint
ALTER TABLE "ef_category" DROP COLUMN IF EXISTS "role";--> statement-breakpoint
ALTER TABLE "ef_category" DROP COLUMN IF EXISTS "create_at";--> statement-breakpoint
ALTER TABLE "ef_category" DROP COLUMN IF EXISTS "update_at";