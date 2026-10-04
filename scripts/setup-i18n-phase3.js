const fs = require('fs');
const path = require('path');

const APP_DIR = path.join(process.cwd(), 'src', 'app');
const LANG_DIR = path.join(APP_DIR, '[lang]');

if (!fs.existsSync(LANG_DIR)) fs.mkdirSync(LANG_DIR, { recursive: true });

// Move page.tsx
if (fs.existsSync(path.join(APP_DIR, 'page.tsx'))) {
  fs.renameSync(path.join(APP_DIR, 'page.tsx'), path.join(LANG_DIR, 'page.tsx'));
}

// Move projects
if (fs.existsSync(path.join(APP_DIR, 'projects'))) {
  fs.mkdirSync(path.join(LANG_DIR, 'projects'), { recursive: true });
  fs.renameSync(path.join(APP_DIR, 'projects', '[slug]'), path.join(LANG_DIR, 'projects', '[slug]'));
  fs.rmdirSync(path.join(APP_DIR, 'projects')); // remove empty folder
}

// Move layout.tsx
if (fs.existsSync(path.join(APP_DIR, 'layout.tsx'))) {
  let layout = fs.readFileSync(path.join(APP_DIR, 'layout.tsx'), 'utf8');
  layout = `import { Locale } from "@/lib/data";\n` + layout;
  
  // modify signature
  layout = layout.replace(
    /export default function RootLayout\(\{\s*children,\s*\}\:\s*Readonly\<\{\s*children:\s*React\.ReactNode;\s*\}\>\)\s*\{/g,
    `export default function RootLayout({ children, params: { lang } }: Readonly<{ children: React.ReactNode; params: { lang: Locale } }>) {`
  );
  
  // pass lang to html
  layout = layout.replace('<html lang="en"', '<html lang={lang}');
  
  // pass lang to Navbar and Footer
  layout = layout.replace('<Navbar />', '<Navbar lang={lang} />');
  layout = layout.replace('<Footer />', '<Footer lang={lang} />');
  
  fs.writeFileSync(path.join(LANG_DIR, 'layout.tsx'), layout);
  fs.unlinkSync(path.join(APP_DIR, 'layout.tsx'));
}

// Create middleware.ts for redirecting / to /en
const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
const middlewareContent = `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'id'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(\`/\${locale}/\`) || pathname === \`/\${locale}\`
  );
 
  if (pathnameHasLocale) return;
 
  // Redirect if there is no locale
  const locale = 'en'; // Default locale
  request.nextUrl.pathname = \`/\${locale}\${pathname === '/' ? '' : pathname}\`;
  return NextResponse.redirect(request.nextUrl);
}
 
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico|.*\\\\..*).*)',
  ],
};
`;
fs.writeFileSync(middlewarePath, middlewareContent);

// Add generateStaticParams to layout to ensure SSG works for en and id
let newLayout = fs.readFileSync(path.join(LANG_DIR, 'layout.tsx'), 'utf8');
newLayout += `\nexport function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}\n`;
fs.writeFileSync(path.join(LANG_DIR, 'layout.tsx'), newLayout);

console.log("Phase 3 complete: App directory restructured to [lang].");
