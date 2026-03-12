'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Search, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import { BlogDeleteButton } from './BlogDeleteButton'
import { formatPostDate } from '@/lib/blog-utils'

interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  category: string
  tags: string
  subreddit: string
  createdAt: number
}

const POSTS_PER_PAGE = 10

const inputClass =
  'w-full bg-bg-primary border border-border rounded-xl px-4 py-2.5 pl-10 text-text-primary text-sm outline-none focus:border-accent transition-colors'

export function BlogListClient({ posts }: { posts: Post[] }) {
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [bulkDeleting, setBulkDeleting] = useState(false)

  // Unique categories
  const categories = useMemo(() => {
    const cats = new Set(posts.map(p => p.category))
    return Array.from(cats).sort()
  }, [posts])

  // Filtered posts
  const filtered = useMemo(() => {
    let result = posts
    if (search) {
      const q = search.toLowerCase()
      result = result.filter(
        p => p.title.toLowerCase().includes(q) || p.tags.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      )
    }
    if (categoryFilter) {
      result = result.filter(p => p.category === categoryFilter)
    }
    return result
  }, [posts, search, categoryFilter])

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  // Selection
  const allOnPageSelected = paged.length > 0 && paged.every(p => selected.has(p.id))

  function toggleSelectAll() {
    if (allOnPageSelected) {
      const next = new Set(selected)
      paged.forEach(p => next.delete(p.id))
      setSelected(next)
    } else {
      const next = new Set(selected)
      paged.forEach(p => next.add(p.id))
      setSelected(next)
    }
  }

  function toggleSelect(id: number) {
    const next = new Set(selected)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelected(next)
  }

  async function handleBulkDelete() {
    const ids = Array.from(selected)
    if (ids.length === 0) return
    if (!confirm(`${ids.length} yazıyı silmek istediğinize emin misiniz?`)) return

    setBulkDeleting(true)
    try {
      const res = await fetch('/api/admin/blog/bulk-delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      })
      if (!res.ok) throw new Error()
      setSelected(new Set())
      router.refresh()
    } catch {
      alert('Toplu silme başarısız oldu.')
    } finally {
      setBulkDeleting(false)
    }
  }

  return (
    <div className="p-6 lg:p-8 flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-heading">Blog Yazıları</h1>
          <p className="text-sm text-text-secondary mt-1">
            {filtered.length} yazı {search || categoryFilter ? `(${posts.length} toplam)` : ''}
          </p>
        </div>
        {selected.size > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBulkDelete}
            disabled={bulkDeleting}
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <Trash2 size={16} />
            {bulkDeleting ? 'Siliniyor...' : `${selected.size} yazıyı sil`}
          </Button>
        )}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
          <input
            type="text"
            placeholder="Başlık, etiket veya içerik ara..."
            className={inputClass}
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
        </div>
        <select
          className="bg-bg-primary border border-border rounded-xl px-4 py-2.5 text-text-primary text-sm outline-none focus:border-accent transition-colors appearance-none cursor-pointer min-w-[160px]"
          value={categoryFilter}
          onChange={e => { setCategoryFilter(e.target.value); setPage(1) }}
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-bg-surface border border-border rounded-xl overflow-hidden">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-text-secondary">
              <th className="text-left px-4 py-3 w-10">
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  onChange={toggleSelectAll}
                  className="accent-accent cursor-pointer"
                />
              </th>
              <th className="text-left px-4 py-3 font-medium">Başlık</th>
              <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Kategori</th>
              <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Etiketler</th>
              <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Kaynak</th>
              <th className="text-left px-4 py-3 font-medium">Tarih</th>
              <th className="text-left px-4 py-3 font-medium">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center text-text-secondary">
                  {search || categoryFilter ? 'Aramanızla eşleşen yazı bulunamadı.' : 'Henüz blog yazısı bulunmuyor.'}
                </td>
              </tr>
            ) : (
              paged.map(post => (
                <tr
                  key={post.id}
                  className="border-b border-border last:border-0 hover:bg-bg-primary/40 transition-colors"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selected.has(post.id)}
                      onChange={() => toggleSelect(post.id)}
                      className="accent-accent cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/blog/${post.id}/edit`}
                      className="text-text-primary hover:text-accent transition-colors line-clamp-1"
                    >
                      {post.title}
                    </Link>
                    <p className="text-xs text-text-secondary mt-0.5 line-clamp-1 hidden xl:block">
                      {post.excerpt}
                    </p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {post.tags.split(',').slice(0, 3).map(tag => (
                        <span key={tag} className="inline-flex items-center px-1.5 py-0.5 rounded bg-bg-primary text-text-secondary text-xs">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs hidden sm:table-cell whitespace-nowrap">
                    r/{post.subreddit}
                  </td>
                  <td className="px-4 py-3 text-text-secondary text-xs whitespace-nowrap">
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-text-secondary">
            {(currentPage - 1) * POSTS_PER_PAGE + 1}–{Math.min(currentPage * POSTS_PER_PAGE, filtered.length)} / {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="p-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  p === currentPage
                    ? 'bg-accent text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="p-2 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
