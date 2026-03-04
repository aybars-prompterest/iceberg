import { cn } from "@/lib/cn";

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = { sm: "w-8 h-8", md: "w-10 h-10", lg: "w-14 h-14" };

export function Avatar({ src, alt = "", size = "md", className }: AvatarProps) {
  return (
    <div className={cn("rounded-full bg-bg-surface border-2 border-border overflow-hidden flex items-center justify-center", sizeMap[size], className)}>
      {src ? <img src={src} alt={alt} className="w-full h-full object-cover" /> : <span className="text-text-secondary text-xs">{alt?.charAt(0) || "?"}</span>}
    </div>
  );
}
