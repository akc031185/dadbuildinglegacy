import { NextRequest, NextResponse } from "next/server";
import { testEmailConnection } from "@/lib/email";

export async function GET(request: NextRequest) {
  try {
    // Basic authentication check (optional, for security)
    const authHeader = request.headers.get("authorization");
    const token = process.env.ADMIN_BOOTSTRAP_TOKEN;
    
    if (token && authHeader !== `Bearer ${token}`) {
      return NextResponse.json(
        { error: "Unauthorized", message: "Invalid or missing authorization token." },
        { status: 401 }
      );
    }

    // Test email connection
    const isConnected = await testEmailConnection();

    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: "Email connection test successful!",
        config: {
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          user: process.env.SMTP_USER,
          secure: process.env.SMTP_SECURE,
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Email connection test failed. Please check your configuration.",
        config: {
          host: process.env.SMTP_HOST || "missing",
          port: process.env.SMTP_PORT || "missing",
          user: process.env.SMTP_USER || "missing",
          secure: process.env.SMTP_SECURE || "missing",
        }
      }, { status: 500 });
    }

  } catch (error) {
    console.error("Email test error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Test failed", 
        message: "An error occurred while testing the email connection." 
      },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { error: "Method not allowed", message: "Use GET to test email connection." },
    { status: 405 }
  );
}