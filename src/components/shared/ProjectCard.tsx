import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/schemas";
import { Locale } from "@/lib/data";

interface ProjectCardProps {
  project: Project;
  lang: Locale;
}

export function ProjectCard({ project, lang }: ProjectCardProps) {
  return (
    <Link
      href={`/${lang}/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-accent/50 hover:shadow-md focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        {project.category && (
          <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-md">
            {project.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold text-foreground group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="mb-6 flex-1 text-sm text-muted-foreground line-clamp-3">
          {project.excerpt}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center text-sm font-medium text-accent">
          View Case Study
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
