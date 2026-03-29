"use client";

import { LAYERS } from "@/lib/constants";

export default function LayerTag({ layer }: { layer: string }) {
  const l = LAYERS.find((x) => x.id === layer);
  if (!l) return null;
  return (
    <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.12em] text-gold uppercase">
      {l.en}
    </span>
  );
}
