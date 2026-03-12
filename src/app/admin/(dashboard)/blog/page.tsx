export const dynamic = 'force-dynamic'

import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { BlogListClient } from './BlogListClient'

export default async function AdminBlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))

  const serialized = posts.map(p => ({
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt,
    category: p.category,
    tags: p.tags,
    subreddit: p.subreddit,
    createdAt: p.createdAt,
  }))

  return <BlogListClient posts={serialized} />
}
