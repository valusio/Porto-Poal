import { Locale, getExperiences } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { TimelineItem } from "@/components/shared/TimelineItem";

export function Experience({ lang }: { lang: Locale }) {
  const experiences = getExperiences(lang);

  return (
    <section id={SECTIONS.experience} className="section-padding bg-muted/30">
      <div className="content-container">
        <AnimateOnScroll>
          <SectionHeading title="Professional Experience" />
        </AnimateOnScroll>

        <div className="relative mt-8 md:mt-12">
          {/* Main vertical line for desktop */}
          <div className="hidden md:absolute md:left-[200px] md:top-6 md:bottom-6 md:block md:w-px md:bg-border lg:left-[240px]" />

          <div className="flex flex-col gap-8 md:gap-12">
            {experiences.map((exp, idx) => (
              <AnimateOnScroll key={exp.id} delay={idx * 0.1}>
                <TimelineItem experience={exp} />
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
