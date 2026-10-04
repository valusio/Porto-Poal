import { Locale, getProfile } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { ContactForm } from "@/components/shared/ContactForm";
import { Mail, Code2, Globe, ExternalLink } from "lucide-react";

export function Contact({ lang }: { lang: Locale }) {
  const profile = getProfile(lang);

  return (
    <section id={SECTIONS.contact} className="section-padding content-container">
      <AnimateOnScroll>
        <SectionHeading 
          title="Get in Touch" 
          subtitle="Interested in working together? Fill out the form below or reach out directly via email."
        />
      </AnimateOnScroll>

      <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <AnimateOnScroll delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-6 font-semibold text-foreground">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground">Email</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Globe className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground">JobStreet</span>
                    <a
                      href={profile.socials.jobstreet}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
                    >
                      View JobStreet Profile
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <Code2 className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground">GitHub</span>
                    <a
                      href={profile.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-muted-foreground hover:text-accent transition-colors"
                    >
                      View GitHub Profile
                      <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="lg:col-span-3">
          <AnimateOnScroll delay={0.2}>
            <ContactForm />
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
