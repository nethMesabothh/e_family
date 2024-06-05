DO $$ BEGIN
 CREATE TYPE "public"."USER_ROLE" AS ENUM('ADMIN', 'USER');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "USER_ROLE" DEFAULT 'USER' NOT NULL;