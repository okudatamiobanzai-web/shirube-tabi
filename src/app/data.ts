// --- Types ---
export type Season = "spring" | "summer" | "autumn" | "winter";
export type LayerKey = "all" | "experience" | "people" | "stay" | "food" | "items";

export interface Experience {
  id: string;
  title: string;
  location: string;
  price: string;
  accessTime: string;
  seasons: Season[];
  isShort?: boolean;
  imageUrl: string;
}

export interface ModelCourseDay {
  activities: string[];
}

export interface ModelCourse {
  id: string;
  title: string;
  area: string;
  duration: string;
  days: ModelCourseDay[];
  price: string;
  imageUrl: string;
}

export interface AreaDistance {
  name: string;
  time: string;
}

// --- Five Layers ---
export const LAYERS: { key: LayerKey; label: string; labelEn: string }[] = [
  { key: "all", label: "すべて", labelEn: "" },
  { key: "experience", label: "体験", labelEn: "EXPERIENCE" },
  { key: "people", label: "人", labelEn: "PEOPLE" },
  { key: "stay", label: "宿", labelEn: "STAY" },
  { key: "food", label: "食", labelEn: "FOOD" },
  { key: "items", label: "アイテム", labelEn: "ITEMS" },
];

// --- Model Courses ---
export const MODEL_COURSES: ModelCourse[] = [
  {
    id: "course-1",
    title: "漁師の朝と牧場の午後",
    area: "標津×別海 — 1泊2日",
    duration: "1泊2日",
    days: [
      { activities: ["漁師の船釣り（標津）", "漁師めしで昼食", "ボシュランで温泉泊"] },
      { activities: ["酪農サイクリング（別海）", "ミルクジェラート", "中標津空港へ"] },
    ],
    price: "¥45,000〜/人",
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80",
  },
  {
    id: "course-2",
    title: "家族で道東まるごと",
    area: "釧路〜別海〜標津 — 2泊3日",
    duration: "2泊3日",
    days: [
      { activities: ["中標津空港着", "酪農サイクリング", "ゲストハウスushi泊"] },
      { activities: ["カヌーで釧路湿原", "出張シェフの夕食", "ボシュラン泊"] },
      { activities: ["船釣り体験", "漁師めしで昼食", "中標津空港へ"] },
    ],
    price: "¥80,000〜/人",
    imageUrl: "https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=600&q=80",
  },
  {
    id: "course-3",
    title: "秋鮭と山の恵み",
    area: "標津×中標津 — 1泊2日",
    duration: "1泊2日",
    days: [
      { activities: ["秋鮭の遡上ウォッチング", "漁師めしで鮭づくし", "森のコテージ泊"] },
      { activities: ["山菜採り＆野草料理", "milkでひと息", "中標津空港へ"] },
    ],
    price: "¥42,000〜/人",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
  },
];

// --- Experiences ---
export const EXPERIENCES: Experience[] = [
  { id: "exp-1", title: "ホワイトキャンバス・スタジオ", location: "中標津", price: "¥15,000〜", accessTime: "空港から車5分", seasons: ["winter"], isShort: true, imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80" },
  { id: "exp-2", title: "開陽台クリームシチュー体験", location: "中標津", price: "¥6,000〜/人", accessTime: "空港から車5分", seasons: ["autumn", "winter"], isShort: true, imageUrl: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=600&q=80" },
  { id: "exp-3", title: "地平線サイクリング＆ピザ作り", location: "中標津", price: "¥10,000〜/人", accessTime: "空港から車5分", seasons: ["summer", "autumn"], isShort: true, imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80" },
  { id: "exp-4", title: "なかしべつむかしそば作り", location: "中標津", price: "¥7,150〜/人", accessTime: "空港から車5分", seasons: ["spring", "summer", "autumn", "winter"], isShort: true, imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: "exp-5", title: "漁師の船釣り体験", location: "標津", price: "¥12,000〜", accessTime: "空港から車30分", seasons: ["summer", "autumn"], isShort: true, imageUrl: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80" },
  { id: "exp-6", title: "酪農サイクリング", location: "別海", price: "¥8,000〜", accessTime: "空港から車40分", seasons: ["summer", "autumn"], imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
  { id: "exp-7", title: "山菜採り＆野草料理", location: "中標津", price: "¥10,000〜", accessTime: "空港から車5分", seasons: ["spring"], isShort: true, imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80" },
  { id: "exp-8", title: "カヌーで釧路湿原", location: "釧路", price: "¥9,500〜", accessTime: "空港から車1.5時間", seasons: ["summer"], imageUrl: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=600&q=80" },
  { id: "exp-9", title: "秋鮭の遡上ウォッチング", location: "標津", price: "¥6,000〜", accessTime: "空港から車30分", seasons: ["autumn"], isShort: true, imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80" },
  { id: "exp-10", title: "星空グランピング", location: "中標津", price: "¥15,000〜", accessTime: "空港から車5分", seasons: ["summer", "autumn"], imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: "exp-11", title: "格子状防風林ホーストレッキング", location: "中標津", price: "¥80,000〜/組", accessTime: "空港から車5分", seasons: ["summer", "autumn"], imageUrl: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80" },
];

// --- Area Distances ---
export const AREA_DISTANCES: AreaDistance[] = [
  { name: "中標津市街", time: "約5分" },
  { name: "標津", time: "約30分" },
  { name: "別海", time: "約40分" },
  { name: "知床（ウトロ）", time: "約1時間40分" },
  { name: "釧路", time: "約1時間30分" },
  { name: "弟子屈（摩周湖）", time: "約1時間10分" },
];

// --- Season Labels ---
export const SEASON_LABELS: { key: "all" | Season; label: string }[] = [
  { key: "all", label: "すべて" },
  { key: "spring", label: "春 (4-5月)" },
  { key: "summer", label: "夏 (6-8月)" },
  { key: "autumn", label: "秋 (9-11月)" },
  { key: "winter", label: "冬 (12-3月)" },
];
