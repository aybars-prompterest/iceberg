"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import { ServiceCardItem } from "./ServiceCardItem";
import type { BaseSectionProps, ServiceCard } from "@/lib/types";

interface ServicesCardsProps extends BaseSectionProps {
  cards: ServiceCard[];
}

export function ServicesCards({
  label = "WeDo",
  title = "Ekibimizi, hikayemizi ve yaptigimiz isleri taniyin",
  description = "Her projemizde nasil deger yarattigimizi ve ekibimizin rolunu kesfedin.",
  cards,
}: ServicesCardsProps) {
  return (
    <SectionWrapper id="cards">
      <SectionHeading label={label} title={title} description={description} />

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {cards.map((card) => (
          <StaggerItem key={card.title}>
            <ServiceCardItem {...card} />
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
