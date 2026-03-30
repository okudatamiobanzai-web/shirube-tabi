"use client";

import { useState, useEffect } from "react";

interface ContentFormProps {
  item: any | null;
  layer: string;
  onSave: (item: any) => void;
  onCancel: () => void;
}

const SEASON_OPTIONS = [
  { value: "spring", label: "春" },
  { value: "summer", label: "夏" },
  { value: "autumn", label: "秋" },
  { value: "winter", label: "冬" },
];

export default function ContentForm({ item, layer, onSave, onCancel }: ContentFormProps) {
  const isNew = !item;
  const [form, setForm] = useState<any>({
    id: "",
    name: "",
    nameEn: "",
    location: "",
    price: "",
    description: "",
    descriptionEn: "",
    photo: "",
    seasons: [],
    tags: [],
    mapQuery: "",
    videoId: "",
    layer: layer,
    guide: "",
    accessTime: "",
    // Experience specific
    person: "",
    cat: "",
    duration: "",
    area: "",
    areaId: "",
    // Stay specific
    type: "",
    // Course specific
    title: "",
    sub: "",
    days: [],
    note: "",
    ids: [],
  });
  const [tagsInput, setTagsInput] = useState("");

  useEffect(() => {
    if (item) {
      setForm({ ...form, ...item });
      setTagsInput((item.tags || []).join(", "));
    }
  }, [item]);

  const handleChange = (field: string, value: any) => {
    setForm((prev: any) => ({ ...prev, [field]: value }));
  };

  const toggleSeason = (season: string) => {
    setForm((prev: any) => {
      const seasons = prev.seasons || [];
      if (seasons.includes(season)) {
        return { ...prev, seasons: seasons.filter((s: string) => s !== season) };
      }
      return { ...prev, seasons: [...seasons, season] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsInput.split(",").map((t: string) => t.trim()).filter(Boolean);
    const result = { ...form, tags };
    if (isNew && !result.id) {
      result.id = `${layer[0]}${Date.now()}`;
    }
    onSave(result);
  };

  const isCourse = layer === "courses";

  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}>
          <h3 style={{ fontSize: "18px", fontWeight: 700 }}>
            {isNew ? "新規追加" : "編集"}
          </h3>
          <button onClick={onCancel} style={closeBtnStyle}>x</button>
        </div>

        <form onSubmit={handleSubmit} style={{ maxHeight: "70vh", overflowY: "auto", paddingRight: "8px" }}>
          <div style={fieldRowStyle}>
            <Field label="ID" value={form.id} onChange={(v) => handleChange("id", v)} placeholder="auto" />
            {isCourse ? (
              <Field label="タイトル" value={form.title || ""} onChange={(v) => handleChange("title", v)} />
            ) : (
              <Field label="名前" value={form.name} onChange={(v) => handleChange("name", v)} />
            )}
          </div>

          {!isCourse && (
            <div style={fieldRowStyle}>
              <Field label="英語名" value={form.nameEn || ""} onChange={(v) => handleChange("nameEn", v)} />
              <Field label="場所" value={form.location || form.area || ""} onChange={(v) => { handleChange("location", v); handleChange("area", v); }} />
            </div>
          )}

          {isCourse && (
            <div style={fieldRowStyle}>
              <Field label="サブタイトル" value={form.sub || ""} onChange={(v) => handleChange("sub", v)} />
              <Field label="価格" value={form.price || ""} onChange={(v) => handleChange("price", v)} />
            </div>
          )}

          <div style={fieldRowStyle}>
            <Field label="価格" value={form.price || ""} onChange={(v) => handleChange("price", v)} />
            {layer === "experience" && (
              <Field label="所要時間" value={form.duration || ""} onChange={(v) => handleChange("duration", v)} />
            )}
            {layer === "experience" && (
              <Field label="ガイド/人" value={form.person || ""} onChange={(v) => handleChange("person", v)} />
            )}
          </div>

          {!isCourse && (
            <>
              <TextareaField label="説明" value={form.description || form.desc || ""} onChange={(v) => { handleChange("description", v); handleChange("desc", v); }} />
              <TextareaField label="英語説明" value={form.descriptionEn || ""} onChange={(v) => handleChange("descriptionEn", v)} />
            </>
          )}

          {isCourse && (
            <TextareaField label="備考" value={form.note || ""} onChange={(v) => handleChange("note", v)} />
          )}

          <Field
            label="写真URL"
            value={form.photo || ""}
            onChange={(v) => handleChange("photo", v)}
            placeholder="https://..."
          />

          {form.photo && (
            <div style={{ marginBottom: "16px" }}>
              <img
                src={form.photo}
                alt="プレビュー"
                style={{
                  width: "200px",
                  height: "130px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #DDD7CC",
                }}
              />
            </div>
          )}

          {!isCourse && (
            <>
              <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>シーズン</label>
                <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                  {SEASON_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleSeason(opt.value)}
                      style={{
                        padding: "6px 16px",
                        borderRadius: "20px",
                        fontSize: "13px",
                        border: "1px solid",
                        borderColor: (form.seasons || []).includes(opt.value) ? "#1a2a1a" : "#DDD7CC",
                        background: (form.seasons || []).includes(opt.value) ? "#1a2a1a" : "#fff",
                        color: (form.seasons || []).includes(opt.value) ? "#fff" : "#5A5650",
                        cursor: "pointer",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <Field
                label="タグ (カンマ区切り)"
                value={tagsInput}
                onChange={setTagsInput}
                placeholder="タグ1, タグ2, タグ3"
              />

              <div style={fieldRowStyle}>
                <Field label="動画ID (YouTube)" value={form.videoId || ""} onChange={(v) => handleChange("videoId", v)} placeholder="例: dQw4w9WgXcQ" />
                <Field label="マップ検索クエリ" value={form.mapQuery || ""} onChange={(v) => handleChange("mapQuery", v)} />
              </div>

              <div style={fieldRowStyle}>
                <Field label="ガイド名" value={form.guide || ""} onChange={(v) => handleChange("guide", v)} />
                <Field label="アクセス時間" value={form.accessTime || ""} onChange={(v) => handleChange("accessTime", v)} placeholder="空港から車30分" />
              </div>
            </>
          )}

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid #DDD7CC" }}>
            <button type="button" onClick={onCancel} style={{
              padding: "10px 24px",
              border: "1px solid #DDD7CC",
              borderRadius: "8px",
              background: "#fff",
              color: "#5A5650",
              cursor: "pointer",
              fontSize: "14px",
            }}>
              キャンセル
            </button>
            <button type="submit" style={{
              padding: "10px 24px",
              border: "none",
              borderRadius: "8px",
              background: "#1a2a1a",
              color: "#fff",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: 600,
            }}>
              {isNew ? "追加" : "更新"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div style={{ flex: 1, marginBottom: "16px" }}>
      <label style={labelStyle}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
      />
    </div>
  );
}

function TextareaField({ label, value, onChange }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <label style={labelStyle}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        style={{ ...inputStyle, resize: "vertical", minHeight: "80px" }}
      />
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: "16px",
  padding: "32px",
  width: "90%",
  maxWidth: "700px",
  maxHeight: "90vh",
  boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
};

const closeBtnStyle: React.CSSProperties = {
  width: "32px",
  height: "32px",
  background: "#EFEBE5",
  border: "none",
  borderRadius: "50%",
  fontSize: "16px",
  cursor: "pointer",
  color: "#5A5650",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 600,
  color: "#5A5650",
  marginBottom: "6px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1px solid #DDD7CC",
  borderRadius: "8px",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const fieldRowStyle: React.CSSProperties = {
  display: "flex",
  gap: "16px",
};
