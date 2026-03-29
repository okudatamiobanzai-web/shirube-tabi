"use client";

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Course } from "./types";

interface MyListContextType {
  myList: string[];
  toggle: (id: string) => void;
  addAll: (ids: string[]) => void;
  clearAll: () => void;
  isLiked: (id: string) => boolean;
  baseCourse: Course | null;
  setBaseCourse: (c: Course | null) => void;
}

const MyListContext = createContext<MyListContextType | null>(null);

export function MyListProvider({ children }: { children: ReactNode }) {
  const [myList, setMyList] = useState<string[]>([]);
  const [baseCourse, setBaseCourse] = useState<Course | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("shirube-mylist");
    if (saved) {
      try { setMyList(JSON.parse(saved)); } catch { /* ignore */ }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("shirube-mylist", JSON.stringify(myList));
    }
  }, [myList, loaded]);

  const toggle = useCallback((id: string) => {
    setMyList((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  }, []);

  const addAll = useCallback((ids: string[]) => {
    setMyList((prev) => {
      const newList = [...prev];
      ids.forEach((id) => { if (!newList.includes(id)) newList.push(id); });
      return newList;
    });
  }, []);

  const clearAll = useCallback(() => {
    setMyList([]);
  }, []);

  const isLiked = useCallback((id: string) => myList.includes(id), [myList]);

  return (
    <MyListContext.Provider value={{ myList, toggle, addAll, clearAll, isLiked, baseCourse, setBaseCourse }}>
      {children}
    </MyListContext.Provider>
  );
}

export function useMyList() {
  const ctx = useContext(MyListContext);
  if (!ctx) throw new Error("useMyList must be used within MyListProvider");
  return ctx;
}
