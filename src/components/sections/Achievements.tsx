import { getAwards, getTraining } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { Award, BookOpen } from "lucide-react";
import { formatDateRange } from "@/lib/utils";

export function Achievements() {
  const awards = getAwards();
  const training = getTraining();

  return (
    <section id={SECTIONS.achievements} className="section-padding bg-muted/30">
      <div className="content-container">
        <AnimateOnScroll>
          <SectionHeading title="Achievements & Leadership" />
        </AnimateOnScroll>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Awards & Leadership */}
          <div>
            <AnimateOnScroll>
              <h3 className="mb-6 flex items-center text-xl font-bold text-foreground">
                <MedallionIcon className="mr-3 h-6 w-6 text-accent" />
                Honors & Leadership
              </h3>
            </AnimateOnScroll>
            <div className="space-y-6">
              {awards.map((award, idx) => (
                <AnimateOnScroll key={award.id} delay={idx * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-bold text-foreground">{award.title}</h4>
                      <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-medium text-accent">
                        {award.year}
                      </span>
                    </div>
                    <div className="mb-3 text-sm font-medium text-foreground">
                      {award.event}
                      {award.location && ` • ${award.location}`}
                    </div>
                    <p className="text-sm text-muted-foreground">{award.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Training */}
          <div>
            <AnimateOnScroll>
              <h3 className="mb-6 flex items-center text-xl font-bold text-foreground">
                <BookOpen className="mr-3 h-6 w-6 text-accent" />
                Professional Training
              </h3>
            </AnimateOnScroll>
            <div className="space-y-6">
              {training.map((item, idx) => (
                <AnimateOnScroll key={idx} delay={idx * 0.1}>
                  <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                    <h4 className="mb-2 font-bold text-foreground">{item.title}</h4>
                    <div className="mb-3 text-sm font-medium text-foreground">{item.provider}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDateRange(item.startDate, item.endDate)}
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MedallionIcon({ className }: { className?: string }) {
  return <Award className={className} />;
}
