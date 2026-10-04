"use client";

import { useState } from "react";
import type { ProofItem } from "@/lib/schemas";
import { Lightbox } from "./Lightbox";

interface ProofGalleryProps {
  items: ProofItem[];
}

export function ProofGallery({ items }: ProofGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="group relative overflow-hidden rounded-lg border border-border bg-muted"
            onClick={() => {
              setIndex(i);
              setOpen(true);
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.alt} className="aspect-video w-full object-cover object-top" />
            <span className="absolute inset-x-0 bottom-0 translate-y-full bg-black/70 px-3 py-2 text-left text-xs text-white transition-transform duration-300 group-hover:translate-y-0">
              {item.caption}
            </span>
          </button>
        ))}
      </div>
      <Lightbox
        items={items}
        index={index}
        open={open}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
