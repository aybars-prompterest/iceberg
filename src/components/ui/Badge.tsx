import { cn } from "@/lib/cn";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
      variant === "default" && "bg-bg-surface text-text-secondary border border-border",
      variant === "accent" && "bg-accent/10 text-accent border border-accent/20",
      className
    )}>
      {children}
    </span>
  );
}
