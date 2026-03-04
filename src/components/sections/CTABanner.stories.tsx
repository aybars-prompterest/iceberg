import type { Meta, StoryObj } from "@storybook/nextjs";
import { CTABanner } from "./CTABanner";

const meta: Meta<typeof CTABanner> = {
  title: "Sections/CTABanner",
  component: CTABanner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof CTABanner>;

export const Default: Story = {};
