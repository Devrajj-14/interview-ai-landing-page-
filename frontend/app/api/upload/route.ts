import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/supabase";
import { updateEmployerVerification } from "@/lib/db";

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const token = formData.get("token") as string;

    if (!file || !token) {
      return NextResponse.json(
        { success: false, error: "File and token are required" },
        { status: 400 }
      );
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Only PNG, JPG, and PDF files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File size must be less than 10MB" },
        { status: 400 }
      );
    }

    const fileUrl = await uploadFile(file);

    await updateEmployerVerification(token, {
      idProofUrl: fileUrl,
      isVerified: true,
    });

    return NextResponse.json({
      success: true,
      fileUrl,
      message: "File uploaded successfully",
    });
  } catch (error: any) {
    console.error("Upload API error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
