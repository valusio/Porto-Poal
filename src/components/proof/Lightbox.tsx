"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";
import type { ProofItem } from "@/lib/schemas";

interface LightboxProps {
  items: ProofItem[];
  index: number;
  open: boolean;
  onClose: () => void;
  onIndexChange: (index: number) => void;
}

export function Lightbox({ items, index, open, onClose, onIndexChange }: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const touchStart = useRef<number | null>(null);

  const go = useCallback(
    (dir: number) => {
      if (items.length === 0) return;
      onIndexChange((index + dir + items.length) % items.length);
      setZoom(1);
    },
    [index, items.length, onIndexChange]
  );

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "ArrowRight") go(1);
    };

    window.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      previous?.focus();
    };
  }, [open, go, onClose]);

  if (!open || items.length === 0) return null;

  const item = items[index];

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      tabIndex={-1}
      className="fixed inset-0 z-[60] flex flex-col bg-black/90 text-white outline-none"
      onClick={onClose}
      onTouchStart={(event) => {
        touchStart.current = event.changedTouches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (touchStart.current == null) return;
        const delta = event.changedTouches[0].clientX - touchStart.current;
        if (delta > 40) go(-1);
        if (delta < -40) go(1);
        touchStart.current = null;
      }}
    >
      <div className="flex items-center justify-between p-4" onClick={(e) => e.stopPropagation()}>
        <p className="text-sm text-white/80">
          {index + 1} / {items.length}
        </p>
        <div className="flex items-center gap-2">
          <button type="button" className="rounded-md p-2 hover:bg-white/10" aria-label="Zoom out" onClick={() => setZoom((z) => Math.max(1, z - 0.25))}>
            <ZoomOut className="h-5 w-5" />
          </button>
          <button type="button" className="rounded-md p-2 hover:bg-white/10" aria-label="Zoom in" onClick={() => setZoom((z) => Math.min(3, z + 0.25))}>
            <ZoomIn className="h-5 w-5" />
          </button>
          <button type="button" className="rounded-md p-2 hover:bg-white/10" aria-label="Close lightbox" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-12">
        {items.length > 1 && (
          <button
            type="button"
            className="absolute left-2 rounded-full bg-white/10 p-2 hover:bg-white/20"
            aria-label="Previous image"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.src}
          alt={item.alt}
          className="max-h-[75vh] max-w-full object-contain transition-transform duration-300"
          style={{ transform: `scale(${zoom})` }}
          onClick={(e) => e.stopPropagation()}
        />
        {items.length > 1 && (
          <button
            type="button"
            className="absolute right-2 rounded-full bg-white/10 p-2 hover:bg-white/20"
            aria-label="Next image"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
      </div>
      <p className="p-4 text-center text-sm text-white/80">{item.caption}</p>
    </div>
  );
}
