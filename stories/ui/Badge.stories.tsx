import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from "@/components/ui/Badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = { args: { children: "WeDo" } };
export const Accent: Story = { args: { children: "Yeni", variant: "accent" } };
