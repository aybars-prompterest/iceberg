export const dynamic = 'force-dynamic'

import { db } from "@/db/client";
import { blogPosts, siteSettings } from "@/db/schema";
import { desc } from "drizzle-orm";
import { formatPostDate } from "@/lib/blog-utils";
import { resolveIcon } from "@/lib/icon-map";
import { HeroSection } from "@/components/sections/HeroSection";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { ServicesCards } from "@/components/sections/ServicesCards";
import { CTABanner } from "@/components/sections/CTABanner";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { BlogPreview } from "@/components/sections/BlogPreview";

export default async function Home() {
  const [settingsRows, recentPosts] = await Promise.all([
    db.select().from(siteSettings),
    db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt)).limit(2),
  ])

  const s: Record<string, string> = {}
  for (const row of settingsRows) s[row.key] = row.value

  // Helper with fallback
  const get = (key: string, fallback: string) => s[key] ?? fallback

  // Hero
  const heroTagline = get('hero_tagline', 'Next-Gen Technology Studio')
  const heroHeadlines = get('hero_headlines', 'All in One Studio,Design,Code,Scale')
    .split(',').map(h => h.trim())
  const heroDescription = get('hero_description', 'We build and launch your product to the global market in weeks.')
  const heroTrustText = get('hero_trust_text', 'Trusted by 100+ companies and independent startups')
  const heroPrimaryCtaLabel = get('hero_primary_cta_label', 'Explore')
  const heroPrimaryCtaHref = get('hero_primary_cta_href', '#cards')
  const heroSecondaryCtaLabel = get('hero_secondary_cta_label', 'Get in Touch')
  const heroSecondaryCtaHref = get('hero_secondary_cta_href', '/contact')

  // Announcement
  const announcementBadge = get('announcement_badge', 'New')
  const announcementText = get('announcement_text', 'Iceberg moved to a new office!')
  const announcementLinkText = get('announcement_link_text', 'Read More')
  const announcementHref = get('announcement_href', '#')

  // CTA Banner
  const ctaBannerTitle = get('cta_banner_title', "Let's Talk First")
  const ctaBannerDescription = get('cta_banner_description', "Book your free intro call and let's explore how we can bring your idea to life.")
  const ctaBannerLabel = get('cta_banner_label', 'Schedule a Free Call')
  const ctaBannerHref = get('cta_banner_href', '#')

  // Services Cards
  const servicesCards = [0, 1, 2].map(i => ({
    title: get(`services_card_${i}_title`, ['Services', 'Portfolio', 'About Us'][i]),
    description: get(`services_card_${i}_description`, [
      'End-to-end product design, development, and scaling — all under one roof.',
      "From startups to global brands, explore the digital products we've built with our clients.",
      'Iceberg is a technology studio that turns ideas into powerful digital products with an expert team.',
    ][i]),
    href: get(`services_card_${i}_href`, ['/services', '/portfolio', '/about'][i]),
    linkText: get(`services_card_${i}_link_text`, ['Explore Our Services', 'View Our Projects', 'Meet Our Team'][i]),
  }))

  // Testimonials
  const defaultTestimonials = [
    { name: 'Ahmet Yılmaz', title: 'CTO, TechCorp', quote: 'Since working with the Iceberg team, our projects have been moving much faster.', rating: 5 },
    { name: 'Elif Demir', title: 'Project Coordinator', quote: 'They deliver solutions with a visionary approach that goes beyond technical expertise.', rating: 5 },
    { name: 'Burak Kaya', title: 'Co-Founder, StartupX', quote: 'Their ability to make quick decisions and deliver efficiently keeps us moving forward.', rating: 5 },
    { name: 'Ceren Öztürk', title: 'Founder, DesignHub', quote: 'They truly understand startup dynamics. Our product is growing much stronger.', rating: 4 },
  ]
  const testimonials = [0, 1, 2, 3].map(i => ({
    name: get(`testimonial_${i}_name`, defaultTestimonials[i].name),
    title: get(`testimonial_${i}_title`, defaultTestimonials[i].title),
    quote: get(`testimonial_${i}_quote`, defaultTestimonials[i].quote),
    rating: Number(get(`testimonial_${i}_rating`, String(defaultTestimonials[i].rating))),
  }))

  // Features
  const defaultFeatures = [
    { icon: 'users', title: 'End-to-End Product Teams', description: 'We provide full-cycle teams including dev, design, and strategy ready from day one.' },
    { icon: 'shield', title: 'Built with Security in Mind', description: 'Security-first architecture at every layer from backend to user data.' },
    { icon: 'palette', title: 'Sharp & Scalable Design', description: 'Pixel-perfect interfaces that adapt across platforms, from MVP to enterprise.' },
    { icon: 'chart', title: 'Smart Project Control', description: 'Manage priorities, track features, and iterate faster with transparent dashboards.' },
    { icon: 'globe', title: 'Access Anywhere', description: 'Web or mobile, your product is optimized for global reach from day one.' },
    { icon: 'sparkles', title: 'Simple for You, Seamless for Users', description: 'We build intuitive experiences that just work for founders and end-users alike.' },
  ]
  const features = [0, 1, 2, 3, 4, 5].map(i => ({
    icon: resolveIcon(get(`feature_${i}_icon`, defaultFeatures[i].icon)),
    title: get(`feature_${i}_title`, defaultFeatures[i].title),
    description: get(`feature_${i}_description`, defaultFeatures[i].description),
  }))

  // Partners
  const defaultPartners = ['Google', 'BTM Tekmer', 'Mobil Sanayi', 'TechHub', 'StartupIstanbul']
  const partners = [0, 1, 2, 3, 4].map(i => ({
    name: get(`partner_${i}_name`, defaultPartners[i]),
    logoUrl: get(`partner_${i}_logo_url`, ''),
  }))

  return (
    <main>
        <HeroSection
          tagline={heroTagline}
          headlines={heroHeadlines}
          description={heroDescription}
          primaryCta={{ label: heroPrimaryCtaLabel, href: heroPrimaryCtaHref }}
          secondaryCta={{ label: heroSecondaryCtaLabel, href: heroSecondaryCtaHref }}
          avatars={[{ alt: "A" }, { alt: "B" }, { alt: "C" }]}
          trustText={heroTrustText}
        />

        <AnnouncementBanner
          badge={announcementBadge}
          text={announcementText}
          linkText={announcementLinkText}
          href={announcementHref}
        />

        <ServicesCards cards={servicesCards} />

        <CTABanner
          title={ctaBannerTitle}
          description={ctaBannerDescription}
          ctaLabel={ctaBannerLabel}
          ctaHref={ctaBannerHref}
        />

        <TestimonialsCarousel testimonials={testimonials} />

        <FeaturesGrid features={features} />

        <PartnersMarquee partners={partners} />

        <BlogPreview
          posts={recentPosts.map(post => ({
            title: post.title,
            category: post.category,
            date: formatPostDate(post.createdAt),
            href: `/blog/${post.slug}`,
          }))}
        />
    </main>
  );
}
