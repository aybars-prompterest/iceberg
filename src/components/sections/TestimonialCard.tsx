import { Card } from "../ui/Card";
import { Avatar } from "../ui/Avatar";
import { StarRating } from "../ui/StarRating";
import type { Testimonial } from "@/lib/types";

export function TestimonialCard({ name, title, quote, rating, avatarUrl }: Testimonial) {
  return (
    <Card hover={false} className="min-w-[300px] md:min-w-[350px] flex-shrink-0">
      <div className="flex items-center gap-3 mb-4">
        <Avatar src={avatarUrl} alt={name} size="md" />
        <div>
          <p className="text-text-primary font-medium text-sm">{name}</p>
          <p className="text-text-secondary text-xs">{title}</p>
        </div>
      </div>
      <StarRating rating={rating} />
      <p className="text-text-secondary text-sm leading-relaxed mt-4">
        {quote}
      </p>
    </Card>
  );
}
