// Design Tokens — Theme: しるべ旅ロゴの赤 #E5382A
export const C = {
  bg: "#F7F4F0",
  soft: "#EFEBE5",
  card: "#FFFFFF",
  ink: "#1E1C18",
  sub: "#5A5650",
  mute: "#9A9488",
  border: "#DDD7CC",
  accent: "#E5382A",     // ロゴの赤をメインアクセントに
  accentS: "#FDF0EE",    // 赤の淡い背景
  accentDark: "#C42E22",  // 赤の暗めバリエーション
  gold: "#E5382A",       // 旧gold → 赤に統一
  goldS: "#FDF0EE",      // 旧goldS → 赤淡背景
  goldB: "#E5382A",      // 旧goldB → 赤
  warm: "#B8864E",       // 暖色アクセント（補助的に残す）
  warmS: "#F8F0E4",
  r: 6,
} as const;

export const LAYERS = [
  { id: "experience", icon: "🎯", label: "体験", en: "EXPERIENCE" },
  { id: "person", icon: "👤", label: "人", en: "PEOPLE" },
  { id: "stay", icon: "🏠", label: "宿", en: "STAY" },
  { id: "food", icon: "🍽️", label: "食", en: "FOOD" },
  { id: "item", icon: "🚗", label: "アイテム", en: "ITEMS" },
] as const;

export const SEASONS = [
  { id: "all", label: "すべて" },
  { id: "spring", label: "春 (4-5月)" },
  { id: "summer", label: "夏 (6-8月)" },
  { id: "autumn", label: "秋 (9-11月)" },
  { id: "winter", label: "冬 (12-3月)" },
] as const;

export type LayerId = (typeof LAYERS)[number]["id"];
export type SeasonId = (typeof SEASONS)[number]["id"];
