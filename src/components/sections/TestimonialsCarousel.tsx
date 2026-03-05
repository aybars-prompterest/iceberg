"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { ScrollReveal } from "../animations/ScrollReveal";
import { TestimonialCard } from "./TestimonialCard";
import type { BaseSectionProps, Testimonial } from "@/lib/types";

interface TestimonialsCarouselProps extends BaseSectionProps {
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
            <TestimonialCard key={i} {...t} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
