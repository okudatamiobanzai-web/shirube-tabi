import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-bg relative lg:max-w-[1200px]">
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="text-5xl mb-5">🦌</div>
        <h1 className="text-xl font-bold text-foreground mb-2">ページが見つかりません</h1>
        <p className="text-sm text-gray-400 mb-8 leading-relaxed">
          お探しのページは存在しないか、<br />移動した可能性があります。
        </p>
        <Link
          href="/"
          className="px-6 py-3 rounded-xl text-sm font-medium bg-[#2d5a3d] text-white no-underline hover:opacity-90 transition-opacity"
        >
          トップに戻る
        </Link>
      </div>
    </div>
  );
}
