"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { Star } from "lucide-react";
import type { BaseSectionProps, Testimonial } from "@/lib/types";

interface TestimonialsCarouselProps extends BaseSectionProps {
  testimonials: Testimonial[];
}

function TestimonialCard({ name, title, quote, rating, avatarUrl }: Testimonial) {
  return (
    <div className="flex flex-col rounded-xl border border-accent/10 bg-gradient-to-b from-bg-surface to-bg-surface/40 p-5 sm:p-6 max-w-[320px] shrink-0 hover:from-bg-surface hover:to-bg-surface/60 transition-colors duration-300">
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full bg-bg-primary border border-border overflow-hidden flex items-center justify-center shrink-0">
          {avatarUrl ? (
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-text-secondary text-sm font-medium">
              {name.charAt(0)}
            </span>
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary leading-none">{name}</p>
          <p className="text-xs text-text-secondary mt-1">{title}</p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mt-4">
        {Array.from({ length: 5 }, (_, j) => (
          <Star
            key={j}
            size={13}
            className={j < rating ? "text-accent fill-accent" : "text-border"}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-text-secondary leading-relaxed mt-3">&ldquo;{quote}&rdquo;</p>
    </div>
  );
}

export function TestimonialsCarousel({
  title = "Feedback From Our Clients",
  description = "Stories from our clients who experienced change with us.",
  testimonials,
}: TestimonialsCarouselProps) {
  return (
    <SectionWrapper>
      <div className="mx-auto max-w-xl space-y-6 text-center md:space-y-12 relative z-10">
        <h2 className="text-balance text-4xl font-medium text-text-primary lg:text-5xl">{title}</h2>
        <p className="text-text-secondary">{description}</p>
      </div>

      <div className="relative mt-12 overflow-hidden">
        {/* Gradient masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-bg-primary to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-bg-primary to-transparent z-10" />

        <div className="group flex [--gap:1rem] [gap:var(--gap)] [--duration:35s] overflow-hidden p-2">
          <div className="flex shrink-0 [gap:var(--gap)] animate-marquee group-hover:[animation-play-state:paused]">
            {[...Array(4)].map((_, setIndex) =>
              testimonials.map((t, i) => (
                <TestimonialCard key={`${setIndex}-${i}`} {...t} />
              ))
            )}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
