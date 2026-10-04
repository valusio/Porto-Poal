import { Locale } from "@/lib/data";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { ChatWidget } from "@/components/chat/ChatWidget";

export default async function LangLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang as Locale;

  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
      <BackToTop />
      <ChatWidget />
    </div>
  );
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'id' }];
}
