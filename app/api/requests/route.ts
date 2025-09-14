import { NextRequest, NextResponse } from 'next/server'
// Temporarily disabled for deployment
// import { getDb } from '@/lib/db'
// import { WebsiteRequestSchema, WebsiteRequestDb } from '@/lib/schemas'
// import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    // Temporarily disabled for deployment
    return NextResponse.json({
      success: false,
      error: "Website request submission temporarily disabled",
      message: "Request functionality is temporarily disabled while we resolve deployment issues. Please check back soon."
    }, { status: 503 });
    
  } catch (error) {
    console.error('API Error:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal server error' 
      },
      { status: 500 }
    )
  }
}

async function sendIntakeConfirmation(email: string, fullName: string): Promise<void> {
  // TODO: Implement email sending via Zoho SMTP using existing email lib
  console.log(`Would send confirmation email to ${email} (${fullName})`)
}

async function fireN8nWebhook(requestId: string, data: any): Promise<any> {
  // Use the site builder webhook as the main intake webhook
  const webhookUrl = process.env.N8N_SITE_BUILDER_URL
  if (!webhookUrl) {
    throw new Error('N8N_SITE_BUILDER_URL not configured')
  }
  
  const payload = {
    requestId,
    timestamp: new Date().toISOString(),
    ...data
  }
  
  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  })
  
  if (!response.ok) {
    throw new Error(`n8n webhook failed: ${response.status} ${response.statusText}`)
  }
  
  return await response.json()
}