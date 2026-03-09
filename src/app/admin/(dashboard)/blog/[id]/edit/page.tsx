export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { BlogEditForm } from './BlogEditForm'

export default async function BlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, Number(id))).limit(1)

  if (!post) {
    notFound()
  }

  return (
    <div className="p-8 flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary font-heading">Blog Yazısını Düzenle</h1>
        <p className="text-sm text-text-secondary mt-1">ID: {post.id}</p>
      </div>

      {/* Form */}
      <BlogEditForm
        post={{
          id: post.id,
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          category: post.category,
        }}
      />
    </div>
  )
}
