import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  excerpt: text('excerpt').notNull(),
  category: text('category').notNull(),
  tags: text('tags').notNull(),
  sourceUrl: text('source_url').notNull(),
  sourceTitle: text('source_title').notNull(),
  upvotes: integer('upvotes').notNull(),
  createdAt: integer('created_at').notNull(),
})
