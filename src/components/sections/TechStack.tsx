import { getSkills } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { SkillBadge } from "@/components/shared/SkillBadge";

export function TechStack() {
  const skills = getSkills();

  return (
    <section id={SECTIONS.skills} className="section-padding content-container">
      <AnimateOnScroll>
        <SectionHeading title="Tech Stack & Skills" />
      </AnimateOnScroll>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group, idx) => (
          <AnimateOnScroll key={group.name} delay={idx * 0.1}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-foreground border-b border-border pb-2">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillBadge key={skill} label={skill} />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
