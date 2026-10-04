import fs from "fs";
import path from "path";
import { z } from "zod";
import {
  profileSchema,
  projectsSchema,
  experiencesSchema,
  educationsSchema,
  skillsSchema,
  awardsSchema,
  trainingsSchema,
  proofSchema,
} from "../src/lib/schemas";

const DATA_DIR = path.join(process.cwd(), "data");

const fileToSchemaMap: Record<string, z.ZodTypeAny> = {
  "profile.json": profileSchema,
  "projects.json": projectsSchema,
  "experience.json": experiencesSchema,
  "education.json": educationsSchema,
  "skills.json": skillsSchema,
  "awards.json": awardsSchema,
  "training.json": trainingsSchema,
  "proof.json": proofSchema,
};

async function validateData() {
  console.log("Validating data files...");
  let hasErrors = false;

  for (const [filename, schema] of Object.entries(fileToSchemaMap)) {
    const filePath = path.join(DATA_DIR, filename);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing file: ${filename}`);
      hasErrors = true;
      continue;
    }

    try {
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const jsonData = JSON.parse(fileContent);
      schema.parse(jsonData);
      console.log(`✅ ${filename} is valid.`);
    } catch (error) {
      hasErrors = true;
      console.error(`❌ Validation error in ${filename}:`);
      if (error instanceof z.ZodError) {
        console.error(
          error.issues.map((e: any) => `  - [${e.path.join(".")}] ${e.message}`).join("\n")
        );
      } else {
        console.error(error);
      }
    }
  }

  if (hasErrors) {
    console.error("\n❌ Data validation failed. Please fix the errors above.");
    process.exit(1);
  } else {
    console.log("\n✨ All data files are valid!");
  }
}

validateData();
