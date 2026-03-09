export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { desc, count } from 'drizzle-orm'
import { formatPostDate } from '@/lib/blog-utils'

export default async function AdminDashboardPage() {
  const [countResult, recentPosts] = await Promise.all([
    db.select({ count: count() }).from(blogPosts),
    db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(5),
  ])

  const totalPosts = countResult[0]?.count ?? 0

  return (
    <div className="p-8 flex flex-col gap-8">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-text-primary font-heading">Dashboard</h1>

      {/* Stats cards */}
      <div className="flex gap-4">
        <Link
          href="/admin/blog"
          className="flex flex-col gap-1 bg-bg-surface border border-border rounded-xl px-6 py-5 hover:border-accent/50 transition-colors min-w-[160px]"
        >
          <span className="text-text-secondary text-sm">Toplam Blog Yazısı</span>
          <span className="text-3xl font-bold text-text-primary">{totalPosts}</span>
        </Link>

        <Link
          href="/admin/bot"
          className="flex flex-col gap-1 bg-bg-surface border border-border rounded-xl px-6 py-5 hover:border-accent/50 transition-colors min-w-[160px]"
        >
          <span className="text-text-secondary text-sm">Bot Çalıştır</span>
          <span className="text-3xl font-bold text-accent">▶</span>
        </Link>
      </div>

      {/* Recent posts */}
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-text-primary">Son Yazılar</h2>

        <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="text-left px-5 py-3 font-medium">Başlık</th>
                <th className="text-left px-5 py-3 font-medium">Kategori</th>
                <th className="text-left px-5 py-3 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-5 py-6 text-center text-text-secondary">
                    Henüz blog yazısı yok.
                  </td>
                </tr>
              ) : (
                recentPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="border-b border-border last:border-0 hover:bg-bg-primary/40 transition-colors"
                  >
                    <td className="px-5 py-3">
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="text-text-primary hover:text-accent transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-text-secondary">{post.category}</td>
                    <td className="px-5 py-3 text-text-secondary whitespace-nowrap">
                      {formatPostDate(post.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
