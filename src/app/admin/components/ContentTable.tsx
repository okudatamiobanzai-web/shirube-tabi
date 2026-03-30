"use client";

interface ContentTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  layerLabel: string;
}

export default function ContentTable({ items, onEdit, onDelete, onAdd, layerLabel }: ContentTableProps) {
  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "20px",
      }}>
        <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#1E1C18" }}>
          {layerLabel} ({items.length}件)
        </h2>
        <button
          onClick={onAdd}
          style={{
            padding: "10px 20px",
            background: "#1a2a1a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          + 新規追加
        </button>
      </div>

      <div style={{
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #DDD7CC",
        overflow: "hidden",
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#EFEBE5" }}>
              <th style={thStyle}>画像</th>
              <th style={thStyle}>名前</th>
              <th style={thStyle}>場所</th>
              <th style={thStyle}>価格</th>
              <th style={thStyle}>シーズン</th>
              <th style={{ ...thStyle, textAlign: "right" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: "40px", textAlign: "center", color: "#9A9488" }}>
                  データがありません
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} style={{ borderTop: "1px solid #DDD7CC" }}>
                  <td style={tdStyle}>
                    <img
                      src={item.photo}
                      alt={item.name}
                      style={{
                        width: "56px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "6px",
                      }}
                    />
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>{item.name}</div>
                    <div style={{ fontSize: "12px", color: "#9A9488" }}>{item.nameEn || item.id}</div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: "14px", color: "#5A5650" }}>
                      {item.location || item.area || "-"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: "14px", color: "#5A5650" }}>
                      {item.price || "-"}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                      {(item.seasons || []).map((s: string) => (
                        <span key={s} style={{
                          padding: "2px 8px",
                          background: "#EFEBE5",
                          borderRadius: "4px",
                          fontSize: "11px",
                          color: "#5A5650",
                        }}>
                          {seasonLabel(s)}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <button
                      onClick={() => onEdit(item)}
                      style={actionBtnStyle}
                    >
                      編集
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`「${item.name}」を削除しますか？`)) {
                          onDelete(item.id);
                        }
                      }}
                      style={{ ...actionBtnStyle, color: "#E5382A", borderColor: "#E5382A" }}
                    >
                      削除
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function seasonLabel(s: string): string {
  const map: Record<string, string> = {
    spring: "春",
    summer: "夏",
    autumn: "秋",
    winter: "冬",
  };
  return map[s] || s;
}

const thStyle: React.CSSProperties = {
  padding: "12px 16px",
  textAlign: "left",
  fontSize: "12px",
  fontWeight: 600,
  color: "#5A5650",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "14px",
  verticalAlign: "middle",
};

const actionBtnStyle: React.CSSProperties = {
  padding: "4px 12px",
  background: "none",
  border: "1px solid #DDD7CC",
  borderRadius: "6px",
  fontSize: "12px",
  cursor: "pointer",
  marginLeft: "8px",
  color: "#5A5650",
};
