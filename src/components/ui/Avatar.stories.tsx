import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Placeholder: Story = {
  args: {
    alt: "Ahmet",
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar size="sm" alt="S" />
      <Avatar size="md" alt="M" />
      <Avatar size="lg" alt="L" />
    </div>
  ),
};

export const AvatarGroup: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar alt="A" />
      <Avatar alt="B" />
      <Avatar alt="C" />
      <Avatar alt="D" />
    </div>
  ),
};
