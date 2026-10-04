import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";

interface BrowserFrameProps {
  url: string;
  children: ReactNode;
}

export function BrowserFrame({ url, children }: BrowserFrameProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-muted px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 flex-1 truncate rounded-md bg-background px-3 py-1 text-xs text-muted-foreground">
          {url}
        </span>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
        >
          Open live site
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div>{children}</div>
    </div>
  );
}
