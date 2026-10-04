import { SITE_CONFIG } from "@/lib/constants";
import { getProfile } from "@/lib/data";

export function JsonLd() {
  const profile = getProfile();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: "Full-Stack Engineer",
    url: SITE_CONFIG.url,
    image: `${SITE_CONFIG.url}${profile.photo}`,
    sameAs: [profile.socials.github, profile.socials.linkedin].filter(
      (url) => url && !url.includes("[TODO")
    ),
    email: profile.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Padang",
      addressRegion: "West Sumatra",
      addressCountry: "Indonesia",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
