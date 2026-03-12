export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { db } from '@/db/client'
import { blogPosts, siteSettings } from '@/db/schema'
import { desc, count, sql, countDistinct } from 'drizzle-orm'
import { formatPostDate } from '@/lib/blog-utils'
import { Play, Settings, FileEdit } from 'lucide-react'

export default async function AdminDashboardPage() {
  const oneWeekAgo = Math.floor(Date.now() / 1000) - 7 * 24 * 60 * 60

  const [countResult, weekCountResult, categoryCountResult, recentPosts, settingsRows] =
    await Promise.all([
      db.select({ count: count() }).from(blogPosts),
      db
        .select({ count: count() })
        .from(blogPosts)
        .where(sql`${blogPosts.createdAt} > ${oneWeekAgo}`),
      db.select({ count: countDistinct(blogPosts.category) }).from(blogPosts),
      db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(5),
      db.select().from(siteSettings),
    ])

  const totalPosts = countResult[0]?.count ?? 0
  const weekPosts = weekCountResult[0]?.count ?? 0
  const categoryCount = categoryCountResult[0]?.count ?? 0

  const s: Record<string, string> = {}
  for (const row of settingsRows) s[row.key] = row.value
  const lastBotRun = s.bot_last_run ?? 'Henüz çalıştırılmadı'

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-8 w-full">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary font-heading">Dashboard</h1>
        <p className="text-sm text-text-secondary mt-1">Sitenize genel bakış.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/admin/blog"
          className="flex flex-col gap-1 bg-bg-surface border border-border rounded-xl px-5 py-5 hover:border-accent/50 transition-colors"
        >
          <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
            Toplam Yazı
          </span>
          <span className="text-3xl font-bold text-text-primary">{totalPosts}</span>
        </Link>

        <div className="flex flex-col gap-1 bg-bg-surface border border-border rounded-xl px-5 py-5">
          <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
            Bu Hafta
          </span>
          <span className="text-3xl font-bold text-accent">{weekPosts}</span>
        </div>

        <div className="flex flex-col gap-1 bg-bg-surface border border-border rounded-xl px-5 py-5">
          <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
            Kategori
          </span>
          <span className="text-3xl font-bold text-text-primary">{categoryCount}</span>
        </div>

        <div className="flex flex-col gap-1 bg-bg-surface border border-border rounded-xl px-5 py-5">
          <span className="text-text-secondary text-xs font-medium uppercase tracking-wider">
            Son Bot
          </span>
          <span className="text-sm font-medium text-text-primary mt-1 leading-tight">
            {lastBotRun}
          </span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/admin/bot"
          className="flex items-center gap-3 bg-accent/10 border border-accent/20 rounded-xl px-5 py-4 hover:bg-accent/15 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <Play size={16} className="text-accent" />
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary block">Bot Çalıştır</span>
            <span className="text-xs text-text-secondary">Yeni blog yazısı oluştur</span>
          </div>
        </Link>

        <Link
          href="/admin/settings"
          className="flex items-center gap-3 bg-bg-surface border border-border rounded-xl px-5 py-4 hover:border-accent/50 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <Settings size={16} className="text-accent" />
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary block">Site Ayarları</span>
            <span className="text-xs text-text-secondary">İçerikleri düzenle</span>
          </div>
        </Link>

        <Link
          href="/admin/blog"
          className="flex items-center gap-3 bg-bg-surface border border-border rounded-xl px-5 py-4 hover:border-accent/50 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
            <FileEdit size={16} className="text-accent" />
          </div>
          <div>
            <span className="text-sm font-medium text-text-primary block">Blog Yönetimi</span>
            <span className="text-xs text-text-secondary">Yazıları düzenle/sil</span>
          </div>
        </Link>
      </div>

      {/* Recent posts */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">Son Yazılar</h2>
          <Link href="/admin/blog" className="text-sm text-accent hover:text-accent/80 transition-colors">
            Tümünü Gör →
          </Link>
        </div>

        <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-text-secondary">
                <th className="text-left px-5 py-3 font-medium">Başlık</th>
                <th className="text-left px-5 py-3 font-medium hidden sm:table-cell">Kategori</th>
                <th className="text-left px-5 py-3 font-medium hidden md:table-cell">Kaynak</th>
                <th className="text-left px-5 py-3 font-medium">Tarih</th>
              </tr>
            </thead>
            <tbody>
              {recentPosts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-6 text-center text-text-secondary">
                    Henüz blog yazısı yok. Bot&apos;u çalıştırarak başlayın.
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
                        href={`/admin/blog/${post.id}/edit`}
                        className="text-text-primary hover:text-accent transition-colors line-clamp-1"
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td className="px-5 py-3 text-text-secondary hidden sm:table-cell">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium">
                        {post.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-text-secondary hidden md:table-cell text-xs">
                      r/{post.subreddit}
                    </td>
                    <td className="px-5 py-3 text-text-secondary whitespace-nowrap text-xs">
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
