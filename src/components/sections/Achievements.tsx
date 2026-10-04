import { Locale, getAwards, getTraining } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { Award, BookOpen, ExternalLink } from "lucide-react";
import { formatDateRange } from "@/lib/utils";

export function Achievements({ lang }: { lang: Locale }) {
  const awards = getAwards(lang);
  const training = getTraining(lang);

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
                      <div className="flex items-center flex-wrap gap-3">
                        <h4 className="font-bold text-foreground">{award.title}</h4>
                        {award.link && (
                          <a href={award.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-xs font-medium text-accent hover:underline">
                            Penghargaan dari Unand
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </div>
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
                  <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:border-accent/30 hover:shadow-md relative">
                    {item.link ? (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                        <span className="sr-only">View Certificate {item.title}</span>
                      </a>
                    ) : null}
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <h4 className={`font-bold transition-colors ${item.link ? 'text-accent' : 'text-foreground group-hover:text-accent'}`}>
                        {item.title}
                      </h4>
                      {item.link && (
                        <ExternalLink className="h-4 w-4 shrink-0 text-accent transition-colors opacity-80 group-hover:opacity-100" />
                      )}
                    </div>
                    <div className="mb-3 text-sm font-medium text-foreground">{item.provider}</div>
                    <div className="mb-3 text-sm text-muted-foreground flex flex-wrap items-center justify-between gap-2">
                      <span>{formatDateRange(item.startDate, item.endDate)}</span>
                      {item.credentialId && (
                        <span className="rounded-full bg-accent/5 px-2 py-0.5 font-mono text-[10px] text-accent/80 border border-accent/10">
                          ID: {item.credentialId}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                    )}
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
