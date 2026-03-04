"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/Badge";
import { cn } from "@/lib/cn";

interface AnnouncementBannerProps {
  badge: string;
  text: string;
  linkText: string;
  href: string;
  className?: string;
}

export function AnnouncementBanner({
  badge,
  text,
  linkText,
  href,
  className,
}: AnnouncementBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("mx-auto max-w-[1200px] px-4 md:px-6", className)}
    >
      <a
        href={href}
        className="flex items-center gap-3 flex-wrap justify-center rounded-xl border border-border bg-bg-surface p-4 hover:border-accent/30 transition-colors"
      >
        <Badge variant="accent">{badge}</Badge>
        <span className="text-text-primary text-sm">{text}</span>
        <span className="text-accent text-sm font-medium flex items-center gap-1">
          {linkText} →
        </span>
      </a>
    </motion.div>
  );
}
