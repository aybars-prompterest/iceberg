import { Card } from "../ui/Card";
import type { Feature } from "@/lib/types";

export function FeatureCard({ icon, title, description }: Feature) {
  return (
    <Card className="h-full">
      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h6 className="text-base font-semibold text-text-primary mb-2">
        {title}
      </h6>
      <p className="text-text-secondary text-sm leading-relaxed">
        {description}
      </p>
    </Card>
  );
}
