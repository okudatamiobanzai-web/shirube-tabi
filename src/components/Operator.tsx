"use client";

import Image from "next/image";
import { P } from "@/data/photos";
import { useLang } from "@/lib/lang-context";

export default function Operator() {
  const { t } = useLang();
  return (
    <div
      className="bg-card rounded-md flex gap-3.5 items-start"
      style={{ border: "1px solid #DDD7CC", padding: "18px 16px" }}
    >
      <Image
        src={P.ryutaro} alt="久保 竜太郎" width={56} height={56}
        className="rounded-full object-cover flex-shrink-0"
        style={{ border: "2px solid #DDD7CC" }}
      />
      <div className="min-w-0">
        <p className="font-[family-name:var(--font-mono)] text-[7px] tracking-[0.14em] text-gold m-0 mb-1">
          YOUR CONCIERGE
        </p>
        <p className="font-[family-name:var(--font-serif)] text-[15px] text-ink m-0 mb-1 font-normal">
          久保 竜太郎
        </p>
        <p className="font-[family-name:var(--font-sans)] text-[11px] text-sub leading-[1.65] m-0">
          {t("operator.desc")}
        </p>
        <div className="flex gap-1.5 mt-2 flex-wrap">
          {[t("operator.tag.travel"), t("operator.tag.chiiki")].map((tag) => (
            <span
              key={tag}
              className="font-[family-name:var(--font-sans)] text-[8px] text-accent"
              style={{ background: "#FDF0EE", padding: "2px 7px", borderRadius: 3 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
