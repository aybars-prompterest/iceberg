'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import { Button } from '@/components/ui/Button'

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false })

interface BlogEditFormProps {
  post: {
    id: number
    title: string
    content: string
    excerpt: string
    category: string
  }
}

export function BlogEditForm({ post }: BlogEditFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(post.title)
  const [category, setCategory] = useState(post.category)
  const [excerpt, setExcerpt] = useState(post.excerpt)
  const [content, setContent] = useState(post.content)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSave() {
    setStatus('saving')
    setErrorMsg('')
    try {
      const res = await fetch(`/api/admin/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, excerpt, category }),
      })
      if (!res.ok) throw new Error('Kaydetme işlemi başarısız')
      setStatus('success')
      setTimeout(() => router.push('/admin/blog'), 800)
    } catch (err) {
      console.error(err)
      setErrorMsg('Bir hata oluştu. Lütfen tekrar deneyin.')
      setStatus('error')
    }
  }

  const inputClass =
    'w-full bg-bg-primary border border-border rounded-lg px-4 py-2.5 text-text-primary text-sm placeholder:text-text-secondary focus:outline-none focus:border-accent/60 transition-colors'

  const labelClass = 'block text-sm font-medium text-text-secondary mb-1.5'

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <label className={labelClass}>Başlık</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClass}
          placeholder="Yazı başlığı"
        />
      </div>

      {/* Category */}
      <div>
        <label className={labelClass}>Kategori</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
          placeholder="Örn: AI, Web Dev, Programming"
        />
      </div>

      {/* Excerpt */}
      <div>
        <label className={labelClass}>Özet</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className={inputClass}
          placeholder="Kısa özet..."
        />
      </div>

      {/* Content (Markdown editor) */}
      <div>
        <label className={labelClass}>İçerik (Markdown)</label>
        <div data-color-mode="dark">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val ?? '')}
            height={400}
            preview="edit"
          />
        </div>
      </div>

      {/* Status messages */}
      {status === 'success' && (
        <p className="text-sm text-green-400">Yazı başarıyla kaydedildi. Yönlendiriliyorsunuz…</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-red-400">{errorMsg}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={status === 'saving' || status === 'success'}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'saving' ? 'Kaydediliyor…' : 'Kaydet'}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push('/admin/blog')}
          disabled={status === 'saving'}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          İptal
        </Button>
      </div>
    </div>
  )
}
