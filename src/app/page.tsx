"use client";

import { useState } from "react";
import { MODEL_COURSES, EXPERIENCES, AREA_DISTANCES, SEASON_LABELS, LAYERS, type Season, type LayerKey, type Experience, type ModelCourse } from "./data";

// ============================================================
// Hero Section
// ============================================================
function Hero() {
  return (
    <div className="relative h-[460px] overflow-hidden" style={{ background: "linear-gradient(to bottom, #1a2a1a, #2d3a2d)" }}>
      <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80" alt="道東の風景" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-6">
        <p className="text-xs tracking-[0.3em] uppercase opacity-70 mb-3">DOTO, HOKKAIDO</p>
        <h1 className="text-3xl font-semibold tracking-tight mb-4">しるべ旅</h1>
        <p className="text-sm leading-relaxed opacity-90 max-w-md">体験・人・宿・食・アイテムを選んで、あなただけの道東の旅を仕立てる。</p>
      </div>
    </div>
  );
}

// ============================================================
// Five Layers Section
// ============================================================
function FiveLayers() {
  return (
    <section className="px-6 py-12">
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.2em] text-[var(--mute)] uppercase mb-1">Five Layers</p>
        <h2 className="text-xl font-semibold">旅の素材を選ぶ</h2>
      </div>
      <div className="grid grid-cols-5 gap-2.5">
        {LAYERS.filter((l) => l.key !== "all").map((layer) => (
          <div key={layer.key} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors cursor-pointer">
            <span className="text-xs tracking-[0.15em] text-[var(--mute)] uppercase">{layer.labelEn}</span>
            <span className="text-sm font-medium">{layer.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Model Course Card
// ============================================================
function ModelCourseCard({ course }: { course: ModelCourse }) {
  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden flex-shrink-0 w-[300px]">
      <div className="h-[160px] overflow-hidden">
        <img src={course.imageUrl} alt={course.title} className="w-full h-full object-cover" />
      </div>
      <div className="p-4">
        <p className="text-[10px] tracking-[0.15em] text-[var(--mute)] uppercase mb-1">MODEL COURSE</p>
        <h3 className="font-semibold text-[var(--foreground)] mb-1">{course.title}</h3>
        <p className="text-xs text-[var(--mute)] mb-3">{course.area}</p>
        {course.days.map((day, i) => (
          <div key={i} className="mb-2">
            <span className="text-[10px] font-semibold text-[var(--accent)] uppercase">DAY {i + 1}</span>
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
              {day.activities.map((act, j) => (
                <span key={j} className="text-xs text-[var(--sub)]">{act}</span>
              ))}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--border)]">
          <span className="font-semibold text-[var(--accent)]">{course.price}</span>
          <span className="text-xs text-[var(--accent)] cursor-pointer hover:underline">もっと見る →</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Model Courses Section
// ============================================================
function ModelCourses() {
  return (
    <section className="py-12">
      <div className="text-center px-6 mb-6">
        <p className="text-xs tracking-[0.2em] text-[var(--mute)] uppercase mb-1">Model Course</p>
        <h2 className="text-xl font-semibold mb-2">おすすめのモデルコース</h2>
        <p className="text-sm text-[var(--mute)]">はじめての道東に。そのまま申し込んでも、アレンジしてもOK。</p>
      </div>
      <div className="flex gap-4 overflow-x-auto px-6 pb-4 hide-scrollbar">
        {MODEL_COURSES.map((course) => (
          <ModelCourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// Area Map Section
// ============================================================
function AreaMap() {
  return (
    <section className="px-6 py-12 bg-[var(--card)]">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.2em] text-[var(--mute)] uppercase mb-1">Area Map</p>
        <h2 className="text-xl font-semibold mb-2">エリアの位置関係</h2>
      </div>
      <div className="bg-[var(--soft)] rounded-2xl p-5">
        <p className="text-xs font-semibold text-center mb-4 text-[var(--sub)]">✈ 中標津空港からの移動時間</p>
        <div className="space-y-2">
          {AREA_DISTANCES.map((area) => (
            <div key={area.name} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
              <span className="text-sm font-medium">{area.name}</span>
              <span className="text-sm text-[var(--mute)]">{area.time}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[var(--mute)] mt-4 text-center">※ 車での所要時間（目安）。すべて移動を手配します。</p>
      </div>
    </section>
  );
}

// ============================================================
// Experience Card
// ============================================================
function ExperienceCard({ exp, onFav, isFav }: { exp: Experience; onFav: (id: string) => void; isFav: boolean }) {
  return (
    <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden flex-shrink-0 w-[200px]">
      <div className="h-[130px] overflow-hidden relative">
        <img src={exp.imageUrl} alt={exp.title} className="w-full h-full object-cover" />
        {exp.isShort && (
          <span className="absolute top-2 left-2 text-[9px] bg-white/90 text-[var(--sub)] px-2 py-0.5 rounded-full font-medium">SHORT</span>
        )}
        <button onClick={() => onFav(exp.id)} className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm ${isFav ? "bg-[var(--accent)] text-white" : "bg-white/80 text-[var(--mute)]"}`}>
          ♡
        </button>
      </div>
      <div className="p-3">
        <p className="text-[9px] tracking-[0.1em] text-[var(--mute)] uppercase mb-1">EXPERIENCE</p>
        <h3 className="text-sm font-semibold text-[var(--foreground)] mb-1 leading-snug">{exp.title}</h3>
        <p className="text-xs text-[var(--mute)]">{exp.location} — {exp.price}</p>
        <p className="text-[10px] text-[var(--mute)] mt-1">{exp.accessTime}</p>
      </div>
    </div>
  );
}

// ============================================================
// Seasonal Picks Section
// ============================================================
function SeasonalPicks({ favs, onFav }: { favs: Set<string>; onFav: (id: string) => void }) {
  const [season, setSeason] = useState<"all" | Season>("all");
  const filtered = season === "all" ? EXPERIENCES : EXPERIENCES.filter((e) => e.seasons.includes(season));

  return (
    <section className="py-12">
      <div className="text-center px-6 mb-4">
        <p className="text-xs tracking-[0.2em] text-[var(--mute)] uppercase mb-1">Seasonal Picks</p>
        <h2 className="text-xl font-semibold">季節のおすすめ体験</h2>
      </div>
      <div className="flex gap-2 px-6 mb-5 overflow-x-auto hide-scrollbar">
        {SEASON_LABELS.map((s) => (
          <button key={s.key} onClick={() => setSeason(s.key)} className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${season === s.key ? "bg-[var(--accent)] text-white" : "bg-[var(--soft)] text-[var(--sub)]"}`}>
            {s.label}
          </button>
        ))}
      </div>
      <div className="flex gap-3 overflow-x-auto px-6 pb-4 hide-scrollbar">
        {filtered.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} onFav={onFav} isFav={favs.has(exp.id)} />
        ))}
      </div>
    </section>
  );
}

// ============================================================
// All-Inclusive Section
// ============================================================
function AllInclusive() {
  return (
    <section className="px-6 py-12 bg-[var(--card)] text-center">
      <p className="text-xs tracking-[0.2em] text-[var(--mute)] uppercase mb-1">ALL-INCLUSIVE</p>
      <h2 className="text-xl font-semibold mb-3">余白はすべて、<br />オールインクルーシブ</h2>
      <p className="text-sm text-[var(--mute)] max-w-md mx-auto">移動・宿・食事・体験、すべてを一括手配。あの段取りから解放される。</p>
    </section>
  );
}

// ============================================================
// Concierge Section
// ============================================================
function Concierge() {
  return (
    <section className="px-6 py-12">
      <div className="text-center mb-6">
        <p className="text-xs tracking-[0.2em] text-[var(--mute)] uppercase mb-1">Your Concierge</p>
        <h2 className="text-xl font-semibold">旅のコンシェルジュ</h2>
      </div>
      <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6">
        <p className="text-[10px] tracking-[0.15em] text-[var(--mute)] uppercase mb-2">YOUR CONCIERGE</p>
        <h3 className="text-lg font-semibold mb-3">久保 竜太郎</h3>
        <p className="text-sm text-[var(--mute)] leading-relaxed mb-4">中標津のコワーキングスペース「milk」を拠点に、地域の体験を設計。土地の人と営みをつなぐコンシェルジュとして、あなただけの旅を一括手配します。</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-[var(--soft)] text-[var(--sub)] px-3 py-1 rounded-full">旅行サービス手配業</span>
          <span className="text-xs bg-[var(--soft)] text-[var(--sub)] px-3 py-1 rounded-full">地域おこし協力隊</span>
        </div>
        <a href="https://line.me/R/oaMessage/@shirubelab/" className="inline-block bg-[var(--accent)] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">旅を組み立てる →</a>
      </div>
    </section>
  );
}

// ============================================================
// Footer
// ============================================================
function Footer() {
  return (
    <footer className="px-6 py-8 bg-[var(--card)] border-t border-[var(--border)] text-center">
      <p className="text-sm text-[var(--sub)] mb-1">素材を選んで、あなただけの旅を仕立てましょう</p>
      <p className="text-xs tracking-[0.15em] text-[var(--mute)] uppercase mt-3">SHIRUBE TABI — DOTO, HOKKAIDO</p>
      <div className="mt-4 space-y-1">
        <a href="https://line.me/R/oaMessage/@shirubelab/" className="text-xs text-[var(--accent)] hover:underline">お問い合わせ</a>
        <p className="text-[10px] text-[var(--mute)]">© 2026 株式会社しるべ</p>
      </div>
    </footer>
  );
}

// ============================================================
// My List Floating Button
// ============================================================
function MyListButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} className="fixed bottom-6 right-6 bg-[var(--accent)] text-white px-4 py-3 rounded-full shadow-lg hover:opacity-90 transition-opacity z-50 flex items-center gap-2">
      <span>♡</span>
      <span className="text-sm font-medium">MY LIST</span>
      {count > 0 && (
        <span className="bg-white text-[var(--accent)] text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{count}</span>
      )}
    </button>
  );
}

// ============================================================
// Main Page
// ============================================================
export default function Home() {
  const [favs, setFavs] = useState<Set<string>>(new Set());
  const [showList, setShowList] = useState(false);

  const toggleFav = (id: string) => {
    setFavs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <Hero />
      <FiveLayers />
      <ModelCourses />
      <AreaMap />
      <SeasonalPicks favs={favs} onFav={toggleFav} />
      <AllInclusive />
      <Concierge />
      <Footer />
      <MyListButton count={favs.size} onClick={() => setShowList(!showList)} />

      {/* My List Drawer */}
      {showList && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setShowList(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-[var(--card)] rounded-t-2xl w-full max-w-lg p-6 pb-10" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">マイリスト</h3>
              <button onClick={() => setShowList(false)} className="text-[var(--mute)] text-xl">×</button>
            </div>
            {favs.size === 0 ? (
              <p className="text-sm text-[var(--mute)] text-center py-8">まだ何も選ばれていません。<br />♡で素材を追加してください。</p>
            ) : (
              <div className="space-y-3">
                {EXPERIENCES.filter((e) => favs.has(e.id)).map((exp) => (
                  <div key={exp.id} className="flex items-center gap-3 p-3 bg-[var(--soft)] rounded-xl">
                    <img src={exp.imageUrl} alt={exp.title} className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{exp.title}</p>
                      <p className="text-xs text-[var(--mute)]">{exp.price}</p>
                    </div>
                    <button onClick={() => toggleFav(exp.id)} className="text-[var(--accent)] text-sm">×</button>
                  </div>
                ))}
                <a href="https://line.me/R/oaMessage/@shirubelab/" className="block text-center bg-[var(--accent)] text-white py-3 rounded-xl text-sm font-medium mt-4">この内容で相談する →</a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
