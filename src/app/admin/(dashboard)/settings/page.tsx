export const dynamic = 'force-dynamic'

import { db } from '@/db/client'
import { siteSettings } from '@/db/schema'
import { SettingsForm } from './SettingsForm'

const DEFAULTS: Record<string, string> = {
  hero_tagline: 'Next-Gen Technology Studio',
  hero_headlines: 'All in One Studio,Design,Code,Scale',
  hero_description: 'We build and launch your product to the global market in weeks.',
  hero_trust_text: 'Trusted by 100+ companies and independent startups',
  hero_primary_cta_label: 'Explore',
  hero_primary_cta_href: '#cards',
  hero_secondary_cta_label: 'Get in Touch',
  hero_secondary_cta_href: '/contact',
  announcement_badge: 'New',
  announcement_text: 'Iceberg moved to a new office!',
  announcement_link_text: 'Read More',
  announcement_href: '#',
  cta_banner_title: "Let's Talk First",
  cta_banner_description: "Book your free intro call and let's explore how we can bring your idea to life.",
  cta_banner_label: 'Schedule a Free Call',
  cta_banner_href: '#',
}

export default async function SettingsPage() {
  const rows = await db.select().from(siteSettings)
  const fromDb: Record<string, string> = {}
  for (const row of rows) fromDb[row.key] = row.value

  const initialValues: Record<string, string> = { ...DEFAULTS, ...fromDb }

  return (
    <div className="p-8">
      <SettingsForm initialValues={initialValues} />
    </div>
  )
}
