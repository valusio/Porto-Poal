import { Locale, getProfile } from "@/lib/data";
import { SECTIONS } from "@/lib/constants";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { MapPin, Mail, Calendar } from "lucide-react";

export function About({ lang }: { lang: Locale }) {
  const profile = getProfile(lang);

  return (
    <section id={SECTIONS.about} className="section-padding bg-muted/30">
      <div className="content-container">
        <AnimateOnScroll>
          <SectionHeading title="About Me" />
        </AnimateOnScroll>

        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <AnimateOnScroll delay={0.1} className="lg:col-span-2">
            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <p className="text-body whitespace-pre-line text-muted-foreground">
                {profile.summary}
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2} className="lg:col-span-1">
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h3 className="mb-6 font-semibold text-foreground">Quick Info</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-sm font-medium text-foreground">Location</span>
                    <span className="text-sm text-muted-foreground">{profile.location}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-sm font-medium text-foreground">Email</span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <span className="block text-sm font-medium text-foreground">Availability</span>
                    <span className="text-sm text-muted-foreground">{profile.availability}</span>
                  </div>
                </li>
              </ul>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
