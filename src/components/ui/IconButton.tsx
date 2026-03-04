"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function IconButton({ children, className, ...props }: IconButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={cn("w-10 h-10 rounded-full bg-bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent/50 transition-colors cursor-pointer", className)}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
