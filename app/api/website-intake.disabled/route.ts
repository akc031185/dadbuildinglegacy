import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Validate required fields
    const requiredFields = ['contactName', 'contactEmail', 'domainName', 'siteDescription', 'businessType', 'targetAudience', 'logoOption']
    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Format the logo option for email
    const logoOptions: { [key: string]: string } = {
      'existing': 'I have an existing logo',
      'create-new': 'Create a new logo for me',
      'text-only': 'Use text-only logo'
    }
    const logoOptionText = logoOptions[data.logoOption] || data.logoOption

    // Email content
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>New Website Request - Dad Building Legacy</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1e3a8a; color: white; padding: 20px; text-align: center; }
        .content { background: #f9fafb; padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #1e3a8a; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
        .field { margin-bottom: 15px; }
        .field-label { font-weight: bold; color: #374151; }
        .field-value { margin-top: 5px; padding: 10px; background: white; border-left: 4px solid #f59e0b; }
        .logo-option { background: #fef3c7; border-left-color: #f59e0b; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🌐 New Website Request</h1>
            <p>Dad Building Legacy - Website Creation Request</p>
        </div>

        <div class="content">
            <div class="section">
                <h3>👤 Contact Information</h3>
                <div class="field">
                    <div class="field-label">Name:</div>
                    <div class="field-value">${data.contactName}</div>
                </div>
                <div class="field">
                    <div class="field-label">Email:</div>
                    <div class="field-value">${data.contactEmail}</div>
                </div>
                ${data.phone ? `
                <div class="field">
                    <div class="field-label">Phone:</div>
                    <div class="field-value">${data.phone}</div>
                </div>
                ` : ''}
            </div>

            <div class="section">
                <h3>🌐 Website Details</h3>
                <div class="field">
                    <div class="field-label">Preferred Domain Name:</div>
                    <div class="field-value">${data.domainName}</div>
                </div>
                <div class="field">
                    <div class="field-label">Business Type:</div>
                    <div class="field-value">${data.businessType}</div>
                </div>
                <div class="field">
                    <div class="field-label">Target Audience:</div>
                    <div class="field-value">${data.targetAudience}</div>
                </div>
                <div class="field">
                    <div class="field-label">Site Description & Functionality:</div>
                    <div class="field-value">${data.siteDescription.replace(/\n/g, '<br>')}</div>
                </div>
            </div>

            <div class="section">
                <h3>🎨 Logo Preference</h3>
                <div class="field">
                    <div class="field-label">Logo Option:</div>
                    <div class="field-value logo-option">${logoOptionText}</div>
                </div>
            </div>

            ${data.additionalNotes ? `
            <div class="section">
                <h3>📝 Additional Notes</h3>
                <div class="field">
                    <div class="field-value">${data.additionalNotes.replace(/\n/g, '<br>')}</div>
                </div>
            </div>
            ` : ''}

            <div class="section">
                <h3>📅 Submission Details</h3>
                <div class="field">
                    <div class="field-label">Submitted:</div>
                    <div class="field-value">${new Date().toLocaleString()}</div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
    `

    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM || data.contactEmail,
      to: process.env.ADMIN_EMAIL || 'admin@dadbuildinglegacy.com',
      subject: `🌐 New Website Request - ${data.domainName}`,
      html: emailContent,
      replyTo: data.contactEmail,
    })

    return NextResponse.json({
      success: true,
      message: 'Website request submitted successfully'
    })

  } catch (error) {
    console.error('Error processing website request:', error)
    return NextResponse.json(
      { error: 'Failed to submit website request' },
      { status: 500 }
    )
  }
}