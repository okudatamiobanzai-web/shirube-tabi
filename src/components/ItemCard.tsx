"use client";

import Image from "next/image";
import Heart from "./Heart";
import LayerTag from "./LayerTag";
import { getAirportDist } from "@/data";
import type { AnyItem } from "@/lib/types";

interface Props {
  item: AnyItem;
  liked: boolean;
  onToggle: () => void;
  onSelect: () => void;
}

export default function ItemCard({ item, liked, onToggle, onSelect }: Props) {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer relative overflow-hidden rounded-md bg-card"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
    >
      <div className="relative" style={{ aspectRatio: "4/5" }}>
        <Image
          src={item.photo}
          alt={item.name}
          fill
          className="object-cover photo-film-card transition-transform duration-500 hover:scale-[1.03]"
          sizes="(max-width: 430px) 50vw, 200px"
          unoptimized
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(30,28,24,0.72) 0%, transparent 50%)" }}
        />
        {item.videoId && (
          <div
            className="absolute bottom-2 right-2 flex items-center gap-1"
            style={{
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(4px)",
              borderRadius: 4,
              padding: "4px 8px",
            }}
          >
            <span className="text-[10px] text-white">▶</span>
            <span className="font-[family-name:var(--font-mono)] text-[7px] text-white tracking-[0.06em]">
              SHORT
            </span>
          </div>
        )}
      </div>

      <div className="absolute top-2 left-2 right-2 flex justify-between items-start">
        <LayerTag layer={item.layer} />
        <Heart on={liked} onClick={onToggle} size={12} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-2.5 pb-2.5">
        <h3 className="m-0 font-[family-name:var(--font-serif)] text-[13px] font-normal text-white leading-snug">
          {item.name}
        </h3>
        <p className="m-0 mt-0.5 font-[family-name:var(--font-sans)] text-[10px] text-white/60">
          {item.area}
          {item.price ? ` — ${item.price}` : ""}
        </p>
        {item.areaId && (
          <p className="m-0 mt-0.5 font-[family-name:var(--font-mono)] text-[8px] text-white/40 tracking-[0.03em]">
            ✈ {getAirportDist(item.areaId)}
          </p>
        )}
      </div>
    </div>
  );
}
