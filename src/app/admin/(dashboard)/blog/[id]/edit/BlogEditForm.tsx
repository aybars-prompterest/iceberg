'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, ExternalLink, Clock, Tag, Folder, Globe } from 'lucide-react'
import { parseTags } from '@/lib/blog-utils'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface BlogEditFormProps {
  post: {
    id: number
    slug: string
    title: string
    content: string
    excerpt: string
    category: string
    tags: string
    subreddit: string
    sourceUrl: string
    createdAt: string
  }
}

const inputClass =
  'w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-accent transition-colors'
const labelClass = 'text-sm text-text-secondary mb-1.5 block'

export function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post.title)
  const [category, setCategory] = useState(post.category)
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [content, setContent] = useState(post.content)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  const tagList = parseTags(post.tags)

  async function handleSave() {
    setStatus('saving')
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, excerpt, category }),
      })
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="flex flex-col gap-0 w-full">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-bg-primary/80 backdrop-blur-sm border-b border-border px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blog"
              className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-text-secondary hover:text-text-primary hover:bg-bg-surface transition-colors"
            >
              <ArrowLeft size={16} />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-text-primary font-heading line-clamp-1">
                Yazıyı Düzenle
              </h1>
              <p className="text-xs text-text-secondary mt-0.5">/{post.slug}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {status === 'saved' && <span className="text-sm text-green-400">✓ Kaydedildi</span>}
            {status === 'error' && <span className="text-sm text-red-400">Hata oluştu</span>}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/admin/blog')}
              disabled={status === 'saving'}
            >
              İptal
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={status === 'saving'}
            >
              {status === 'saving' ? 'Kaydediliyor...' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 lg:p-8 flex flex-col xl:flex-row gap-6">
        {/* Main content — left */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* Title */}
          <div className="bg-bg-surface border border-border rounded-2xl p-6 flex flex-col gap-4">
            <div>
              <label className={labelClass}>Başlık</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className={inputClass}
                placeholder="Yazı başlığı"
              />
            </div>

            <div>
              <label className={labelClass}>Kategori</label>
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
                className={inputClass}
                placeholder="Örn: AI, Web Dev"
              />
            </div>

            <div>
              <label className={labelClass}>Özet</label>
              <textarea
                value={excerpt}
                onChange={e => setExcerpt(e.target.value)}
                rows={3}
                className={`${inputClass} resize-y`}
                placeholder="Kısa özet..."
              />
            </div>
          </div>

          {/* Markdown Editor */}
          <div className="bg-bg-surface border border-border rounded-2xl p-6 flex flex-col gap-3">
            <label className={labelClass}>İçerik (Markdown)</label>
            <div data-color-mode="dark" className="rounded-xl overflow-hidden">
              <MDEditor
                value={content}
                onChange={val => setContent(val ?? '')}
                height={500}
                preview="live"
              />
            </div>
          </div>
        </div>

        {/* Sidebar — right */}
        <div className="w-full xl:w-75 shrink-0 flex flex-col gap-4">
          {/* Meta info */}
          <div className="bg-bg-surface border border-border rounded-2xl p-5 flex flex-col gap-4">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest pb-3 border-b border-border">
              Yazı Bilgileri
            </h3>

            <div className="flex items-center gap-3 text-sm">
              <Clock size={14} className="text-text-secondary shrink-0" />
              <span className="text-text-secondary">Tarih:</span>
              <span className="text-text-primary ml-auto">{post.createdAt}</span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Folder size={14} className="text-text-secondary shrink-0" />
              <span className="text-text-secondary">Kategori:</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-medium ml-auto">
                {post.category}
              </span>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Globe size={14} className="text-text-secondary shrink-0" />
              <span className="text-text-secondary">Kaynak:</span>
              <span className="text-text-primary ml-auto">r/{post.subreddit}</span>
            </div>

            <a
              href={post.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors mt-1"
            >
              <ExternalLink size={14} />
              Orijinal gönderiyi aç
            </a>
          </div>

          {/* Tags */}
          <div className="bg-bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 pb-3 border-b border-border">
              <Tag size={14} className="text-text-secondary" />
              <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest">
                Etiketler
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {tagList.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg bg-bg-primary border border-border text-text-secondary text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="bg-bg-surface border border-border rounded-2xl p-5 flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-widest pb-3 border-b border-border">
              Hızlı Bağlantılar
            </h3>
            <Link
              href={`/blog/${post.slug}`}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <ExternalLink size={14} />
              Yazıyı sitede görüntüle
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
