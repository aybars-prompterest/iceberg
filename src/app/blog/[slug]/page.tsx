import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)

  if (!post) notFound()

  const tags: string[] = JSON.parse(post.tags)
  const date = new Date(post.createdAt * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <Link href="/blog" className="text-zinc-500 hover:text-zinc-300 text-sm mb-8 inline-block transition-colors">
          ← Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
            {post.category}
          </span>
          <span className="text-xs text-zinc-500">{date}</span>
          <span className="text-xs text-zinc-600">·</span>
          <span className="text-xs text-zinc-600">{post.upvotes.toLocaleString()} upvotes on Reddit</span>
        </div>

        <article className="prose prose-invert prose-zinc max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-10 pt-8 border-t border-zinc-800">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-zinc-900 text-zinc-400 border border-zinc-800">
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xs text-zinc-600">
            Inspired by:{' '}
            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 underline transition-colors"
            >
              {post.sourceTitle}
            </a>{' '}
            on r/{post.sourceTitle.split('/')[0]}
          </p>
        </div>
      </div>
    </main>
  )
}
