"use client";

import { useLang } from "@/lib/lang-context";

interface Props {
  title: string;
  text?: string;
}

export default function ShareButtons({ title, text }: Props) {
  const { t } = useLang();
  const url = typeof window !== "undefined" ? window.location.origin : "https://tabi.shirubelab.jp";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text || title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert(t("share.copied"));
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      alert(t("share.copied"));
    }
  };

  const shareItems = [
    {
      label: "LINE",
      icon: "💬",
      href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
    },
    {
      label: "𝕏",
      icon: "𝕏",
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: "📘",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
  ];

  return (
    <div className="flex gap-2 items-center">
      <span className="font-[family-name:var(--font-sans)] text-[10px] text-mute">{t("share.label")}</span>
      {shareItems.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 py-1 px-2.5 rounded-md no-underline transition-all"
          style={{ border: "1px solid #DDD7CC", background: "#FFFFFF" }}
        >
          <span className="text-[11px]">{s.icon}</span>
          <span className="font-[family-name:var(--font-sans)] text-[10px] text-sub">{s.label}</span>
        </a>
      ))}
      <button
        onClick={handleCopy}
        className="flex items-center gap-1 py-1 px-2.5 rounded-md cursor-pointer transition-all"
        style={{ border: "1px solid #DDD7CC", background: "#FFFFFF" }}
      >
        <span className="text-[11px]">🔗</span>
        <span className="font-[family-name:var(--font-sans)] text-[10px] text-sub">{t("share.copy")}</span>
      </button>
    </div>
  );
}
