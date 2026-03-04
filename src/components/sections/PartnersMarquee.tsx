"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import type { Partner } from "@/lib/types";

interface PartnersMarqueeProps {
  title?: string;
  description?: string;
  partners: Partner[];
}

export function PartnersMarquee({
  title = "Partnerlerimiz",
  description = "Dijital cozumler yaratma yolculugumuzda onde gelen markalar ve ortaklar tarafindan tavsiye ediliyoruz.",
  partners,
}: PartnersMarqueeProps) {
  return (
    <SectionWrapper>
      <SectionHeading title={title} description={description} />

      <div className="mt-12 relative overflow-hidden group">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />

        <div className="flex gap-12 animate-marquee group-hover:[animation-play-state:paused]">
          {/* Duplicate for seamless loop */}
          {[...partners, ...partners].map((p, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center h-12 px-6 opacity-50 hover:opacity-100 transition-opacity"
            >
              {p.logoUrl ? (
                <img src={p.logoUrl} alt={p.name} className="h-8 w-auto object-contain" />
              ) : (
                <span className="text-text-secondary font-semibold text-lg whitespace-nowrap">
                  {p.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
