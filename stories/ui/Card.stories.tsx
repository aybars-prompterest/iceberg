import type { Meta, StoryObj } from "@storybook/nextjs";
import { Card } from "@/components/ui/Card";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-text-primary font-semibold mb-2">Kart Basligi</h3>
        <p className="text-text-secondary text-sm">Bu bir ornek kart icerigidir.</p>
      </div>
    ),
  },
};

export const NoHover: Story = {
  args: {
    hover: false,
    children: (
      <div>
        <h3 className="text-text-primary font-semibold mb-2">Statik Kart</h3>
        <p className="text-text-secondary text-sm">Bu kart hover efektine sahip degildir.</p>
      </div>
    ),
  },
};

export const FeatureCard: Story = {
  args: {
    children: (
      <div className="space-y-3">
        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <h3 className="text-text-primary font-semibold">Web Gelistirme</h3>
        <p className="text-text-secondary text-sm">Modern ve performansli web uygulamalari gelistiriyoruz.</p>
      </div>
    ),
  },
};
