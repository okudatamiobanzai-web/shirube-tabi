import { P } from "./photos";
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

// 中標津空港からの車での移動時間（静的データ）
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
  {
    id: "e7", layer: "experience", name: "ホワイトキャンバス・スタジオ", area: "中標津", areaId: "nakashibetsu",
    person: "しるべスタッフ", cat: "知", seasons: ["winter"],
    duration: "3時間", price: "¥15,000〜", photo: P.whitecanvas,
    gallery: [P.whitecanvas, P.whitecanvas2], videoId: "-w0WbDUowLA",
    desc: "地平線まで続く雪原が、あなただけの巨大スタジオに。ドローン足跡アート、極寒シチュー、雪原テントサウナ、トリックフォト。何もない白い世界で、常識外れの1枚を撮れ。",
    tags: ["雪原", "撮影", "冬限定", "クリエイティブ"],
    lat: 43.5555, lng: 144.9719,
  },
  {
    id: "e9", layer: "experience", name: "開陽台クリームシチュー体験", area: "中標津", areaId: "nakashibetsu",
    person: "しるべスタッフ", cat: "野", seasons: ["spring", "summer", "autumn"],
    duration: "2時間", price: "¥6,000〜/人", photo: P.stew,
    gallery: [P.stew, P.stew2], videoId: "0iDZJeSclrE",
    desc: "開陽台の絶景キャンプ場で、ファイヤースターターで火起こしから挑戦。100%中標津産のミルキーポーク・野菜・牛乳でダッチオーブンシチューを育てる。手間ひまが最高のスパイス。",
    tags: ["開陽台", "料理", "アウトドア", "家族向け"],
    lat: 43.5330, lng: 145.0280,
  },
  {
    id: "e10", layer: "experience", name: "地平線サイクリング＆ピザ作り", area: "中標津", areaId: "nakashibetsu",
    person: "しるべスタッフ", cat: "野", seasons: ["spring", "summer", "autumn"],
    duration: "3時間", price: "¥10,000〜/人", photo: P.ebikepizza,
    gallery: [P.ebikepizza, P.ebikepizza2], videoId: "8yR4K1hqP0g",
    desc: "E-BIKEで開陽台展望台を経由し、地平線を見渡す絶景ダウンヒル。戻ったら中標津産小麦と地元チーズでポータブル窯ピザを焼く。走って・作って・食べる、3時間の贅沢。",
    tags: ["E-BIKE", "ピザ", "開陽台", "サイクリング"],
    lat: 43.5330, lng: 145.0280,
  },
  {
    id: "e8", layer: "experience", name: "なかしべつむかしそば作り", area: "中標津", areaId: "nakashibetsu",
    person: "伝成館ガイド", cat: "知", seasons: ["spring", "summer", "autumn", "winter"],
    duration: "2時間", price: "¥7,150〜/人", photo: P.soba,
    gallery: [P.soba, P.soba2], videoId: "ePPWioBnGhQ",
    desc: "登録有形文化財「伝成館」を貸し切り、開拓時代の食文化を追体験。冷害に強く命を繋いだそばを、昔ながらの製麺機で十割そばに仕上げる。打ちたて・茹でたての香りは格別。",
    tags: ["文化財", "そば", "食文化", "通年"],
    lat: 43.5530, lng: 144.9750,
  },
  {
    id: "e1", layer: "experience", name: "漁師の船釣り体験", area: "標津", areaId: "shibetsu",
    person: "波心会漁師", cat: "海", seasons: ["spring", "summer", "autumn"],
    duration: "4時間", price: "¥12,000〜", photo: P.fishing,
    gallery: [P.fishing, P.fishing2, P.fishing3], videoId: "dQw4w9WgXcQ",
    desc: "現役漁師の最強船長と、地元の漁師と一緒に船に乗り込む。狙うのはサケ、カラフトマス、ホッケ。釣れた魚はその場でさばいて昼食に。海の上で味わう朝メシは格別。",
    tags: ["海", "漁師", "魚付"],
    lat: 43.6622, lng: 145.1350,
  },
  {
    id: "e2", layer: "experience", name: "酪農サイクリング", area: "別海", areaId: "betsukai",
    person: "田中牧場", cat: "牧", seasons: ["spring", "summer", "autumn", "winter"],
    duration: "3時間", price: "¥8,000〜", photo: P.cycling,
    gallery: [P.cycling, P.cycling2, P.cycling3], videoId: null,
    desc: "日本一の酪農地帯をe-bikeで駆け抜ける。牛舎で絞りたてミルクを飲み、サイロに登って地平線を眺める。冬はスノーファットバイクで。",
    tags: ["牧場", "e-bike", "酪農"],
    lat: 43.3930, lng: 145.1200,
  },
  {
    id: "e3", layer: "experience", name: "山菜採り＆野草料理", area: "中標津", areaId: "nakashibetsu",
    person: "木村美代子", cat: "野", seasons: ["spring"],
    duration: "5時間", price: "¥10,000〜", photo: P.foraging,
    gallery: [P.foraging, P.foraging2], videoId: "dQw4w9WgXcQ",
    desc: "春の山道は山菜の宝庫。行者ニンニク、ウド、フキ。達人と歩き、見分け方を学び、その場で天ぷらに。",
    tags: ["山菜", "料理", "春限定"],
    lat: 43.5600, lng: 144.9600,
  },
  {
    id: "e4", layer: "experience", name: "カヌーで釧路湿原", area: "釧路", areaId: "kushiro",
    person: "ガイドコツ", cat: "野", seasons: ["summer", "autumn"],
    duration: "3時間", price: "¥9,500〜", photo: P.canoe,
    gallery: [P.canoe, P.canoe2, P.canoe3], videoId: null,
    desc: "日本最大の湿原を水面からの景色で楽しむ。タンチョウ・エゾシカとの遭遇率90%以上。静寂の中をただ漕ぐ時間。",
    tags: ["カヌー", "湿原", "野生動物"],
    lat: 43.0840, lng: 144.4580,
  },
  {
    id: "e5", layer: "experience", name: "秋鮭の遡上ウォッチング", area: "標津", areaId: "shibetsu",
    person: "標津ガイド", cat: "海", seasons: ["autumn"],
    duration: "2時間", price: "¥6,000〜", photo: P.salmon,
    gallery: [P.salmon, P.fishing2], videoId: "dQw4w9WgXcQ",
    desc: "秋の標津川に帰ってくる、生まれた川に遡上する鮭。壮大な遡上を地元ガイドの解説付きで見学。終わったら近くのちゃんちゃん焼きで締め。",
    tags: ["鮭", "秋限定", "魚付"],
    lat: 43.6570, lng: 145.1280,
  },
  {
    id: "e6", layer: "experience", name: "星空グランピング", area: "中標津", areaId: "nakashibetsu",
    person: "milk staff", cat: "知", seasons: ["spring", "summer", "autumn", "winter"],
    duration: "1泊", price: "¥15,000〜", photo: P.glamping,
    gallery: [P.glamping, P.glamping2, P.glamping3], videoId: null,
    desc: "光害のない中標津の夜は満天の星。暖かい寝袋はいらない地元食材でBBQ。天の川がこんなに見えるとは思わなかった。",
    tags: ["星空", "グランピング", "宿泊"],
    lat: 43.5480, lng: 144.9800,
  },
  {
    id: "e11", layer: "experience", name: "格子状防風林ホーストレッキング", area: "中標津", areaId: "nakashibetsu",
    person: "エンデュランス馬術ガイド", cat: "野", seasons: ["spring", "summer", "autumn", "winter"],
    duration: "1.5〜2.5時間", price: "¥80,000〜/組", photo: P.horse,
    gallery: [P.horse, P.horse2], videoId: null,
    desc: "観光乗馬じゃない。自分の手綱で北海道遺産「格子状防風林」へ分け入る本物のトレッキング。エンデュランス馬術の有資格ガイドが完全プライベートでご案内。未経験者もOK。",
    tags: ["乗馬", "防風林", "北海道遺産", "通年"],
    lat: 43.5400, lng: 145.0100,
  },
];

export const PEOPLE: Person[] = [
  {
    id: "p1", layer: "person", name: "佐藤 勇次", area: "標津",
    specialty: "漁付・船釣り", photo: P.fisherman, gallery: [P.fisherman, P.fishing],
    desc: "標津で3代続く漁師。荒海でも知り尽くした男。",
    message: "壮大な味わいをなめんなよ俺たちにある。一緒に船に乗ろう。",
    sns: [
      { type: "instagram", url: "https://instagram.com/example", label: "@sato_yuji" },
    ],
  },
  {
    id: "p2", layer: "person", name: "木村 美代子", area: "中標津",
    specialty: "山菜の達人", photo: P.guide, gallery: [P.guide, P.foraging],
    desc: "農家出身。50年の山菜採り経験をもつガイド。",
    message: "この土地の恵みを、一緒に見つけに行きましょう。",
    sns: [
      { type: "facebook", url: "https://facebook.com/example", label: "木村美代子" },
    ],
  },
  {
    id: "p3", layer: "person", name: "田中 牧場", area: "別海",
    specialty: "酪農家・牧場", photo: P.farmer, gallery: [P.farmer, P.cycling2],
    desc: "搾乳からバター作りまで3代目。",
    message: "うちの牛は人間よりも気持ちいいと思う。",
    sns: [
      { type: "instagram", url: "https://instagram.com/example", label: "@tanaka_farm" },
      { type: "youtube", url: "https://youtube.com/example", label: "田中牧場チャンネル" },
    ],
  },
  {
    id: "p4", layer: "person", name: "山田 健太", area: "釧路",
    specialty: "アウトドアガイド", photo: P.outdoor, gallery: [P.outdoor, P.canoe2],
    desc: "釧路に残ったアウトドアのプロ。",
    message: "湿原は水面から見ると別世界が広がってる。",
    sns: [
      { type: "instagram", url: "https://instagram.com/example", label: "@yamada_outdoor" },
      { type: "website", url: "https://example.com", label: "公式サイト" },
    ],
  },
];

export const STAYS: Stay[] = [
  {
    id: "s1", layer: "stay", name: "ボシュラン 温泉旅館", area: "中標津",
    type: "温泉旅館", price: "¥18,000〜", photo: P.onsen, gallery: [P.onsen, P.onsen2],
    desc: "源泉掛け流し。オシンコシンの滝を眺めながら入浴。冬はシマフクロウにも会える。",
  },
  {
    id: "s2", layer: "stay", name: "ゲストハウス ushi", area: "別海",
    type: "ゲストハウス", price: "¥5,500〜", photo: P.guesthouse, gallery: [P.guesthouse],
    desc: "牧場の納屋を改装。朝食の搾りたて牛乳は飲み放題。",
  },
  {
    id: "s3", layer: "stay", name: "森のコテージ", area: "標津",
    type: "一棟貸し", price: "¥25,000〜", photo: P.cottage, gallery: [P.cottage, P.cottage2],
    desc: "薪ストーブ。BBQデッキ付き。最大6名。",
  },
];

export const FOODS: Food[] = [
  {
    id: "f1", layer: "food", name: "漁師めし処 トモ", area: "標津",
    photo: P.seafood, gallery: [P.seafood],
    desc: "その日の魚を新鮮シンプルに。ドトの食は一級品。", price: "¥1,500〜",
  },
  {
    id: "f2", layer: "food", name: "出張シェフ　道東キッチン", area: "全域",
    photo: P.chef, gallery: [P.chef],
    desc: "地元食材コース料理をお泊り先やキャンプ場に。", price: "¥5,000〜/人",
  },
  {
    id: "f3", layer: "food", name: "別海ミルクジェラート", area: "別海",
    photo: P.gelato, gallery: [P.gelato],
    desc: "絞りたて牛乳のジェラート。上味がころころ変わる。", price: "¥400〜",
  },
];

export const ITEMS_DATA: Item[] = [
  {
    id: "i1", layer: "item", name: "e-bikeレンタル", area: "別海・中標津",
    photo: P.ebike, gallery: [P.ebike],
    desc: "電動MTB。坂道も楽チン。", price: "¥4,000/日",
  },
  {
    id: "i2", layer: "item", name: "レンタカー（4WD）", area: "中標津空港",
    photo: P.car, gallery: [P.car],
    desc: "冬でも安心4WD。スタッドレスも標準装備。", price: "¥8,000/日〜",
  },
  {
    id: "i3", layer: "item", name: "アウトドアセット", area: "配送対応",
    photo: P.camp, gallery: [P.camp],
    desc: "テント・タープ・焚き火台・調理器具一式。", price: "¥6,000/日",
  },
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
export { COURSES } from "./courses";
