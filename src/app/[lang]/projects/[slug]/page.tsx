import { getProjectBySlug, getProjects, getProofByIds, Locale } from "@/lib/data";
import { ProofGallery } from "@/components/proof/ProofGallery";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

// Generate static routes for all projects
export function generateStaticParams() {
  const projectsEn = getProjects('en');
  const projectsId = getProjects('id');
  
  const params: { lang: string, slug: string }[] = [];
  projectsEn.forEach(p => params.push({ lang: 'en', slug: p.slug }));
  projectsId.forEach(p => params.push({ lang: 'id', slug: p.slug }));
  
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const project = getProjectBySlug(resolvedParams.slug, lang);
  if (!project) return {};

  return {
    title: `${project.title} | ${SITE_CONFIG.title}`,
    description: project.excerpt,
    openGraph: {
      title: project.title,
      description: project.excerpt,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ lang: string, slug: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;
  const project = getProjectBySlug(resolvedParams.slug, lang);

  if (!project) {
    notFound();
  }

  return (
    <article className="min-h-screen pt-24 pb-16 md:pt-32">
      <div className="content-container max-w-4xl">
        <Link
          href={`/${resolvedParams.lang}/#projects`}
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {lang === 'id' ? 'Kembali ke Proyek' : 'Back to Projects'}
        </Link>

        <h1 className="text-display mb-6">{project.title}</h1>
        <p className="text-subheading mb-8 text-muted-foreground">{project.excerpt}</p>

        <div className="mb-12 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="inline-flex items-center rounded-md bg-accent/10 px-3 py-1 text-sm font-medium text-accent"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="relative mb-16 aspect-video w-full overflow-hidden rounded-2xl border border-border shadow-md">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="grid gap-12 md:grid-cols-[1fr_250px] lg:gap-16">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-heading mb-4">{lang === 'id' ? 'Permasalahan' : 'The Problem'}</h2>
            <p className="text-body text-muted-foreground whitespace-pre-line mb-8">
              {project.problem}
            </p>

            <h2 className="text-heading mb-4">{resolvedParams.lang === 'id' ? 'Arsitektur' : 'Architecture'}</h2>
            <p className="text-body text-muted-foreground whitespace-pre-line mb-8">
              {project.architecture}
            </p>

            {project.architectureSvg && (
              <div className="my-8 rounded-xl bg-card p-6 shadow-sm border border-border flex items-center justify-center">
                <Image
                  src={project.architectureSvg}
                  alt="Architecture diagram"
                  width={800}
                  height={400}
                  className="w-full max-w-2xl"
                />
              </div>
            )}

            <h2 className="text-heading mb-4">{lang === 'id' ? 'Dampak' : 'Impact'}</h2>
            <p className="text-body text-muted-foreground whitespace-pre-line mb-8">
              {project.impact}
            </p>
            
            {project.proofIds?.length > 0 && (
              <div className="my-12">
                <h2 className="text-heading mb-6">{lang === 'id' ? 'Galeri & Bukti' : 'Gallery & Proofs'}</h2>
                <ProofGallery items={getProofByIds(project.proofIds, lang)} />
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <div>
              <h3 className="mb-2 text-sm font-semibold text-foreground uppercase tracking-wider">{lang === 'id' ? 'Peran' : 'Role'}</h3>
              <p className="text-muted-foreground">{project.role}</p>
            </div>

            {project.liveUrl && (
              <div>
                <h3 className="mb-2 text-sm font-semibold text-foreground uppercase tracking-wider">{resolvedParams.lang === 'id' ? 'Situs Live' : 'Live Site'}</h3>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent hover:underline font-medium"
                >
                  {resolvedParams.lang === 'id' ? 'Kunjungi Proyek' : 'Visit Project'}
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
