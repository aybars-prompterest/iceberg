CREATE TABLE `blog_posts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`excerpt` text NOT NULL,
	`category` text NOT NULL,
	`tags` text NOT NULL,
	`source_url` text NOT NULL,
	`source_title` text NOT NULL,
	`subreddit` text DEFAULT 'technology' NOT NULL,
	`upvotes` integer NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `blog_posts_slug_unique` ON `blog_posts` (`slug`);