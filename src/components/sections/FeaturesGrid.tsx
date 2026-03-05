"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import { FeatureCard } from "./FeatureCard";
import type { BaseSectionProps, Feature } from "@/lib/types";

interface FeaturesGridProps extends BaseSectionProps {
  features: Feature[];
}

export function FeaturesGrid({
  label = "Advanced Features",
  title = "Capture the Future with Your Website",
  description = "Commence our voyage to craft seamlessly complex web platforms.",
  features,
}: FeaturesGridProps) {
  return (
    <SectionWrapper>
      <SectionHeading label={label} title={title} description={description} />

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {features.map((f, i) => (
          <StaggerItem key={i}>
            <FeatureCard {...f} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
