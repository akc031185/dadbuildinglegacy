import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Define validation schemas for different agent types
const domainSherpaSchema = z.object({
  business: z.string().min(1, 'Business name is required'),
  industry: z.string().min(1, 'Industry is required'),
  keywords: z.array(z.string()).optional().default([]),
  preferredTlds: z.array(z.string()).optional().default(['.com', '.io', '.net'])
})

const logoBrandsmithSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  industry: z.string().optional(),
  style: z.string().optional().default('Modern & Clean'),
  colors: z.array(z.string()).optional().default(['blue', 'white']),
  hasUpload: z.boolean().default(false),
  uploadedLogo: z.string().optional()
})

const siteBuilderSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  siteGoal: z.string().min(1, 'Site goal is required'),
  pagesWanted: z.array(z.string()).optional().default(['Home', 'Contact']),
  copyTone: z.string().optional().default('Professional'),
  features: z.array(z.string()).optional().default([]),
  repoName: z.string().min(1, 'Repository name is required')
})

const vercelDeployerSchema = z.object({
  repo: z.string().min(1, 'Repository is required').regex(/^[\w-]+\/[\w-]+$/, 'Repo must be in format "owner/name"'),
  env: z.record(z.string()).optional().default({}),
  domain: z.string().nullable().optional()
})

const ghlOpportunitySchema = z.object({
  ghlApiKey: z.string().min(1, 'GHL API key is required'),
  locationId: z.string().min(1, 'Location ID is required'),
  lead: z.object({
    name: z.string().min(1, 'Lead name is required'),
    email: z.string().email('Valid email is required'),
    phone: z.string().optional(),
    source: z.string().optional().default('DBL Website Builder')
  })
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentType, ...data } = body

    let validatedData
    let userMessage = ''

    switch (agentType) {
      case 'domain-sherpa':
        validatedData = domainSherpaSchema.parse(data)
        userMessage = `Business: ${validatedData.business}
Industry: ${validatedData.industry}
Keywords: ${validatedData.keywords.join(', ')}
Preferred TLDs: ${validatedData.preferredTlds.join(', ')}

Generate domain suggestions for this business.`
        break

      case 'logo-brandsmith':
        validatedData = logoBrandsmithSchema.parse(data)
        if (validatedData.hasUpload && !validatedData.uploadedLogo) {
          throw new Error('uploadedLogo is required when hasUpload is true')
        }
        userMessage = validatedData.hasUpload
          ? `Company: ${validatedData.companyName}
Uploaded Logo: ${validatedData.uploadedLogo}

Clean up and optimize this logo, provide brand guidelines.`
          : `Company: ${validatedData.companyName}
Industry: ${validatedData.industry || 'General'}
Style: ${validatedData.style}
Colors: ${validatedData.colors.join(', ')}

Create a professional logo and brand guidelines.`
        break

      case 'site-builder':
        validatedData = siteBuilderSchema.parse(data)
        userMessage = `Company: ${validatedData.companyName}
Site Goal: ${validatedData.siteGoal}
Pages Wanted: ${validatedData.pagesWanted.join(', ')}
Copy Tone: ${validatedData.copyTone}
Features: ${validatedData.features.join(', ')}

Generate website content and structure.`
        break

      case 'vercel-deployer':
        validatedData = vercelDeployerSchema.parse(data)
        const [owner, name] = validatedData.repo.split('/')
        validatedData = {
          ...validatedData,
          owner,
          name,
          projectName: name.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          hasEnvVars: Object.keys(validatedData.env).length > 0,
          hasDomain: !!validatedData.domain
        }
        break

      case 'ghl-opportunity':
        validatedData = ghlOpportunitySchema.parse(data)
        break

      default:
        throw new Error(`Unknown agent type: ${agentType}`)
    }

    return NextResponse.json({
      success: true,
      data: validatedData,
      userMessage,
      agentType,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Validation error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        error: 'Validation failed',
        details: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      }, { status: 400 })
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown validation error'
    }, { status: 400 })
  }
}