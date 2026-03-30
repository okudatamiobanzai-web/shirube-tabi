import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "consultations.json");

// Google Apps Script webhook URL (placeholder - replace with actual URL)
const GAS_WEBHOOK_URL = process.env.GAS_WEBHOOK_URL || "";

interface ConsultationData {
  id: string;
  name: string;
  email: string;
  when: string;
  style: string;
  days: string;
  transport: string;
  budget: string;
  wish: string;
  phone: string;
  selectedItems: string[];
  baseCourse: string | null;
  submittedAt: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const consultation: ConsultationData = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: body.name || "",
      email: body.email || "",
      when: body.when || "",
      style: body.style || "",
      days: body.days || "",
      transport: body.transport || "",
      budget: body.budget || "",
      wish: body.wish || "",
      phone: body.phone || "",
      selectedItems: body.selectedItems || [],
      baseCourse: body.baseCourse || null,
      submittedAt: new Date().toISOString(),
    };

    // Ensure data directory exists
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    // Read existing data
    let consultations: ConsultationData[] = [];
    if (fs.existsSync(DATA_FILE)) {
      try {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        consultations = JSON.parse(raw);
      } catch {
        consultations = [];
      }
    }

    // Append new consultation
    consultations.push(consultation);
    fs.writeFileSync(DATA_FILE, JSON.stringify(consultations, null, 2), "utf-8");

    // Send email notification via Google Apps Script webhook (if configured)
    if (GAS_WEBHOOK_URL) {
      try {
        await fetch(GAS_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(consultation),
        });
      } catch {
        // Webhook failure should not block the response
        console.error("Failed to send webhook notification");
      }
    }

    return NextResponse.json({ success: true, id: consultation.id });
  } catch (error) {
    console.error("Consultation API error:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
