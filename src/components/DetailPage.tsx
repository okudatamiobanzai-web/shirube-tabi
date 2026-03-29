"use client";

import { useState } from "react";
import Gallery from "./Gallery";
import Heart from "./Heart";
import LayerTag from "./LayerTag";
import { getAirportDist } from "@/data";
import type { AnyItem, Experience, Person } from "@/lib/types";
import ShareButtons from "./ShareButtons";
import { useLang } from "@/lib/lang-context";

interface Props {
  item: AnyItem;
  onBack: () => void;
  liked: boolean;
  onToggle: () => void;
}

export default function DetailPage({ item, onBack, liked, onToggle }: Props) {
  const { t } = useLang();
  const [vid, setVid] = useState(!!item.videoId);
  const photos = item.gallery || [item.photo];

  const exp = item.layer === "experience" ? (item as Experience) : null;
  const person = item.layer === "person" ? (item as Person) : null;

  const meta = [
    item.area && `📍 ${item.area}`,
    item.areaId && `✈ ${getAirportDist(item.areaId)}`,
    item.price,
    exp?.duration && `⏱ ${exp.duration}`,
    person?.specialty,
  ].filter(Boolean);

  return (
    <div>
      {vid && item.videoId ? (
        <div className="relative h-[300px] bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=1&loop=1&playlist=${item.videoId}&playsinline=1`}
            className="w-full h-full border-none"
            allow="autoplay"
            title={`${item.name} - 動画`}
          />
          <button
            onClick={() => setVid(false)}
            aria-label="動画を閉じる"
            className="absolute top-3 right-3 bg-black/50 border-none rounded-full w-[34px] h-[34px] text-[14px] cursor-pointer text-white flex items-center justify-center"
          >
            ✕
          </button>
          <button
            onClick={onBack}
            aria-label="戻る"
            className="absolute top-3 left-3 bg-black/50 border-none rounded-full w-[34px] h-[34px] text-[14px] cursor-pointer text-white flex items-center justify-center"
          >
            ←
          </button>
        </div>
      ) : (
        <div className="relative">
          <Gallery photos={photos} videoId={item.videoId} onVideo={() => setVid(true)} alt={item.name} />
          <button
            onClick={onBack}
            aria-label="戻る"
            className="absolute top-3 left-3 bg-white/85 border-none rounded-full w-[34px] h-[34px] text-[15px] cursor-pointer text-ink flex items-center justify-center z-[2]"
          >
            ←
          </button>
        </div>
      )}

      <div className="px-5 pt-2 pb-9">
        <div className="flex justify-between items-start">
          <div>
            <LayerTag layer={item.layer} />
            <h1 className="mt-1.5 m-0 font-[family-name:var(--font-serif)] text-[21px] font-normal text-ink leading-snug">
              {item.name}
            </h1>
          </div>
          <Heart on={liked} onClick={onToggle} size={16} />
        </div>

        <div className="flex gap-3 flex-wrap my-2.5 mb-4">
          {meta.map((m, i) => (
            <span key={i} className="font-[family-name:var(--font-sans)] text-[11px] text-mute">
              {m}
            </span>
          ))}
        </div>

        <div className="h-px bg-border mb-4" style={{ background: "#DDD7CC" }} />

        <p className="font-[family-name:var(--font-sans)] text-[13px] text-sub leading-[1.9] m-0 mb-5">
          {item.desc}
        </p>

        {/* Person message */}
        {person?.message && (
          <div
            className="rounded-md mb-5"
            style={{
              background: "#FDF0EE",
              border: "1px solid rgba(229,56,42,0.19)",
              padding: 16,
            }}
          >
            <p className="m-0 font-[family-name:var(--font-serif)] text-[14px] text-ink leading-[1.75] italic">
              「{person.message}」
            </p>
            <p className="m-0 mt-2 font-[family-name:var(--font-sans)] text-[10px] text-mute">
              — {item.name}
            </p>
          </div>
        )}

        {/* SNS */}
        {person?.sns && person.sns.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-5">
            {person.sns.map((s, i) => (
              <a
                key={i}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 py-1.5 px-3 rounded-md no-underline transition-all"
                style={{
                  border: "1px solid #DDD7CC",
                  background: "#FFFFFF",
                }}
              >
                <span className="text-[13px]">
                  {s.type === "instagram" && "📷"}
                  {s.type === "twitter" && "𝕏"}
                  {s.type === "facebook" && "📘"}
                  {s.type === "youtube" && "▶"}
                  {s.type === "website" && "🌐"}
                </span>
                <span className="font-[family-name:var(--font-sans)] text-[11px] text-sub">
                  {s.label || s.type}
                </span>
              </a>
            ))}
          </div>
        )}

        {/* Guide */}
        {exp?.person && (
          <div
            className="py-2.5 mb-4"
            style={{
              borderTop: "1px solid #DDD7CC",
              borderBottom: "1px solid #DDD7CC",
            }}
          >
            <p className="m-0 font-[family-name:var(--font-mono)] text-[7px] text-mute tracking-[0.1em]">
              {t("detail.guide")}
            </p>
            <p className="m-0 mt-1 font-[family-name:var(--font-serif)] text-[14px] text-accent">
              {exp?.person}
            </p>
          </div>
        )}

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div className="flex gap-1.5 flex-wrap mb-5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[10px] text-mute font-[family-name:var(--font-sans)]"
                style={{ border: "1px solid #DDD7CC", borderRadius: 3, padding: "3px 9px" }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Location Map */}
        {item.lat && item.lng && process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY && (
          <div className="mb-5 rounded-md overflow-hidden" style={{ border: "1px solid #DDD7CC" }}>
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&q=${item.lat},${item.lng}&zoom=12&maptype=satellite`}
              className="w-full border-none"
              style={{ height: 240 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={`${item.name} - 地図`}
            />
            {item.address && (
              <div className="px-3 py-2 bg-card">
                <p className="m-0 font-[family-name:var(--font-sans)] text-[10px] text-mute">
                  📍 {item.address}
                </p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={onToggle}
          className="w-full py-3 rounded-md font-[family-name:var(--font-serif)] text-[13px] cursor-pointer tracking-[0.03em]"
          style={{
            background: liked ? "#FDF0EE" : "#E5382A",
            color: liked ? "#E5382A" : "#fff",
            border: liked ? "1px solid #F08070" : "none",
          }}
        >
          {liked ? t("btn.addedMyList") : t("btn.addMyList")}
        </button>

        <div className="mt-4 pt-4" style={{ borderTop: "1px solid #DDD7CC" }}>
          <ShareButtons title={`${item.name} | しるべ旅`} text={`${item.name} — ${item.area}。しるべ旅で道東の旅を仕立てる。`} />
        </div>
      </div>
    </div>
  );
}
