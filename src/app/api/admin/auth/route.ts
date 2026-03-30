import { NextRequest, NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "shirube2026";

function makeToken(password: string): string {
  const timestamp = Date.now().toString();
  const payload = JSON.stringify({ ts: timestamp, pw: Buffer.from(password).toString("base64") });
  return Buffer.from(payload).toString("base64");
}

export function verifyToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
    const pw = Buffer.from(payload.pw, "base64").toString("utf-8");
    if (pw !== ADMIN_PASSWORD) return false;
    const ts = parseInt(payload.ts, 10);
    // Token valid for 24 hours
    if (Date.now() - ts > 24 * 60 * 60 * 1000) return false;
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "パスワードが必要です" }, { status: 400 });
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "パスワードが正しくありません" }, { status: 401 });
    }

    const token = makeToken(password);
    return NextResponse.json({ token });
  } catch {
    return NextResponse.json({ error: "リクエストエラー" }, { status: 400 });
  }
}
