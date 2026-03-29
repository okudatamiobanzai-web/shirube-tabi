"use client";

import { useState, useCallback } from "react";
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps";
import { AREAS, DRIVE_TIMES, ALL_ITEMS } from "@/data";
import { LAYERS } from "@/lib/constants";
import SectionHeader from "./SectionHeader";
import type { AnyItem } from "@/lib/types";
import { useLang } from "@/lib/lang-context";

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY || "";

// 中標津空港の座標
const AIRPORT = { lat: 43.5775, lng: 144.9600 };
// 初期表示の中心（道東全域が見える位置）
const CENTER = { lat: 43.45, lng: 144.85 };

const LAYER_COLORS: Record<string, string> = {
  experience: "#E5382A",
  person: "#D97706",
  stay: "#2563EB",
  food: "#059669",
  item: "#7C3AED",
};

export default function AreaMap() {
  const { t } = useLang();
  const [selected, setSelected] = useState<AnyItem | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const items = ALL_ITEMS.filter(
    (i) => i.lat && i.lng && (filter === "all" || i.layer === filter)
  );

  const handleMarkerClick = useCallback((item: AnyItem) => {
    setSelected((prev) => (prev?.id === item.id ? null : item));
  }, []);

  return (
    <div className="bg-card rounded-md overflow-hidden" style={{ border: "1px solid #DDD7CC" }}>
      <div className="px-4 pt-4 pb-2">
        <SectionHeader en="Area Map" ja={t("section.areaMap")} />
      </div>

      {/* Layer filter */}
      <div className="flex gap-1.5 px-4 pb-2 overflow-x-auto hide-scrollbar">
        <button
          onClick={() => { setFilter("all"); setSelected(null); }}
          className="py-1 px-2.5 rounded-md border text-[10px] font-[family-name:var(--font-sans)] cursor-pointer whitespace-nowrap"
          style={{
            borderColor: filter === "all" ? "#F08070" : "#DDD7CC",
            background: filter === "all" ? "#FDF0EE" : "transparent",
            color: filter === "all" ? "#E5382A" : "#9A9488",
          }}
        >
          {t("map.all")}
        </button>
        {LAYERS.map((l) => (
          <button
            key={l.id}
            onClick={() => { setFilter(l.id); setSelected(null); }}
            className="py-1 px-2.5 rounded-md border text-[10px] font-[family-name:var(--font-sans)] cursor-pointer whitespace-nowrap"
            style={{
              borderColor: filter === l.id ? "#F08070" : "#DDD7CC",
              background: filter === l.id ? "#FDF0EE" : "transparent",
              color: filter === l.id ? "#E5382A" : "#9A9488",
            }}
          >
            {l.icon} {l.label}
          </button>
        ))}
      </div>

      {/* Google Map */}
      <div className="w-full" style={{ height: 320 }}>
        {!API_KEY ? (
          <div className="w-full h-full flex items-center justify-center bg-soft">
            <p className="font-[family-name:var(--font-sans)] text-[11px] text-mute text-center px-4">
              {t("map.airport")} — {t("map.driveNote")}
            </p>
          </div>
        ) : (
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={CENTER}
            defaultZoom={8.5}
            mapId="shirube-tabi-map"
            mapTypeId="hybrid"
            gestureHandling="greedy"
            disableDefaultUI={false}
            zoomControl={true}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
            style={{ width: "100%", height: "100%" }}
          >
            {/* Airport marker */}
            <AdvancedMarker position={AIRPORT}>
              <div
                className="flex items-center gap-1 rounded-md"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  padding: "4px 8px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
                  border: "1.5px solid #E5382A",
                }}
              >
                <span className="text-[12px]">✈</span>
                <span className="font-[family-name:var(--font-sans)] text-[9px] font-semibold text-ink">
                  {t("map.airport")}
                </span>
              </div>
            </AdvancedMarker>

            {/* Area labels */}
            {AREAS.filter((a) => a.lat && a.lng).map((a) => (
              <AdvancedMarker key={a.id} position={{ lat: a.lat!, lng: a.lng! }}>
                <div
                  className="rounded-md text-center"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    padding: "3px 7px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                    border: "1px solid #DDD7CC",
                  }}
                >
                  <p className="m-0 font-[family-name:var(--font-sans)] text-[10px] font-semibold text-ink leading-none">
                    {a.name}
                  </p>
                  <p className="m-0 mt-0.5 font-[family-name:var(--font-sans)] text-[7px] text-mute leading-none">
                    {a.airport}
                  </p>
                </div>
              </AdvancedMarker>
            ))}

            {/* Experience/item pins */}
            {items.map((item) => (
              <AdvancedMarker
                key={item.id}
                position={{ lat: item.lat!, lng: item.lng! }}
                onClick={() => handleMarkerClick(item)}
              >
                <div
                  className="rounded-full flex items-center justify-center cursor-pointer transition-transform"
                  style={{
                    width: selected?.id === item.id ? 32 : 24,
                    height: selected?.id === item.id ? 32 : 24,
                    background: LAYER_COLORS[item.layer] || "#E5382A",
                    border: "2px solid white",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.35)",
                  }}
                >
                  <span className="text-white text-[10px]">
                    {LAYERS.find((l) => l.id === item.layer)?.icon || "●"}
                  </span>
                </div>
              </AdvancedMarker>
            ))}

            {/* Info window for selected item */}
            {selected && selected.lat && selected.lng && (
              <AdvancedMarker position={{ lat: selected.lat + 0.015, lng: selected.lng }}>
                <div
                  className="rounded-md"
                  style={{
                    background: "white",
                    padding: "10px 12px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                    border: `2px solid ${LAYER_COLORS[selected.layer] || "#E5382A"}`,
                    maxWidth: 200,
                    transform: "translateX(-50%)",
                  }}
                >
                  <p className="m-0 font-[family-name:var(--font-serif)] text-[13px] font-normal text-ink leading-snug">
                    {selected.name}
                  </p>
                  <p className="m-0 mt-1 font-[family-name:var(--font-sans)] text-[10px] text-mute">
                    {selected.area}{selected.price ? ` — ${selected.price}` : ""}
                  </p>
                  <button
                    onClick={() => setSelected(null)}
                    aria-label="閉じる"
                    className="absolute top-1 right-2 bg-transparent border-none text-[12px] text-mute cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
              </AdvancedMarker>
            )}
          </Map>
        </APIProvider>
        )}
      </div>

      {/* Drive times from airport */}
      <div className="px-4 py-3">
        <p className="m-0 mb-2 font-[family-name:var(--font-mono)] text-[7px] tracking-[0.1em] text-gold">
          {t("map.driveTitle")}
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {DRIVE_TIMES.map((d) => (
            <div key={d.to} className="flex justify-between items-center py-0.5">
              <span className="font-[family-name:var(--font-sans)] text-[11px] text-ink">
                {d.to}
              </span>
              <span className="font-[family-name:var(--font-mono)] text-[10px] text-mute">
                {d.duration}
              </span>
            </div>
          ))}
        </div>
        <p className="font-[family-name:var(--font-sans)] text-[9px] text-mute mt-2 m-0">
          {t("map.driveNote")}
        </p>
      </div>
    </div>
  );
}
