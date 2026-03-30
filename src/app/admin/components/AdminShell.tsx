"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminShellProps {
  children: React.ReactNode;
}

export default function AdminShell({ children }: AdminShellProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    // Verify token by trying to fetch content
    fetch("/api/admin/content", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.ok) {
          setAuthenticated(true);
        } else {
          localStorage.removeItem("admin_token");
          router.push("/admin");
        }
      })
      .catch(() => {
        router.push("/admin");
      })
      .finally(() => {
        setChecking(false);
      });
  }, [router]);

  if (checking) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        color: "#9A9488",
        fontSize: "16px",
      }}>
        読み込み中...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}
