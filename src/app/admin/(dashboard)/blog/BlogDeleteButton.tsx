'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'

interface BlogDeleteButtonProps {
  postId: number
  postTitle: string
}

export function BlogDeleteButton({ postId, postTitle }: BlogDeleteButtonProps) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm(`"${postTitle}" yazısını silmek istediğinize emin misiniz?`)) return

    setIsDeleting(true)
    try {
      const res = await fetch(`/api/admin/blog/${postId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Silme işlemi başarısız')
      router.refresh()
    } catch (err) {
      console.error(err)
      alert('Bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-400 hover:text-red-300 hover:bg-red-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? 'Siliniyor…' : 'Sil'}
    </Button>
  )
}
