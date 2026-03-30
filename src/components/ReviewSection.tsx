"use client";

import { REVIEWS } from "@/data/reviews";
import SectionHeader from "./SectionHeader";
import { useLang } from "@/lib/lang-context";

export default function ReviewSection() {
  const { t } = useLang();

  return (
    <div className="pt-6">
      <SectionHeader en="Reviews" ja={t("section.reviews")} />
      <div className="flex gap-2.5 overflow-x-auto snap-x hide-scrollbar pb-1.5 -mx-4 px-4">
        {REVIEWS.map((r) => (
          <div
            key={r.id}
            className="bg-card rounded-md flex-shrink-0 snap-start"
            style={{
              border: "1px solid #DDD7CC",
              padding: "16px 18px",
              width: 260,
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="text-[13px]"
                  style={{ color: i < r.rating ? "#E5382A" : "#DDD7CC" }}
                >
                  ★
                </span>
              ))}
            </div>
            <p className="font-[family-name:var(--font-sans)] text-[12px] text-sub leading-[1.8] m-0 mb-3">
              {r.text}
            </p>
            {r.experienceTitle && (
              <p className="font-[family-name:var(--font-sans)] text-[10px] text-accent m-0 mb-1.5">
                {r.experienceTitle}
              </p>
            )}
            <div className="flex justify-between items-center">
              <p className="font-[family-name:var(--font-sans)] text-[10px] text-mute m-0">
                {r.name} — {r.area}
              </p>
              <p className="font-[family-name:var(--font-mono)] text-[8px] text-mute m-0">
                {r.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
