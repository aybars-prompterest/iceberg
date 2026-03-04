"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import type { ServiceCard } from "@/lib/types";

interface ServicesCardsProps {
  label?: string;
  title?: string;
  description?: string;
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
            <a href={card.href}>
              <Card className="h-full flex flex-col justify-between min-h-[200px]">
                <div>
                  <h6 className="text-lg font-semibold text-text-primary mb-2">
                    {card.title}
                  </h6>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <span className="text-accent text-sm font-medium mt-4 flex items-center gap-1">
                  {card.linkText} →
                </span>
              </Card>
            </a>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
