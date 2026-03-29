"use client";

import { useLang } from "@/lib/lang-context";

interface Props {
  variant?: "dark" | "light";
}

export default function LangSwitch({ variant = "dark" }: Props) {
  const { lang, setLang } = useLang();

  const isDark = variant === "dark";

  return (
    <button
      onClick={() => setLang(lang === "ja" ? "en" : "ja")}
      className="font-[family-name:var(--font-mono)] text-[9px] tracking-[0.06em] cursor-pointer transition-all"
      style={{
        background: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.04)",
        backdropFilter: "blur(3px)",
        border: isDark ? "1px solid rgba(255,255,255,0.2)" : "1px solid #DDD7CC",
        borderRadius: 14,
        padding: "5px 10px",
        color: isDark ? "rgba(255,255,255,0.8)" : "#9A9488",
      }}
    >
      {lang === "ja" ? "EN" : "JA"}
    </button>
  );
}
