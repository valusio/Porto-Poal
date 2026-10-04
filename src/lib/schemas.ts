import { z } from "zod";

// ─── Profile ────────────────────────────────────────────────

export const socialSchema = z.object({
  github: z.string(),
  linkedin: z.string(),
  portfolio: z.string().url(),
});

export const statSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const profileSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  email: z.string().email(),
  location: z.string().min(1),
  availability: z.string(),
  summary: z.string().min(1),
  photo: z.string(),
  cv: z.string(),
  stats: z.array(statSchema),
  socials: socialSchema,
});

export type Profile = z.infer<typeof profileSchema>;

// ─── Projects ───────────────────────────────────────────────

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  thumbnail: z.string(),
  problem: z.string().min(1),
  role: z.string().min(1),
  architecture: z.string(),
  architectureSvg: z.string().optional(),
  techStack: z.array(z.string()),
  impact: z.string(),
  liveUrl: z.string().url().nullable(),
  proofIds: z.array(z.string()),
  featured: z.boolean(),
  order: z.number().int(),
});

export const projectsSchema = z.array(projectSchema);

export type Project = z.infer<typeof projectSchema>;

// ─── Experience ─────────────────────────────────────────────

export const experienceSchema = z.object({
  id: z.string().min(1),
  role: z.string().min(1),
  organization: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  description: z.string().min(1),
  highlights: z.array(z.string()),
  relatedProjectSlug: z.string().nullable().optional(),
  proofIds: z.array(z.string()),
});

export const experiencesSchema = z.array(experienceSchema);

export type Experience = z.infer<typeof experienceSchema>;

// ─── Education ──────────────────────────────────────────────

export const educationSchema = z.object({
  institution: z.string().min(1),
  degree: z.string().min(1),
  location: z.string().min(1),
  startYear: z.number().int(),
  endYear: z.number().int(),
  gpa: z.string(),
  proofIds: z.array(z.string()),
});

export const educationsSchema = z.array(educationSchema);

export type Education = z.infer<typeof educationSchema>;

// ─── Skills ─────────────────────────────────────────────────

export const skillGroupSchema = z.object({
  name: z.string().min(1),
  skills: z.array(z.string().min(1)),
});

export const skillsSchema = z.object({
  groups: z.array(skillGroupSchema),
});

export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Skills = z.infer<typeof skillsSchema>;

// ─── Awards ─────────────────────────────────────────────────

export const awardSchema = z.object({
  id: z.string().min(1),
  type: z.string().optional(),
  title: z.string().min(1),
  event: z.string().min(1),
  year: z.union([z.number().int(), z.string()]),
  location: z.string().nullable().optional(),
  category: z.string(),
  description: z.string().min(1),
  projectName: z.string().optional(),
  relatedProjectSlug: z.string().optional(),
  proofIds: z.array(z.string()),
});

export const awardsSchema = z.array(awardSchema);

export type Award = z.infer<typeof awardSchema>;

// ─── Training ───────────────────────────────────────────────

export const trainingSchema = z.object({
  title: z.string().min(1),
  provider: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  proofIds: z.array(z.string()),
});

export const trainingsSchema = z.array(trainingSchema);

export type Training = z.infer<typeof trainingSchema>;

// ─── Proof ──────────────────────────────────────────────────

export const proofItemSchema = z.object({
  id: z.string().min(1),
  section: z.string().min(1),
  src: z.string().min(1),
  alt: z.string().min(1, "Alt text is required for every proof image"),
  caption: z.string().min(1, "Caption is required for every proof image"),
  link: z.string().url().nullable().optional(),
  sanitized: z.boolean(),
});

export const proofSchema = z.array(proofItemSchema);

export type ProofItem = z.infer<typeof proofItemSchema>;
