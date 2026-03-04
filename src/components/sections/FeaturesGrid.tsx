"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import type { Feature } from "@/lib/types";

interface FeaturesGridProps {
  label?: string;
  title?: string;
  description?: string;
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
            <Card className="h-full">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                {f.icon}
              </div>
              <h6 className="text-base font-semibold text-text-primary mb-2">{f.title}</h6>
              <p className="text-text-secondary text-sm leading-relaxed">{f.description}</p>
            </Card>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
