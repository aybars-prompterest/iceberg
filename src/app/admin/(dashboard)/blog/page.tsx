export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db } from '@/db/client'
import { blogPosts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { formatPostDate } from '@/lib/blog-utils'
import { BlogDeleteButton } from './BlogDeleteButton'

export default async function AdminBlogPage() {
  const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt))

  return (
    <div className="p-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary font-heading">Blog Yazıları</h1>
        <span className="text-sm text-text-secondary bg-bg-surface border border-border rounded-lg px-3 py-1">
          {posts.length} yazı
        </span>
      </div>

      {/* Table */}
      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-bg-surface border-b border-border">
              <th className="text-left px-4 py-3 text-text-secondary text-sm font-medium">Başlık</th>
              <th className="text-left px-4 py-3 text-text-secondary text-sm font-medium">Kategori</th>
              <th className="text-left px-4 py-3 text-text-secondary text-sm font-medium">Tarih</th>
              <th className="text-left px-4 py-3 text-text-secondary text-sm font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-text-secondary text-sm">
                  Henüz blog yazısı bulunmuyor.
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border last:border-0 hover:bg-bg-surface/50 transition-colors"
                >
                  <td className="px-4 py-3 text-text-primary text-sm max-w-sm">
                    <span className="line-clamp-1">{post.title}</span>
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-sm whitespace-nowrap">{post.category}</td>
                  <td className="px-4 py-3 text-text-secondary text-sm whitespace-nowrap">
                    {formatPostDate(post.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium rounded-lg bg-transparent text-accent hover:bg-accent/10 transition-colors"
                      >
                        Düzenle
                      </Link>
                      <BlogDeleteButton postId={post.id} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
