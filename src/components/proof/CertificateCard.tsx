import { ExternalLink } from "lucide-react";
import type { ProofItem } from "@/lib/schemas";
import { isHttpUrl } from "@/lib/utils";

interface CertificateCardProps {
  item: ProofItem;
}

export function CertificateCard({ item }: CertificateCardProps) {
  return (
    <figure className="group overflow-hidden rounded-lg border border-border bg-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.src}
        alt={item.alt}
        className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <figcaption className="flex items-center justify-between gap-3 p-4">
        <span className="text-sm text-muted-foreground">{item.caption}</span>
        {isHttpUrl(item.link) && (
          <a
            href={item.link!}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            Verify credential
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </figcaption>
    </figure>
  );
}
