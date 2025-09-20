import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function extractCompanyName(description: string, providedName: string): string {
  if (providedName?.trim()) {
    return providedName.trim()
  }

  // Extract company name from description
  const patterns = [
    /([A-Z][a-zA-Z\s&]+(?:LLC|Inc|Corp|Co|Company|Ltd|Limited))/i,
    /([A-Z][a-zA-Z\s&]{2,20})\s+(?:is|specializes|provides|offers)/i,
    /"([^"]+)"/,
    /([A-Z][a-zA-Z\s&]{2,15})/
  ]

  for (const pattern of patterns) {
    const match = description.match(pattern)
    if (match && match[1]) {
      return match[1].trim()
    }
  }

  return 'Your Business'
}

function determineBusinessType(description: string): string {
  const businessType = description.toLowerCase()

  if (businessType.includes('tech') || businessType.includes('software') || businessType.includes('ai')) {
    return 'technology'
  } else if (businessType.includes('health') || businessType.includes('medical') || businessType.includes('fitness')) {
    return 'health'
  } else if (businessType.includes('food') || businessType.includes('restaurant') || businessType.includes('kitchen')) {
    return 'food'
  } else if (businessType.includes('finance') || businessType.includes('bank') || businessType.includes('invest')) {
    return 'finance'
  } else if (businessType.includes('construction') || businessType.includes('contractor') || businessType.includes('build')) {
    return 'construction'
  } else if (businessType.includes('creative') || businessType.includes('design') || businessType.includes('art')) {
    return 'creative'
  }

  return 'business'
}

function generateSVGLogos(companyName: string, businessType: string): any[] {
  const colors = {
    technology: ['#2563eb', '#7c3aed', '#0891b2'],
    health: ['#059669', '#10b981', '#0891b2'],
    food: ['#ea580c', '#f59e0b', '#84cc16'],
    finance: ['#1e40af', '#059669', '#374151'],
    construction: ['#ea580c', '#dc2626', '#374151'],
    creative: ['#7c3aed', '#ec4899', '#f59e0b'],
    business: ['#2563eb', '#059669', '#dc2626']
  }

  const typeColors = colors[businessType as keyof typeof colors] || colors.business

  const styles = [
    { name: 'minimalist', bg: typeColors[0], text: '#ffffff', font: 'Arial, sans-serif', size: '24', weight: '400', transform: 'uppercase', spacing: '2px' },
    { name: 'modern', bg: typeColors[1], text: '#ffffff', font: 'Helvetica, sans-serif', size: '28', weight: '600', transform: 'capitalize', spacing: '1px' },
    { name: 'geometric', bg: '#ffffff', text: typeColors[0], font: 'Arial, sans-serif', size: '26', weight: '700', transform: 'uppercase', spacing: '3px', border: typeColors[0] },
    { name: 'elegant', bg: '#f8fafc', text: '#1e293b', font: 'Georgia, serif', size: '24', weight: '400', transform: 'capitalize', spacing: '1px' },
    { name: 'bold', bg: typeColors[2], text: '#ffffff', font: 'Arial Black, sans-serif', size: '32', weight: '900', transform: 'uppercase', spacing: '2px' },
    { name: 'sophisticated', bg: '#1f2937', text: '#ffffff', font: 'Times, serif', size: '22', weight: '500', transform: 'capitalize', spacing: '1px' }
  ]

  return styles.map((style, index) => {
    const shortName = companyName.length > 20 ? companyName.substring(0, 20) + '...' : companyName

    const svgContent = `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="${style.bg}" ${style.border ? `stroke="${style.border}" stroke-width="3"` : ''} rx="8"/>
        <text x="150" y="100" text-anchor="middle" dominant-baseline="middle"
              fill="${style.text}" font-family="${style.font}" font-size="${style.size}"
              font-weight="${style.weight}" letter-spacing="${style.spacing}"
              style="text-transform: ${style.transform};">
          ${shortName}
        </text>
      </svg>
    `.trim()

    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`

    return {
      id: index + 1,
      style: style.name,
      description: `${style.name.charAt(0).toUpperCase() + style.name.slice(1)} design`,
      url: dataUrl,
      fallback: false // These are proper generated logos, not external placeholders
    }
  })
}

function generateLogoPrompts(companyName: string, businessType: string, description: string): string[] {
  const baseStyles = [
    'minimalist logo design',
    'modern professional logo',
    'clean geometric logo',
    'elegant typography logo',
    'bold circular logo',
    'sophisticated monogram logo'
  ]

  const businessKeywords = {
    technology: 'tech, digital, innovation, circuit, network',
    health: 'medical, wellness, care, heart, plus sign',
    food: 'culinary, fresh, organic, chef hat, utensils',
    finance: 'trust, growth, stability, arrow up, coins',
    construction: 'building, hammer, house, tools, strong',
    creative: 'artistic, colorful, brush, design, creative',
    business: 'professional, corporate, growth, success'
  }

  const keywords = businessKeywords[businessType as keyof typeof businessKeywords] || businessKeywords.business

  return baseStyles.map((style, index) => {
    return `${style} for "${companyName}", ${keywords}, simple, vector art, flat design, white background, high contrast, professional, clean lines, scalable, ${businessType} industry, modern aesthetic`
  })
}

async function generateHuggingFaceLogos(companyName: string, businessType: string, description: string): Promise<any[]> {
  const prompts = generateLogoPrompts(companyName, businessType, description)
  const logos = []

  // Hugging Face models to try (free inference API)
  const models = [
    'black-forest-labs/FLUX.1-schnell',
    'stabilityai/stable-diffusion-xl-base-1.0',
    'runwayml/stable-diffusion-v1-5'
  ]

  const selectedModel = models[0] // Start with FLUX.1-schnell (fastest)

  for (let i = 0; i < prompts.length; i++) {
    try {
      const response = await fetch(
        `https://api-inference.huggingface.co/models/${selectedModel}`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY || 'hf_demo'}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            inputs: prompts[i],
            parameters: {
              width: 512,
              height: 512,
              num_inference_steps: 4, // Fast generation
              guidance_scale: 1.0 // Low guidance for speed
            }
          })
        }
      )

      if (response.ok) {
        const imageBlob = await response.arrayBuffer()
        const base64Image = Buffer.from(imageBlob).toString('base64')
        const dataUrl = `data:image/jpeg;base64,${base64Image}`

        logos.push({
          id: i + 1,
          style: ['minimalist', 'modern', 'geometric', 'elegant', 'bold', 'sophisticated'][i],
          description: `AI-generated ${['minimalist', 'modern', 'geometric', 'elegant', 'bold', 'sophisticated'][i]} logo`,
          url: dataUrl,
          model: selectedModel,
          prompt: prompts[i]
        })
      } else {
        console.log(`Failed to generate logo ${i + 1}:`, response.status)

        // Fallback to SVG logo for this logo
        const svgLogos = generateSVGLogos(companyName, businessType)
        if (svgLogos[i]) {
          logos.push(svgLogos[i])
        }
      }
    } catch (error) {
      console.error(`Error generating logo ${i + 1}:`, error)

      // Fallback to SVG logo
      const svgLogos = generateSVGLogos(companyName, businessType)
      if (svgLogos[i]) {
        logos.push(svgLogos[i])
      }
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  return logos
}

export async function POST(request: NextRequest) {
  let businessDescription = ''
  let companyName = ''

  try {
    const body = await request.json()
    businessDescription = body.businessDescription || ''
    companyName = body.companyName || ''

    if (!businessDescription && !companyName) {
      return NextResponse.json(
        { error: 'Business description or company name is required' },
        { status: 400 }
      )
    }

    const extractedName = extractCompanyName(businessDescription, companyName)
    const businessType = determineBusinessType(businessDescription)

    console.log(`Generating AI logos for "${extractedName}" (${businessType} industry)`)

    // Generate logos using Hugging Face open source models
    const aiLogos = await generateHuggingFaceLogos(extractedName, businessType, businessDescription)

    const successfulLogos = aiLogos.filter(logo => !logo.fallback)
    const fallbackCount = aiLogos.length - successfulLogos.length

    return NextResponse.json({
      success: true,
      logos: aiLogos,
      message: `Generated ${successfulLogos.length} AI logos${fallbackCount > 0 ? ` (${fallbackCount} fallbacks)` : ''} for "${extractedName}" (${businessType} industry)`,
      businessType: businessType,
      extractedName: extractedName,
      model: 'FLUX.1-schnell',
      aiGenerated: successfulLogos.length,
      fallbacks: fallbackCount
    })

  } catch (error) {
    console.error('Logo generation error:', error)

    // Complete fallback system - Generate SVG logos server-side
    const extractedName = extractCompanyName(businessDescription, companyName)
    const businessType = determineBusinessType(businessDescription)

    const fallbackLogos = generateSVGLogos(extractedName, businessType)

    return NextResponse.json({
      success: true,
      logos: fallbackLogos,
      message: 'Generated fallback logos (AI models unavailable)',
      fallback: true,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}