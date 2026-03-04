"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-accent text-bg-primary hover:bg-accent-hover shadow-[0_0_20px_rgba(64,197,255,0.3)] hover:shadow-[0_0_30px_rgba(64,197,255,0.5)]",
  secondary: "bg-bg-surface text-text-primary border border-border hover:border-accent/50",
  ghost: "bg-transparent text-text-primary hover:bg-bg-surface",
  icon: "bg-bg-surface text-text-primary border border-border hover:border-accent/50 !p-2",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className, children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...(props as any)}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
