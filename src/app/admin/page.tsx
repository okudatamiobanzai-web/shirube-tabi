"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "ログインに失敗しました");
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_token", data.token);
      router.push("/admin/dashboard");
    } catch {
      setError("通信エラーが発生しました");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#F7F4F0",
    }}>
      <form onSubmit={handleLogin} style={{
        background: "#fff",
        padding: "48px 40px",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        width: "100%",
        maxWidth: "400px",
      }}>
        <h1 style={{
          fontSize: "24px",
          fontWeight: 700,
          marginBottom: "8px",
          color: "#1E1C18",
          textAlign: "center",
        }}>
          しるべ旅 管理画面
        </h1>
        <p style={{
          fontSize: "14px",
          color: "#9A9488",
          textAlign: "center",
          marginBottom: "32px",
        }}>
          Admin Panel
        </p>

        {error && (
          <div style={{
            background: "#FDF0EE",
            color: "#E5382A",
            padding: "12px 16px",
            borderRadius: "8px",
            fontSize: "14px",
            marginBottom: "20px",
          }}>
            {error}
          </div>
        )}

        <label style={{
          display: "block",
          fontSize: "14px",
          fontWeight: 600,
          color: "#5A5650",
          marginBottom: "8px",
        }}>
          パスワード
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="パスワードを入力"
          autoFocus
          style={{
            width: "100%",
            padding: "12px 16px",
            border: "1px solid #DDD7CC",
            borderRadius: "8px",
            fontSize: "16px",
            outline: "none",
            marginBottom: "24px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading || !password}
          style={{
            width: "100%",
            padding: "14px",
            background: loading ? "#9A9488" : "#1a2a1a",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "ログイン中..." : "ログイン"}
        </button>
      </form>
    </div>
  );
}
