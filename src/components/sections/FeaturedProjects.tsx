import { getFeaturedProjects } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { ProjectCard } from "@/components/shared/ProjectCard";

export function FeaturedProjects() {
  const projects = getFeaturedProjects();

  return (
    <section id={SECTIONS.projects} className="section-padding content-container">
      <AnimateOnScroll>
        <SectionHeading 
          title="Featured Projects" 
          subtitle="A selection of my best work in full-stack development and AI automation." 
        />
      </AnimateOnScroll>

      <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
        {projects.map((project, idx) => (
          <AnimateOnScroll key={project.slug} delay={0.1 * (idx % 2)}>
            <ProjectCard project={project} />
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
