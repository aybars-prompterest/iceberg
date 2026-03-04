import { cn } from "@/lib/cn";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "main";
  id?: string;
}

export function SectionWrapper({
  children,
  className,
  as: Tag = "section",
  id,
}: SectionWrapperProps) {
  return (
    <Tag id={id} className={cn("w-full py-16 md:py-20", className)}>
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">{children}</div>
    </Tag>
  );
}
