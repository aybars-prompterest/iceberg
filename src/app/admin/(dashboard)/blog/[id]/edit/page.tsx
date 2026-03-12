export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { formatPostDate } from '@/lib/blog-utils'
import { BlogEditForm } from './BlogEditForm'

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id))).limit(1)

  if (!post) {
    notFound()
  }

  return (
    <BlogEditForm
      post={{
        id: post.id,
        slug: post.slug,
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        category: post.category,
        tags: post.tags,
        subreddit: post.subreddit,
        sourceUrl: post.sourceUrl,
        createdAt: formatPostDate(post.createdAt),
      }}
    />
  )
}
