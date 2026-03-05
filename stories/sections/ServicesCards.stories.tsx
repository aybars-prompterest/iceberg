import type { Meta, StoryObj } from "@storybook/nextjs";
import { ServicesCards } from "@/components/sections/ServicesCards";

const meta: Meta<typeof ServicesCards> = {
  title: "Sections/ServicesCards",
  component: ServicesCards,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof ServicesCards>;

export const Default: Story = {
  args: {
    cards: [
      {
        title: "Hizmetlerimiz",
        description:
          "Uctan uca urun tasarimi, gelistirme ve olceklendirme hepsi tek cati altinda.",
        href: "/services",
        linkText: "Hizmetlerimize Goz At",
      },
      {
        title: "Portfolyo",
        description:
          "Girisimlerden kuresel markalara, musterilerimizle birlikte gelistirdigimiz dijital urunleri kesfedin.",
        href: "/portfolio",
        linkText: "Projelerimizi Incele",
      },
      {
        title: "Hakkimizda",
        description:
          "Iceberg, uzman ekibiyle fikirleri guclu dijital urunlere donusturen bir teknoloji studyosudur.",
        href: "/about",
        linkText: "Ekibimizle Tanis",
      },
    ],
  },
};
