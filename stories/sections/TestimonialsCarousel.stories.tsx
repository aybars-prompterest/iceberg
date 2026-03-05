import type { Meta, StoryObj } from "@storybook/nextjs";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";

const meta: Meta<typeof TestimonialsCarousel> = {
  title: "Sections/TestimonialsCarousel",
  component: TestimonialsCarousel,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof TestimonialsCarousel>;

export const Default: Story = {
  args: {
    testimonials: [
      {
        name: "Ahmet Yilmaz",
        title: "CTO, TechCorp",
        quote:
          "Iceberg ekibi ile calistigimizdan beri projelerimiz cok daha hizli ilerlemeye basladi. Hem vizyonlari hem de kusursuz icraatlari onlari rakiplerinden ayiriyor.",
        rating: 5,
      },
      {
        name: "Elif Demir",
        title: "Proje Koordinatoru",
        quote:
          "Teknik bilgiyi asan vizyoner bir yaklasimla cozumler uretiyor. Genc yeteneklerin bu capta projelerle sergiledigi girisimcilik ruhu bizler icin buyuk bir gurur kaynagi.",
        rating: 5,
      },
      {
        name: "Burak Kaya",
        title: "Co-Founder, StartupX",
        quote:
          "Hizli karar alma ve verimli teslimat yetenekleri bizi surekli destekliyor. Birlikte surecleri cok daha etkili ve saglam bir sekilde ilerlettik.",
        rating: 5,
      },
      {
        name: "Ceren Ozturk",
        title: "Founder, DesignHub",
        quote:
          "Startup dinamiklerini cok iyi anliyorlar. Hem urunumuz hem operasyonlarimiz cok daha saglam ve verimli bir sekilde buyuyor.",
        rating: 4,
      },
    ],
  },
};
