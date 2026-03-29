"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface Props {
  photos: string[];
  videoId?: string | null;
  onVideo?: () => void;
  alt?: string;
}

export default function Gallery({ photos, videoId, onVideo, alt = "" }: Props) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    const w = ref.current.offsetWidth;
    const s = ref.current.scrollLeft;
    setIdx(Math.round(s / w));
  }, []);

  const n = photos.length;

  return (
    <div className="relative">
      <div
        ref={ref}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x hide-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {photos.map((src, i) => (
          <div key={i} className="min-w-full h-[300px] flex-shrink-0 snap-start relative">
            <Image src={src} alt={i === 0 ? alt : `${alt} ${i + 1}`} fill className="object-cover photo-film" sizes="430px" unoptimized />
          </div>
        ))}
      </div>

      {n > 1 && (
        <div
          className="absolute left-1/2 -translate-x-1/2 flex gap-1.5"
          style={{ bottom: videoId ? 44 : 12 }}
        >
          {photos.map((_, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full transition-all duration-250"
              style={{
                width: idx === i ? 16 : 6,
                background: idx === i ? "#fff" : "rgba(255,255,255,0.45)",
              }}
            />
          ))}
        </div>
      )}

      {videoId && onVideo && (
        <button
          onClick={onVideo}
          aria-label="動画を再生"
          className="absolute bottom-2.5 right-3 flex items-center gap-1.5 cursor-pointer border-none text-white"
          style={{
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(6px)",
            borderRadius: 6,
            padding: "8px 12px",
          }}
        >
          <span>▶</span>
          <span className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.06em]">
            PLAY SHORT MOVIE
          </span>
        </button>
      )}

      <div
        className="absolute bottom-0 left-0 right-0 h-[60px] pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(245,241,235,0.9), transparent)" }}
      />
    </div>
  );
}
