CREATE TABLE `certots` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`story` text NOT NULL,
	`prompts_id` integer NOT NULL,
	FOREIGN KEY (`prompts_id`) REFERENCES `prompts`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `prompts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`prompts` text NOT NULL,
	`user_id` integer NOT NULL
);
