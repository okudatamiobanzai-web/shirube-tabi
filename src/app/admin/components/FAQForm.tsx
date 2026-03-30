"use client";

import { useState, useEffect } from "react";

interface FAQFormProps {
  item: any | null;
  onSave: (item: any) => void;
  onCancel: () => void;
}

export default function FAQForm({ item, onSave, onCancel }: FAQFormProps) {
  const isNew = !item;
  const [form, setForm] = useState({
    id: "",
    question: "",
    answer: "",
    questionEn: "",
    answerEn: "",
    category: "general",
    order: 1,
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
      result.id = `q${Date.now()}`;
    }
    onSave(result);
  };

  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700 }}>
            {isNew ? "FAQ追加" : "FAQ編集"}
          </h3>
          <button onClick={onCancel} style={closeBtnStyle}>x</button>
        </div>

        <form onSubmit={handleSubmit} style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>質問</label>
            <input
              type="text"
              value={form.question}
              onChange={(e) => handleChange("question", e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>回答</label>
            <textarea
              value={form.answer}
              onChange={(e) => handleChange("answer", e.target.value)}
              rows={4}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>質問 (English)</label>
            <input
              type="text"
              value={form.questionEn}
              onChange={(e) => handleChange("questionEn", e.target.value)}
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={labelStyle}>回答 (English)</label>
            <textarea
              value={form.answerEn}
              onChange={(e) => handleChange("answerEn", e.target.value)}
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>カテゴリ</label>
              <select
                value={form.category}
                onChange={(e) => handleChange("category", e.target.value)}
                style={inputStyle}
              >
                <option value="general">一般</option>
                <option value="access">アクセス</option>
                <option value="booking">予約</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>表示順</label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => handleChange("order", parseInt(e.target.value) || 1)}
                style={inputStyle}
              />
            </div>
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
const modalStyle: React.CSSProperties = { background: "#fff", borderRadius: "16px", padding: "32px", width: "90%", maxWidth: "560px", maxHeight: "90vh", boxShadow: "0 8px 40px rgba(0,0,0,0.15)" };
const closeBtnStyle: React.CSSProperties = { width: "32px", height: "32px", background: "#EFEBE5", border: "none", borderRadius: "50%", fontSize: "16px", cursor: "pointer", color: "#5A5650" };
const labelStyle: React.CSSProperties = { display: "block", fontSize: "12px", fontWeight: 600, color: "#5A5650", marginBottom: "6px" };
const inputStyle: React.CSSProperties = { width: "100%", padding: "10px 14px", border: "1px solid #DDD7CC", borderRadius: "8px", fontSize: "14px", outline: "none", boxSizing: "border-box" };
const cancelBtnStyle: React.CSSProperties = { padding: "10px 24px", border: "1px solid #DDD7CC", borderRadius: "8px", background: "#fff", color: "#5A5650", cursor: "pointer", fontSize: "14px" };
const saveBtnStyle: React.CSSProperties = { padding: "10px 24px", border: "none", borderRadius: "8px", background: "#1a2a1a", color: "#fff", cursor: "pointer", fontSize: "14px", fontWeight: 600 };
