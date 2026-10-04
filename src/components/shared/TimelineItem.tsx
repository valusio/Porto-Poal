import { formatDateRange } from "@/lib/utils";
import type { Experience } from "@/lib/schemas";
import { ChevronRight } from "lucide-react";
import { getProofByIds } from "@/lib/data";
import { ProofGallery } from "../proof/ProofGallery";
interface TimelineItemProps {
  experience: Experience;
}

export function TimelineItem({ experience }: TimelineItemProps) {
  const proofs = experience.proofIds?.length > 0 ? getProofByIds(experience.proofIds) : [];

  return (
    <div className="relative pl-8 md:pl-0">
      {/* Timeline line - hidden on desktop, left edge on mobile */}
      <div className="absolute left-[11px] top-2 h-full w-px bg-border md:hidden" />
      
      <div className="md:grid md:grid-cols-[200px_1fr] md:gap-8 lg:grid-cols-[240px_1fr]">
        {/* Date / Company side */}
        <div className="relative mb-4 md:mb-0 md:text-right">
          {/* Timeline node - mobile only */}
          <div className="absolute -left-8 top-1.5 h-6 w-6 rounded-full border-4 border-background bg-accent md:hidden" />
          
          <div className="text-sm font-medium text-accent">
            {formatDateRange(experience.startDate, experience.endDate)}
          </div>
          <div className="mt-1 text-sm font-semibold text-foreground md:mt-2">
            {experience.organization}
          </div>
        </div>

        {/* Content side */}
        <div className="relative rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent/30">
          {/* Timeline node - desktop only */}
          <div className="hidden md:absolute md:-left-[25px] md:top-6 md:block md:h-4 md:w-4 md:rounded-full md:border-2 md:border-background md:bg-accent md:ring-1 md:ring-border" />
          
          <h3 className="mb-2 text-xl font-bold text-foreground">{experience.role}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{experience.description}</p>
          
          <ul className="mb-4 space-y-2">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex text-sm text-muted-foreground">
                <ChevronRight className="mr-2 h-4 w-4 shrink-0 text-accent" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
          
          {proofs.length > 0 && (
            <div className="mt-6">
              <h4 className="mb-3 text-sm font-semibold text-foreground">Featured Proofs & Media</h4>
              <ProofGallery items={proofs} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
