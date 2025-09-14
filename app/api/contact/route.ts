import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validators";
import { sendContactEmail } from "@/lib/email";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const rateLimitResult = rateLimit(request);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        { 
          error: "Too many requests", 
          message: "You've reached the maximum number of contact form submissions. Please try again later.",
          resetTime: rateLimitResult.resetTime 
        },
        { 
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
          }
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          message: "Please check your form data and try again.",
          details: validationResult.error.issues 
        },
        { status: 400 }
      );
    }

    const contactData = validationResult.data;

    // Check for required environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("Missing email configuration environment variables");
      return NextResponse.json(
        { 
          error: "Server configuration error", 
          message: "Email service is not properly configured. Please try again later." 
        },
        { status: 500 }
      );
    }

    // Send email
    await sendContactEmail(contactData);

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you for your message! I'll get back to you soon." 
      },
      { 
        status: 200,
        headers: {
          "X-RateLimit-Limit": rateLimitResult.limit.toString(),
          "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
          "X-RateLimit-Reset": rateLimitResult.resetTime.toString(),
        }
      }
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