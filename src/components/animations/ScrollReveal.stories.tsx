import type { Meta, StoryObj } from "@storybook/react";
import { ScrollReveal } from "./ScrollReveal";
import { Card } from "../ui/Card";

const meta: Meta<typeof ScrollReveal> = {
  title: "Animations/ScrollReveal",
  component: ScrollReveal,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScrollReveal>;

export const Default: Story = {
  render: () => (
    <div className="space-y-8 py-20">
      <p className="text-text-secondary text-center">Scroll down to see reveal animations</p>
      {(["up", "down", "left", "right"] as const).map((dir) => (
        <ScrollReveal key={dir} direction={dir}>
          <Card>
            <p className="text-text-primary">Reveal from {dir}</p>
          </Card>
        </ScrollReveal>
      ))}
    </div>
  ),
};
