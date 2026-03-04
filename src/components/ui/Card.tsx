"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = true }: CardProps) {
  const Comp = hover ? motion.div : "div";
  const hoverProps = hover ? { whileHover: { scale: 1.02, borderColor: "rgba(64,197,255,0.3)" }, transition: { duration: 0.2 } } : {};

  return (
    <Comp
      className={cn(
        "rounded-2xl border border-border bg-bg-surface p-6 transition-shadow",
        hover && "cursor-pointer hover:shadow-[0_0_30px_rgba(64,197,255,0.08)]",
        className
      )}
      {...hoverProps}
    >
      {children}
    </Comp>
  );
}
