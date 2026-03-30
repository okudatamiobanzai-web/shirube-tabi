"use client";

import { useEffect, useState } from "react";
import AdminShell from "../components/AdminShell";

interface ContentData {
  experiences: any[];
  people: any[];
  stays: any[];
  food: any[];
  items: any[];
  courses: any[];
  reviews: any[];
  faq: any[];
  settings: any;
}

const SECTIONS = [
  { key: "experiences", label: "体験", icon: "🎯", href: "/admin/experiences" },
  { key: "people", label: "人", icon: "👤", href: "/admin/people" },
  { key: "stays", label: "宿", icon: "🏠", href: "/admin/stays" },
  { key: "food", label: "食", icon: "🍽", href: "/admin/food" },
  { key: "items", label: "アイテム", icon: "🚗", href: "/admin/items" },
  { key: "courses", label: "コース", icon: "🗺", href: "/admin/courses" },
  { key: "reviews", label: "レビュー", icon: "⭐", href: "/admin/reviews" },
  { key: "faq", label: "FAQ", icon: "❓", href: "/admin/faq" },
];

export default function DashboardPage() {
  const [content, setContent] = useState<ContentData | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => {});
  }, []);

  return (
    <AdminShell>
      <div>
        <h1 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "8px", color: "#1E1C18" }}>
          ダッシュボード
        </h1>
        <p style={{ fontSize: "14px", color: "#9A9488", marginBottom: "32px" }}>
          しるべ旅コンテンツ管理
        </p>

        {!content ? (
          <div style={{ color: "#9A9488" }}>読み込み中...</div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px",
          }}>
            {SECTIONS.map((section) => {
              const count = (content as any)[section.key]?.length || 0;
              return (
                <a
                  key={section.key}
                  href={section.href}
                  style={{
                    background: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #DDD7CC",
                    padding: "24px",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "box-shadow 0.15s",
                    display: "block",
                  }}
                >
                  <div style={{ fontSize: "28px", marginBottom: "12px" }}>{section.icon}</div>
                  <div style={{ fontSize: "14px", color: "#9A9488", marginBottom: "4px" }}>{section.label}</div>
                  <div style={{ fontSize: "32px", fontWeight: 700, color: "#1E1C18" }}>{count}</div>
                  <div style={{ fontSize: "12px", color: "#9A9488", marginTop: "4px" }}>件</div>
                </a>
              );
            })}

            <a
              href="/admin/settings"
              style={{
                background: "#1a2a1a",
                borderRadius: "12px",
                padding: "24px",
                textDecoration: "none",
                color: "#fff",
                display: "block",
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "12px" }}>⚙</div>
              <div style={{ fontSize: "14px", opacity: 0.7, marginBottom: "4px" }}>設定</div>
              <div style={{ fontSize: "16px", fontWeight: 600 }}>サイト設定</div>
              <div style={{ fontSize: "12px", opacity: 0.5, marginTop: "4px" }}>ヒーロー画像・タイトルなど</div>
            </a>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
