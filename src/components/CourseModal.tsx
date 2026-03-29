"use client";

import Image from "next/image";
import { AREAS, ALL_ITEMS } from "@/data";
import type { Course } from "@/lib/types";
import { useLang } from "@/lib/lang-context";

interface Props {
  course: Course | null;
  onClose: () => void;
  onAddAll: (ids: string[]) => void;
  onConsult: (c: Course) => void;
  myList: string[];
}

export default function CourseModal({ course: c, onClose, onAddAll, onConsult, myList }: Props) {
  const { t } = useLang();
  if (!c) return null;
  const allAdded = c.ids.every((id) => myList.includes(id));

  const areaIds = [...new Set(
    c.ids.map((id) => ALL_ITEMS.find((x) => x.id === id)?.areaId).filter(Boolean)
  )] as string[];

  return (
    <div className="fixed inset-0 z-[1000] flex flex-col" role="dialog" aria-modal="true" aria-label={c.title}>
      <div onClick={onClose} className="absolute inset-0 bg-black/35" aria-label="閉じる" role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Escape" || e.key === "Enter") onClose(); }} />
      <div
        className="relative mt-auto max-h-[88vh] overflow-y-auto z-[1]"
        style={{
          background: "#F5F1EB",
          borderRadius: "6px 6px 0 0",
        }}
      >
        <div className="relative h-[180px]">
          <Image
            src={c.photo} alt={c.title} fill className="object-cover"
            style={{ filter: "saturate(0.85) brightness(0.7)" }}
            sizes="430px" unoptimized
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to top, rgba(245,241,235,1) 0%, transparent 55%)" }}
          />
          <button
            onClick={onClose}
            aria-label="閉じる"
            className="absolute top-3 right-3 bg-white/85 border-none rounded-full w-8 h-8 text-[15px] cursor-pointer text-ink flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="px-5 pb-6 -mt-8 relative">
          <p className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.14em] text-gold m-0 mb-1">
            MODEL COURSE
          </p>
          <h2 className="font-[family-name:var(--font-serif)] text-[20px] font-normal text-ink m-0 mb-1">
            {c.title}
          </h2>
          <p className="font-[family-name:var(--font-sans)] text-[11px] text-mute m-0 mb-3">
            {c.sub} ・ {c.price}
          </p>
          <p className="font-[family-name:var(--font-sans)] text-[12px] text-sub leading-[1.8] m-0 mb-4">
            {c.note}
          </p>

          {/* Area distances */}
          <div className="flex gap-1.5 flex-wrap mb-3.5">
            {areaIds.map((aid) => {
              const a = AREAS.find((x) => x.id === aid);
              if (!a) return null;
              return (
                <span
                  key={aid}
                  className="font-[family-name:var(--font-sans)] text-[10px] text-sub inline-flex items-center gap-1"
                  style={{ background: "#EFEBE5", padding: "3px 8px", borderRadius: 3 }}
                >
                  ✈ {a.name} — {a.airport}
                </span>
              );
            })}
          </div>

          {/* Days */}
          {c.days.map((d) => (
            <div
              key={d.day}
              className="mb-3 bg-card rounded-md"
              style={{ border: "1px solid #DDD7CC", padding: "12px 14px" }}
            >
              <p className="m-0 mb-1.5 font-[family-name:var(--font-mono)] text-[9px] text-gold tracking-[0.08em]">
                DAY {d.day}
              </p>
              {d.items.map((it, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1.5"
                  style={{ borderBottom: i < d.items.length - 1 ? "1px solid #DDD7CC" : "none" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                  <p className="m-0 font-[family-name:var(--font-sans)] text-[11px] text-ink">{it}</p>
                </div>
              ))}
            </div>
          ))}

          <p className="font-[family-name:var(--font-sans)] text-[10px] text-mute mt-1 mb-3.5 leading-relaxed">
            {t("course.arrangeNote")}
          </p>

          <button
            onClick={() => onAddAll(c.ids)}
            className="w-full py-3 rounded-md font-[family-name:var(--font-sans)] text-[13px] font-semibold cursor-pointer mb-2 transition-all duration-200"
            style={{
              background: allAdded ? "#FDF0EE" : "#FFFFFF",
              color: allAdded ? "#E5382A" : "#1E1C18",
              border: `1px solid ${allAdded ? "#F08070" : "#DDD7CC"}`,
            }}
          >
            {allAdded ? t("btn.addedCourseAll") : t("btn.addCourseAll")}
          </button>
          <button
            onClick={() => onConsult(c)}
            className="w-full py-3 bg-accent text-white border-none rounded-md font-[family-name:var(--font-serif)] text-[14px] cursor-pointer tracking-[0.03em]"
          >
            {t("btn.consultCourse")}
          </button>
        </div>
      </div>
    </div>
  );
}
