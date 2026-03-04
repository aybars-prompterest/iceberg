"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { StarRating } from "../ui/StarRating";
import { ScrollReveal } from "../animations/ScrollReveal";
import type { Testimonial } from "@/lib/types";

interface TestimonialsCarouselProps {
  label?: string;
  title?: string;
  description?: string;
  testimonials: Testimonial[];
}

export function TestimonialsCarousel({
  label = "WeReviews",
  title = "Musterilerimizden Gelen Geri Bildirimler",
  description = "Degisimi bizimle deneyimleyen musterilerimizin hikayeleri.",
  testimonials,
}: TestimonialsCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <SectionWrapper>
      <ScrollReveal>
        <SectionHeading label={label} title={title} description={description} />
      </ScrollReveal>

      <div className="mt-12 overflow-hidden">
        <motion.div
          ref={scrollRef}
          className="flex gap-6 cursor-grab"
          drag="x"
          dragConstraints={scrollRef}
          whileTap={{ cursor: "grabbing" }}
        >
          {testimonials.map((t, i) => (
            <Card
              key={i}
              hover={false}
              className="min-w-[300px] md:min-w-[350px] flex-shrink-0"
            >
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={t.avatarUrl} alt={t.name} size="md" />
                <div>
                  <p className="text-text-primary font-medium text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.title}</p>
                </div>
              </div>
              <StarRating rating={t.rating} />
              <p className="text-text-secondary text-sm leading-relaxed mt-4">{t.quote}</p>
            </Card>
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
