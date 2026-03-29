"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Lang } from "./i18n";
import { t as translate, tf as translateF, type TKey } from "./i18n";

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: TKey) => string;
  tf: (key: TKey, vars: Record<string, string>) => string;
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ja");

  useEffect(() => {
    const saved = localStorage.getItem("shirube-lang") as Lang | null;
    if (saved === "en" || saved === "ja") {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("shirube-lang", l);
    document.documentElement.lang = l;
  }, []);

  const t = useCallback((key: TKey) => translate(key, lang), [lang]);
  const tf = useCallback((key: TKey, vars: Record<string, string>) => translateF(key, lang, vars), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t, tf }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
