"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Avatar } from "../ui/Avatar";
import { SectionWrapper } from "../layout/SectionWrapper";

interface HeroSectionProps {
  tagline?: string;
  headlines?: string[];
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  avatars?: { alt: string; src?: string }[];
  trustText?: string;
}

export function HeroSection({
  tagline = "Yeni Nesil Teknoloji Studyosu",
  headlines = ["All in One Studio", "Design", "Code", "Scale"],
  description = "Projenizi haftalar icinde gelistirip kuresel pazara tasiriz.",
  primaryCta = { label: "Kesfet", href: "#cards" },
  secondaryCta = { label: "Iletisime Gec", href: "/contact" },
  avatars = [],
  trustText = "100'den fazla kurumsal ve bagimsiz girisimin tercihi",
}: HeroSectionProps) {
  return (
    <SectionWrapper className="pt-32 md:pt-40 pb-16 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-accent/5 via-transparent to-transparent pointer-events-none" />

      <div className="relative text-center max-w-4xl mx-auto">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-text-secondary text-sm mb-6"
        >
          {tagline}
        </motion.p>

        {/* Headlines */}
        <div className="mb-6">
          {headlines.map((line, i) => (
            <motion.h1
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * i }}
              className={`text-4xl md:text-6xl font-bold tracking-[-0.04em] ${
                i > 0 ? "text-accent" : "text-text-primary"
              }`}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-secondary text-base md:text-lg mb-8 max-w-xl mx-auto"
        >
          {description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center gap-4 mb-10"
        >
          <Button variant="primary">{primaryCta.label} →</Button>
          <Button variant="secondary">{secondaryCta.label} →</Button>
        </motion.div>

        {/* Avatar group + trust text */}
        {avatars.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex -space-x-2">
              {avatars.map((avatar, i) => (
                <Avatar
                  key={i}
                  src={avatar.src}
                  alt={avatar.alt}
                  size="md"
                  className="ring-2 ring-bg-primary"
                />
              ))}
            </div>
            {trustText && (
              <p className="text-text-secondary text-sm">{trustText}</p>
            )}
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
}
