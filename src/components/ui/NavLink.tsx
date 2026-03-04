"use client";

import { cn } from "@/lib/cn";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  className?: string;
}

export function NavLink({ href, children, active, className }: NavLinkProps) {
  return (
    <a href={href} className={cn("relative text-sm font-medium text-text-secondary hover:text-text-primary transition-colors group", active && "text-text-primary", className)}>
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
    </a>
  );
}
