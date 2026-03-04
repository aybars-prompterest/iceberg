import type { Meta, StoryObj } from "@storybook/react";
import { FeaturesGrid } from "./FeaturesGrid";

const meta: Meta<typeof FeaturesGrid> = {
  title: "Sections/FeaturesGrid",
  component: FeaturesGrid,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof FeaturesGrid>;

export const Default: Story = {
  args: {
    features: [
      {
        icon: <span className="text-accent">👥</span>,
        title: "End-to-End Product Teams",
        description:
          "We provide full-cycle teams including dev, design, and strategy ready from day one.",
      },
      {
        icon: <span className="text-accent">🔒</span>,
        title: "Built with Security in Mind",
        description: "Security-first architecture at every layer from backend to user data.",
      },
      {
        icon: <span className="text-accent">🎨</span>,
        title: "Sharp & Scalable Design",
        description:
          "Pixel-perfect interfaces that adapt across platforms, from MVP to enterprise.",
      },
      {
        icon: <span className="text-accent">📊</span>,
        title: "Smart Project Control",
        description:
          "Manage priorities, track features, and iterate faster with transparent dashboards.",
      },
      {
        icon: <span className="text-accent">🌍</span>,
        title: "Access Anywhere",
        description:
          "Web or mobile, your product is optimized for global reach from day one.",
      },
      {
        icon: <span className="text-accent">✨</span>,
        title: "Simple for You, Seamless for Users",
        description:
          "We build intuitive experiences that just work for founders and end-users alike.",
      },
    ],
  },
};
