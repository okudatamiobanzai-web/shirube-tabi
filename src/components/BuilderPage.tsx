"use client";

import { useState } from "react";
import Image from "next/image";
import { LAYERS } from "@/lib/constants";
import { ALL_ITEMS } from "@/data";
import { useMyList } from "@/lib/mylist-context";

import { useLang } from "@/lib/lang-context";
import LangSwitch from "./LangSwitch";

interface Props {
  onBack: () => void;
}

export default function BuilderPage({ onBack }: Props) {
  const { myList, toggle, baseCourse } = useMyList();
  const { t, tf } = useLang();
  const liked = ALL_ITEMS.filter((i) => myList.includes(i.id));
  const grouped = LAYERS.map((l) => ({
    ...l,
    items: liked.filter((i) => i.layer === l.id),
  })).filter((g) => g.items.length > 0);

  const [sent, setSent] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [when, setWhen] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [days, setDays] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const [transport, setTransport] = useState<string | null>(null);
  const [bgt, setBgt] = useState<string | null>(null);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = t("error.name");
    if (!email.trim()) e.email = t("error.email");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = t("error.emailInvalid");
    if (!when.trim()) e.when = t("error.when");
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // フォーム内容をまとめてLINEに送信
    const wish = (document.querySelector("textarea") as HTMLTextAreaElement)?.value || "";
    const phone = (document.querySelectorAll("input[placeholder='090-xxxx-xxxx']")[0] as HTMLInputElement)?.value || "";
    const mylistNames = liked.map((i) => i.name).join("、") || "なし";
    const courseInfo = baseCourse?.title || "なし";

    const lines = [
      `【しるべ旅 相談】`,
      `お名前: ${name}`,
      `メール: ${email}`,
      `時期: ${when}`,
      ...(days ? [`日数: ${days}`] : []),
      ...(style ? [`スタイル: ${style}`] : []),
      ...(transport ? [`交通手段: ${transport}`] : []),
      ...(bgt ? [`予算: ${bgt}`] : []),
      ...(wish ? [`ご要望: ${wish}`] : []),
      ...(phone ? [`電話: ${phone}`] : []),
      `気になる体験: ${mylistNames}`,
      ...(courseInfo !== "なし" ? [`ベースコース: ${courseInfo}`] : []),
    ];

    const body = encodeURIComponent(lines.join("\n"));
    // しるべ旅 LINE公式アカウントにメッセージを送信
    // @shirubelab のLINE ID（適宜変更してください）
    const lineUrl = `https://line.me/R/oaMessage/@shirubelab/?${body}`;

    window.open(lineUrl, "_blank");
    setSent(true);
  };

  const inputClass =
    "w-full py-2.5 px-3 rounded-md bg-card text-ink text-[12px] font-[family-name:var(--font-sans)] outline-none box-border";

  const Chip = ({
    value, current, set, label,
  }: {
    value: string; current: string | null; set: (v: string | null) => void; label: string;
  }) => (
    <button
      onClick={() => set(value === current ? null : value)}
      className="py-1.5 px-3 rounded-md border text-[11px] font-[family-name:var(--font-sans)] cursor-pointer transition-all"
      style={{
        borderColor: value === current ? "#F08070" : "#DDD7CC",
        background: value === current ? "#FDF0EE" : "transparent",
        color: value === current ? "#E5382A" : "#5A5650",
      }}
    >
      {label}
    </button>
  );

  if (sent) {
    return (
      <div className="px-6 py-20 text-center">
        <div className="w-px h-8 mx-auto mb-4" style={{ background: "#E5382A" }} />
        <p className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.16em] text-gold m-0 mb-2">
          THANK YOU
        </p>
        <h2 className="font-[family-name:var(--font-serif)] text-[21px] text-ink m-0 mb-3 font-normal">
          {t("thanks.title")}
        </h2>
        <p className="font-[family-name:var(--font-sans)] text-[12px] text-sub leading-[1.8] whitespace-pre-line">
          {t("thanks.body")}
        </p>
        <p className="font-[family-name:var(--font-serif)] text-[12px] text-mute mt-5 italic">
          {t("thanks.footer")}
        </p>
      </div>
    );
  }

  return (
    <div className="px-4 pt-4 pb-9">
      <div className="flex justify-between items-center mb-3.5">
        <button
          onClick={onBack}
          className="bg-transparent border-none font-[family-name:var(--font-sans)] text-[12px] text-mute cursor-pointer p-0"
        >
          {t("btn.back")}
        </button>
        <LangSwitch variant="light" />
      </div>

      <p className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.16em] text-gold m-0 mb-0.5">
        BUILD YOUR TRIP
      </p>
      <h1 className="m-0 mb-1.5 font-[family-name:var(--font-serif)] text-[21px] font-normal text-ink">
        {t("builder.title")}
      </h1>
      <p className="font-[family-name:var(--font-sans)] text-[11px] text-mute m-0 mb-4 leading-relaxed">
        {t("builder.subtitle")}
      </p>

      {/* Base course banner */}
      {baseCourse && (
        <div
          className="rounded-md mb-3.5 relative"
          style={{
            border: "1px solid #F08070",
            padding: "14px 16px",
            background: "#FDF0EE",
          }}
        >
          <p className="m-0 mb-1 font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] text-gold">
            BASED ON MODEL COURSE
          </p>
          <p className="m-0 mb-1 font-[family-name:var(--font-serif)] text-[16px] text-ink font-normal">
            {baseCourse.title}
          </p>
          <p className="m-0 font-[family-name:var(--font-sans)] text-[11px] text-sub">
            {baseCourse.sub} ・ {baseCourse.price}
          </p>
          <div className="mt-2.5 pt-2.5" style={{ borderTop: "1px solid rgba(212,184,140,0.25)" }}>
            {baseCourse.days.map((d) => (
              <div key={d.day} className="mb-1">
                <span className="font-[family-name:var(--font-mono)] text-[8px] text-gold mr-1.5">
                  DAY {d.day}
                </span>
                <span className="font-[family-name:var(--font-sans)] text-[10px] text-sub">
                  {d.items.join(" → ")}
                </span>
              </div>
            ))}
          </div>
          <p className="m-0 mt-2 font-[family-name:var(--font-sans)] text-[10px] text-mute italic">
            {t("builder.arrangeNote")}
          </p>
        </div>
      )}

      {/* STEP 1 */}
      <div
        className="rounded-md mb-3.5 bg-card"
        style={{ border: "1px solid #DDD7CC", padding: 16 }}
      >
        <p className="m-0 mb-3 font-[family-name:var(--font-mono)] text-[8px] tracking-[0.1em] text-gold">
          {t("builder.step1")}
        </p>

        <label htmlFor="builder-name" className="block font-[family-name:var(--font-sans)] text-[11px] text-ink mb-1.5 font-semibold">
          {t("builder.name")}<span className="text-[#C45C4A] text-[9px] ml-1">*</span>
        </label>
        <input
          id="builder-name"
          placeholder={t("builder.namePh")} value={name} onChange={(e) => setName(e.target.value)}
          className={inputClass}
          style={{ border: `1px solid ${errors.name ? "#E5382A" : "#DDD7CC"}`, marginBottom: errors.name ? 2 : 14 }}
        />
        {errors.name && <p className="m-0 mb-2 font-[family-name:var(--font-sans)] text-[10px] text-accent">{errors.name}</p>}

        <label htmlFor="builder-email" className="block font-[family-name:var(--font-sans)] text-[11px] text-ink mb-1.5 font-semibold">
          {t("builder.email")}<span className="text-[#C45C4A] text-[9px] ml-1">*</span>
        </label>
        <input
          id="builder-email"
          placeholder="your@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          style={{ border: `1px solid ${errors.email ? "#E5382A" : "#DDD7CC"}`, marginBottom: errors.email ? 2 : 14 }}
        />
        {errors.email && <p className="m-0 mb-2 font-[family-name:var(--font-sans)] text-[10px] text-accent">{errors.email}</p>}

        <label htmlFor="builder-when" className="block font-[family-name:var(--font-sans)] text-[11px] text-ink mb-1.5 font-semibold">
          {t("builder.when")}<span className="text-[#C45C4A] text-[9px] ml-1">*</span>
        </label>
        <input
          id="builder-when"
          placeholder={t("builder.whenPh")} value={when} onChange={(e) => setWhen(e.target.value)}
          className={inputClass}
          style={{ border: `1px solid ${errors.when ? "#E5382A" : "#DDD7CC"}` }}
        />
        {errors.when && <p className="m-0 mt-0.5 font-[family-name:var(--font-sans)] text-[10px] text-accent">{errors.when}</p>}
      </div>

      {/* Submit (Step 1 only) */}
      <button
        onClick={handleSubmit}
        className="w-full py-3.5 bg-accent text-white border-none rounded-md font-[family-name:var(--font-serif)] text-[14px] cursor-pointer mb-1.5"
      >
        {t("btn.submit")}
      </button>
      <p className="font-[family-name:var(--font-sans)] text-[9px] text-mute text-center mb-4">
        {t("builder.submitNote")}
      </p>

      {/* STEP 2 (collapsible) */}
      <button
        onClick={() => setShowMore(!showMore)}
        className="w-full py-3 px-3.5 rounded-md cursor-pointer flex justify-between items-center mb-0 transition-all"
        style={{
          background: showMore ? "#FDF0EE" : "transparent",
          border: `1px solid ${showMore ? "#F08070" : "#DDD7CC"}`,
          marginBottom: showMore ? 14 : 0,
        }}
      >
        <div className="text-left">
          <p className="m-0 font-[family-name:var(--font-sans)] text-[12px] text-ink font-semibold">
            {t("builder.moreTitle")}
          </p>
          <p className="m-0 mt-0.5 font-[family-name:var(--font-sans)] text-[10px] text-mute">
            {t("builder.moreSub")}
          </p>
        </div>
        <span
          className="text-[14px] text-gold transition-transform"
          style={{ transform: showMore ? "rotate(180deg)" : "none" }}
        >
          ▼
        </span>
      </button>

      {showMore && (
        <div className="animate-fade-in">
          {/* Travel details */}
          <div className="rounded-md mb-3 bg-card" style={{ border: "1px solid #DDD7CC", padding: 14 }}>
            <p className="m-0 mb-2.5 font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] text-gold">
              ABOUT YOUR TRIP
            </p>

            <label className="block font-[family-name:var(--font-sans)] text-[10px] text-mute mb-1.5">
              {t("builder.withWhom")}
            </label>
            <div className="flex gap-1.5 mb-3.5 flex-wrap">
              {(["couple", "family", "friends", "solo", "group"] as const).map((v) => (
                <Chip key={v} value={v} current={style} set={setStyle} label={t(`chip.${v}`)} />
              ))}
            </div>

            <label className="block font-[family-name:var(--font-sans)] text-[10px] text-mute mb-1.5">
              {t("builder.days")}
            </label>
            <div className="flex gap-1.5 mb-3.5 flex-wrap">
              {(["1n", "2n", "3n", "4n"] as const).map((v) => (
                <Chip key={v} value={v} current={days} set={setDays} label={t(`chip.${v}`)} />
              ))}
            </div>

            <label className="block font-[family-name:var(--font-sans)] text-[10px] text-mute mb-1.5">
              {t("builder.transport")}
            </label>
            <div className="flex gap-1.5 mb-3.5 flex-wrap">
              {(["car", "nocar", "rent"] as const).map((v) => (
                <Chip key={v} value={v} current={transport} set={setTransport} label={t(`chip.${v}`)} />
              ))}
            </div>

            <label className="block font-[family-name:var(--font-sans)] text-[10px] text-mute mb-1.5">
              {t("builder.budget")}
            </label>
            <div className="flex gap-1.5 flex-wrap">
              {(["any", "30k", "50k", "100k", "100k+"] as const).map((v) => (
                <Chip key={v} value={v} current={bgt} set={setBgt} label={t(`chip.${v}`)} />
              ))}
            </div>
          </div>

          {/* Free text */}
          <div className="rounded-md mb-3 bg-card" style={{ border: "1px solid #DDD7CC", padding: 14 }}>
            <p className="m-0 mb-1.5 font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] text-gold">
              YOUR WISH
            </p>
            <textarea
              rows={3}
              placeholder={t("builder.wishPh")}
              className={inputClass}
              style={{ border: "1px solid #DDD7CC", resize: "vertical", lineHeight: 1.7 }}
            />
          </div>

          {/* Phone */}
          <div className="rounded-md mb-3 bg-card" style={{ border: "1px solid #DDD7CC", padding: 14 }}>
            <label className="block font-[family-name:var(--font-sans)] text-[10px] text-mute mb-1">
              {t("builder.phone")}
            </label>
            <input placeholder="090-xxxx-xxxx" className={inputClass} style={{ border: "1px solid #DDD7CC" }} />
          </div>

          {/* Selected items */}
          {liked.length > 0 && (
            <div className="rounded-md mb-3 bg-card" style={{ border: "1px solid #DDD7CC", padding: 14 }}>
              <p className="m-0 mb-2 font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] text-gold">
                SELECTED ITEMS — {tf("builder.selectedCount", { count: String(liked.length) })}
              </p>
              <p className="m-0 mb-2 font-[family-name:var(--font-sans)] text-[10px] text-mute">
                {t("builder.selectedItems")}
              </p>
              {grouped.map((g) =>
                g.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 py-1.5"
                    style={{ borderBottom: "1px solid #DDD7CC" }}
                  >
                    <Image
                      src={item.photo} alt={item.name} width={30} height={30}
                      className="object-cover rounded-md flex-shrink-0"
                      unoptimized
                    />
                    <div className="flex-1 min-w-0">
                      <p className="m-0 font-[family-name:var(--font-sans)] text-[10px] text-ink overflow-hidden text-ellipsis whitespace-nowrap">
                        {item.name}
                      </p>
                    </div>
                    <button
                      onClick={() => toggle(item.id)}
                      aria-label={`${item.name}を削除`}
                      className="bg-transparent border-none text-[9px] text-mute cursor-pointer flex-shrink-0"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Second submit */}
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 bg-accent text-white border-none rounded-md font-[family-name:var(--font-serif)] text-[14px] cursor-pointer mb-1"
          >
            {t("btn.submit")}
          </button>
          <p className="font-[family-name:var(--font-sans)] text-[9px] text-mute text-center">
            {t("builder.submitNote2")}
          </p>
        </div>
      )}
    </div>
  );
}
