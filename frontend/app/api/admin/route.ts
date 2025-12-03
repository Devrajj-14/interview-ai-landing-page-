import { NextResponse } from "next/server";
import { getAllEmployers } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const employers = await getAllEmployers();

    return NextResponse.json({
      success: true,
      employers,
    });
  } catch (error: any) {
    console.error("Admin API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch employers" },
      { status: 500 }
    );
  }
}
