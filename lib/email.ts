import nodemailer from "nodemailer";
import { ContactFormData } from "./validators";

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

function createTransporter(): nodemailer.Transporter {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST!,
    port: parseInt(process.env.SMTP_PORT!),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  };

  // Validate required environment variables
  if (!config.host || !config.auth.user || !config.auth.pass) {
    throw new Error("Missing required email configuration environment variables");
  }

  return nodemailer.createTransporter(config);
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const transporter = createTransporter();
  
  const { name, email, topic, message } = data;

  // Email to site owner
  const ownerEmailOptions = {
    from: `"${name}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_TO!,
    replyTo: email,
    subject: `New Contact Form Submission: ${topic}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Contact Form Submission</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
            .content { padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #495057; }
            .value { margin-top: 5px; padding: 10px; background: #f8f9fa; border-radius: 4px; }
            .message { white-space: pre-line; }
            .footer { margin-top: 20px; padding: 15px; font-size: 12px; color: #6c757d; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>New Contact Form Submission</h2>
              <p>You have received a new message from your website contact form.</p>
            </div>
            
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${name}</div>
              </div>
              
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              
              <div class="field">
                <div class="label">Topic:</div>
                <div class="value">${topic}</div>
              </div>
              
              <div class="field">
                <div class="label">Message:</div>
                <div class="value message">${message}</div>
              </div>
            </div>
            
            <div class="footer">
              <p>This email was sent from the contact form at dadbuildinglegacy.com</p>
              <p>Timestamp: ${new Date().toLocaleString("en-US", { 
                timeZone: "America/New_York",
                year: "numeric",
                month: "long", 
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
              })}</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Topic: ${topic}

Message:
${message}

---
This email was sent from the contact form at dadbuildinglegacy.com
Timestamp: ${new Date().toISOString()}
    `.trim(),
  };

  // Confirmation email to sender
  const confirmationEmailOptions = {
    from: `"Dad Building Legacy" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Thank you for contacting Dad Building Legacy",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Thank You</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
            .content { padding: 20px; border: 1px solid #e9ecef; border-radius: 8px; }
            .footer { margin-top: 20px; padding: 15px; font-size: 12px; color: #6c757d; text-align: center; }
            .brand { color: #2563eb; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thank You for Reaching Out!</h2>
            </div>
            
            <div class="content">
              <p>Hi ${name},</p>
              
              <p>Thank you for contacting me through <span class="brand">Dad Building Legacy</span>. I've received your message regarding "<strong>${topic}</strong>" and appreciate you taking the time to reach out.</p>
              
              <p>I typically respond to inquiries within 24 hours. In the meantime, feel free to:</p>
              
              <ul>
                <li>Check out my latest journal entries at <a href="https://dadbuildinglegacy.com/journal">dadbuildinglegacy.com/journal</a></li>
                <li>Connect with me on <a href="https://instagram.com/dadbuildinglegacy">Instagram @dadbuildinglegacy</a></li>
                <li>Explore my real estate projects at <a href="https://equinestventures.com">EquiNest Ventures</a></li>
              </ul>
              
              <p>Looking forward to connecting!</p>
              
              <p>Best regards,<br>
              <strong>Abhishek Choudhary</strong><br>
              <em>Real estate investor & private lender • AI learner • Health journey</em></p>
            </div>
            
            <div class="footer">
              <p>This is an automated confirmation email from dadbuildinglegacy.com</p>
              <p>If you didn't submit this form, please ignore this email.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Hi ${name},

Thank you for contacting me through Dad Building Legacy. I've received your message regarding "${topic}" and appreciate you taking the time to reach out.

I typically respond to inquiries within 24 hours. In the meantime, feel free to:

- Check out my latest journal entries at dadbuildinglegacy.com/journal
- Connect with me on Instagram @dadbuildinglegacy  
- Explore my real estate projects at EquiNest Ventures (equinestventures.com)

Looking forward to connecting!

Best regards,
Abhishek Choudhary
Real estate investor & private lender • AI learner • Health journey

---
This is an automated confirmation email from dadbuildinglegacy.com
If you didn't submit this form, please ignore this email.
    `.trim(),
  };

  try {
    // Send both emails
    await Promise.all([
      transporter.sendMail(ownerEmailOptions),
      transporter.sendMail(confirmationEmailOptions),
    ]);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email. Please try again later.");
  }
}

export async function testEmailConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    return true;
  } catch (error) {
    console.error("Email connection test failed:", error);
    return false;
  }
}