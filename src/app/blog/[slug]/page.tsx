import type { Metadata } from 'next'
import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { parseTags, formatPostDate, isValidHttpUrl } from '@/lib/blog-utils'

export const dynamic = 'force-dynamic'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)

  if (!post) return { title: 'Yazı Bulunamadı — Iceberg' }

  return {
    title: `${post.title} — Iceberg Blog`,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  const [post] = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1)

  if (!post) notFound()

  const tags = parseTags(post.tags)
  const date = formatPostDate(post.createdAt)

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4 md:px-6">
        <Link
          href="/blog"
          className="text-text-secondary hover:text-accent text-sm mb-8 inline-flex items-center gap-1 transition-colors"
        >
          ← Blog'a Dön
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <Badge variant="accent">{post.category}</Badge>
          <span className="text-xs text-text-secondary">{date}</span>
          <span className="text-xs text-text-secondary/50">·</span>
          <span className="text-xs text-text-secondary/50">{post.upvotes.toLocaleString()} upvotes</span>
        </div>

        <article className="prose prose-invert max-w-none prose-headings:text-text-primary prose-headings:font-semibold prose-p:text-text-secondary prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-strong:text-text-primary prose-code:text-accent prose-blockquote:border-accent/30 prose-blockquote:text-text-secondary">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-10 pt-8 border-t border-border">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-full bg-bg-surface text-text-secondary border border-border">
                {tag}
              </span>
            ))}
          </div>
          {isValidHttpUrl(post.sourceUrl) && (
            <p className="text-xs text-text-secondary/50">
              Kaynak:{' '}
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent underline transition-colors"
              >
                {post.sourceTitle}
              </a>{' '}
              — r/{post.subreddit}
            </p>
          )}
        </div>
      </div>
    </main>
  )
}
