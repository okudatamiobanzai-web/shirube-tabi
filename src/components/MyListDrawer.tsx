"use client";

import Image from "next/image";
import { LAYERS } from "@/lib/constants";
import { ALL_ITEMS } from "@/data";
import { useMyList } from "@/lib/mylist-context";
import { useLang } from "@/lib/lang-context";
import { useCallback } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onBuild: () => void;
  onSelectItem: (item: typeof ALL_ITEMS[number]) => void;
}

export default function MyListDrawer({ open, onClose, onBuild, onSelectItem }: Props) {
  const { myList, toggle, clearAll } = useMyList();
  const { t } = useLang();

  const handleClearAll = useCallback(() => {
    if (window.confirm(t("mylist.clearConfirm"))) {
      clearAll();
    }
  }, [clearAll, t]);
  const liked = ALL_ITEMS.filter((i) => myList.includes(i.id));
  const grouped = LAYERS.map((l) => ({
    ...l,
    items: liked.filter((i) => i.layer === l.id),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      {open && (
        <div onClick={onClose} className="fixed inset-0 bg-black/30 z-[998]" role="button" aria-label="閉じる" tabIndex={0} onKeyDown={(e) => { if (e.key === "Escape" || e.key === "Enter") onClose(); }} />
      )}
      <div
        className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto max-h-[75vh] overflow-y-auto z-[999] transition-transform duration-300 ease-out lg:max-w-[430px]"
        style={{
          background: "#F5F1EB",
          borderTop: "1px solid #DDD7CC",
          borderRadius: "6px 6px 0 0",
          transform: open ? "translateY(0)" : "translateY(100%)",
        }}
      >
        <div
          className="px-4.5 pt-4 flex justify-between items-center sticky top-0 z-[1]"
          style={{ background: "#F5F1EB" }}
        >
          <div>
            <p className="font-[family-name:var(--font-mono)] text-[7px] tracking-[0.12em] text-gold m-0 mb-0.5">
              MY LIST
            </p>
            <h2 className="m-0 font-[family-name:var(--font-serif)] text-[16px] font-normal text-ink">
              {t("mylist.title")}
            </h2>
          </div>
          <button onClick={onClose} aria-label="閉じる" className="bg-transparent border-none text-[18px] cursor-pointer text-mute">
            ✕
          </button>
        </div>

        <div className="px-4.5 pt-3 pb-5">
          {grouped.length === 0 ? (
            <p className="font-[family-name:var(--font-sans)] text-[11px] text-mute text-center py-6 leading-[1.7] whitespace-pre-line">
              {t("mylist.empty")}
            </p>
          ) : (
            grouped.map((g) => (
              <div key={g.id} className="mb-3.5">
                <p className="font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] text-gold m-0 mb-1.5">
                  {g.en}
                </p>
                {g.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2.5 py-2"
                    style={{ borderBottom: "1px solid #DDD7CC" }}
                  >
                    <Image
                      src={item.photo} alt={item.name} width={40} height={40}
                      className="object-cover rounded-md flex-shrink-0"
                      unoptimized
                    />
                    <div
                      className="flex-1 cursor-pointer min-w-0"
                      onClick={() => { onClose(); onSelectItem(item); }}
                    >
                      <p className="m-0 font-[family-name:var(--font-sans)] text-[11px] text-ink overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.name}
                      </p>
                      <p className="m-0 mt-0.5 font-[family-name:var(--font-sans)] text-[9px] text-mute">
                        {item.area}
                      </p>
                    </div>
                    <button
                      onClick={() => toggle(item.id)}
                      aria-label={`${item.name}を削除`}
                      className="bg-transparent border-none text-[11px] text-mute cursor-pointer flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            ))
          )}

          {grouped.length > 0 && (
            <div className="mt-1.5">
              <button
                onClick={onBuild}
                className="w-full py-3 bg-accent text-white border-none rounded-md font-[family-name:var(--font-serif)] text-[13px] cursor-pointer"
              >
                {t("btn.buildFromList")}
              </button>
              <button
                onClick={handleClearAll}
                className="w-full mt-2 py-2 bg-transparent border-none font-[family-name:var(--font-sans)] text-[11px] text-mute cursor-pointer underline"
              >
                {t("mylist.clearAll")}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
