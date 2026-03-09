export const dynamic = 'force-dynamic'

import { db } from '@/db/client'
import { siteSettings } from '@/db/schema'
import { SettingsForm } from './SettingsForm'

const DEFAULTS: Record<string, string> = {
  hero_tagline: 'Next-Gen Technology Studio',
  hero_headlines: 'All in One Studio,Design,Code,Scale',
  hero_description: 'We build and launch your product to the global market in weeks.',
  hero_trust_text: 'Trusted by 100+ companies and independent startups',
  announcement_badge: 'New',
  announcement_text: 'Iceberg moved to a new office!',
  announcement_link_text: 'Read More',
  announcement_href: '#',
}

export default async function SettingsPage() {
  const rows = await db.select().from(siteSettings)
  const fromDb: Record<string, string> = {}
  for (const row of rows) fromDb[row.key] = row.value

  const initialValues: Record<string, string> = { ...DEFAULTS, ...fromDb }

  return (
    <div className="p-8 max-w-2xl">
      <SettingsForm initialValues={initialValues} />
    </div>
  )
}
