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

  // Industry-specific icons and graphics
  const industryIcons = {
    technology: {
      icon: `<circle cx="75" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="2"/>
             <path d="M60 50h30M75 35v30" stroke="currentColor" stroke-width="2"/>
             <circle cx="60" cy="40" r="3" fill="currentColor"/>
             <circle cx="90" cy="60" r="3" fill="currentColor"/>`,
      shape: `<rect x="20" y="30" width="60" height="40" rx="5" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>`
    },
    health: {
      icon: `<path d="M75 35v30M60 50h30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
             <circle cx="75" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.5"/>`,
      shape: `<ellipse cx="40" cy="45" rx="8" ry="12" fill="currentColor" opacity="0.1"/>`
    },
    food: {
      icon: `<path d="M65 35c-5 0-10 5-10 10v20h20V45c0-5-5-10-10-10z" fill="currentColor" opacity="0.7"/>
             <path d="M85 40v25h3c2 0 4-2 4-4V44c0-2-2-4-4-4h-3z" fill="currentColor"/>
             <circle cx="45" cy="45" r="8" fill="none" stroke="currentColor" stroke-width="2"/>`,
      shape: `<path d="M25 55c0-10 10-20 20-20s20 10 20 20" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/>`
    },
    finance: {
      icon: `<path d="M45 55L60 40L75 50L90 35" stroke="currentColor" stroke-width="2.5" fill="none"/>
             <circle cx="60" cy="40" r="3" fill="currentColor"/>
             <circle cx="75" cy="50" r="3" fill="currentColor"/>
             <rect x="35" y="50" width="5" height="15" fill="currentColor" opacity="0.6"/>`,
      shape: `<rect x="25" y="30" width="50" height="35" rx="3" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>`
    },
    construction: {
      icon: `<rect x="55" y="45" width="25" height="3" fill="currentColor"/>
             <path d="M55 48L65 35L75 48" stroke="currentColor" stroke-width="2" fill="none"/>
             <rect x="45" y="55" width="20" height="8" fill="currentColor" opacity="0.7"/>`,
      shape: `<polygon points="30,60 50,35 70,60" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.3"/>`
    },
    creative: {
      icon: `<circle cx="65" cy="45" r="12" fill="none" stroke="currentColor" stroke-width="2"/>
             <path d="M75 40c5 0 10 5 10 10s-5 10-10 10" fill="none" stroke="currentColor" stroke-width="2"/>
             <circle cx="50" cy="55" r="4" fill="currentColor" opacity="0.6"/>`,
      shape: `<path d="M35 35c10-5 20 0 25 10c5-10 15-15 25-10" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4"/>`
    },
    business: {
      icon: `<rect x="60" y="35" width="15" height="25" fill="currentColor" opacity="0.7"/>
             <rect x="45" y="45" width="12" height="15" fill="currentColor" opacity="0.5"/>
             <rect x="78" y="42" width="10" height="18" fill="currentColor" opacity="0.6"/>`,
      shape: `<rect x="30" y="30" width="40" height="30" rx="2" fill="none" stroke="currentColor" stroke-width="1" opacity="0.2"/>`
    }
  }

  const icons = industryIcons[businessType as keyof typeof industryIcons] || industryIcons.business

  const styles = [
    {
      name: 'minimalist',
      bg: `linear-gradient(135deg, ${typeColors[0]}, ${typeColors[1]})`,
      text: '#ffffff',
      font: 'Arial, sans-serif',
      size: '20',
      weight: '400',
      transform: 'uppercase',
      spacing: '2px',
      textY: '130'
    },
    {
      name: 'modern',
      bg: `linear-gradient(45deg, ${typeColors[1]}, ${typeColors[0]})`,
      text: '#ffffff',
      font: 'Helvetica, sans-serif',
      size: '22',
      weight: '600',
      transform: 'capitalize',
      spacing: '1px',
      textY: '130'
    },
    {
      name: 'geometric',
      bg: '#ffffff',
      text: typeColors[0],
      font: 'Arial, sans-serif',
      size: '20',
      weight: '700',
      transform: 'uppercase',
      spacing: '3px',
      border: typeColors[0],
      textY: '130'
    },
    {
      name: 'elegant',
      bg: `radial-gradient(circle, #f8fafc, #e2e8f0)`,
      text: '#1e293b',
      font: 'Georgia, serif',
      size: '22',
      weight: '400',
      transform: 'capitalize',
      spacing: '1px',
      textY: '130'
    },
    {
      name: 'bold',
      bg: `linear-gradient(90deg, ${typeColors[2]}, ${typeColors[0]})`,
      text: '#ffffff',
      font: 'Arial Black, sans-serif',
      size: '18',
      weight: '900',
      transform: 'uppercase',
      spacing: '2px',
      textY: '130'
    },
    {
      name: 'sophisticated',
      bg: `linear-gradient(180deg, #1f2937, #374151)`,
      text: '#ffffff',
      font: 'Times, serif',
      size: '20',
      weight: '500',
      transform: 'capitalize',
      spacing: '1px',
      textY: '130'
    }
  ]

  return styles.map((style, index) => {
    const shortName = companyName.length > 18 ? companyName.substring(0, 18) + '...' : companyName
    const iconColor = style.text

    const svgContent = `
      <svg width="300" height="160" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${typeColors[0]};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${typeColors[1]};stop-opacity:1" />
          </linearGradient>
          <radialGradient id="radial${index}" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
          </radialGradient>
        </defs>

        <rect width="300" height="160" fill="${style.bg.includes('gradient') ? `url(#${style.bg.includes('radial') ? 'radial' : 'grad'}${index})` : style.bg}" ${style.border ? `stroke="${style.border}" stroke-width="3"` : ''} rx="12"/>

        <!-- Industry Icon -->
        <g transform="translate(75, 25)" fill="${iconColor}" stroke="${iconColor}" opacity="0.9">
          ${icons.icon}
        </g>

        <!-- Background Shape -->
        <g transform="translate(0, 0)" fill="${iconColor}" stroke="${iconColor}">
          ${icons.shape}
        </g>

        <!-- Company Name -->
        <text x="150" y="${style.textY || '130'}" text-anchor="middle" dominant-baseline="middle"
              fill="${style.text}" font-family="${style.font}" font-size="${style.size}"
              font-weight="${style.weight}" letter-spacing="${style.spacing}"
              style="text-transform: ${style.transform};">
          ${shortName}
        </text>

        <!-- Decorative Elements -->
        ${index % 2 === 0 ?
          `<circle cx="250" cy="30" r="15" fill="${style.text}" opacity="0.1"/>
           <circle cx="50" cy="140" r="8" fill="${style.text}" opacity="0.15"/>` :
          `<rect x="220" y="20" width="25" height="25" rx="3" fill="${style.text}" opacity="0.1"/>
           <circle cx="30" cy="130" r="12" fill="${style.text}" opacity="0.1"/>`
        }
      </svg>
    `.trim()

    const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`

    return {
      id: index + 1,
      style: style.name,
      description: `${style.name.charAt(0).toUpperCase() + style.name.slice(1)} design with ${businessType} elements`,
      url: dataUrl,
      fallback: false
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