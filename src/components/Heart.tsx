"use client";

interface Props {
  on: boolean;
  onClick: () => void;
  size?: number;
}

export default function Heart({ on, onClick, size = 15 }: Props) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      aria-label={on ? "マイリストから削除" : "マイリストに追加"}
      aria-pressed={on}
      className="flex items-center justify-center rounded-full cursor-pointer transition-all duration-200"
      style={{
        background: on ? "rgba(229,56,42,0.12)" : "rgba(0,0,0,0.04)",
        border: `1px solid ${on ? "#F08070" : "#DDD7CC"}`,
        width: size + 14,
        height: size + 14,
        fontSize: size,
        color: on ? "#E5382A" : "#9A9488",
      }}
    >
      {on ? "♥" : "♡"}
    </button>
  );
}
