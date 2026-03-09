'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'

interface SettingsFormProps {
  initialValues: Record<string, string>
}

const inputClass =
  'w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-accent transition-colors'
const textareaClass =
  'w-full bg-bg-primary border border-border rounded-xl px-4 py-3 text-text-primary text-sm outline-none focus:border-accent transition-colors resize-none'
const labelClass = 'text-sm text-text-secondary mb-1.5 block'
const sectionHeadingClass =
  'text-xs font-semibold text-text-secondary uppercase tracking-widest mb-5 pb-3 border-b border-border'

function Field({
  label,
  value,
  onChange,
  hint,
  textarea,
  rows = 2,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  hint?: string
  textarea?: boolean
  rows?: number
}) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {textarea ? (
        <textarea
          rows={rows}
          className={textareaClass}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={inputClass}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      )}
      {hint && <p className="mt-1.5 text-xs text-text-secondary">{hint}</p>}
    </div>
  )
}

export function SettingsForm({ initialValues }: SettingsFormProps) {
  const [values, setValues] = useState<Record<string, string>>(initialValues)
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  function set(key: string, value: string) {
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
      if (!res.ok) throw new Error()
      setStatus('saved')
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-text-primary font-heading">Site Ayarları</h1>
          <p className="text-sm text-text-secondary mt-1">Ana sayfa içeriklerini buradan düzenleyin.</p>
        </div>
        <div className="flex items-center gap-3">
          {status === 'saved' && <span className="text-sm text-green-400">✓ Kaydedildi</span>}
          {status === 'error' && <span className="text-sm text-red-400">Hata oluştu</span>}
          <Button variant="primary" size="sm" onClick={handleSave} disabled={status === 'saving'}>
            {status === 'saving' ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
        <h2 className={sectionHeadingClass}>Hero Bölümü</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Tagline" value={values.hero_tagline ?? ''} onChange={v => set('hero_tagline', v)} />
          <Field
            label="Headlines"
            value={values.hero_headlines ?? ''}
            onChange={v => set('hero_headlines', v)}
            hint="Virgülle ayır — örn: All in One Studio, Design, Code"
          />
        </div>

        <Field
          label="Açıklama"
          value={values.hero_description ?? ''}
          onChange={v => set('hero_description', v)}
          textarea
          rows={2}
        />

        <Field
          label="Güven Metni"
          value={values.hero_trust_text ?? ''}
          onChange={v => set('hero_trust_text', v)}
          hint="Avatar grubunun altında görünen metin"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">Birincil CTA</p>
            <Field label="Buton Metni" value={values.hero_primary_cta_label ?? ''} onChange={v => set('hero_primary_cta_label', v)} />
            <Field label="Bağlantı (href)" value={values.hero_primary_cta_href ?? ''} onChange={v => set('hero_primary_cta_href', v)} />
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium text-text-secondary uppercase tracking-wider">İkincil CTA</p>
            <Field label="Buton Metni" value={values.hero_secondary_cta_label ?? ''} onChange={v => set('hero_secondary_cta_label', v)} />
            <Field label="Bağlantı (href)" value={values.hero_secondary_cta_href ?? ''} onChange={v => set('hero_secondary_cta_href', v)} />
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <section className="bg-bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
        <h2 className={sectionHeadingClass}>Duyuru Bandı</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Badge Metni" value={values.announcement_badge ?? ''} onChange={v => set('announcement_badge', v)} />
          <Field label="Link Metni" value={values.announcement_link_text ?? ''} onChange={v => set('announcement_link_text', v)} />
        </div>

        <Field label="Duyuru Metni" value={values.announcement_text ?? ''} onChange={v => set('announcement_text', v)} />

        <Field label="Bağlantı URL" value={values.announcement_href ?? ''} onChange={v => set('announcement_href', v)} />
      </section>

      {/* CTA Banner */}
      <section className="bg-bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
        <h2 className={sectionHeadingClass}>CTA Banner</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field label="Başlık" value={values.cta_banner_title ?? ''} onChange={v => set('cta_banner_title', v)} />
          <Field label="Buton Metni" value={values.cta_banner_label ?? ''} onChange={v => set('cta_banner_label', v)} />
        </div>

        <Field
          label="Açıklama"
          value={values.cta_banner_description ?? ''}
          onChange={v => set('cta_banner_description', v)}
          textarea
          rows={2}
        />

        <Field label="Buton Bağlantısı (href)" value={values.cta_banner_href ?? ''} onChange={v => set('cta_banner_href', v)} />
      </section>

      {/* Bot Settings */}
      <section className="bg-bg-surface border border-border rounded-2xl p-6 flex flex-col gap-5">
        <h2 className={sectionHeadingClass}>Blog Bot Ayarları</h2>

        <Field
          label="Subredditler"
          value={values.bot_subreddits ?? ''}
          onChange={v => set('bot_subreddits', v)}
          hint="Virgülle ayır — örn: technology,programming,webdev"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field
            label="Minimum Upvote"
            value={values.bot_min_upvotes ?? ''}
            onChange={v => set('bot_min_upvotes', v)}
            hint="Bu değerin altındaki konular atlanır"
          />
          <Field
            label="HuggingFace Modeli"
            value={values.bot_model ?? ''}
            onChange={v => set('bot_model', v)}
            hint="Örn: Qwen/Qwen2.5-7B-Instruct"
          />
        </div>
      </section>
    </div>
  )
}
