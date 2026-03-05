import type { Meta, StoryObj } from "@storybook/nextjs";
import { StarRating } from "@/components/ui/StarRating";

const meta: Meta<typeof StarRating> = {
  title: "UI/StarRating",
  component: StarRating,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof StarRating>;

export const FiveStars: Story = { args: { rating: 5 } };
export const FourStars: Story = { args: { rating: 4 } };
export const ThreeStars: Story = { args: { rating: 3 } };
