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

    // Original code commented out for deployment
    /*
    const body = await request.json()
    
    // Validate request body
    const validatedData = WebsiteRequestSchema.parse(body)
    
    // Connect to database
    const db = await getDb()
    const collection = db.collection<WebsiteRequestDb>('website_requests')
    
    // Create request document
    const requestDoc: Omit<WebsiteRequestDb, '_id'> = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: 'pending',
      n8nWebhookFired: false,
    }
    
    // Insert into database
    const result = await collection.insertOne(requestDoc as WebsiteRequestDb)
    const requestId = result.insertedId.toString()
    
    // Send intake confirmation (non-blocking)
    sendIntakeConfirmation(validatedData.email, validatedData.fullName)
      .catch(error => console.error('Failed to send confirmation email:', error))
    
    // Fire n8n webhook (non-blocking but important)
    fireN8nWebhook(requestId, validatedData)
      .then(async (webhookResponse) => {
        // Update document with webhook response
        await collection.updateOne(
          { _id: new ObjectId(requestId) as any },
          { 
            $set: { 
              n8nWebhookFired: true, 
              n8nWebhookResponse: webhookResponse,
              updatedAt: new Date()
            } 
          }
        )
      })
      .catch(async (error) => {
        console.error('Failed to fire n8n webhook:', error)
        // Update document with error
        await collection.updateOne(
          { _id: new ObjectId(requestId) as any },
          { 
            $set: { 
              n8nWebhookFired: false,
              n8nWebhookResponse: { error: error.message },
              updatedAt: new Date()
            } 
          }
        )
      })
    
    return NextResponse.json({ 
      success: true, 
      requestId,
      message: 'Website request submitted successfully. You will receive updates via email.'
    })
    */
    
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
  const webhookUrl = process.env.N8N_INTAKE_WEBHOOK_URL
  if (!webhookUrl) {
    throw new Error('N8N_INTAKE_WEBHOOK_URL not configured')
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