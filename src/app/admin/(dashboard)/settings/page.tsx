export const dynamic = 'force-dynamic'

import { db } from '@/db/client'
import { siteSettings } from '@/db/schema'
import { SettingsForm } from './SettingsForm'

const DEFAULTS: Record<string, string> = {
  // Hero
  hero_tagline: 'Next-Gen Technology Studio',
  hero_headlines: 'All in One Studio,Design,Code,Scale',
  hero_description: 'We build and launch your product to the global market in weeks.',
  hero_trust_text: 'Trusted by 100+ companies and independent startups',
  hero_primary_cta_label: 'Explore',
  hero_primary_cta_href: '#cards',
  hero_secondary_cta_label: 'Get in Touch',
  hero_secondary_cta_href: '/contact',
  // Announcement
  announcement_badge: 'New',
  announcement_text: 'Iceberg moved to a new office!',
  announcement_link_text: 'Read More',
  announcement_href: '#',
  // CTA Banner
  cta_banner_title: "Let's Talk First",
  cta_banner_description: "Book your free intro call and let's explore how we can bring your idea to life.",
  cta_banner_label: 'Schedule a Free Call',
  cta_banner_href: '#',
  // Services Cards
  services_card_0_title: 'Services',
  services_card_0_description: 'End-to-end product design, development, and scaling — all under one roof.',
  services_card_0_href: '/services',
  services_card_0_link_text: 'Explore Our Services',
  services_card_1_title: 'Portfolio',
  services_card_1_description: 'From startups to global brands, explore the digital products we\'ve built with our clients.',
  services_card_1_href: '/portfolio',
  services_card_1_link_text: 'View Our Projects',
  services_card_2_title: 'About Us',
  services_card_2_description: 'Iceberg is a technology studio that turns ideas into powerful digital products with an expert team.',
  services_card_2_href: '/about',
  services_card_2_link_text: 'Meet Our Team',
  // Testimonials
  testimonial_0_name: 'Ahmet Yılmaz',
  testimonial_0_title: 'CTO, TechCorp',
  testimonial_0_quote: 'Since working with the Iceberg team, our projects have been moving much faster.',
  testimonial_0_rating: '5',
  testimonial_1_name: 'Elif Demir',
  testimonial_1_title: 'Project Coordinator',
  testimonial_1_quote: 'They deliver solutions with a visionary approach that goes beyond technical expertise.',
  testimonial_1_rating: '5',
  testimonial_2_name: 'Burak Kaya',
  testimonial_2_title: 'Co-Founder, StartupX',
  testimonial_2_quote: 'Their ability to make quick decisions and deliver efficiently keeps us moving forward.',
  testimonial_2_rating: '5',
  testimonial_3_name: 'Ceren Öztürk',
  testimonial_3_title: 'Founder, DesignHub',
  testimonial_3_quote: 'They truly understand startup dynamics. Our product is growing much stronger.',
  testimonial_3_rating: '4',
  // Features
  feature_0_icon: 'users',
  feature_0_title: 'End-to-End Product Teams',
  feature_0_description: 'We provide full-cycle teams including dev, design, and strategy ready from day one.',
  feature_1_icon: 'shield',
  feature_1_title: 'Built with Security in Mind',
  feature_1_description: 'Security-first architecture at every layer from backend to user data.',
  feature_2_icon: 'palette',
  feature_2_title: 'Sharp & Scalable Design',
  feature_2_description: 'Pixel-perfect interfaces that adapt across platforms, from MVP to enterprise.',
  feature_3_icon: 'chart',
  feature_3_title: 'Smart Project Control',
  feature_3_description: 'Manage priorities, track features, and iterate faster with transparent dashboards.',
  feature_4_icon: 'globe',
  feature_4_title: 'Access Anywhere',
  feature_4_description: 'Web or mobile, your product is optimized for global reach from day one.',
  feature_5_icon: 'sparkles',
  feature_5_title: 'Simple for You, Seamless for Users',
  feature_5_description: 'We build intuitive experiences that just work for founders and end-users alike.',
  // Partners
  partner_0_name: 'Google',
  partner_0_logo_url: '',
  partner_1_name: 'BTM Tekmer',
  partner_1_logo_url: '',
  partner_2_name: 'Mobil Sanayi',
  partner_2_logo_url: '',
  partner_3_name: 'TechHub',
  partner_3_logo_url: '',
  partner_4_name: 'StartupIstanbul',
  partner_4_logo_url: '',
  // Bot
  bot_subreddits: 'technology,programming,artificial,MachineLearning,webdev',
  bot_min_upvotes: '500',
  bot_model: 'Qwen/Qwen2.5-7B-Instruct',
}

export default async function SettingsPage() {
  const rows = await db.select().from(siteSettings)
  const fromDb: Record<string, string> = {}
  for (const row of rows) fromDb[row.key] = row.value

  const initialValues: Record<string, string> = { ...DEFAULTS, ...fromDb }

  return <SettingsForm initialValues={initialValues} />
}
