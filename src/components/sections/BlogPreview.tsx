"use client";

import { SectionWrapper } from "../layout/SectionWrapper";
import { SectionHeading } from "../ui/SectionHeading";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { StaggerChildren, StaggerItem } from "../animations/StaggerChildren";
import type { BlogPost } from "@/lib/types";

interface BlogPreviewProps {
  label?: string;
  title?: string;
  description?: string;
  posts: BlogPost[];
  viewAllHref?: string;
}

export function BlogPreview({
  label = "WeLog",
  title = "Bulteni Kesfedin",
  description = "En son secilmis blog yazilarini kesfedin.",
  posts,
  viewAllHref = "/blog",
}: BlogPreviewProps) {
  return (
    <SectionWrapper>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <SectionHeading
          label={label}
          title={title}
          description={description}
          align="left"
        />
        <a href={viewAllHref}>
          <Button variant="secondary" size="sm">
            Bultene Goz Atin →
          </Button>
        </a>
      </div>

      <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <StaggerItem key={post.title}>
            <a href={post.href}>
              <Card className="overflow-hidden">
                {post.imageUrl && (
                  <div className="h-48 bg-bg-surface rounded-xl mb-4 overflow-hidden">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <Badge variant="accent" className="mb-3">
                  {post.category}
                </Badge>
                <h5 className="text-lg font-semibold text-text-primary mb-3">
                  {post.title}
                </h5>
                <div className="flex items-center justify-between">
                  <span className="text-text-secondary text-xs">
                    {post.date}
                  </span>
                  <span className="text-accent text-sm font-medium">
                    Read more →
                  </span>
                </div>
              </Card>
            </a>
          </StaggerItem>
        ))}
      </StaggerChildren>
    </SectionWrapper>
  );
}
