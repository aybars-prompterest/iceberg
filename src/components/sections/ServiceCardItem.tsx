import { Card } from "../ui/Card";
import type { ServiceCard } from "@/lib/types";

export function ServiceCardItem({ title, description, href, linkText }: ServiceCard) {
  return (
    <a href={href}>
      <Card className="h-full flex flex-col justify-between min-h-[200px]">
        <div>
          <h6 className="text-lg font-semibold text-text-primary mb-2">
            {title}
          </h6>
          <p className="text-text-secondary text-sm leading-relaxed">
            {description}
          </p>
        </div>
        <span className="text-accent text-sm font-medium mt-4 flex items-center gap-1">
          {linkText} →
        </span>
      </Card>
    </a>
  );
}
