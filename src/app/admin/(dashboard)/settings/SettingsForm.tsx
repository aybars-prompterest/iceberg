'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface SettingsFormProps {
  initialValues: Record<string, string>
}

const inputClass =
  'w-full bg-bg-surface border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-accent transition-colors'
const labelClass = 'text-sm text-text-secondary mb-1 block'
const sectionHeadingClass =
  'text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4'

export function SettingsForm({ initialValues }: SettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  function handleChange(key: string, value: string) {
    setValues(prev => ({ ...prev, [key]: value }))
  }

  async function handleSave() {
    setStatus('saving')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Save failed')
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-text-primary font-heading">Ayarlar</h1>
        <div className="flex items-center gap-3">
          {status === 'saved' && (
            <span className="text-sm text-green-400">Kaydedildi</span>
          )}
          {status === 'error' && (
            <span className="text-sm text-red-400">Hata oluştu</span>
          )}
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

      {/* Hero Section */}
      <section className="bg-bg-surface border border-border rounded-xl p-6 flex flex-col gap-5">
        <h2 className={sectionHeadingClass}>Hero Bölümü</h2>

        <div>
          <label className={labelClass}>Tagline</label>
          <input
            type="text"
            className={inputClass}
            value={values.hero_tagline ?? ''}
            onChange={e => handleChange('hero_tagline', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Headlines</label>
          <input
            type="text"
            className={inputClass}
            value={values.hero_headlines ?? ''}
            onChange={e => handleChange('hero_headlines', e.target.value)}
          />
          <p className="mt-1 text-xs text-text-secondary">
            virgülle ayır, örn: &apos;Studio, Design, Code&apos;
          </p>
        </div>

        <div>
          <label className={labelClass}>Açıklama</label>
          <textarea
            rows={3}
            className={inputClass}
            value={values.hero_description ?? ''}
            onChange={e => handleChange('hero_description', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Güven Metni</label>
          <input
            type="text"
            className={inputClass}
            value={values.hero_trust_text ?? ''}
            onChange={e => handleChange('hero_trust_text', e.target.value)}
          />
        </div>
      </section>

      {/* Announcement Banner */}
      <section className="bg-bg-surface border border-border rounded-xl p-6 flex flex-col gap-5">
        <h2 className={sectionHeadingClass}>Duyuru Bandı</h2>

        <div>
          <label className={labelClass}>Badge Metni</label>
          <input
            type="text"
            className={inputClass}
            value={values.announcement_badge ?? ''}
            onChange={e => handleChange('announcement_badge', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Duyuru Metni</label>
          <input
            type="text"
            className={inputClass}
            value={values.announcement_text ?? ''}
            onChange={e => handleChange('announcement_text', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Link Metni</label>
          <input
            type="text"
            className={inputClass}
            value={values.announcement_link_text ?? ''}
            onChange={e => handleChange('announcement_link_text', e.target.value)}
          />
        </div>

        <div>
          <label className={labelClass}>Link URL</label>
          <input
            type="text"
            className={inputClass}
            value={values.announcement_href ?? ''}
            onChange={e => handleChange('announcement_href', e.target.value)}
          />
        </div>
      </section>
    </div>
  )
}
