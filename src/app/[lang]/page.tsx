import { Locale } from "@/lib/data";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/shared/JsonLd";

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <>
      <JsonLd lang={lang} />
      <Hero lang={lang} />
      <About lang={lang} />
      <FeaturedProjects lang={lang} />
      <Experience lang={lang} />
      <TechStack lang={lang} />
      <Achievements lang={lang} />
      <Contact lang={lang} />
    </>
  );
}
