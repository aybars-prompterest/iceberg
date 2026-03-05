import type { Meta, StoryObj } from "@storybook/nextjs";
import { HoverScale } from "@/components/animations/HoverScale";
import { Card } from "@/components/ui/Card";

const meta: Meta<typeof HoverScale> = {
  title: "Animations/HoverScale",
  component: HoverScale,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof HoverScale>;

export const Default: Story = {
  render: () => (
    <HoverScale>
      <Card hover={false}>
        <p className="text-text-primary">Hover me to scale</p>
      </Card>
    </HoverScale>
  ),
};
