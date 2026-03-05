import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .limit(20)

  return (
    <main className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Blog</h1>
        <p className="text-zinc-400 mb-12 text-lg">
          AI-curated tech insights from the latest discussions.
        </p>

        {posts.length === 0 ? (
          <p className="text-zinc-500">No posts yet. Run the bot to generate the first post.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map(post => {
              const tags: string[] = JSON.parse(post.tags)
              const date = new Date(post.createdAt * 1000).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })

              return (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group block">
                  <article className="border border-zinc-800 rounded-xl p-6 h-full hover:border-zinc-600 transition-colors">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-zinc-800 text-zinc-300">
                        {post.category}
                      </span>
                      <span className="text-xs text-zinc-500">{date}</span>
                    </div>
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-zinc-200 transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                          {tag}
                        </span>
                      ))}
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
