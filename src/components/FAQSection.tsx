"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/data/faq";
import SectionHeader from "./SectionHeader";
import { useLang } from "@/lib/lang-context";

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { t } = useLang();

  return (
    <div className="pt-6 pb-2">
      <SectionHeader en="FAQ" ja={t("section.faq")} />
      <div className="flex flex-col gap-0">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              style={{ borderBottom: "1px solid #DDD7CC" }}
            >
              <button
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="w-full flex justify-between items-center py-3.5 px-1 bg-transparent border-none cursor-pointer text-left"
              >
                <span className="font-[family-name:var(--font-sans)] text-[13px] text-ink leading-snug pr-3">
                  {item.question}
                </span>
                <span
                  className="text-[16px] text-mute flex-shrink-0 transition-transform duration-200"
                  style={{ transform: isOpen ? "rotate(45deg)" : "none" }}
                >
                  +
                </span>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{
                  maxHeight: isOpen ? 300 : 0,
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <p className="font-[family-name:var(--font-sans)] text-[12px] text-sub leading-[1.8] m-0 px-1 pb-3.5">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
