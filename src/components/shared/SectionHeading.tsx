import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: ReactNode;
  className?: string;
}

export function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 md:mb-16", className)}>
      <h2 className="text-heading mb-4 text-foreground">{title}</h2>
      {subtitle && (
        <p className="text-subheading text-muted-foreground max-w-3xl">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-1 w-20 rounded-full bg-accent" />
    </div>
  );
}
