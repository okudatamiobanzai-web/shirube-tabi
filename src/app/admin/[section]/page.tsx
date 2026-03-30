"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import AdminShell from "../components/AdminShell";
import ContentTable from "../components/ContentTable";
import ContentForm from "../components/ContentForm";
import ReviewForm from "../components/ReviewForm";
import FAQForm from "../components/FAQForm";
import SettingsForm from "../components/SettingsForm";

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

const SECTION_META: Record<string, { label: string; dataKey: string; layer: string }> = {
  experiences: { label: "体験", dataKey: "experiences", layer: "experience" },
  people: { label: "人", dataKey: "people", layer: "people" },
  stays: { label: "宿", dataKey: "stays", layer: "stay" },
  food: { label: "食", dataKey: "food", layer: "food" },
  items: { label: "アイテム", dataKey: "items", layer: "items" },
  courses: { label: "コース", dataKey: "courses", layer: "courses" },
  reviews: { label: "レビュー", dataKey: "reviews", layer: "reviews" },
  faq: { label: "FAQ", dataKey: "faq", layer: "faq" },
  settings: { label: "サイト設定", dataKey: "settings", layer: "settings" },
};

export default function SectionPage() {
  const params = useParams();
  const section = params.section as string;
  const meta = SECTION_META[section];

  const [content, setContent] = useState<ContentData | null>(null);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const fetchContent = useCallback(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then(setContent)
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchContent();
  }, [fetchContent]);

  const saveContent = async (updated: ContentData) => {
    setSaving(true);
    setMessage("");
    try {
      const token = localStorage.getItem("admin_token") || "";
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        setContent(updated);
        setMessage("保存しました");
        setTimeout(() => setMessage(""), 2000);
      } else {
        setMessage("保存に失敗しました");
      }
    } catch {
      setMessage("通信エラー");
    }
    setSaving(false);
  };

  if (!meta) {
    return (
      <AdminShell>
        <div style={{ padding: "40px", textAlign: "center", color: "#9A9488" }}>
          セクション「{section}」は存在しません
        </div>
      </AdminShell>
    );
  }

  if (!content) {
    return (
      <AdminShell>
        <div style={{ color: "#9A9488" }}>読み込み中...</div>
      </AdminShell>
    );
  }

  // Settings page
  if (section === "settings") {
    return (
      <AdminShell>
        <SettingsForm
          settings={content.settings}
          onSave={(newSettings) => {
            saveContent({ ...content, settings: newSettings });
          }}
        />
      </AdminShell>
    );
  }

  const items = (content as any)[meta.dataKey] || [];

  const handleAdd = () => {
    setEditingItem(null);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updated = { ...content };
    (updated as any)[meta.dataKey] = items.filter((i: any) => i.id !== id);
    saveContent(updated);
  };

  const handleSaveItem = (item: any) => {
    const updated = { ...content };
    const list = [...items];
    const idx = list.findIndex((i: any) => i.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.push(item);
    }
    (updated as any)[meta.dataKey] = list;
    saveContent(updated);
    setShowForm(false);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  // Reviews section
  if (section === "reviews") {
    return (
      <AdminShell>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1E1C18" }}>
              レビュー ({items.length}件)
            </h2>
            <button onClick={handleAdd} style={addBtnStyle}>+ 新規追加</button>
          </div>

          {message && <div style={msgStyle}>{message}</div>}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {items.map((r: any) => (
              <div key={r.id} style={{
                background: "#fff",
                borderRadius: "12px",
                border: "1px solid #DDD7CC",
                padding: "20px",
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "15px" }}>{r.name}</div>
                    <div style={{ fontSize: "12px", color: "#9A9488" }}>{r.area} / {r.date}</div>
                  </div>
                  <div style={{ display: "flex", gap: "6px" }}>
                    <button onClick={() => handleEdit(r)} style={smallBtnStyle}>編集</button>
                    <button
                      onClick={() => { if (confirm("削除しますか？")) handleDelete(r.id); }}
                      style={{ ...smallBtnStyle, color: "#E5382A", borderColor: "#E5382A" }}
                    >
                      削除
                    </button>
                  </div>
                </div>
                <div style={{ fontSize: "14px", color: "#5A5650", marginBottom: "8px", lineHeight: "1.6" }}>
                  {r.text}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ color: "#E5382A", fontSize: "14px" }}>
                    {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                  </div>
                  {r.experienceTitle && (
                    <span style={{ fontSize: "12px", color: "#9A9488", background: "#EFEBE5", padding: "2px 8px", borderRadius: "4px" }}>
                      {r.experienceTitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {showForm && (
            <ReviewForm
              item={editingItem}
              onSave={handleSaveItem}
              onCancel={handleCancel}
            />
          )}
        </div>
      </AdminShell>
    );
  }

  // FAQ section
  if (section === "faq") {
    const sortedItems = [...items].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
    return (
      <AdminShell>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1E1C18" }}>
              FAQ ({items.length}件)
            </h2>
            <button onClick={handleAdd} style={addBtnStyle}>+ 新規追加</button>
          </div>

          {message && <div style={msgStyle}>{message}</div>}

          <div style={{
            background: "#fff",
            borderRadius: "12px",
            border: "1px solid #DDD7CC",
            overflow: "hidden",
          }}>
            {sortedItems.map((faq: any, idx: number) => (
              <div
                key={faq.id}
                style={{
                  padding: "20px 24px",
                  borderTop: idx > 0 ? "1px solid #DDD7CC" : "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "16px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                    <span style={{
                      background: "#EFEBE5",
                      borderRadius: "4px",
                      padding: "2px 8px",
                      fontSize: "11px",
                      color: "#9A9488",
                    }}>
                      #{faq.order || idx + 1}
                    </span>
                    <span style={{
                      background: "#EFEBE5",
                      borderRadius: "4px",
                      padding: "2px 8px",
                      fontSize: "11px",
                      color: "#9A9488",
                    }}>
                      {faq.category || "general"}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "15px", marginBottom: "4px" }}>
                    Q: {faq.question}
                  </div>
                  <div style={{ fontSize: "14px", color: "#5A5650", lineHeight: "1.6" }}>
                    A: {faq.answer}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                  <button onClick={() => handleEdit(faq)} style={smallBtnStyle}>編集</button>
                  <button
                    onClick={() => { if (confirm("削除しますか？")) handleDelete(faq.id); }}
                    style={{ ...smallBtnStyle, color: "#E5382A", borderColor: "#E5382A" }}
                  >
                    削除
                  </button>
                </div>
              </div>
            ))}
            {sortedItems.length === 0 && (
              <div style={{ padding: "40px", textAlign: "center", color: "#9A9488" }}>
                FAQがありません
              </div>
            )}
          </div>

          {showForm && (
            <FAQForm
              item={editingItem}
              onSave={handleSaveItem}
              onCancel={handleCancel}
            />
          )}
        </div>
      </AdminShell>
    );
  }

  // Layer items (experiences, people, stays, food, items, courses)
  return (
    <AdminShell>
      <div>
        {message && <div style={msgStyle}>{message}</div>}

        <ContentTable
          items={items}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          layerLabel={meta.label}
        />

        {showForm && (
          <ContentForm
            item={editingItem}
            layer={meta.layer}
            onSave={handleSaveItem}
            onCancel={handleCancel}
          />
        )}
      </div>
    </AdminShell>
  );
}

const addBtnStyle: React.CSSProperties = {
  padding: "10px 20px",
  background: "#1a2a1a",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
};

const smallBtnStyle: React.CSSProperties = {
  padding: "4px 12px",
  background: "none",
  border: "1px solid #DDD7CC",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
  color: "#5A5650",
};

const msgStyle: React.CSSProperties = {
  background: "#EFEBE5",
  padding: "10px 16px",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1a2a1a",
  marginBottom: "16px",
};
