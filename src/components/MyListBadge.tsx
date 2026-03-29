"use client";

import { useMyList } from "@/lib/mylist-context";

interface Props {
  onClick: () => void;
}

export default function MyListBadge({ onClick }: Props) {
  const { myList } = useMyList();

  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card flex items-center gap-2 z-[100] cursor-pointer font-[family-name:var(--font-mono)] text-[9px] tracking-[0.08em] text-gold"
      style={{
        border: "1px solid #F08070",
        borderRadius: 22,
        padding: "9px 18px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      ♡ MY LIST
      {myList.length > 0 && (
        <span
          className="bg-gold text-white rounded-full flex items-center justify-center font-[family-name:var(--font-sans)] text-[9px] font-bold"
          style={{ width: 17, height: 17 }}
        >
          {myList.length}
        </span>
      )}
    </button>
  );
}
