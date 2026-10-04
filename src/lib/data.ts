import profileData from "@/../data/profile.json";
import projectsData from "@/../data/projects.json";
import experienceData from "@/../data/experience.json";
import educationData from "@/../data/education.json";
import skillsData from "@/../data/skills.json";
import awardsData from "@/../data/awards.json";
import trainingData from "@/../data/training.json";
import proofData from "@/../data/proof.json";

import type {
  Profile,
  Project,
  Experience,
  Education,
  Skills,
  Award,
  Training,
  ProofItem,
} from "./schemas";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getProjects(): Project[] {
  return (projectsData as Project[]).sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return getProjects().filter((p) => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((p) => p.slug === slug);
}

export function getExperiences(): Experience[] {
  return experienceData as Experience[];
}

export function getEducation(): Education[] {
  return educationData as Education[];
}

export function getSkills(): Skills {
  return skillsData as Skills;
}

export function getAwards(): Award[] {
  return awardsData as Award[];
}

export function getTraining(): Training[] {
  return trainingData as Training[];
}

export function getProof(): ProofItem[] {
  return proofData as ProofItem[];
}

export function getProofByIds(ids: string[]): ProofItem[] {
  const proof = getProof();
  return ids.map((id) => proof.find((p) => p.id === id)).filter(Boolean) as ProofItem[];
}

export function getProofBySection(section: string): ProofItem[] {
  return getProof().filter((p) => p.section === section);
}
