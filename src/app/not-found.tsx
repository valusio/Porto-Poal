import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Navbar lang="en" />
      <main className="flex-1">
        <div className="content-container flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
          <p className="text-sm font-medium text-accent">404</p>
          <h1 className="text-heading mt-2">Page not found</h1>
          <p className="mt-4 max-w-md text-muted-foreground">
            That URL is not part of this portfolio. Head back to the homepage or open a project case study.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex h-11 items-center rounded-md bg-foreground px-5 text-sm font-medium text-background"
          >
            Back home
          </Link>
        </div>
      </main>
      <Footer lang="en" />
    </div>
  );
}
