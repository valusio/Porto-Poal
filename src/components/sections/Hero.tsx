import { getProfile } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";

export function Hero() {
  const profile = getProfile();

  return (
    <section
      id={SECTIONS.hero}
      className="content-container relative flex min-h-[90vh] flex-col items-center justify-center pt-24 pb-16 md:flex-row md:justify-between md:pt-32"
    >
      <div className="flex-1 md:pr-12 lg:pr-24">
        <AnimateOnScroll>
          <div className="mb-4 inline-flex items-center rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
            <span className="relative mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
            </span>
            Available for new opportunities
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <h1 className="text-display mb-6">
            Hi, I&apos;m <span className="text-accent">{profile.name}</span>
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p className="text-subheading mb-8 max-w-2xl text-muted-foreground">
            {profile.tagline}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href={`#${SECTIONS.projects}`}
              className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-6 font-medium text-background transition-colors hover:bg-foreground/90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              View Work
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href={profile.cv}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center justify-center rounded-md border border-input bg-transparent px-6 font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.4} className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3">
          {profile.stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-3xl font-bold text-foreground">{stat.value}</span>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll
        delay={0.2}
        className="mt-16 flex flex-1 justify-center md:mt-0 md:justify-end"
      >
        <div className="relative group">
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-accent/40 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
          <div className="relative h-64 w-64 overflow-hidden rounded-2xl border-4 border-background shadow-xl md:h-80 md:w-80 lg:h-96 lg:w-96">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
          </div>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
