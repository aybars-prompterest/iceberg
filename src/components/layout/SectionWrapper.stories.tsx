import type { Meta, StoryObj } from "@storybook/react";
import { SectionWrapper } from "./SectionWrapper";

const meta: Meta<typeof SectionWrapper> = {
  title: "Layout/SectionWrapper",
  component: SectionWrapper,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SectionWrapper>;

export const Default: Story = {
  args: {
    children: (
      <div className="border border-dashed border-border rounded-xl p-8 text-center text-text-secondary">
        Section content goes here (max-w 1200px, centered)
      </div>
    ),
  },
};
