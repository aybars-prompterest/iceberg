import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AnnouncementBanner } from "@/components/sections/AnnouncementBanner";
import { ServicesCards } from "@/components/sections/ServicesCards";
import { CTABanner } from "@/components/sections/CTABanner";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { FeaturesGrid } from "@/components/sections/FeaturesGrid";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { BlogPreview } from "@/components/sections/BlogPreview";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection
          tagline="Yeni Nesil Teknoloji Stüdyosu"
          headlines={["All in One Studio", "Design", "Code", "Scale"]}
          description="Projenizi haftalar içinde geliştirip küresel pazara taşırız."
          primaryCta={{ label: "Keşfet", href: "#cards" }}
          secondaryCta={{ label: "İletişime Geç", href: "/contact" }}
          avatars={[{ alt: "A" }, { alt: "B" }, { alt: "C" }]}
          trustText="100'den fazla kurumsal ve bağımsız girişimin tercihi"
        />

        <AnnouncementBanner
          badge="Yeni"
          text="Iceberg yeni ofisine taşındı!"
          linkText="Devamını Oku"
          href="#"
        />

        <ServicesCards
          cards={[
            {
              title: "Hizmetlerimiz",
              description:
                "Uçtan uca ürün tasarımı, geliştirme ve ölçeklendirme hepsi tek çatı altında.",
              href: "/services",
              linkText: "Hizmetlerimize Göz At",
            },
            {
              title: "Portfolyo",
              description:
                "Girişimlerden küresel markalara, müşterilerimizle birlikte geliştirdiğimiz dijital ürünleri keşfedin.",
              href: "/portfolio",
              linkText: "Projelerimizi İncele",
            },
            {
              title: "Hakkımızda",
              description:
                "Iceberg, uzman ekibiyle fikirleri güçlü dijital ürünlere dönüştüren bir teknoloji stüdyosudur.",
              href: "/about",
              linkText: "Ekibimizle Tanış",
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
                "Iceberg ekibi ile çalıştığımızdan beri projelerimiz çok daha hızlı ilerlemeye başladı.",
              rating: 5,
            },
            {
              name: "Elif Demir",
              title: "Proje Koordinatörü",
              quote:
                "Teknik bilgiyi aşan vizyoner bir yaklaşımla çözümler üretiyor.",
              rating: 5,
            },
            {
              name: "Burak Kaya",
              title: "Co-Founder, StartupX",
              quote:
                "Hızlı karar alma ve verimli teslimat yetenekleri bizi sürekli destekliyor.",
              rating: 5,
            },
            {
              name: "Ceren Öztürk",
              title: "Founder, DesignHub",
              quote:
                "Startup dinamiklerini çok iyi anlıyorlar. Ürünümüz çok daha sağlam büyüyor.",
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
          posts={[
            {
              title: "Iceberg Yeni Ofisinde!",
              category: "Announcement",
              date: "5 Şubat 2026",
              href: "#",
            },
            {
              title:
                "Iceberg Girişimlerinden Mobil Sanayi, Take Off İstanbul'da Sahne Aldı",
              category: "Announcement",
              date: "19 Aralık 2025",
              href: "#",
            },
          ]}
        />
      </main>
      <Footer />
    </>
  );
}
