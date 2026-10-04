const fs = require('fs');
const path = require('path');

const SRC_DIR = path.join(process.cwd(), 'src');

function updateComponent(filePath, componentName) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has lang
  if (content.includes('{ lang }') || content.includes('lang: Locale')) return;

  // Add Locale import
  content = content.replace('import { get', 'import { Locale, get');
  
  // If no get functions are imported from lib/data, add it
  if (!content.includes('import { Locale')) {
    content = content.replace('from "@/lib/data";', ', Locale } from "@/lib/data";');
  }
  // Fallback
  if (!content.includes('Locale')) {
      content = `import { Locale } from "@/lib/data";\n` + content;
  }

  // Add lang prop to component signature
  const signatureRegex = new RegExp(`export function ${componentName}\\s*\\((.*?)\\)`);
  content = content.replace(signatureRegex, (match, p1) => {
    if (p1.trim() === '') {
      return `export function ${componentName}({ lang }: { lang: Locale })`;
    } else if (p1.includes('props')) {
       return match; // too complex
    } else {
      return `export function ${componentName}({ lang, ...props }: { lang: Locale, [key:string]: any })`; // crude fallback
    }
  });

  // Pass lang to get functions
  const getters = ['getProfile', 'getProjects', 'getFeaturedProjects', 'getExperiences', 'getEducation', 'getSkills', 'getAwards', 'getTraining', 'getProof'];
  getters.forEach(getter => {
    const getterRegex = new RegExp(`${getter}\\(\\s*\\)`, 'g');
    content = content.replace(getterRegex, `${getter}(lang)`);
  });

  fs.writeFileSync(filePath, content);
}

// Update specific files
[
  ['components/sections/Hero.tsx', 'Hero'],
  ['components/sections/About.tsx', 'About'],
  ['components/sections/Experience.tsx', 'Experience'],
  ['components/sections/FeaturedProjects.tsx', 'FeaturedProjects'],
  ['components/sections/TechStack.tsx', 'TechStack'],
  ['components/sections/Achievements.tsx', 'Achievements'],
  ['components/sections/Contact.tsx', 'Contact'],
  ['components/layout/Footer.tsx', 'Footer'],
  ['components/shared/JsonLd.tsx', 'JsonLd']
].forEach(([relPath, name]) => {
  try {
    updateComponent(path.join(SRC_DIR, relPath), name);
    console.log(`Updated ${name}`);
  } catch (e) {
    console.error(`Failed ${name}:`, e.message);
  }
});

// Update page.tsx to pass lang
const pagePath = path.join(SRC_DIR, 'app', 'page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');
if (!pageContent.includes('lang: Locale')) {
    pageContent = `import { Locale } from "@/lib/data";\n` + pageContent;
    pageContent = pageContent.replace('export default function Home()', 'export default function Home({ params: { lang } }: { params: { lang: Locale } })');
    
    // add lang={} to components
    ['<Hero', '<About', '<Experience', '<FeaturedProjects', '<TechStack', '<Achievements', '<Contact', '<JsonLd'].forEach(comp => {
        pageContent = pageContent.replace(new RegExp(comp, 'g'), `${comp} lang={lang}`);
    });
    fs.writeFileSync(pagePath, pageContent);
    console.log('Updated app/page.tsx');
}

console.log('Phase 2 complete.');
