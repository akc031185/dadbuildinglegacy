import { z } from 'zod'

export const WebsiteRequestSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  community: z.enum(['Gator', 'SubTo', 'Other']),
  companyName: z.string().min(1, "Company name is required"),
  
  hasDomain: z.boolean(),
  currentDomain: z.string().optional(),
  domainPreferences: z.array(z.string()).optional(),
  autoRegister: z.boolean().optional(),
  
  hasLogo: z.boolean(),
  logoPrompt: z.string().optional(),
  
  siteGoal: z.string().min(1, "Site goal is required"),
  pagesWanted: z.array(z.string()).min(1, "At least one page is required"),
  features: z.array(z.string()).default([]),
  
  copyTone: z.string().optional(),
  crmProvider: z.string().optional(),
  
  // Additional fields
  timeline: z.string().optional(),
  budget: z.string().optional(),
  specialRequests: z.string().optional(),
})

export type WebsiteRequest = z.infer<typeof WebsiteRequestSchema>

export const WebsiteRequestDbSchema = WebsiteRequestSchema.extend({
  _id: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).default('pending'),
  n8nWebhookFired: z.boolean().default(false),
  n8nWebhookResponse: z.any().optional(),
})

export type WebsiteRequestDb = z.infer<typeof WebsiteRequestDbSchema>