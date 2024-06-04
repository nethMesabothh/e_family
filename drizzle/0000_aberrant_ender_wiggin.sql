CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text,
	"first_name" text,
	"last_name" text,
	"avatar" text,
	"create_at" timestamp DEFAULT now(),
	"update_at" timestamp
);
