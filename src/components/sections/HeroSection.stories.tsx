import type { Meta, StoryObj } from "@storybook/react";
import { HeroSection } from "./HeroSection";

const meta: Meta<typeof HeroSection> = {
  title: "Sections/HeroSection",
  component: HeroSection,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof HeroSection>;

export const Default: Story = {
  args: {
    tagline: "Yeni Nesil Teknoloji Studyosu",
    headlines: ["All in One Studio", "Design", "Code", "Scale"],
    description: "Projenizi haftalar icinde gelistirip kuresel pazara tasiriz.",
    primaryCta: { label: "Kesfet", href: "#" },
    secondaryCta: { label: "Iletisime Gec", href: "#" },
    avatars: [
      { alt: "Ahmet" },
      { alt: "Burak" },
      { alt: "Ceren" },
    ],
    trustText: "100'den fazla kurumsal ve bagimsiz girisimin tercihi",
  },
};

export const Minimal: Story = {
  args: {
    headlines: ["Iceberg Studio"],
    description: "Teknoloji, icerik ve yazilim dunyasinda yeni nesil cozumler.",
    primaryCta: { label: "Baslayalim", href: "#" },
    secondaryCta: { label: "Hakkimizda", href: "#" },
  },
};
