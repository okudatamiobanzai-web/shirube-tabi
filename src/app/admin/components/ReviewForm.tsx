"use client";

import { useState, useEffect } from "react";

interface ReviewFormProps {
  item: any | null;
  onSave: (item: any) => void;
  onCancel: () => void;
}

export default function ReviewForm({ item, onSave, onCancel }: ReviewFormProps) {
  const isNew = !item;
  const [form, setForm] = useState({
    id: "",
    name: "",
    area: "",
    text: "",
    rating: 5,
    experienceTitle: "",
    date: "",
  });

  useEffect(() => {
    if (item) {
      setForm({ ...form, ...item });
    }
  }, [item]);

  const handleChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = { ...form };
    if (isNew && !result.id) {
      result.id = `r${Date.now()}`;
    }
    onSave(result);
  };

  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700 }}>
            {isNew ? "レビュー追加" : "レビュー編集"}
          </h3>
          <button onClick={onCancel} style={closeBtnStyle}>x</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>名前</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                style={inputStyle}
                placeholder="M.S.さん"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>地域</label>
              <input
                type="text"
                value={form.area}
                onChange={(e) => handleChange("area", e.target.value)}
                style={inputStyle}
                placeholder="東京都"
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>レビュー本文</label>
            <textarea
              value={form.text}
              onChange={(e) => handleChange("text", e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>評価 (1-5)</label>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => handleChange("rating", n)}
                    style={{
                      width: "36px",
                      height: "36px",
                      border: "1px solid #DDD7CC",
                      borderRadius: "6px",
                      background: form.rating >= n ? "#E5382A" : "#fff",
                      color: form.rating >= n ? "#fff" : "#5A5650",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>日付</label>
              <input
                type="text"
                value={form.date}
                onChange={(e) => handleChange("date", e.target.value)}
                style={inputStyle}
                placeholder="2025-08"
              />
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>体験タイトル</label>
            <input
              type="text"
              value={form.experienceTitle}
              onChange={(e) => handleChange("experienceTitle", e.target.value)}
              style={inputStyle}
              placeholder="漁師の船釣り体験"
            />
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #DDD7CC" }}>
            <button type="button" onClick={onCancel} style={cancelBtnStyle}>キャンセル</button>
            <button type="submit" style={saveBtnStyle}>{isNew ? "追加" : "更新"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = { position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 };
const modalStyle: React.CSSProperties = { background: "#fff", borderRadius: "16px", padding: "32px", width: "90%", maxWidth: "560px", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" };
const closeBtnStyle: React.CSSProperties = { width: "32px", height: "32px", background: "#EFEBE5", border: "none", borderRadius: "50%", fontSize: "16px", cursor: "pointer", color: "#5A5650" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "12px", fontWeight: 600, color: "#5A5650", marginBottom: "6px" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #DDD7CC", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" };
const cancelBtnStyle: React.CSSProperties = { padding: "10px 24px", border: "1px solid #DDD7CC", borderRadius: "8px", background: "#fff", color: "#5A5650", cursor: "pointer", fontSize: "14px" };
const saveBtnStyle: React.CSSProperties = { padding: "10px 24px", border: "none", borderRadius: "8px", background: "#1a2a1a", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 600 };
