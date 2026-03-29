/**
 * XLSX → サイトデータ生成スクリプト
 *
 * 使い方:
 *   node scripts/generate-from-xlsx.mjs
 *
 * content.xlsx のシートからデータを読み取り、以下を生成:
 *   - src/data/index.ts  (EXPERIENCES, PEOPLE, STAYS, FOODS, ITEMS_DATA, COURSES)
 *   - src/data/photos.ts (写真レジストリ)
 *
 * シート構成:
 *   - experiences: 体験データ
 *   - people: 人データ
 *   - stays: 宿データ
 *   - food: 食データ
 *   - items: アイテムデータ
 *   - courses: コースデータ (手動管理推奨)
 *   - photos: 写真マッピング
 */

import XLSX from "xlsx";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const XLSX_PATH = resolve(ROOT, "content.xlsx");

function readSheet(wb, name) {
  const ws = wb.Sheets[name];
  if (!ws) return [];
  return XLSX.utils.sheet_to_json(ws);
}

function q(v) {
  if (v === null || v === undefined || v === "") return "null";
  return JSON.stringify(String(v));
}

function arr(v) {
  if (!v) return "[]";
  return JSON.stringify(String(v).split(",").map(s => s.trim()).filter(Boolean));
}

function seasonArr(v) {
  if (!v) return '["spring", "summer", "autumn", "winter"]';
  return JSON.stringify(String(v).split(",").map(s => s.trim().toLowerCase()).filter(Boolean));
}

function num(v) {
  if (v === null || v === undefined || v === "") return "undefined";
  return Number(v);
}

function photoRef(v) {
  if (!v) return '""';
  // If it starts with / or http, it's a direct URL
  if (String(v).startsWith("/") || String(v).startsWith("http")) return JSON.stringify(v);
  // Otherwise it's a P.key reference
  return `P.${v}`;
}

function galleryArr(v) {
  if (!v) return undefined;
  const items = String(v).split(",").map(s => s.trim()).filter(Boolean);
  return `[${items.map(photoRef).join(", ")}]`;
}

function snsArr(v) {
  if (!v) return undefined;
  // Format: "instagram:@handle:url,twitter:@handle:url"
  const items = String(v).split(";").map(s => s.trim()).filter(Boolean);
  const parsed = items.map(item => {
    const [type, label, url] = item.split("|").map(s => s.trim());
    return `{ type: ${q(type)}, url: ${q(url)}, label: ${q(label)} }`;
  });
  return `[${parsed.join(", ")}]`;
}

function generatePhotos(rows) {
  const lines = rows.map(r => `  ${r.key}: ${q(r.url)},`);
  return `/**
 * Photos registry — 自動生成 by generate-from-xlsx.mjs
 * content.xlsx の photos シートから生成
 */
export const P = {
${lines.join("\n")}
};
`;
}

function generateExperiences(rows) {
  return rows.map(r => `  {
    id: ${q(r.id)}, layer: "experience", name: ${q(r.name)}, area: ${q(r.area)}, areaId: ${q(r.areaId)},
    person: ${q(r.person)}, cat: ${q(r.cat)}, seasons: ${seasonArr(r.seasons)},
    duration: ${q(r.duration)}, price: ${q(r.price)}, photo: ${photoRef(r.photo)},
    gallery: ${galleryArr(r.gallery) || `[${photoRef(r.photo)}]`}, videoId: ${q(r.videoId)},
    desc: ${q(r.desc)},
    tags: ${arr(r.tags)},${r.lat ? `\n    lat: ${num(r.lat)}, lng: ${num(r.lng)},` : ""}${r.address ? `\n    address: ${q(r.address)},` : ""}
  }`).join(",\n");
}

function generatePeople(rows) {
  return rows.map(r => `  {
    id: ${q(r.id)}, layer: "person", name: ${q(r.name)}, area: ${q(r.area)},
    specialty: ${q(r.specialty)}, photo: ${photoRef(r.photo)}, gallery: ${galleryArr(r.gallery) || `[${photoRef(r.photo)}]`},
    desc: ${q(r.desc)},
    message: ${q(r.message)},${r.sns ? `\n    sns: ${snsArr(r.sns)},` : ""}
  }`).join(",\n");
}

function generateStays(rows) {
  return rows.map(r => `  {
    id: ${q(r.id)}, layer: "stay", name: ${q(r.name)}, area: ${q(r.area)},
    type: ${q(r.type)}, price: ${q(r.price)}, photo: ${photoRef(r.photo)}, gallery: ${galleryArr(r.gallery) || `[${photoRef(r.photo)}]`},
    desc: ${q(r.desc)},
  }`).join(",\n");
}

function generateFoods(rows) {
  return rows.map(r => `  {
    id: ${q(r.id)}, layer: "food", name: ${q(r.name)}, area: ${q(r.area)},
    photo: ${photoRef(r.photo)}, gallery: ${galleryArr(r.gallery) || `[${photoRef(r.photo)}]`},
    desc: ${q(r.desc)}, price: ${q(r.price)},
  }`).join(",\n");
}

function generateItems(rows) {
  return rows.map(r => `  {
    id: ${q(r.id)}, layer: "item", name: ${q(r.name)}, area: ${q(r.area)},
    photo: ${photoRef(r.photo)}, gallery: ${galleryArr(r.gallery) || `[${photoRef(r.photo)}]`},
    desc: ${q(r.desc)}, price: ${q(r.price)},
  }`).join(",\n");
}

try {
  const wb = XLSX.readFile(XLSX_PATH);
  console.log("📖 シート:", wb.SheetNames.join(", "));

  // Photos
  const photosRows = readSheet(wb, "photos");
  if (photosRows.length > 0) {
    const photosTs = generatePhotos(photosRows);
    writeFileSync(resolve(ROOT, "src/data/photos.ts"), photosTs);
    console.log(`✅ photos.ts 生成 (${photosRows.length}枚)`);
  }

  // Data
  const experiences = readSheet(wb, "experiences");
  const people = readSheet(wb, "people");
  const stays = readSheet(wb, "stays");
  const food = readSheet(wb, "food");
  const items = readSheet(wb, "items");

  const dataTs = `import { P } from "./photos";
import type { Experience, Person, Stay, Food, Item, AnyItem, Course, Area, DistLine } from "@/lib/types";

export const AREAS: Area[] = [
  { id: "nakashibetsu", name: "中標津", sub: "空の玄関口・milkの街牧場", x: 62, y: 35, airport: "空港から車5分", lat: 43.5555, lng: 144.9719 },
  { id: "shibetsu", name: "標津", sub: "鮭と魚付のまち", x: 85, y: 22, airport: "空港から車30分", lat: 43.6608, lng: 145.1306 },
  { id: "betsukai", name: "別海", sub: "日本一の酪農地帯", x: 38, y: 60, airport: "空港から車40分", lat: 43.3925, lng: 145.1189 },
  { id: "kushiro", name: "釧路", sub: "湿原とカヌーの聖地", x: 12, y: 78, airport: "空港から車1.5時間", lat: 42.9849, lng: 144.3815 },
];

export const DISTS: DistLine[] = [
  { from: "nakashibetsu", to: "shibetsu", t: "車30分" },
  { from: "nakashibetsu", to: "betsukai", t: "車40分" },
  { from: "nakashibetsu", to: "kushiro", t: "車1.5h" },
  { from: "betsukai", to: "kushiro", t: "車1h10m" },
];

export const DRIVE_TIMES = [
  { to: "中標津市街", duration: "約5分", km: "3km" },
  { to: "標津", duration: "約30分", km: "25km" },
  { to: "別海", duration: "約40分", km: "30km" },
  { to: "知床（ウトロ）", duration: "約1時間40分", km: "95km" },
  { to: "釧路", duration: "約1時間30分", km: "95km" },
  { to: "根室", duration: "約1時間40分", km: "100km" },
  { to: "弟子屈（摩周湖）", duration: "約1時間10分", km: "65km" },
];

export const EXPERIENCES: Experience[] = [
${generateExperiences(experiences)}
];

export const PEOPLE: Person[] = [
${generatePeople(people)}
];

export const STAYS: Stay[] = [
${generateStays(stays)}
];

export const FOODS: Food[] = [
${generateFoods(food)}
];

export const ITEMS_DATA: Item[] = [
${generateItems(items)}
];

export const ALL_ITEMS: AnyItem[] = [...EXPERIENCES, ...PEOPLE, ...STAYS, ...FOODS, ...ITEMS_DATA];

export function getItemsByLayer(layerId: string): AnyItem[] {
  const map: Record<string, AnyItem[]> = {
    experience: EXPERIENCES,
    person: PEOPLE,
    stay: STAYS,
    food: FOODS,
    item: ITEMS_DATA,
  };
  return map[layerId] || [];
}

export function getAirportDist(areaId: string): string {
  const a = AREAS.find((x) => x.id === areaId);
  return a?.airport || "";
}

// COURSES は手動管理（構造が複雑なため）
// content.xlsx に courses シートを追加して管理する場合は別途対応
export { COURSES } from "./courses";
`;

  writeFileSync(resolve(ROOT, "src/data/index.generated.ts"), dataTs);
  console.log(`✅ index.generated.ts 生成`);
  console.log(`   体験: ${experiences.length}, 人: ${people.length}, 宿: ${stays.length}, 食: ${food.length}, アイテム: ${items.length}`);
  console.log("");
  console.log("⚠️  確認後、以下で上書きしてください:");
  console.log("   cp src/data/index.generated.ts src/data/index.ts");

} catch (err) {
  if (err.code === "ENOENT") {
    console.log("📋 content.xlsx が見つかりません。テンプレートを生成します...");
    generateTemplate();
  } else {
    throw err;
  }
}

function generateTemplate() {
  const wb = XLSX.utils.book_new();

  // Experiences sheet
  const expHeaders = ["id", "name", "area", "areaId", "person", "cat", "seasons", "duration", "price", "photo", "gallery", "videoId", "desc", "tags", "lat", "lng", "address"];
  const expData = [expHeaders];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(expData), "experiences");

  // People sheet
  const pplHeaders = ["id", "name", "area", "specialty", "photo", "gallery", "desc", "message", "sns"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([pplHeaders]), "people");

  // Stays sheet
  const stayHeaders = ["id", "name", "area", "type", "price", "photo", "gallery", "desc"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([stayHeaders]), "stays");

  // Food sheet
  const foodHeaders = ["id", "name", "area", "price", "photo", "gallery", "desc"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([foodHeaders]), "food");

  // Items sheet
  const itemHeaders = ["id", "name", "area", "price", "photo", "gallery", "desc"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([itemHeaders]), "items");

  // Photos sheet
  const photoHeaders = ["key", "url"];
  XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet([photoHeaders]), "photos");

  XLSX.writeFile(wb, XLSX_PATH);
  console.log(`✅ テンプレート生成: content.xlsx`);
  console.log("   シート: experiences, people, stays, food, items, photos");
  console.log("   データを入力して再度 node scripts/generate-from-xlsx.mjs を実行してください");
}
