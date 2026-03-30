export interface Review {
  id: string;
  name: string;
  area: string;
  text: string;
  rating: number;
  experienceTitle: string;
  date: string;
}

export const REVIEWS: Review[] = [
  { id: "r1", name: "M.S.さん", area: "東京都", text: "家族で最高の思い出ができました！子どもたちが漁師体験に大興奮でした。しるべさんの提案で想像以上の旅になりました。", rating: 5, experienceTitle: "漁師の船釣り体験", date: "2025-08" },
  { id: "r2", name: "K.T.さん", area: "大阪府", text: "ホワイトキャンバスは想像以上のスケール。ドローン撮影が最高でした。一生モノの写真が撮れます。", rating: 5, experienceTitle: "ホワイトキャンバス・スタジオ", date: "2026-01" },
  { id: "r3", name: "Y.N.さん", area: "福岡県", text: "酪農サイクリングは地平線が見えて感動。ジェラートも絶品です。道東の広さを体感できます。", rating: 5, experienceTitle: "地平線サイクリング", date: "2025-07" },
  { id: "r4", name: "A.H.さん", area: "神奈川県", text: "しるべさんの提案で、知らなかった道東の魅力を発見できました。次は冬に来たいです。", rating: 4, experienceTitle: "", date: "2025-09" },
];
