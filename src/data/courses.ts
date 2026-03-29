import { P } from "./photos";
import type { Course } from "@/lib/types";

export const COURSES: Course[] = [
  {
    id: "c1", title: "漁師の朝と牧場の午後", sub: "標津×別海 — 1泊2日", photo: P.course1, gallery: [P.course1, P.fishing, P.cycling],
    days: [
      { day: 1, items: ["漁師の船釣り（標津）", "漁師めしで昼食", "ボシュランで温泉泊"] },
      { day: 2, items: ["酪農サイクリング（別海）", "ミルクジェラート", "中標津空港へ"] },
    ],
    price: "¥45,000〜/人",
    note: "海と牧場、両方の道産子体験を1泊で体験する贅沢コース。移動はすべてこちらで手配。",
    ids: ["e1", "e2", "s1", "f1", "f3"],
  },
  {
    id: "c2", title: "家族で道東まるごと", sub: "釧路〜別海〜標津 — 2泊3日", photo: P.course2, gallery: [P.course2, P.canoe, P.cycling2],
    days: [
      { day: 1, items: ["中標津空港着", "酪農サイクリング", "ゲストハウスushi泊"] },
      { day: 2, items: ["カヌーで釧路湿原", "出張シェフの夕食", "ボシュラン泊"] },
      { day: 3, items: ["船釣り体験", "漁師めしで昼食", "中標津空港へ"] },
    ],
    price: "¥80,000〜/人",
    note: "子どもが大喜びな、いろいろ違う体験を。移動も全てこちらで手配するので親御さんも安心。",
    ids: ["e1", "e2", "e4", "s1", "s2", "f1", "f2"],
  },
  {
    id: "c3", title: "秋鮭と山の恵み", sub: "標津×中標津 — 1泊2日", photo: P.course3, gallery: [P.course3, P.salmon, P.foraging],
    days: [
      { day: 1, items: ["秋鮭の遡上ウォッチング", "漁師めしで鮭づくし", "森のコテージ泊"] },
      { day: 2, items: ["山菜採り＆野草料理", "milkでひと息", "中標津空港へ"] },
    ],
    price: "¥42,000〜/人",
    note: "秋限定。山と海、両方の恵みを味わう。秋のちゃんちゃん焼きは一生忘れない味。",
    ids: ["e3", "e5", "s3", "f1"],
  },
];
