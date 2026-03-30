"use client";

import { useState, useEffect } from "react";

interface Props {
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollToTop({ scrollRef }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setShow(el.scrollTop > 300);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [scrollRef]);

  if (!show) return null;

  return (
    <button
      onClick={() => {
        scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      }}
      aria-label="トップに戻る"
      className="fixed z-[99] flex items-center justify-center cursor-pointer transition-all duration-200"
      style={{
        bottom: 68,
        right: 16,
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#FFFFFF",
        border: "1px solid #DDD7CC",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        color: "#5A5650",
        fontSize: 14,
      }}
    >
      ↑
    </button>
  );
}
