CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`image` text NOT NULL,
	`username` text NOT NULL,
	`api_key` text NOT NULL
);
--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_certots` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`story` text NOT NULL,
	`prompts_id` integer NOT NULL,
	FOREIGN KEY (`prompts_id`) REFERENCES `prompts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_certots`("id", "title", "story", "prompts_id") SELECT "id", "title", "story", "prompts_id" FROM `certots`;--> statement-breakpoint
DROP TABLE `certots`;--> statement-breakpoint
ALTER TABLE `__new_certots` RENAME TO `certots`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_prompts` (
	`id` integer PRIMARY KEY NOT NULL,
	`prompts` text NOT NULL,
	`user_id` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_prompts`("id", "prompts", "user_id") SELECT "id", "prompts", "user_id" FROM `prompts`;--> statement-breakpoint
DROP TABLE `prompts`;--> statement-breakpoint
ALTER TABLE `__new_prompts` RENAME TO `prompts`;