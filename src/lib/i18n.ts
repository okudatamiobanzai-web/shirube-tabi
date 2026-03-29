// UI string translations — ja (default) / en
// Content data (item names, descriptions) are separate — add `nameEn`, `descEn` fields to data when ready.

export type Lang = "ja" | "en";

const dict = {
  // Hero
  "hero.tagline": {
    ja: "体験・人・宿・食・アイテムを選んで、あなただけの道東の旅を仕立てる。",
    en: "Choose experiences, people, stays, food & gear — craft your own journey through Eastern Hokkaido.",
  },

  // Section headers
  "section.fiveLayers": { ja: "旅の素材を選ぶ", en: "Choose Your Travel Ingredients" },
  "section.modelCourse": { ja: "おすすめのモデルコース", en: "Recommended Model Courses" },
  "section.modelCourseSub": {
    ja: "はじめての道東に。そのまま申し込んでも、アレンジしてもOK。",
    en: "For first-time visitors. Book as-is or customize to your liking.",
  },
  "section.areaMap": { ja: "エリアの位置関係", en: "Area Map" },
  "section.seasonalPicks": { ja: "季節のおすすめ体験", en: "Seasonal Picks" },
  "section.concierge": { ja: "旅のコンシェルジュ", en: "Your Concierge" },
  "section.allInclusive.title": { ja: "余白はすべて、\nオールインクルーシブ", en: "Everything In Between,\nAll-Inclusive" },
  "section.allInclusive.desc": {
    ja: "移動・宿・食事・体験、すべてを一括手配。あの段取りから解放される。",
    en: "Transport, stays, meals, experiences — all arranged for you. Freedom from planning.",
  },

  // Layers
  "layer.experience": { ja: "体験", en: "Experience" },
  "layer.person": { ja: "人", en: "People" },
  "layer.stay": { ja: "宿", en: "Stay" },
  "layer.food": { ja: "食", en: "Food" },
  "layer.item": { ja: "アイテム", en: "Gear" },

  // Seasons
  "season.all": { ja: "すべて", en: "All" },
  "season.spring": { ja: "春 (4-5月)", en: "Spring (Apr–May)" },
  "season.summer": { ja: "夏 (6-8月)", en: "Summer (Jun–Aug)" },
  "season.autumn": { ja: "秋 (9-11月)", en: "Autumn (Sep–Nov)" },
  "season.winter": { ja: "冬 (12-3月)", en: "Winter (Dec–Mar)" },

  // Buttons & actions
  "btn.buildTrip": { ja: "旅を組み立てる →", en: "Build Your Trip →" },
  "btn.buildTripSub": { ja: "素材を選んで、あなただけの旅を仕立てましょう", en: "Choose your ingredients and craft your perfect trip" },
  "btn.back": { ja: "← 戻る", en: "← Back" },
  "btn.addMyList": { ja: "♡ マイリストに追加する", en: "♡ Add to My List" },
  "btn.addedMyList": { ja: "♥ マイリストに追加済み", en: "♥ Added to My List" },
  "btn.submit": { ja: "この内容で相談する", en: "Submit Inquiry" },
  "btn.consultCourse": { ja: "このコースをベースに相談する", en: "Inquire Based on This Course" },
  "btn.addCourseAll": { ja: "♡ コースの素材をまとめてマイリストに追加", en: "♡ Add All Course Items to My List" },
  "btn.addedCourseAll": { ja: "✓ コースの素材をマイリストに追加済み", en: "✓ Course Items Added to My List" },
  "btn.buildFromList": { ja: "この素材で旅を組み立てる →", en: "Build Trip with These →" },
  "btn.seeMore": { ja: "もっと見る →", en: "See more →" },

  // List page
  "list.items": { ja: "件", en: " items" },
  "list.noResults": { ja: "条件に合う{layer}はありません", en: "No {layer} match your filters" },
  "list.noSeason": { ja: "この季節の体験は準備中です", en: "Experiences for this season are coming soon" },

  // Detail page
  "detail.guide": { ja: "GUIDE", en: "GUIDE" },
  "share.label": { ja: "共有:", en: "Share:" },
  "share.copy": { ja: "コピー", en: "Copy" },
  "share.copied": { ja: "リンクをコピーしました", en: "Link copied!" },

  // My List
  "mylist.title": { ja: "マイリスト", en: "My List" },
  "mylist.empty": { ja: "まだ何も選ばれていません。\n♡で素材を追加してください。", en: "Nothing selected yet.\nTap ♡ to add items." },

  // Builder page
  "builder.title": { ja: "旅を組み立てる", en: "Build Your Trip" },
  "builder.subtitle": {
    ja: "まずは3つだけ教えてください。あとはしるべが一緒に考えます。",
    en: "Just 3 things to start. We'll figure out the rest together.",
  },
  "builder.step1": { ja: "STEP 1 — まずはこれだけ", en: "STEP 1 — Just the Basics" },
  "builder.name": { ja: "お名前", en: "Name" },
  "builder.namePh": { ja: "コツ 太郎", en: "Your name" },
  "builder.email": { ja: "メールアドレス", en: "Email" },
  "builder.when": { ja: "いつ頃行きたいですか？", en: "When would you like to go?" },
  "builder.whenPh": { ja: "例: 2026年7月上旬 / 夏休み中 / まだ未定", en: "e.g. Early July 2026 / Summer break / Not decided yet" },
  "builder.submitNote": {
    ja: "☝ これだけでも送れます。24時間以内に返信します。",
    en: "☝ This is enough to get started. We'll respond within 24 hours.",
  },
  "builder.moreTitle": { ja: "もう少し教えてくれると、より良い提案ができます", en: "Tell us more for a better proposal" },
  "builder.moreSub": { ja: "日数・旅のスタイル・移動手段など（すべて任意）", en: "Duration, style, transport, etc. (all optional)" },
  "builder.withWhom": { ja: "誰と行きますか？", en: "Who are you traveling with?" },
  "builder.days": { ja: "日数", en: "Duration" },
  "builder.transport": { ja: "移動手段", en: "Transport" },
  "builder.budget": { ja: "ご予算感（1人あたり）", en: "Budget (per person)" },
  "builder.wish": { ja: "YOUR WISH", en: "YOUR WISH" },
  "builder.wishPh": {
    ja: "「子どもが大喜びな体験希望」「のんびり温泉多め」「アウトドア全振り」など何でもどうぞ",
    en: "\"Kid-friendly experiences\" \"More hot springs\" \"Full outdoor adventure\" — anything goes!",
  },
  "builder.phone": { ja: "電話番号（任意・急ぎの確認用）", en: "Phone (optional, for urgent matters)" },
  "builder.selectedItems": { ja: "マイリストで選んだ素材（参考としてお送りします）", en: "Items from your list (sent as reference)" },
  "builder.submitNote2": { ja: "24時間以内に一次返信をお届けします", en: "We'll send an initial response within 24 hours" },
  "builder.basedOn": { ja: "BASED ON MODEL COURSE", en: "BASED ON MODEL COURSE" },
  "builder.arrangeNote": { ja: "※ このコースをベースに、アレンジ希望があれば自由記述にどうぞ", en: "* Feel free to describe any customizations you'd like" },

  // Builder chips
  "chip.couple": { ja: "カップル・夫婦", en: "Couple" },
  "chip.family": { ja: "家族（子連れ）", en: "Family (with kids)" },
  "chip.friends": { ja: "友人グループ", en: "Friends" },
  "chip.solo": { ja: "一人旅", en: "Solo" },
  "chip.group": { ja: "団体・社員旅行", en: "Group / Corporate" },
  "chip.1n": { ja: "日帰り", en: "Day trip" },
  "chip.2n": { ja: "1泊2日", en: "1 night" },
  "chip.3n": { ja: "2泊3日", en: "2 nights" },
  "chip.4n": { ja: "3泊4日〜", en: "3+ nights" },
  "chip.car": { ja: "レンタカーあり", en: "Rental car" },
  "chip.nocar": { ja: "車なし（送迎希望）", en: "No car (need pickup)" },
  "chip.rent": { ja: "現地で借りたい", en: "Rent locally" },
  "chip.any": { ja: "特にこだわりなし", en: "No preference" },
  "chip.30k": { ja: "〜3万円", en: "~¥30,000" },
  "chip.50k": { ja: "3〜5万円", en: "¥30–50,000" },
  "chip.100k": { ja: "5〜10万円", en: "¥50–100,000" },
  "chip.100k+": { ja: "10万円〜", en: "¥100,000+" },

  // Thank you
  "thanks.title": { ja: "ありがとうございます", en: "Thank You" },
  "thanks.body": {
    ja: "24時間以内に一次返信、\n72時間以内に叩き案をお届けします。",
    en: "We'll respond within 24 hours\nand send a draft plan within 72 hours.",
  },
  "thanks.footer": { ja: "しるべが、あなたの旅をなぞります。", en: "Shirube will trace your journey." },

  // Validation
  "error.name": { ja: "お名前を入力してください", en: "Please enter your name" },
  "error.email": { ja: "メールアドレスを入力してください", en: "Please enter your email" },
  "error.emailInvalid": { ja: "正しいメールアドレスを入力してください", en: "Please enter a valid email" },
  "error.when": { ja: "時期を入力してください", en: "Please enter your preferred dates" },

  // Area map
  "map.airport": { ja: "中標津空港", en: "Nakashibetsu Airport" },
  "map.driveTitle": { ja: "✈ 中標津空港からの移動時間", en: "✈ Drive Times from Nakashibetsu Airport" },
  "map.driveNote": { ja: "※ 車での所要時間（目安）。すべて移動を手配します。", en: "* Approximate driving times. We arrange all transport." },
  "map.all": { ja: "すべて", en: "All" },

  // Course modal
  "course.arrangeNote": { ja: "※ 体験の変更や、宿の変更、日程の追加などアレンジ自由です。", en: "* Feel free to change experiences, stays, or add days." },

  // Operator
  "operator.desc": {
    ja: "中標津のコワーキングスペース「milk」を拠点に、地域の体験を設計。土地の人と営みをつなぐコンシェルジュとして、あなただけの旅を一括手配します。",
    en: "Based at coworking space \"milk\" in Nakashibetsu, designing local experiences. As a concierge connecting travelers with local people and livelihoods, we arrange your entire trip.",
  },
  "operator.tag.travel": { ja: "旅行サービス手配業", en: "Travel Arrangement Services" },
  "operator.tag.chiiki": { ja: "地域おこし協力隊", en: "Regional Revitalization Coordinator" },

  // My List - clear all
  "mylist.clearAll": { ja: "すべて削除", en: "Clear All" },
  "mylist.clearConfirm": { ja: "マイリストをすべて削除しますか？", en: "Clear all items from your list?" },

  // Builder - selected count
  "builder.selectedCount": { ja: "{count}件", en: "{count} items" },

  // Footer
  "footer.copyright": { ja: "© 2026 株式会社しるべ", en: "© 2026 Shirube Inc." },
  "footer.contact": { ja: "お問い合わせ", en: "Contact Us" },
} as const;

export type TKey = keyof typeof dict;

export function t(key: TKey, lang: Lang): string {
  return dict[key]?.[lang] ?? dict[key]?.ja ?? key;
}

// Template helper for strings with {placeholders}
export function tf(key: TKey, lang: Lang, vars: Record<string, string>): string {
  let s = t(key, lang);
  for (const [k, v] of Object.entries(vars)) {
    s = s.replace(`{${k}}`, v);
  }
  return s;
}
