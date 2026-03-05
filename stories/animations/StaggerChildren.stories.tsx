import type { Meta, StoryObj } from "@storybook/nextjs";
import { StaggerChildren, StaggerItem } from "@/components/animations/StaggerChildren";
import { Card } from "@/components/ui/Card";

const meta: Meta<typeof StaggerChildren> = {
  title: "Animations/StaggerChildren",
  component: StaggerChildren,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StaggerChildren>;

export const Default: Story = {
  render: () => (
    <StaggerChildren className="grid grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <StaggerItem key={i}>
          <Card>
            <p className="text-text-primary">Card {i}</p>
          </Card>
        </StaggerItem>
      ))}
    </StaggerChildren>
  ),
};
