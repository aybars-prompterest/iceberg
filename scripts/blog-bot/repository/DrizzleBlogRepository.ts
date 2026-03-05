import { eq } from 'drizzle-orm'
import { db } from '../../../src/db/client'
import { blogPosts } from '../../../src/db/schema'
import type { IBlogRepository } from '../interfaces/IBlogRepository'
import type { BlogContent } from '../interfaces/IAIWriter'
import type { Topic } from '../interfaces/IContentSource'

export class DrizzleBlogRepository implements IBlogRepository {
  async save(content: BlogContent, topic: Topic): Promise<void> {
    await db.insert(blogPosts).values({
      slug: content.slug,
      title: content.title,
      content: content.content,
      excerpt: content.excerpt,
      category: content.category,
      tags: JSON.stringify(content.tags),
      sourceUrl: topic.url,
      sourceTitle: topic.title,
      upvotes: topic.upvotes,
      createdAt: Math.floor(Date.now() / 1000),
    })
  }

  async existsBySourceUrl(url: string): Promise<boolean> {
    const result = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.sourceUrl, url))
      .limit(1)
    return result.length > 0
  }
}
