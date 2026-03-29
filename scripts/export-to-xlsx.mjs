/**
 * 既存データ → content.xlsx エクスポートスクリプト
 *
 * 使い方:
 *   node scripts/export-to-xlsx.mjs
 *
 * src/data/index.ts と photos.ts の現在のデータを
 * content.xlsx に書き出します（スプレッドシートで編集可能に）
 */

import XLSX from "xlsx";
import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const XLSX_PATH = resolve(ROOT, "content.xlsx");

// ── Photos data ──
const photos = [
  { key: "hero", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80" },
  { key: "vision", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80" },
  { key: "fishing", url: "https://images.unsplash.com/photo-1545816250-e12bedba42ba?w=600&q=80" },
  { key: "fishing2", url: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80" },
  { key: "fishing3", url: "https://images.unsplash.com/photo-1504309092620-4d0ec726efa4?w=600&q=80" },
  { key: "cycling", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { key: "cycling2", url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80" },
  { key: "cycling3", url: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=600&q=80" },
  { key: "foraging", url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80" },
  { key: "foraging2", url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80" },
  { key: "canoe", url: "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=600&q=80" },
  { key: "canoe2", url: "https://images.unsplash.com/photo-1440581572325-0bea30075d9d?w=600&q=80" },
  { key: "canoe3", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80" },
  { key: "salmon", url: "https://images.unsplash.com/photo-1498654200943-1088dd4438ae?w=600&q=80" },
  { key: "glamping", url: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=600&q=80" },
  { key: "glamping2", url: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=600&q=80" },
  { key: "glamping3", url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=600&q=80" },
  { key: "whitecanvas", url: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=600&q=80" },
  { key: "whitecanvas2", url: "https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=600&q=80" },
  { key: "soba", url: "https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=600&q=80" },
  { key: "soba2", url: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80" },
  { key: "stew", url: "https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=600&q=80" },
  { key: "stew2", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80" },
  { key: "ebikepizza", url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80" },
  { key: "ebikepizza2", url: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80" },
  { key: "horse", url: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80" },
  { key: "horse2", url: "https://images.unsplash.com/photo-1598974357801-cbca100e65d3?w=600&q=80" },
  { key: "fisherman", url: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80" },
  { key: "guide", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { key: "farmer", url: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80" },
  { key: "outdoor", url: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80" },
  { key: "onsen", url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80" },
  { key: "onsen2", url: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80" },
  { key: "guesthouse", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80" },
  { key: "cottage", url: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=600&q=80" },
  { key: "cottage2", url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=80" },
  { key: "seafood", url: "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=600&q=80" },
  { key: "chef", url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80" },
  { key: "gelato", url: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80" },
  { key: "ebike", url: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=600&q=80" },
  { key: "car", url: "https://images.unsplash.com/photo-1449965408869-ecd3f77d0d50?w=600&q=80" },
  { key: "camp", url: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=600&q=80" },
  { key: "course1", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80" },
  { key: "course2", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80" },
  { key: "course3", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { key: "ryutaro", url: "/images/ryutaro.png" },
];

// ── Experiences data ──
const experiences = [
  { id: "e1", name: "漁師の船釣り体験", area: "標津", areaId: "shibetsu", person: "波心会漁師", cat: "海", seasons: "spring,summer,autumn", duration: "4時間", price: "¥12,000〜", photo: "fishing", gallery: "fishing,fishing2,fishing3", videoId: "dQw4w9WgXcQ", desc: "現役漁師の最強船長と、地元の漁師と一緒に船に乗り込む。狙うのはサケ、カラフトマス、ホッケ。釣れた魚はその場でさばいて昼食に。海の上で味わう朝メシは格別。", tags: "海,漁師,魚付", lat: 43.6622, lng: 145.1350 },
  { id: "e2", name: "酪農サイクリング", area: "別海", areaId: "betsukai", person: "田中牧場", cat: "牧", seasons: "spring,summer,autumn,winter", duration: "3時間", price: "¥8,000〜", photo: "cycling", gallery: "cycling,cycling2,cycling3", videoId: "", desc: "日本一の酪農地帯をe-bikeで駆け抜ける。牛舎で絞りたてミルクを飲み、サイロに登って地平線を眺める。冬はスノーファットバイクで。", tags: "牧場,e-bike,酪農", lat: 43.3930, lng: 145.1200 },
  { id: "e3", name: "山菜採り＆野草料理", area: "中標津", areaId: "nakashibetsu", person: "木村美代子", cat: "野", seasons: "spring", duration: "5時間", price: "¥10,000〜", photo: "foraging", gallery: "foraging,foraging2", videoId: "dQw4w9WgXcQ", desc: "春の山道は山菜の宝庫。行者ニンニク、ウド、フキ。達人と歩き、見分け方を学び、その場で天ぷらに。", tags: "山菜,料理,春限定", lat: 43.5600, lng: 144.9600 },
  { id: "e4", name: "カヌーで釧路湿原", area: "釧路", areaId: "kushiro", person: "ガイドコツ", cat: "野", seasons: "summer,autumn", duration: "3時間", price: "¥9,500〜", photo: "canoe", gallery: "canoe,canoe2,canoe3", videoId: "", desc: "日本最大の湿原を水面からの景色で楽しむ。タンチョウ・エゾシカとの遭遇率90%以上。静寂の中をただ漕ぐ時間。", tags: "カヌー,湿原,野生動物", lat: 43.0840, lng: 144.4580 },
  { id: "e5", name: "秋鮭の遡上ウォッチング", area: "標津", areaId: "shibetsu", person: "標津ガイド", cat: "海", seasons: "autumn", duration: "2時間", price: "¥6,000〜", photo: "salmon", gallery: "salmon,fishing2", videoId: "dQw4w9WgXcQ", desc: "秋の標津川に帰ってくる、生まれた川に遡上する鮭。壮大な遡上を地元ガイドの解説付きで見学。終わったら近くのちゃんちゃん焼きで締め。", tags: "鮭,秋限定,魚付", lat: 43.6570, lng: 145.1280 },
  { id: "e6", name: "星空グランピング", area: "中標津", areaId: "nakashibetsu", person: "milk staff", cat: "知", seasons: "spring,summer,autumn,winter", duration: "1泊", price: "¥15,000〜", photo: "glamping", gallery: "glamping,glamping2,glamping3", videoId: "", desc: "光害のない中標津の夜は満天の星。暖かい寝袋はいらない地元食材でBBQ。天の川がこんなに見えるとは思わなかった。", tags: "星空,グランピング,宿泊", lat: 43.5480, lng: 144.9800 },
  { id: "e7", name: "ホワイトキャンバス・スタジオ", area: "中標津", areaId: "nakashibetsu", person: "しるべスタッフ", cat: "知", seasons: "winter", duration: "3時間", price: "¥15,000〜", photo: "whitecanvas", gallery: "whitecanvas,whitecanvas2", videoId: "", desc: "地平線まで続く雪原が、あなただけの巨大スタジオに。ドローン足跡アート、極寒シチュー、雪原テントサウナ、トリックフォト。何もない白い世界で、常識外れの1枚を撮れ。", tags: "雪原,撮影,冬限定,クリエイティブ", lat: 43.5555, lng: 144.9719 },
  { id: "e8", name: "なかしべつむかしそば作り", area: "中標津", areaId: "nakashibetsu", person: "伝成館ガイド", cat: "知", seasons: "spring,summer,autumn,winter", duration: "2時間", price: "¥7,150〜/人", photo: "soba", gallery: "soba,soba2", videoId: "", desc: "登録有形文化財「伝成館」を貸し切り、開拓時代の食文化を追体験。冷害に強く命を繋いだそばを、昔ながらの製麺機で十割そばに仕上げる。打ちたて・茹でたての香りは格別。", tags: "文化財,そば,食文化,通年", lat: 43.5530, lng: 144.9750 },
  { id: "e9", name: "開陽台クリームシチュー体験", area: "中標津", areaId: "nakashibetsu", person: "しるべスタッフ", cat: "野", seasons: "spring,summer,autumn", duration: "2時間", price: "¥6,000〜/人", photo: "stew", gallery: "stew,stew2", videoId: "", desc: "開陽台の絶景キャンプ場で、ファイヤースターターで火起こしから挑戦。100%中標津産のミルキーポーク・野菜・牛乳でダッチオーブンシチューを育てる。手間ひまが最高のスパイス。", tags: "開陽台,料理,アウトドア,家族向け", lat: 43.5330, lng: 145.0280 },
  { id: "e10", name: "地平線サイクリング＆ピザ作り", area: "中標津", areaId: "nakashibetsu", person: "しるべスタッフ", cat: "野", seasons: "spring,summer,autumn", duration: "3時間", price: "¥10,000〜/人", photo: "ebikepizza", gallery: "ebikepizza,ebikepizza2", videoId: "", desc: "E-BIKEで開陽台展望台を経由し、地平線を見渡す絶景ダウンヒル。戻ったら中標津産小麦と地元チーズでポータブル窯ピザを焼く。走って・作って・食べる、3時間の贅沢。", tags: "E-BIKE,ピザ,開陽台,サイクリング", lat: 43.5330, lng: 145.0280 },
  { id: "e11", name: "格子状防風林ホーストレッキング", area: "中標津", areaId: "nakashibetsu", person: "エンデュランス馬術ガイド", cat: "野", seasons: "spring,summer,autumn,winter", duration: "1.5〜2.5時間", price: "¥80,000〜/組", photo: "horse", gallery: "horse,horse2", videoId: "", desc: "観光乗馬じゃない。自分の手綱で北海道遺産「格子状防風林」へ分け入る本物のトレッキング。エンデュランス馬術の有資格ガイドが完全プライベートでご案内。未経験者もOK。", tags: "乗馬,防風林,北海道遺産,通年", lat: 43.5400, lng: 145.0100 },
];

// ── People data ──
const people = [
  { id: "p1", name: "佐藤 勇次", area: "標津", specialty: "漁付・船釣り", photo: "fisherman", gallery: "fisherman,fishing", desc: "標津で3代続く漁師。荒海でも知り尽くした男。", message: "壮大な味わいをなめんなよ俺たちにある。一緒に船に乗ろう。", sns: "instagram|@sato_yuji|https://instagram.com/example" },
  { id: "p2", name: "木村 美代子", area: "中標津", specialty: "山菜の達人", photo: "guide", gallery: "guide,foraging", desc: "農家出身。50年の山菜採り経験をもつガイド。", message: "この土地の恵みを、一緒に見つけに行きましょう。", sns: "facebook|木村美代子|https://facebook.com/example" },
  { id: "p3", name: "田中 牧場", area: "別海", specialty: "酪農家・牧場", photo: "farmer", gallery: "farmer,cycling2", desc: "搾乳からバター作りまで3代目。", message: "うちの牛は人間よりも気持ちいいと思う。", sns: "instagram|@tanaka_farm|https://instagram.com/example;youtube|田中牧場チャンネル|https://youtube.com/example" },
  { id: "p4", name: "山田 健太", area: "釧路", specialty: "アウトドアガイド", photo: "outdoor", gallery: "outdoor,canoe2", desc: "釧路に残ったアウトドアのプロ。", message: "湿原は水面から見ると別世界が広がってる。", sns: "instagram|@yamada_outdoor|https://instagram.com/example;website|公式サイト|https://example.com" },
];

// ── Stays data ──
const stays = [
  { id: "s1", name: "ボシュラン 温泉旅館", area: "中標津", type: "温泉旅館", price: "¥18,000〜", photo: "onsen", gallery: "onsen,onsen2", desc: "源泉掛け流し。オシンコシンの滝を眺めながら入浴。冬はシマフクロウにも会える。" },
  { id: "s2", name: "ゲストハウス ushi", area: "別海", type: "ゲストハウス", price: "¥5,500〜", photo: "guesthouse", gallery: "guesthouse", desc: "牧場の納屋を改装。朝食の搾りたて牛乳は飲み放題。" },
  { id: "s3", name: "森のコテージ", area: "標津", type: "一棟貸し", price: "¥25,000〜", photo: "cottage", gallery: "cottage,cottage2", desc: "薪ストーブ。BBQデッキ付き。最大6名。" },
];

// ── Food data ──
const food = [
  { id: "f1", name: "漁師めし処 トモ", area: "標津", photo: "seafood", gallery: "seafood", desc: "その日の魚を新鮮シンプルに。ドトの食は一級品。", price: "¥1,500〜" },
  { id: "f2", name: "出張シェフ　道東キッチン", area: "全域", photo: "chef", gallery: "chef", desc: "地元食材コース料理をお泊り先やキャンプ場に。", price: "¥5,000〜/人" },
  { id: "f3", name: "別海ミルクジェラート", area: "別海", photo: "gelato", gallery: "gelato", desc: "絞りたて牛乳のジェラート。上味がころころ変わる。", price: "¥400〜" },
];

// ── Items data ──
const items = [
  { id: "i1", name: "e-bikeレンタル", area: "別海・中標津", photo: "ebike", gallery: "ebike", desc: "電動MTB。坂道も楽チン。", price: "¥4,000/日" },
  { id: "i2", name: "レンタカー（4WD）", area: "中標津空港", photo: "car", gallery: "car", desc: "冬でも安心4WD。スタッドレスも標準装備。", price: "¥8,000/日〜" },
  { id: "i3", name: "アウトドアセット", area: "配送対応", photo: "camp", gallery: "camp", desc: "テント・タープ・焚き火台・調理器具一式。", price: "¥6,000/日" },
];

// ── Build workbook ──
const wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(experiences), "experiences");
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(people), "people");
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(stays), "stays");
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(food), "food");
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(items), "items");
XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(photos), "photos");

XLSX.writeFile(wb, XLSX_PATH);
console.log(`✅ content.xlsx エクスポート完了: ${XLSX_PATH}`);
console.log(`   体験: ${experiences.length}, 人: ${people.length}, 宿: ${stays.length}, 食: ${food.length}, アイテム: ${items.length}, 写真: ${photos.length}`);
console.log("");
console.log("📝 スプレッドシートを編集後、以下で再生成:");
console.log("   node scripts/generate-from-xlsx.mjs");
