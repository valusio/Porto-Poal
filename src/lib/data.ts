import type {
  Profile, Project, Experience, Education, Skills, Award, Training, ProofItem,
} from "./schemas";

// English
import profileEn from "@/../data/en/profile.json";
import projectsEn from "@/../data/en/projects.json";
import experienceEn from "@/../data/en/experience.json";
import educationEn from "@/../data/en/education.json";
import skillsEn from "@/../data/en/skills.json";
import awardsEn from "@/../data/en/awards.json";
import trainingEn from "@/../data/en/training.json";
import proofEn from "@/../data/en/proof.json";

// Indonesian
import profileId from "@/../data/id/profile.json";
import projectsId from "@/../data/id/projects.json";
import experienceId from "@/../data/id/experience.json";
import educationId from "@/../data/id/education.json";
import skillsId from "@/../data/id/skills.json";
import awardsId from "@/../data/id/awards.json";
import trainingId from "@/../data/id/training.json";
import proofId from "@/../data/id/proof.json";

export type Locale = "en" | "id";

export function getProfile(lang: Locale = "en"): Profile {
  return (lang === "id" ? profileId : profileEn) as Profile;
}

export function getProjects(lang: Locale = "en"): Project[] {
  const data = lang === "id" ? projectsId : projectsEn;
  return (data as Project[]).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(lang: Locale = "en"): Project[] {
  return getProjects(lang).filter((p) => p.featured);
}

export function getProjectBySlug(slug: string, lang: Locale = "en"): Project | undefined {
  return getProjects(lang).find((p) => p.slug === slug);
}

export function getExperiences(lang: Locale = "en"): Experience[] {
  return (lang === "id" ? experienceId : experienceEn) as Experience[];
}

export function getEducation(lang: Locale = "en"): Education[] {
  return (lang === "id" ? educationId : educationEn) as Education[];
}

export function getSkills(lang: Locale = "en"): Skills {
  return (lang === "id" ? skillsId : skillsEn) as Skills;
}

export function getAwards(lang: Locale = "en"): Award[] {
  return (lang === "id" ? awardsId : awardsEn) as Award[];
}

export function getTraining(lang: Locale = "en"): Training[] {
  return (lang === "id" ? trainingId : trainingEn) as Training[];
}

export function getProof(lang: Locale = "en"): ProofItem[] {
  return (lang === "id" ? proofId : proofEn) as ProofItem[];
}

export function getProofByIds(ids: string[], lang: Locale = "en"): ProofItem[] {
  const proof = getProof(lang);
  return ids.map((id) => proof.find((p) => p.id === id)).filter(Boolean) as ProofItem[];
}

export function getProofBySection(section: string, lang: Locale = "en"): ProofItem[] {
  return getProof(lang).filter((p) => p.section === section);
}
