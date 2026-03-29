"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import type { Course } from "@/lib/types";
import { useLang } from "@/lib/lang-context";

interface Props {
  course: Course;
  onTap: (c: Course) => void;
}

export default function CourseCard({ course: c, onTap }: Props) {
  const { t } = useLang();
  const photos = c.gallery || [c.photo];
  const [idx, setIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    const s = scrollRef.current.scrollLeft;
    setIdx(Math.round(s / w));
  }, []);

  return (
    <div
      className="bg-card rounded-md overflow-hidden flex-shrink-0 snap-start"
      style={{
        border: "1px solid #DDD7CC",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        width: 272,
      }}
    >
      {/* Swipeable gallery */}
      <div className="relative h-[130px]">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x hide-scrollbar h-full"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {photos.map((src, i) => (
            <div key={i} className="min-w-full h-full flex-shrink-0 snap-start relative">
              <Image
                src={src} alt={i === 0 ? c.title : `${c.title} ${i + 1}`} fill className="object-cover"
                style={{ filter: "saturate(0.85) brightness(0.78)" }}
                sizes="272px" unoptimized
              />
            </div>
          ))}
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(30,28,24,0.75), transparent 50%)" }}
        />
        <span
          className="absolute top-2 left-2 font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] z-[1]"
          style={{
            color: "#E5382A",
            background: "rgba(30,28,24,0.55)",
            backdropFilter: "blur(3px)",
            padding: "3px 7px",
            borderRadius: 3,
          }}
        >
          MODEL COURSE
        </span>

        {/* Dot indicators */}
        {photos.length > 1 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 z-[1]">
            {photos.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-200"
                style={{
                  width: idx === i ? 12 : 4,
                  background: idx === i ? "#fff" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        )}

        <div className="absolute bottom-2.5 left-2.5 right-2.5 z-[1]">
          <h3 className="m-0 font-[family-name:var(--font-serif)] text-[15px] font-normal text-white leading-snug">
            {c.title}
          </h3>
          <p className="m-0 mt-1 font-[family-name:var(--font-sans)] text-[10px] text-white/60">
            {c.sub}
          </p>
        </div>
      </div>

      {/* Content area - clickable */}
      <div className="p-2.5 pt-2.5 pb-3 cursor-pointer" onClick={() => onTap(c)}>
        {c.days.map((d) => (
          <div key={d.day} className="mb-1.5">
            <p className="m-0 mb-0.5 font-[family-name:var(--font-mono)] text-[8px] text-gold tracking-[0.08em]">
              DAY {d.day}
            </p>
            {d.items.map((it, i) => (
              <p key={i} className="m-0 font-[family-name:var(--font-sans)] text-[10px] text-sub leading-relaxed">
                ・{it}
              </p>
            ))}
          </div>
        ))}
        <div
          className="flex justify-between items-center mt-2 pt-2"
          style={{ borderTop: "1px solid #DDD7CC" }}
        >
          <span className="font-[family-name:var(--font-serif)] text-[13px] text-ink">{c.price}</span>
          <span className="font-[family-name:var(--font-mono)] text-[8px] text-gold">{t("btn.seeMore")}</span>
        </div>
      </div>
    </div>
  );
}
