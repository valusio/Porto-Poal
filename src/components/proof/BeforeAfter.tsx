"use client";

import { useRef, useState } from "react";

interface BeforeAfterProps {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
}

export function BeforeAfter({ beforeSrc, afterSrc, beforeAlt, afterAlt }: BeforeAfterProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const update = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full cursor-ew-resize overflow-hidden rounded-lg border border-border"
      onMouseMove={(e) => e.buttons === 1 && update(e.clientX)}
      onClick={(e) => update(e.clientX)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={afterSrc} alt={afterAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${position}%` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={beforeAlt} className="h-full w-full object-cover" />
      </div>
      <div className="absolute inset-y-0 w-0.5 bg-white" style={{ left: `${position}%` }} />
      <input
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        aria-label="Compare before and after"
      />
    </div>
  );
}
