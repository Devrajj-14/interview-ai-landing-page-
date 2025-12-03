import { NextRequest, NextResponse } from "next/server";
import { getEmployerByToken } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Token is required" },
        { status: 400 }
      );
    }

    const employer = await getEmployerByToken(token);

    if (!employer) {
      return NextResponse.json(
        { success: false, error: "Invalid token" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, employer });
  } catch (error: any) {
    console.error("Verify API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
