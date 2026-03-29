"use client";

import { useState } from "react";
import { LAYERS, SEASONS } from "@/lib/constants";
import { getItemsByLayer } from "@/data";
import { useMyList } from "@/lib/mylist-context";
import ItemCard from "./ItemCard";
import type { AnyItem, Experience } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import LangSwitch from "./LangSwitch";

interface Props {
  layerId: string;
  onBack: () => void;
  onSelectItem: (item: AnyItem) => void;
}

export default function ListPage({ layerId, onBack, onSelectItem }: Props) {
  const layer = LAYERS.find((l) => l.id === layerId);
  const items = getItemsByLayer(layerId);
  const [cat, setCat] = useState("all");
  const [ssn, setSsn] = useState("all");
  const { myList, toggle } = useMyList();
  const { t, tf } = useLang();

  const cats = layerId === "experience" ? ["all", "海", "牧", "野", "知"] : ["all"];

  const filtered = items.filter((i) => {
    const catMatch = cat === "all" || (i as Experience).cat === cat;
    const ssnMatch = ssn === "all" || !(i as Experience).seasons || (i as Experience).seasons?.includes(ssn);
    return catMatch && ssnMatch;
  });

  return (
    <div className="px-4 pt-4 pb-7">
      <div className="flex justify-between items-center mb-3.5">
        <button
          onClick={onBack}
          className="bg-transparent border-none font-[family-name:var(--font-sans)] text-[12px] text-mute cursor-pointer p-0"
        >
          {t("btn.back")}
        </button>
        <LangSwitch variant="light" />
      </div>

      <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.16em] text-gold m-0 mb-0.5">
        {layer?.en}
      </p>
      <h1 className="m-0 font-[family-name:var(--font-serif)] text-[22px] font-normal text-ink">
        {layer?.label}
      </h1>
      <p className="mt-1 mb-3 font-[family-name:var(--font-sans)] text-[10px] text-mute">
        {filtered.length}{t("list.items")}
      </p>

      {cats.length > 1 && (
        <div className="flex gap-1.5 mb-2 flex-wrap">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className="py-1.5 px-3 rounded-md border text-[10px] font-[family-name:var(--font-sans)] cursor-pointer"
              style={{
                borderColor: cat === c ? "#F08070" : "#DDD7CC",
                background: cat === c ? "#FDF0EE" : "transparent",
                color: cat === c ? "#E5382A" : "#9A9488",
              }}
            >
              {c === "all" ? t("map.all") : c}
            </button>
          ))}
        </div>
      )}

      {layerId === "experience" && (
        <div className="flex gap-1.5 mb-3 overflow-x-auto hide-scrollbar">
          {SEASONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSsn(s.id)}
              className="py-1.5 px-3 rounded-md border text-[10px] font-[family-name:var(--font-sans)] cursor-pointer whitespace-nowrap"
              style={{
                borderColor: ssn === s.id ? "#F08070" : "#DDD7CC",
                background: ssn === s.id ? "#FDF0EE" : "transparent",
                color: ssn === s.id ? "#E5382A" : "#9A9488",
              }}
            >
              {t(`season.${s.id}` as Parameters<typeof t>[0])}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {filtered.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            liked={myList.includes(item.id)}
            onToggle={() => toggle(item.id)}
            onSelect={() => onSelectItem(item)}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="font-[family-name:var(--font-sans)] text-[11px] text-mute text-center py-7">
          {tf("list.noResults", { layer: layer?.label || "" })}
        </p>
      )}
    </div>
  );
}
