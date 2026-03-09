'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

type Status = 'idle' | 'running' | 'success' | 'error'

export default function BotPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleRunBot() {
    setStatus('running')
    setErrorMessage('')

    try {
      const res = await fetch('/api/admin/bot/run', { method: 'POST' })
      const data = await res.json()

      if (!res.ok) {
        setErrorMessage(data.error ?? 'Bilinmeyen hata')
        setStatus('error')
        return
      }

      setStatus('success')
    } catch {
      setErrorMessage('Sunucuya bağlanılamadı')
      setStatus('error')
    }
  }

  return (
    <div className="p-8 flex items-start justify-center">
      <div className="w-full max-w-lg bg-bg-surface border border-border rounded-xl p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-text-primary font-heading">Bot Kontrolü</h1>
          <p className="text-sm text-text-secondary leading-relaxed">
            Blog bot&apos;u manuel olarak çalıştırın. Her çalıştırmada Reddit&apos;ten en popüler
            konuyu bulur ve bir blog yazısı oluşturur.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border" />

        {/* Action */}
        <div className="flex flex-col gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={handleRunBot}
            disabled={status === 'running'}
            className="w-full"
          >
            {status === 'running' ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-bg-primary/40 border-t-bg-primary rounded-full animate-spin" />
                Çalışıyor...
              </>
            ) : (
              'Bot\'u Çalıştır'
            )}
          </Button>

          {/* Status */}
          {status === 'running' && (
            <p className="text-sm text-text-secondary text-center">
              Bu işlem 30–120 saniye sürebilir. Lütfen bekleyin...
            </p>
          )}

          {status === 'success' && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-green-400 text-center">
                Başarılı! Yeni yazı oluşturuldu.
              </p>
              <Link
                href="/admin/blog"
                className="inline-flex items-center justify-center gap-1 text-sm text-accent hover:text-accent/80 transition-colors"
              >
                Blog&apos;a Git
                <span aria-hidden>→</span>
              </Link>
            </div>
          )}

          {status === 'error' && (
            <p className="text-sm text-red-400 text-center">
              Hata: {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
