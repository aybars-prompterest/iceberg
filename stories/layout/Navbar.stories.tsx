import type { Meta, StoryObj } from "@storybook/nextjs";
import { Navbar } from "@/components/layout/Navbar";

const meta: Meta<typeof Navbar> = {
  title: "Layout/Navbar",
  component: Navbar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Navbar>;

export const Default: Story = {
  render: () => (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <div className="pt-20 p-6">
        <p className="text-text-secondary">Page content below navbar</p>
      </div>
    </div>
  ),
};
