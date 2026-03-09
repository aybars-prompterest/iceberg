export const dynamic = 'force-dynamic'

import { db } from "@/db/client";
import { blogPosts } from "@/db/schema";
import { desc } from "drizzle-orm";
import { formatPostDate } from "@/lib/blog-utils";
import { HeroSection } from "@/components/sections/HeroSection";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { ServicesCards } from "@/components/sections/ServicesCards";
import { CTABanner } from "@/components/sections/CTABanner";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { BlogPreview } from "@/components/sections/BlogPreview";

export default async function Home() {
  const recentPosts = await db
    .select()
    .from(blogPosts)
    .orderBy(desc(blogPosts.createdAt))
    .limit(2)

  return (
    <main>
        <HeroSection
          tagline="Next-Gen Technology Studio"
          headlines={["All in One Studio", "Design", "Code", "Scale"]}
          description="We build and launch your product to the global market in weeks."
          primaryCta={{ label: "Explore", href: "#cards" }}
          secondaryCta={{ label: "Get in Touch", href: "/contact" }}
          avatars={[{ alt: "A" }, { alt: "B" }, { alt: "C" }]}
          trustText="Trusted by 100+ companies and independent startups"
        />

        <AnnouncementBanner
          badge="New"
          text="Iceberg moved to a new office!"
          linkText="Read More"
          href="#"
        />

        <ServicesCards
          cards={[
            {
              title: "Services",
              description:
                "End-to-end product design, development, and scaling — all under one roof.",
              href: "/services",
              linkText: "Explore Our Services",
            },
            {
              title: "Portfolio",
              description:
                "From startups to global brands, explore the digital products we've built with our clients.",
              href: "/portfolio",
              linkText: "View Our Projects",
            },
            {
              title: "About Us",
              description:
                "Iceberg is a technology studio that turns ideas into powerful digital products with an expert team.",
              href: "/about",
              linkText: "Meet Our Team",
            },
          ]}
        />

        <CTABanner
          title="Let's Talk First"
          description="Book your free intro call and let's explore how we can bring your idea to life."
          ctaLabel="Schedule a Free Call"
          ctaHref="#"
        />

        <TestimonialsCarousel
          testimonials={[
            {
              name: "Ahmet Yılmaz",
              title: "CTO, TechCorp",
              quote:
                "Since working with the Iceberg team, our projects have been moving much faster.",
              rating: 5,
            },
            {
              name: "Elif Demir",
              title: "Project Coordinator",
              quote:
                "They deliver solutions with a visionary approach that goes beyond technical expertise.",
              rating: 5,
            },
            {
              name: "Burak Kaya",
              title: "Co-Founder, StartupX",
              quote:
                "Their ability to make quick decisions and deliver efficiently keeps us moving forward.",
              rating: 5,
            },
            {
              name: "Ceren Öztürk",
              title: "Founder, DesignHub",
              quote:
                "They truly understand startup dynamics. Our product is growing much stronger.",
              rating: 4,
            },
          ]}
        />

        <FeaturesGrid
          features={[
            {
              icon: <span className="text-accent text-xl">👥</span>,
              title: "End-to-End Product Teams",
              description:
                "We provide full-cycle teams including dev, design, and strategy ready from day one.",
            },
            {
              icon: <span className="text-accent text-xl">🔒</span>,
              title: "Built with Security in Mind",
              description:
                "Security-first architecture at every layer from backend to user data.",
            },
            {
              icon: <span className="text-accent text-xl">🎨</span>,
              title: "Sharp & Scalable Design",
              description:
                "Pixel-perfect interfaces that adapt across platforms, from MVP to enterprise.",
            },
            {
              icon: <span className="text-accent text-xl">📊</span>,
              title: "Smart Project Control",
              description:
                "Manage priorities, track features, and iterate faster with transparent dashboards.",
            },
            {
              icon: <span className="text-accent text-xl">🌍</span>,
              title: "Access Anywhere",
              description:
                "Web or mobile, your product is optimized for global reach from day one.",
            },
            {
              icon: <span className="text-accent text-xl">✨</span>,
              title: "Simple for You, Seamless for Users",
              description:
                "We build intuitive experiences that just work for founders and end-users alike.",
            },
          ]}
        />

        <PartnersMarquee
          partners={[
            { name: "Google", logoUrl: "" },
            { name: "BTM Tekmer", logoUrl: "" },
            { name: "Mobil Sanayi", logoUrl: "" },
            { name: "TechHub", logoUrl: "" },
            { name: "StartupIstanbul", logoUrl: "" },
          ]}
        />

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
