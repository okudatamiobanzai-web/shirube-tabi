"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { P } from "@/data/photos";
import { LAYERS, SEASONS } from "@/lib/constants";
import { EXPERIENCES, COURSES } from "@/data";
import { useMyList } from "@/lib/mylist-context";
import SectionHeader from "./SectionHeader";
import ItemCard from "./ItemCard";
import AreaMap from "./AreaMap";
import CourseCard from "./CourseCard";
import CourseModal from "./CourseModal";
import Operator from "./Operator";
import type { Course, AnyItem } from "@/lib/types";
import { useLang } from "@/lib/lang-context";
import LangSwitch from "./LangSwitch";

interface Props {
  onNavigate: (page: string, layerId?: string) => void;
  onSelectItem: (item: AnyItem) => void;
}

export default function TopPage({ onNavigate, onSelectItem }: Props) {
  const [visible, setVisible] = useState(false);
  const [ssn, setSsn] = useState("all");
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  const { myList, toggle, addAll, setBaseCourse } = useMyList();
  const { t } = useLang();

  useEffect(() => {
    setTimeout(() => setVisible(true), 60);
  }, []);

  const filteredExperiences = EXPERIENCES.filter(
    (e) => ssn === "all" || e.seasons?.includes(ssn)
  );

  const handleConsultCourse = (course: Course) => {
    setModalCourse(null);
    addAll(course.ids);
    setBaseCourse(course);
    onNavigate("builder");
  };

  return (
    <div>
      {/* Hero */}
      <div className="relative h-[460px] overflow-hidden">
        <Image
          src={P.hero} alt="道東の風景" fill
          className="object-cover photo-film-dark" sizes="430px" priority unoptimized
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(30,28,24,0.35), rgba(30,28,24,0.92))" }}
        />
        <div
          className="absolute inset-0 flex flex-col justify-end px-5 pb-10"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "all 0.8s ease",
          }}
        >
          <div className="flex justify-between items-start">
            <p className="font-[family-name:var(--font-mono)] text-[8px] tracking-[0.22em] m-0 mb-3"
              style={{ color: "#E5382A" }}>
              DOTO, HOKKAIDO
            </p>
            <LangSwitch />
          </div>
          <img src="/images/logo.png" alt="しるべ旅" className="mb-2" style={{ width: "180px", height: "auto" }} />
          <h1 className="sr-only">
            しるべ旅
          </h1>
          <div className="w-8 h-px my-4" style={{ background: "#E5382A" }} />
          <p className="font-[family-name:var(--font-sans)] text-[12px] text-white/70 leading-[1.9] m-0 max-w-[280px]">
            {t("hero.tagline")}
          </p>
        </div>
      </div>

      <div className="px-4">
        {/* 5 Layers */}
        <div className="pt-6">
          <SectionHeader en="Five Layers" ja={t("section.fiveLayers")} />
          <div className="grid grid-cols-5 gap-1.5">
            {LAYERS.map((l, i) => (
              <button
                key={l.id}
                onClick={() => onNavigate("list", l.id)}
                className="bg-card border cursor-pointer text-center rounded-md transition-all"
                style={{
                  borderColor: "#DDD7CC",
                  padding: "14px 2px 10px",
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${i * 70 + 400}ms`,
                }}
              >
                <div className="font-[family-name:var(--font-serif)] text-[18px] text-gold">{l.icon}</div>
                <div className="font-[family-name:var(--font-sans)] text-[10px] font-semibold text-ink mt-1">{l.label}</div>
                <div className="font-[family-name:var(--font-mono)] text-[6px] text-mute mt-0.5 tracking-[0.06em]">{l.en}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Model Courses */}
        <div className="pt-6">
          <SectionHeader
            en="Model Course"
            ja={t("section.modelCourse")}
            sub={t("section.modelCourseSub")}
          />
          <div className="flex gap-2.5 overflow-x-auto snap-x hide-scrollbar pb-1.5 -mx-4 px-4">
            {COURSES.map((c) => (
              <CourseCard key={c.id} course={c} onTap={setModalCourse} />
            ))}
          </div>
        </div>

        {/* Area Map */}
        <div className="py-6">
          <AreaMap />
        </div>

        {/* Seasonal Picks */}
        <div className="pb-1">
          <SectionHeader en="Seasonal Picks" ja={t("section.seasonalPicks")} />
          <div className="flex gap-1.5 mb-3 overflow-x-auto hide-scrollbar pb-0.5">
            {SEASONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setSsn(s.id)}
                className="py-1.5 px-3 rounded-md border text-[11px] font-[family-name:var(--font-sans)] cursor-pointer whitespace-nowrap transition-all"
                style={{
                  borderColor: ssn === s.id ? "#F08070" : "#DDD7CC",
                  background: ssn === s.id ? "#FDF0EE" : "transparent",
                  color: ssn === s.id ? "#E5382A" : "#9A9488",
                  fontWeight: ssn === s.id ? 600 : 400,
                }}
              >
                {t(`season.${s.id}` as Parameters<typeof t>[0])}
              </button>
            ))}
          </div>
          {filteredExperiences.length === 0 ? (
            <p className="font-[family-name:var(--font-sans)] text-[11px] text-mute text-center py-4">
              {t("list.noSeason")}
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {filteredExperiences.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  liked={myList.includes(item.id)}
                  onToggle={() => toggle(item.id)}
                  onSelect={() => onSelectItem(item)}
                />
              ))}
            </div>
          )}
        </div>

        {/* All Inclusive */}
        <div className="my-6 relative overflow-hidden rounded-md">
          <Image
            src={P.vision} alt="道東の自然" width={430} height={160}
            className="w-full h-[160px] object-cover"
            style={{ filter: "saturate(0.55) brightness(0.42)" }}
            unoptimized
          />
          <div className="absolute inset-0 p-5 flex flex-col justify-center">
            <p className="font-[family-name:var(--font-mono)] text-[7px] tracking-[0.16em] m-0 mb-1.5"
              style={{ color: "#E5382A" }}>
              ALL-INCLUSIVE
            </p>
            <p className="font-[family-name:var(--font-serif)] text-[17px] text-white m-0 mb-1.5 font-normal leading-snug whitespace-pre-line">
              {t("section.allInclusive.title")}
            </p>
            <p className="font-[family-name:var(--font-sans)] text-[10px] text-white/68 m-0 leading-[1.7] max-w-[240px]">
              {t("section.allInclusive.desc")}
            </p>
          </div>
        </div>

        {/* Operator */}
        <div className="pb-5">
          <SectionHeader en="Your Concierge" ja={t("section.concierge")} />
          <Operator />
        </div>

        {/* CTA */}
        <div className="pb-9 text-center">
          <button
            onClick={() => onNavigate("builder")}
            className="w-full py-3.5 bg-accent text-white border-none rounded-md font-[family-name:var(--font-serif)] text-[14px] cursor-pointer tracking-[0.04em]"
          >
            {t("btn.buildTrip")}
          </button>
          <p className="font-[family-name:var(--font-sans)] text-[10px] text-mute mt-2">
            {t("btn.buildTripSub")}
          </p>
        </div>

        {/* Footer */}
        <div className="text-center py-5" style={{ borderTop: "1px solid #DDD7CC" }}>
          <img src="/images/logo.png" alt="しるべ旅" className="mx-auto mb-2" style={{ width: "120px", height: "auto" }} />
          <p className="font-[family-name:var(--font-mono)] text-[7px] text-mute tracking-[0.14em] m-0 mb-1.5">
            SHIRUBE TABI — DOTO, HOKKAIDO
          </p>
          <a
            href="https://line.me/R/oaMessage/@shirubelab/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block font-[family-name:var(--font-sans)] text-[10px] text-accent no-underline mb-2"
          >
            💬 {t("footer.contact")}
          </a>
          <p className="font-[family-name:var(--font-sans)] text-[8px] text-mute">
            {t("footer.copyright")}
          </p>
        </div>
      </div>

      <CourseModal
        course={modalCourse}
        onClose={() => setModalCourse(null)}
        onAddAll={addAll}
        onConsult={handleConsultCourse}
        myList={myList}
      />
    </div>
  );
}
