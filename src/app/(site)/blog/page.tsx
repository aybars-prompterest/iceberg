import type { Metadata } from 'next'
import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import { parseTags, formatPostDate } from '@/lib/blog-utils'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Blog — Iceberg',
  description: 'The latest tech insights curated by AI.',
}

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .limit(20)

  return (
    <main className="min-h-screen bg-bg-primary text-text-primary pt-32 pb-16">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading
          label="Blog"
          title="Explore the Newsletter"
          description="The latest tech insights curated by AI."
          align="left"
        />

        {posts.length === 0 ? (
          <p className="text-text-secondary mt-12">No posts yet. Run the bot to generate the first post.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 mt-12">
            {posts.map(post => {
              const tags = parseTags(post.tags)
              const date = formatPostDate(post.createdAt)

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <article className="rounded-2xl border border-border bg-bg-surface p-6 h-full transition-all hover:border-accent/30 hover:shadow-[0_0_30px_rgba(64,197,255,0.08)]">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="accent">{post.category}</Badge>
                      <span className="text-xs text-text-secondary">{date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 text-text-primary group-hover:text-accent transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <span key={tag} className="text-xs px-2 py-1 rounded-full bg-bg-primary text-text-secondary border border-border">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-accent text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Read More →
                      </span>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
