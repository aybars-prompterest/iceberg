import type { Meta, StoryObj } from "@storybook/react";
import { AnnouncementBanner } from "./AnnouncementBanner";

const meta: Meta<typeof AnnouncementBanner> = {
  title: "Sections/AnnouncementBanner",
  component: AnnouncementBanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AnnouncementBanner>;

export const Default: Story = {
  args: {
    badge: "Yeni",
    text: "Iceberg yeni ofisine tasindi!",
    linkText: "Devamini Oku",
    href: "#",
  },
};
