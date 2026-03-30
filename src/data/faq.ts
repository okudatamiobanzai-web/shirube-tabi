export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export const FAQ_ITEMS: FAQItem[] = [
  { id: "q1", question: "道東へのアクセス方法は？", answer: "東京から中標津空港まで約1時間45分（直行便）。札幌からは車で約5時間、または釧路空港経由もあります。中標津空港が最寄りです。", category: "アクセス", order: 1 },
  { id: "q2", question: "ベストシーズンはいつですか？", answer: "それぞれの季節に魅力があります。夏（6-8月）は緑と花、秋（9-11月）は紅葉と鮭、冬（12-3月）は雪原と流氷、春（4-5月）は新緑。ご希望に合わせて提案します。", category: "旅行計画", order: 2 },
  { id: "q3", question: "子連れでも楽しめますか？", answer: "はい！酪農体験やジェラート作り、サイクリングなど子ども向けの体験も豊富です。年齢に合わせてプランを提案します。", category: "旅行計画", order: 3 },
  { id: "q4", question: "レンタカーは必要ですか？", answer: "基本的にはレンタカーがおすすめですが、送迎付きプランもご用意しています。「車なし（送迎希望）」を選んでご相談ください。", category: "移動", order: 4 },
  { id: "q5", question: "予約はどのくらい前にすべきですか？", answer: "2週間前までの予約をおすすめします。夏休みや年末年始は1ヶ月前がベストです。直前でも対応可能な場合がありますのでお気軽にご相談ください。", category: "予約", order: 5 },
  { id: "q6", question: "キャンセルポリシーは？", answer: "体験の3日前まで無料キャンセル可能です。2日前〜前日は50%、当日は100%のキャンセル料が発生します。天候による中止の場合は全額返金します。", category: "予約", order: 6 },
];
