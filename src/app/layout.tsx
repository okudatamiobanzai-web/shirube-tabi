import type { Metadata, Viewport } from "next";
import { Playfair_Display, Noto_Serif_JP, Noto_Sans_JP, JetBrains_Mono } from "next/font/google";
import { MyListProvider } from "@/lib/mylist-context";
import { LangProvider } from "@/lib/lang-context";
import ErrorBoundary from "@/components/ErrorBoundary";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const notoSerif = Noto_Serif_JP({
  variable: "--font-serif-jp",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const notoSans = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://tabi.shirubelab.jp"),
  title: "しるべ旅 | 道東の旅をまるごと手配",
  description: "道東の体験・人・宿・食・アイテムを選んで、あなただけの旅を仕立てる。しるべ旅は、その間の余白を一括手配するコンシェルジュ。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "しるべ旅 — SHIRUBE TABI",
    description: "体験・人・宿・食・アイテムを選んで、あなただけの道東の旅を仕立てる。",
    siteName: "しるべ旅",
    locale: "ja_JP",
    type: "website",
    url: "https://tabi.shirubelab.jp",
    images: [{ url: "https://tabi.shirubelab.jp/images/logo.png", width: 1500, height: 800, alt: "しるべ旅" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "しるべ旅 — SHIRUBE TABI",
    description: "体験・人・宿・食・アイテムを選んで、あなただけの道東の旅を仕立てる。",
    images: ["https://tabi.shirubelab.jp/images/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body
        className={`${playfair.variable} ${notoSerif.variable} ${notoSans.variable} ${jetbrains.variable} grain`}
      >
        <ErrorBoundary>
          <LangProvider>
            <MyListProvider>
              <div className="max-w-[430px] mx-auto min-h-screen bg-bg relative lg:max-w-[1200px]">
                {children}
              </div>
            </MyListProvider>
          </LangProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
