import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "しるべ旅 | 道東の旅をまるごと手配",
  description: "体験・人・宿・食・アイテムを選んで、あなただけの道東の旅を仕立てる。",
  openGraph: {
    title: "しるべ旅 | 道東の旅をまるごと手配",
    description: "体験・人・宿・食・アイテムを選んで、あなただけの道東の旅を仕立てる。",
    url: "https://tabi.shirubelab.jp",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
