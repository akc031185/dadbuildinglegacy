import { NextRequest, NextResponse } from "next/server";
// Temporarily disabled for deployment
// import { contactFormSchema } from "@/lib/validators";
// import { sendContactEmail } from "@/lib/email";
// import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Temporarily disabled for deployment
    return NextResponse.json(
      { 
        error: "Contact form temporarily disabled", 
        message: "Contact functionality is temporarily disabled while we resolve deployment issues. Please check back soon." 
      },
      { status: 503 }
    );

  } catch (error) {
    console.error("Contact form error:", error);
    
    // Return generic error response (don't expose internal errors)
    return NextResponse.json(
      { 
        error: "Internal server error", 
        message: "Something went wrong while sending your message. Please try again later." 
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed", message: "This endpoint only accepts POST requests." },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: "Method not allowed", message: "This endpoint only accepts POST requests." },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: "Method not allowed", message: "This endpoint only accepts POST requests." },
    { status: 405 }
  );
}