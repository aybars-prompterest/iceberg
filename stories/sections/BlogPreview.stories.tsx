import type { Meta, StoryObj } from "@storybook/nextjs";
import { BlogPreview } from "@/components/sections/BlogPreview";

const meta: Meta<typeof BlogPreview> = {
  title: "Sections/BlogPreview",
  component: BlogPreview,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof BlogPreview>;

export const Default: Story = {
  args: {
    posts: [
      {
        title: "Iceberg Yeni Ofisinde!",
        category: "Announcement",
        date: "5 Subat 2026",
        href: "#",
      },
      {
        title:
          "Iceberg Girisimlerinden Mobil Sanayi, Take Off Istanbul'da Sahne Aldi",
        category: "Announcement",
        date: "19 Aralik 2025",
        href: "#",
      },
    ],
  },
};
