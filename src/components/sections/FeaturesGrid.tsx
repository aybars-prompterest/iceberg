"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import type { BaseSectionProps, Feature } from "@/lib/types";

interface FeaturesGridProps extends BaseSectionProps {
  features: Feature[];
}

export function FeaturesGrid({
  title = "Capture the Future with Your Website",
  description = "Commence our voyage to craft seamlessly complex web platforms.",
  features,
}: FeaturesGridProps) {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12 relative z-10">
        <h2 className="text-balance text-4xl font-medium text-text-primary lg:text-5xl">{title}</h2>
        <p className="text-text-secondary">{description}</p>
      </div>

      <StaggerChildren className="relative mt-12 grid divide-x divide-y divide-accent/20 border border-accent/20 rounded-2xl overflow-hidden sm:grid-cols-2 lg:grid-cols-3 *:p-10 *:md:p-12">
        {features.map((f, i) => (
          <StaggerItem key={i}>
            <div className="space-y-3 group">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/10 text-accent">
                  {f.icon}
                </div>
                <h3 className="text-sm font-semibold text-text-primary">{f.title}</h3>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed">{f.description}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
