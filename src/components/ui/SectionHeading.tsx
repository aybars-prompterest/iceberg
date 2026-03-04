import { Badge } from "./Badge";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({ label, title, description, align = "center", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {label && <Badge variant="accent" className="mb-4">{label}</Badge>}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-text-primary mb-4">{title}</h2>
      {description && <p className="text-text-secondary text-base md:text-lg leading-relaxed">{description}</p>}
    </div>
  );
}
