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
    id: "e11", layer: "experience", name: "格子状防風林ホーストレッキング", area: "中標津", areaId: "nakashibetsu",
    person: "橋本 美和（エンデュランス馬術2級）", cat: "野", seasons: ["spring", "summer", "autumn", "winter"],
    duration: "約1.5〜2.5時間", price: "¥80,000〜/組", photo: P.horse,
    gallery: [P.horse, P.horse2], videoId: null,
    desc: "観光乗馬は、もう終わり。自分の手綱で北海道遺産「格子状防風林」や開陽台周辺へ分け入る、本物のホーストレッキング。エンデュランス馬術の有資格ガイドが1組限定・完全プライベートでご案内します。基本コースは未経験者OK。上級コースでは起伏に富んだ地形を馬と共に駆け抜ける究極の冒険も。料金にはガイド料・馬レンタル・装備一式を含みます。",
    tags: ["乗馬", "格子状防風林", "北海道遺産", "1組限定", "通年"],
    lat: 43.5400, lng: 145.0100,
    mapQuery: "開陽台+中標津町",
    // 基本コース: 80,000円/組(1-2名)、3名〜+30,000円/人
    // 上級コース: 150,000円/組(1名)、2名〜+50,000円/人
    // 予約締切: 14日前 / キャンセル: 7日前30%, 3日前50%, 当日100%
    // 体重80kg以下 / 傷害保険自己加入必須
  },
  {
    id: "e7", layer: "experience", name: "中標津ホワイトキャンバス・スタジオ", area: "中標津", areaId: "nakashibetsu",
    person: "しるべスタッフ（専属アシスタント1〜2名同行）", cat: "知", seasons: ["winter"],
    duration: "約2.5〜3時間", price: "¥25,000〜/組", photo: P.whitecanvas,
    gallery: [P.whitecanvas, P.whitecanvas2], videoId: "-w0WbDUowLA",
    desc: "「この雪原は、風景ではありません。あなたのスタジオです。」地平線まで続く広大な農地（私有地）を1組限定で貸し切り。お客様自身が「クリエイター」となり、スタッフは「アシスタント」として撮りたい画作りを全力サポート。ドローン空撮で巨大な地上絵を描いたり、焚き火セットで雪原シチューを作ったり、テントサウナから極寒の雪原へダイブする姿を撮影したり。撮影レシピ・小道具・ホットミルク付き。企業研修やチームビルディングにも。",
    tags: ["雪原スタジオ", "ドローン空撮", "1組限定", "冬限定", "クリエイティブ"],
    lat: 43.5555, lng: 144.9719,
    mapQuery: "中標津町",
    // 基本料金: 25,000円/組(1-5名)、6名〜+5,000円/人
    // オプション: ドローン空撮+15,000円、焚き火セット+10,000円、雪原シチュー+5,000円〜、テントサウナ+30,000円
    // 催行: 1月上旬〜3月上旬 / 予約締切: 7日前 / キャンセル: 3日前50%, 当日100%
    // 服装: 上下防水スキーウェア+スノーブーツ推奨
  },
  {
    id: "e9", layer: "experience", name: "開陽台で育てる日本一のクリームシチュー体験", area: "中標津", areaId: "nakashibetsu",
    person: "しるべスタッフ", cat: "野", seasons: ["spring", "summer", "autumn"],
    duration: "約2時間", price: "¥6,000〜/人", photo: P.stew,
    gallery: [P.stew, P.stew2], videoId: "0iDZJeSclrE",
    desc: "手間ひまが最高のスパイス！開陽台の絶景キャンプ場で、ファイヤースターターを使い火花からの火起こしに挑戦。100%中標津産食材（ミルキーポーク、野菜、牛乳）をダッチオーブンでじっくりコトコト。仲間と協力して育てたクリームシチューを、中標津産小麦のカンパーニュ（特製パン）と共に味わいます。「これに勝るシチューはない」と実感できる、究極の食体験。お子様連れも歓迎。",
    tags: ["開陽台", "焚き火", "アウトドア料理", "家族向け", "中標津産食材"],
    lat: 43.5330, lng: 145.0280,
    mapQuery: "開陽台キャンプ場+中標津町",
    // 料金: 2名12,000円、3名〜+3,500円/人（税抜）
    // 催行: 5月上旬〜10月下旬 / 最少2名〜最大6名
    // 予約締切: 7日前 / キャンセル: 3日前50%, 当日100%
    // 小学生以上大人同額 / 未就学児無料
    // 含む: ガイド料・食材一式・焚き火台・ダッチオーブン・食器・保険
  },
  {
    id: "e10", layer: "experience", name: "地平線サイクリング＆地元チーズのピザ作り", area: "中標津", areaId: "nakashibetsu",
    person: "しるべスタッフ", cat: "野", seasons: ["spring", "summer", "autumn"],
    duration: "約3時間", price: "¥10,000〜/人", photo: P.ebikepizza,
    gallery: [P.ebikepizza, P.ebikepizza2], videoId: "8yR4K1hqP0g",
    desc: "電動アシスト自転車（E-BIKE）で地平線を見渡せる開陽台展望台を経由し、絶景ルートをサイクリング（約1時間）。開陽の丘キャンプ場に戻った後は、中標津産小麦と地元チーズをたっぷり使った本格ピザ作り体験。ポータブルピザ窯で焼き上げる熱々をお召し上がりください。走って・作って・食べる、3時間の贅沢。雨天時は室内ピザ窯でピザ作りのみ実施も可能。",
    tags: ["E-BIKE", "ピザ窯", "開陽台", "サイクリング", "絶景"],
    lat: 43.5330, lng: 145.0280,
    mapQuery: "開陽の丘+中標津町俣落",
    // 料金: 2名20,000円、3名〜+6,000円/人（税抜）
    // 催行: 5月上旬〜10月下旬 / 最少2名〜最大5名
    // 参加条件: 18歳以上・身長160cm以上
    // 予約締切: 7日前 / キャンセル: 3日前50%, 当日100%
    // 含む: E-BIKEレンタル・ヘルメット・ガイド料・ピザ材料・保険
  },
  {
    id: "e8", layer: "experience", name: "伝成館でつくる「なかしべつむかしそば」作り体験", area: "中標津", areaId: "nakashibetsu",
    person: "伝成館ガイド", cat: "知", seasons: ["spring", "summer", "autumn", "winter"],
    duration: "約2時間", price: "¥7,150〜/人", photo: P.soba,
    gallery: [P.soba, P.soba2], videoId: "ePPWioBnGhQ",
    desc: "中標津の開拓の歴史を今に伝える登録有形文化財「伝成館」（旧農地試験場）を貸し切り、かつての食文化を追体験。冷害に強く人々の命を繋いだ「そば」を、戦後の家庭で活躍した製麺機を使って十割そばに仕上げます。「子供がハンドルを回す係だったんだよ」と語られる家族の思い出の味。茹でたて・打ちたての香り高いそばを、歴史ある空間でじっくりと味わってください。",
    tags: ["登録有形文化財", "十割そば", "食文化体験", "通年", "伝成館"],
    lat: 43.5530, lng: 144.9750,
    mapQuery: "伝成館+中標津町",
    // 料金: 基本2名14,300円、3名〜+2,750円/人（税込）
    // 催行: 通年 / 最少2名〜最大8名
    // 予約締切: 7日前 / キャンセル: 3日前50%, 当日100%
    // そばアレルギー不可 / 小学生以上大人同額 / 未就学児無料
    // 含む: 伝成館貸切料・ガイド料・そば粉一式・製麺機レンタル・保険
  },
];

export const PEOPLE: Person[] = [
  {
    id: "p1", layer: "person", name: "佐藤 勇次", area: "標津", areaId: "shibetsu",
    specialty: "漁付・船釣り", photo: P.fisherman, gallery: [P.fisherman, P.fishing],
    desc: "標津で3代続く漁師。荒海でも知り尽くした男。",
    message: "壮大な味わいをなめんなよ俺たちにある。一緒に船に乗ろう。",
    price: "¥8,000〜", seasons: ["spring", "summer", "autumn"], tags: ["漁業", "ガイド"],
    accessTime: "空港から車30分",
    sns: [
      { type: "instagram", url: "https://instagram.com/example", label: "@sato_yuji" },
    ],
  },
  {
    id: "p2", layer: "person", name: "木村 美代子", area: "中標津", areaId: "nakashibetsu",
    specialty: "山菜の達人", photo: P.guide, gallery: [P.guide, P.foraging],
    desc: "農家出身。50年の山菜採り経験をもつガイド。",
    message: "この土地の恵みを、一緒に見つけに行きましょう。",
    seasons: ["spring"], tags: ["山菜", "ガイド"],
    accessTime: "空港から車5分",
    sns: [
      { type: "facebook", url: "https://facebook.com/example", label: "木村美代子" },
    ],
  },
  {
    id: "p3", layer: "person", name: "田中 牧場", area: "別海", areaId: "betsukai",
    specialty: "酪農家・牧場", photo: P.farmer, gallery: [P.farmer, P.cycling2],
    desc: "搾乳からバター作りまで3代目。",
    message: "うちの牛は人間よりも気持ちいいと思う。",
    price: "¥5,000〜", seasons: ["spring", "summer", "autumn", "winter"], tags: ["酪農", "牧場"],
    accessTime: "空港から車40分",
    sns: [
      { type: "instagram", url: "https://instagram.com/example", label: "@tanaka_farm" },
      { type: "youtube", url: "https://youtube.com/example", label: "田中牧場チャンネル" },
    ],
  },
  {
    id: "p4", layer: "person", name: "山田 健太", area: "釧路", areaId: "kushiro",
    specialty: "アウトドアガイド", photo: P.outdoor, gallery: [P.outdoor, P.canoe2],
    desc: "釧路に残ったアウトドアのプロ。",
    message: "湿原は水面から見ると別世界が広がってる。",
    price: "¥12,000〜", seasons: ["spring", "summer", "autumn", "winter"], tags: ["知床", "自然"],
    accessTime: "空港から車1時間30分",
    sns: [
      { type: "instagram", url: "https://instagram.com/example", label: "@yamada_outdoor" },
      { type: "website", url: "https://example.com", label: "公式サイト" },
    ],
  },
];

export const STAYS: Stay[] = [
  {
    id: "s1", layer: "stay", name: "ボシュラン 温泉旅館", area: "中標津", areaId: "nakashibetsu",
    type: "温泉旅館", price: "¥18,000〜", photo: P.onsen, gallery: [P.onsen, P.onsen2],
    desc: "源泉掛け流し。オシンコシンの滝を眺めながら入浴。冬はシマフクロウにも会える。",
    seasons: ["spring", "summer", "autumn", "winter"], tags: ["温泉", "旅館"],
    accessTime: "空港から車5分",
  },
  {
    id: "s2", layer: "stay", name: "ゲストハウス ushi", area: "別海", areaId: "betsukai",
    type: "ゲストハウス", price: "¥5,500〜", photo: P.guesthouse, gallery: [P.guesthouse],
    desc: "牧場の納屋を改装。朝食の搾りたて牛乳は飲み放題。",
    seasons: ["spring", "summer", "autumn", "winter"], tags: ["ファームステイ", "牧場"],
    accessTime: "空港から車40分",
  },
  {
    id: "s3", layer: "stay", name: "森のコテージ", area: "標津", areaId: "shibetsu",
    type: "一棟貸し", price: "¥25,000〜", photo: P.cottage, gallery: [P.cottage, P.cottage2],
    desc: "薪ストーブ。BBQデッキ付き。最大6名。",
    seasons: ["spring", "summer", "autumn", "winter"], tags: ["コテージ", "一棟貸し"],
    accessTime: "空港から車30分",
  },
];

export const FOODS: Food[] = [
  {
    id: "f1", layer: "food", name: "漁師めし処 トモ", area: "標津", areaId: "shibetsu",
    photo: P.seafood, gallery: [P.seafood],
    desc: "その日の魚を新鮮シンプルに。ドトの食は一級品。", price: "¥1,500〜",
    seasons: ["spring", "summer", "autumn", "winter"], tags: ["海鮮", "食堂"],
    accessTime: "空港から車30分",
  },
  {
    id: "f2", layer: "food", name: "出張シェフ　道東キッチン", area: "全域",
    photo: P.chef, gallery: [P.chef],
    desc: "地元食材コース料理をお泊り先やキャンプ場に。", price: "¥5,000〜/人",
    seasons: ["spring", "summer", "autumn", "winter"], tags: ["シェフ", "コース料理"],
  },
  {
    id: "f3", layer: "food", name: "別海ミルクジェラート", area: "別海", areaId: "betsukai",
    photo: P.gelato, gallery: [P.gelato],
    desc: "絞りたて牛乳のジェラート。上味がころころ変わる。", price: "¥400〜",
    seasons: ["spring", "summer", "autumn"], tags: ["ジェラート", "牧場"],
    accessTime: "空港から車40分",
  },
];

export const ITEMS_DATA: Item[] = [
  {
    id: "i1", layer: "item", name: "e-bikeレンタル", area: "別海・中標津", areaId: "nakashibetsu",
    photo: P.ebike, gallery: [P.ebike],
    desc: "電動MTB。坂道も楽チン。", price: "¥4,000/日",
    seasons: ["spring", "summer", "autumn"], tags: ["自転車", "レンタル"],
    accessTime: "空港から車5分",
  },
  {
    id: "i2", layer: "item", name: "レンタカー（4WD）", area: "中標津空港", areaId: "nakashibetsu",
    photo: P.car, gallery: [P.car],
    desc: "冬でも安心4WD。スタッドレスも標準装備。", price: "¥8,000/日〜",
    seasons: ["spring", "summer", "autumn", "winter"], tags: ["レンタカー", "移動"],
    accessTime: "空港から車5分",
  },
  {
    id: "i3", layer: "item", name: "アウトドアセット", area: "配送対応",
    photo: P.camp, gallery: [P.camp],
    desc: "テント・タープ・焚き火台・調理器具一式。", price: "¥6,000/日",
    seasons: ["summer", "autumn"], tags: ["キャンプ", "レンタル"],
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
