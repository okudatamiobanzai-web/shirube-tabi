"use client";

import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Login page gets no sidebar
  if (pathname === "/admin") {
    return <>{children}</>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#F7F4F0" }}>
      <AdminSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <AdminTopBar />
        <main style={{ flex: 1, padding: "32px", overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "ダッシュボード", icon: "📊" },
  { href: "/admin/experiences", label: "体験", icon: "🎯" },
  { href: "/admin/people", label: "人", icon: "👤" },
  { href: "/admin/stays", label: "宿", icon: "🏠" },
  { href: "/admin/food", label: "食", icon: "🍽" },
  { href: "/admin/items", label: "アイテム", icon: "🚗" },
  { href: "/admin/courses", label: "コース", icon: "🗺" },
  { href: "/admin/reviews", label: "レビュー", icon: "⭐" },
  { href: "/admin/faq", label: "FAQ", icon: "❓" },
  { href: "/admin/settings", label: "設定", icon: "⚙" },
];

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <nav style={{
      width: "240px",
      background: "#1a2a1a",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
    }}>
      <div style={{
        padding: "24px 20px",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ fontSize: "18px", fontWeight: 700 }}>しるべ旅</div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", marginTop: "2px" }}>
          Admin Panel
        </div>
      </div>
      <div style={{ padding: "12px 8px", flex: 1 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== "/admin/dashboard" && pathname === `/admin/${item.href.split("/").pop()}`);
          return (
            <a
              key={item.href}
              href={item.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                background: isActive ? "rgba(255,255,255,0.12)" : "transparent",
                textDecoration: "none",
                marginBottom: "2px",
                transition: "background 0.15s",
              }}
            >
              <span style={{ fontSize: "16px" }}>{item.icon}</span>
              {item.label}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

function AdminTopBar() {
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin";
  };

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      gap: "16px",
      padding: "12px 32px",
      borderBottom: "1px solid #DDD7CC",
      background: "#fff",
    }}>
      <a
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          fontSize: "14px",
          color: "#5A5650",
          textDecoration: "none",
          padding: "6px 14px",
          border: "1px solid #DDD7CC",
          borderRadius: "6px",
        }}
      >
        サイトを見る
      </a>
      <button
        onClick={handleLogout}
        style={{
          fontSize: "14px",
          color: "#E5382A",
          background: "none",
          border: "1px solid #E5382A",
          borderRadius: "6px",
          padding: "6px 14px",
          cursor: "pointer",
        }}
      >
        ログアウト
      </button>
    </header>
  );
}
