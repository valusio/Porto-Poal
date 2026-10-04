/** Section IDs — used in nav links and scroll targets */
export const SECTIONS = {
  hero: "hero",
  about: "about",
  projects: "projects",
  experience: "experience",
  skills: "skills",
  achievements: "achievements",
  contact: "contact",
} as const;

/** Navigation links */
export const NAV_LINKS = [
  { label: "About", href: `#${SECTIONS.about}` },
  { label: "Projects", href: `#${SECTIONS.projects}` },
  { label: "Experience", href: `#${SECTIONS.experience}` },
  { label: "Skills", href: `#${SECTIONS.skills}` },
  { label: "Achievements", href: `#${SECTIONS.achievements}` },
  { label: "Contact", href: `#${SECTIONS.contact}` },
] as const;

/** API base URL from environment (set at build time for static export) */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

/** Site metadata */
export const SITE_CONFIG = {
  title: "Poalca Valusio — Full-Stack & AI Engineer",
  description:
    "Portfolio of Poalca Valusio: Full-Stack Engineer building government-grade systems and AI automation. International Gold Medalist (WICE), Silver Medalist (World Health Competition).",
  url: "https://portofolio-poalca.ahwlab.id",
  ogImage: "/og-image.png",
} as const;
