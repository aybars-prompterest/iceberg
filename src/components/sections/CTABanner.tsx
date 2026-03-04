"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { Button } from "../ui/Button";
import { ScrollReveal } from "../animations/ScrollReveal";

interface CTABannerProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CTABanner({
  title = "Let's Talk First",
  description = "Book your free intro call and let's explore how we can bring your idea to life.",
  ctaLabel = "Schedule a Free Call",
  ctaHref = "#",
}: CTABannerProps) {
  return (
    <SectionWrapper>
      <ScrollReveal>
        <div className="rounded-2xl border border-border bg-bg-surface p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-lg">
            <h3 className="text-2xl md:text-3xl font-semibold text-text-primary tracking-tight mb-3">
              {title}
            </h3>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              {description}
            </p>
          </div>
          <Button variant="primary" size="lg">
            {ctaLabel} →
          </Button>
        </div>
      </ScrollReveal>
    </SectionWrapper>
  );
}
