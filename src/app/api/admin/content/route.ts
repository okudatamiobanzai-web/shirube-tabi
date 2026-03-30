import { NextRequest, NextResponse } from "next/server";
import { getContent, writeContent } from "@/lib/content-provider";
import { verifyToken } from "../auth/route";

export async function GET() {
  try {
    const content = getContent();
    return NextResponse.json(content);
  } catch {
    return NextResponse.json({ error: "コンテンツの読み込みに失敗しました" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    if (!verifyToken(token)) {
      return NextResponse.json({ error: "認証トークンが無効です" }, { status: 401 });
    }

    const body = await req.json();
    writeContent(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "コンテンツの保存に失敗しました" }, { status: 500 });
  }
}
