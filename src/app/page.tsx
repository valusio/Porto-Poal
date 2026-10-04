import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { Achievements } from "@/components/sections/Achievements";
import { Contact } from "@/components/sections/Contact";
import { JsonLd } from "@/components/shared/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Hero />
      <About />
      <FeaturedProjects />
      <Experience />
      <TechStack />
      <Achievements />
      <Contact />
    </>
  );
}
