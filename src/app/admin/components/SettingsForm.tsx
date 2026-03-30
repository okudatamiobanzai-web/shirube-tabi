"use client";

import { useState, useEffect } from "react";

interface SettingsFormProps {
  settings: {
    heroImage: string;
    heroTitle: string;
    heroSubtitle: string;
  };
  onSave: (settings: any) => void;
}

export default function SettingsForm({ settings, onSave }: SettingsFormProps) {
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setForm(settings);
  }, [settings]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1E1C18", marginBottom: "24px" }}>
        サイト設定
      </h2>

      <form onSubmit={handleSubmit} style={{
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #DDD7CC",
        padding: "32px",
        maxWidth: "600px",
      }}>
        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>ヒーロー画像 URL</label>
          <input
            type="text"
            value={form.heroImage}
            onChange={(e) => handleChange("heroImage", e.target.value)}
            style={inputStyle}
            placeholder="https://..."
          />
          {form.heroImage && (
            <div style={{ marginTop: "12px" }}>
              <img
                src={form.heroImage}
                alt="ヒーロー画像プレビュー"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #DDD7CC",
                }}
              />
            </div>
          )}
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>サイトタイトル</label>
          <input
            type="text"
            value={form.heroTitle}
            onChange={(e) => handleChange("heroTitle", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={labelStyle}>サブタイトル</label>
          <input
            type="text"
            value={form.heroSubtitle}
            onChange={(e) => handleChange("heroSubtitle", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button type="submit" style={{
            padding: "12px 32px",
            background: "#1a2a1a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}>
            保存
          </button>
          {saved && (
            <span style={{ color: "#1a2a1a", fontSize: "14px", fontWeight: 600 }}>
              保存しました
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#5A5650",
  marginBottom: "8px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid #DDD7CC",
  borderRadius: "8px",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};
