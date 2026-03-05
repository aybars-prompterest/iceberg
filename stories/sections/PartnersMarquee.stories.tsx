import type { Meta, StoryObj } from "@storybook/nextjs";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";

const meta: Meta<typeof PartnersMarquee> = {
  title: "Sections/PartnersMarquee",
  component: PartnersMarquee,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof PartnersMarquee>;

export const Default: Story = {
  args: {
    partners: [
      { name: "Google", logoUrl: "" },
      { name: "BTM Tekmer", logoUrl: "" },
      { name: "Mobil Sanayi", logoUrl: "" },
      { name: "TechHub", logoUrl: "" },
      { name: "StartupIstanbul", logoUrl: "" },
    ],
  },
};
