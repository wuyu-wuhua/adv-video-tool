import { NextRequest, NextResponse } from "next/server";
import { initializeDatabase } from "@/lib/database/services";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "@/lib/core/constants";

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Initializing database...");

    const success = await initializeDatabase();

    if (success) {
      return NextResponse.json({
        success: true,
        message: SUCCESS_MESSAGES.SAVE_SUCCESS,
      });
    } else {
      return NextResponse.json(
        { error: ERROR_MESSAGES.DATABASE_ERROR },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Database initialization error:", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.SERVER_ERROR },
      { status: 500 }
    );
  }
}

// 处理其他HTTP方法
export async function GET() {
  return NextResponse.json({ message: "Method not allowed" }, { status: 405 });
}
